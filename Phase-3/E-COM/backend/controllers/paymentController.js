import Coupon from "../models/couponModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { stripe } from "../lib/stripe.js";

// Helper: Create a 10% discount reward coupon for purchases over ₹5,000
async function createNewCoupon(userId) {
    await Coupon.findOneAndDelete({ userId });

    const newCoupon = new Coupon({
        code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
        discountPercentage: 10,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        userId: userId
    });

    await newCoupon.save();
    return newCoupon;
}

// @desc    Create Stripe Checkout Session in INR (Indian Rupees) with delivery charges & coupons
// @route   POST /api/payments/create-checkout-session
// @access  Private
export const createCheckoutSession = async (req, res) => {
    try {
        const { products, couponCode } = req.body;

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "Invalid or empty products array" });
        }

        let totalAmount = 0; // Total amount in paise (1 INR = 100 Paise)

        // Fetch verified product prices server-side from MongoDB
        const lineItems = await Promise.all(
            products.map(async (item) => {
                const product = await Product.findById(item._id);
                if (!product) {
                    throw new Error(`Product not found: ${item._id}`);
                }

                const amount = Math.round(product.price * 100); // Convert Rupees to Paise
                totalAmount += amount * item.quantity;

                return {
                    price_data: {
                        currency: "inr", // 🇮🇳 Set currency to Indian Rupees
                        product_data: {
                            name: product.name,
                            images: [product.image]
                        },
                        unit_amount: amount
                    },
                    quantity: item.quantity
                };
            })
        );

        // Apply Delivery Charge: Free delivery on orders >= ₹500 (50,000 paise), else ₹50 delivery charge (5,000 paise)
        const SHIPPING_THRESHOLD = 50000; // ₹500 in paise
        const SHIPPING_FEE = 5000; // ₹50 in paise

        if (totalAmount < SHIPPING_THRESHOLD) {
            lineItems.push({
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: "Delivery Charge",
                        description: "Standard shipping fee (Free on orders above ₹500)"
                    },
                    unit_amount: SHIPPING_FEE
                },
                quantity: 1
            });
            totalAmount += SHIPPING_FEE;
        }

        let coupon = null;
        if (couponCode) {
            coupon = await Coupon.findOne({
                code: couponCode.toUpperCase(),
                userId: req.user._id,
                isActive: true
            });

            if (coupon) {
                totalAmount -= Math.round((totalAmount * coupon.discountPercentage) / 100);
            }
        }

        // Create Stripe Checkout Session in INR
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL || "http://localhost:5173"}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL || "http://localhost:5173"}/purchase-cancel`,
            discounts: coupon
                ? [
                      {
                          coupon: await createStripeCoupon(coupon.discountPercentage)
                      }
                  ]
                : [],
            metadata: {
                userId: req.user._id.toString(),
                couponCode: couponCode || "",
                products: JSON.stringify(
                    products.map((p) => ({
                        id: p._id,
                        quantity: p.quantity,
                        price: p.price
                    }))
                )
            }
        });

        // Reward customer with a new coupon if total order >= ₹5,000 (500,000 paise)
        if (totalAmount >= 500000) {
            await createNewCoupon(req.user._id);
        }

        res.status(200).json({ id: session.id, totalAmount: totalAmount / 100, url: session.url });
    } catch (error) {
        console.error("Error in createCheckoutSession controller:", error.message);
        res.status(500).json({ message: "Error processing checkout session", error: error.message });
    }
};

// Helper: Create a temporary Stripe coupon object
async function createStripeCoupon(discountPercentage) {
    const stripeCoupon = await stripe.coupons.create({
        percent_off: discountPercentage,
        duration: "once"
    });
    return stripeCoupon.id;
}

// @desc    Process successful payment & record Order in MongoDB
// @route   POST /api/payments/checkout-success
// @access  Private
export const checkoutSuccess = async (req, res) => {
    try {
        const { sessionId } = req.body;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === "paid") {
            // Deactivate used coupon if present
            if (session.metadata.couponCode) {
                await Coupon.findOneAndUpdate(
                    {
                        code: session.metadata.couponCode,
                        userId: session.metadata.userId
                    },
                    {
                        isActive: false
                    }
                );
            }

            // Create new Order document in MongoDB
            const products = JSON.parse(session.metadata.products);
            const newOrder = new Order({
                user: session.metadata.userId,
                products: products.map((p) => ({
                    product: p.id,
                    quantity: p.quantity,
                    price: p.price
                })),
                totalAmount: session.amount_total / 100, // convert paise to rupees
                stripeSessionId: sessionId
            });

            await newOrder.save();

            // Clear user cart in DB
            req.user.cartItems = [];
            await req.user.save();

            res.status(200).json({
                success: true,
                message: "Payment successful, order created, and cart cleared.",
                orderId: newOrder._id
            });
        } else {
            res.status(400).json({ message: "Payment incomplete or pending" });
        }
    } catch (error) {
        console.error("Error in checkoutSuccess controller:", error.message);
        res.status(500).json({ message: "Error processing successful checkout", error: error.message });
    }
};
