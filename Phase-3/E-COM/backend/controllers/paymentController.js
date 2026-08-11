import Coupon from "../models/couponModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import { stripe } from "../lib/stripe.js";

// Global Store Promo Codes
const GLOBAL_COUPONS = {
    WELCOME10: 10,
    NEXUS10: 10,
    SAVE15: 15,
    SAVE20: 20
};

// Helper: Create a 10% discount reward coupon for purchases over ₹5,000
async function createNewCoupon(userId) {
    await Coupon.findOneAndDelete({ userId });

    const newCoupon = new Coupon({
        code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
        discountPercentage: 10,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        userId: userId
    });

    await newCoupon.save();
    return newCoupon;
}

// Helper: Create a temporary Stripe coupon object
async function createStripeCoupon(discountPercentage) {
    const stripeCoupon = await stripe.coupons.create({
        percent_off: discountPercentage,
        duration: "once"
    });
    return stripeCoupon.id;
}

// @desc    Create Stripe Checkout Session in INR (₹ Indian Rupees)
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

                const amount = Math.round(product.price * 100);
                totalAmount += amount * item.quantity;

                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: product.name,
                            images: product.image ? [product.image] : []
                        },
                        unit_amount: amount
                    },
                    quantity: item.quantity
                };
            })
        );

        // Apply Delivery Charge: Free shipping on orders >= ₹500 (50,000 paise), else ₹50 fee (5,000 paise)
        const SHIPPING_THRESHOLD = 50000;
        const SHIPPING_FEE = 5000;

        if (totalAmount < SHIPPING_THRESHOLD) {
            lineItems.push({
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: "Standard Shipping Fee",
                        description: "Free shipping on orders above ₹500"
                    },
                    unit_amount: SHIPPING_FEE
                },
                quantity: 1
            });
            totalAmount += SHIPPING_FEE;
        }

        let discountPercentage = 0;
        let activeCouponCode = null;

        if (couponCode) {
            const normalizedCode = couponCode.trim().toUpperCase();
            if (GLOBAL_COUPONS[normalizedCode]) {
                discountPercentage = GLOBAL_COUPONS[normalizedCode];
                activeCouponCode = normalizedCode;
            } else {
                const dbCoupon = await Coupon.findOne({
                    code: normalizedCode,
                    userId: req.user._id,
                    isActive: true
                });

                if (dbCoupon) {
                    discountPercentage = dbCoupon.discountPercentage;
                    activeCouponCode = dbCoupon.code;
                }
            }
        }

        // Prepare Stripe Session payload
        const stripeSessionData = {
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL || "http://localhost:5173"}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL || "http://localhost:5173"}/purchase-cancel`,
            metadata: {
                userId: req.user._id.toString(),
                couponCode: activeCouponCode || "",
                products: JSON.stringify(
                    products.map((p) => ({
                        id: p._id,
                        quantity: p.quantity,
                        price: p.price
                    }))
                )
            }
        };

        if (discountPercentage > 0) {
            const stripeCouponId = await createStripeCoupon(discountPercentage);
            stripeSessionData.discounts = [{ coupon: stripeCouponId }];
        }

        const session = await stripe.checkout.sessions.create(stripeSessionData);

        if (totalAmount >= 500000) {
            await createNewCoupon(req.user._id);
        }

        res.status(200).json({ id: session.id, totalAmount: totalAmount / 100, url: session.url });
    } catch (error) {
        console.error("Error in createCheckoutSession controller:", error.message);
        res.status(500).json({ message: "Error processing checkout session", error: error.message });
    }
};

// @desc    Process successful payment & record Order in MongoDB (Standard Flow)
// @route   POST /api/payments/checkout-success
// @access  Private
export const checkoutSuccess = async (req, res) => {
    try {
        const { sessionId } = req.body;

        if (!sessionId) {
            return res.status(400).json({ message: "Missing sessionId parameter" });
        }

        // 1. Standard Idempotency Check: Retrieve order if already processed
        let order = await Order.findOne({ stripeSessionId: sessionId });

        if (order) {
            return res.status(200).json({
                success: true,
                message: "Order already confirmed",
                orderId: order._id
            });
        }

        // 2. Retrieve payment session details from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === "paid") {
            // Deactivate used user-specific coupon if present
            if (session.metadata.couponCode && !GLOBAL_COUPONS[session.metadata.couponCode]) {
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

            // Parse product payload stored in Stripe session metadata
            const products = JSON.parse(session.metadata.products);

            // Create Order document in MongoDB
            order = await Order.create({
                user: session.metadata.userId,
                products: products.map((p) => ({
                    product: p.id,
                    quantity: p.quantity,
                    price: p.price
                })),
                totalAmount: session.amount_total / 100,
                stripeSessionId: sessionId,
                status: "processing"
            });

            // Clear user cart in MongoDB
            await User.findByIdAndUpdate(session.metadata.userId, { cartItems: [] });

            return res.status(200).json({
                success: true,
                message: "Payment successful, order created, and cart cleared.",
                orderId: order._id
            });
        } else {
            return res.status(400).json({ message: "Payment incomplete or pending" });
        }
    } catch (error) {
        console.error("Error in checkoutSuccess controller:", error.message);

        // Fallback check if order was created concurrently during execution
        if (req.body.sessionId) {
            const existingOrder = await Order.findOne({ stripeSessionId: req.body.sessionId });
            if (existingOrder) {
                return res.status(200).json({
                    success: true,
                    message: "Order confirmed",
                    orderId: existingOrder._id
                });
            }
        }

        res.status(500).json({ message: error.message || "Error processing checkout success" });
    }
};
