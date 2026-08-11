import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, ShoppingBag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";

import CartItem from "../components/CartItem";
import GiftCouponCard from "../components/GiftCouponCard";
import OrderSummary from "../components/OrderSummary";

const CartPage = () => {
    const { cart, coupon, getCartItems, loading } = useCartStore();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    useEffect(() => {
        getCartItems();
    }, [getCartItems]);

    const handleCheckout = async () => {
        if (cart.length === 0) {
            return toast.error("Your shopping cart is empty!");
        }

        setIsCheckingOut(true);

        try {
            const res = await axios.post("/payments/create-checkout-session", {
                products: cart,
                couponCode: coupon ? coupon.code : null
            });

            if (res.data.url) {
                // Redirect directly to official Stripe Checkout page
                window.location.href = res.data.url;
            } else {
                toast.error("Failed to generate Stripe checkout session");
                setIsCheckingOut(false);
            }
        } catch (error) {
            console.error("Stripe Checkout Error:", error);
            toast.error(error.response?.data?.message || "Failed to initiate Stripe checkout");
            setIsCheckingOut(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-8 py-4"
        >
            {/* Cart Header */}
            <div className="border-b border-[#27272a] pb-6 flex items-center justify-between">
                <div>
                    <h1 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
                        Shopping <span className="text-gradient-accent">Bag</span>
                    </h1>
                    <p className="text-xs text-zinc-400 mt-1">
                        Review your items, apply promotional discounts, and proceed to checkout
                    </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-bold">
                    <ShoppingCart className="w-4 h-4 text-white" />
                    <span>{cart.reduce((sum, item) => sum + item.quantity, 0)} Items in Cart</span>
                </div>
            </div>

            {/* Empty Cart View */}
            {cart.length === 0 && !loading ? (
                <div className="surface-card p-12 text-center space-y-5 max-w-md mx-auto my-8">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center mx-auto text-white">
                        <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-heading font-bold text-xl text-white">Your Shopping Cart is Empty</h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                            Looks like you haven't added any items to your shopping bag yet. Explore our luxury collections!
                        </p>
                    </div>
                    <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 btn-primary text-xs font-bold">
                        <span className="text-black">Start Shopping</span>
                        <ArrowRight className="w-4 h-4 text-black" />
                    </Link>
                </div>
            ) : (
                /* Cart Items & Summary 2-Column Grid */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Items Column */}
                    <div className="lg:col-span-8 space-y-4">
                        {cart.map((item) => (
                            <CartItem key={item._id} item={item} />
                        ))}
                    </div>

                    {/* Right Summary Column */}
                    <div className="lg:col-span-4 space-y-6">
                        <GiftCouponCard />
                        <OrderSummary 
                            onCheckout={handleCheckout} 
                            isCheckingOut={isCheckingOut} 
                        />
                    </div>

                </div>
            )}
        </motion.div>
    );
};

export default CartPage;
