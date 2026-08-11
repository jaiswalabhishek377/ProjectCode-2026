import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, ShoppingBag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";

import CartItem from "../components/CartItem";
import GiftCouponCard from "../components/GiftCouponCard";
import OrderSummary from "../components/OrderSummary";

const CartPage = () => {
    const { cart, getCartItems, loading } = useCartStore();
    const navigate = useNavigate();

    useEffect(() => {
        getCartItems();
    }, [getCartItems]);

    const handleCheckout = () => {
        // Proceed to Checkout session (Stripe Integration in Section 13)
        navigate("/checkout");
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
            <div className="border-b border-white/10 pb-6 flex items-center justify-between">
                <div>
                    <h1 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
                        Shopping <span className="text-gradient-blue">Bag</span>
                    </h1>
                    <p className="text-xs text-gray-400 mt-1">
                        Review your items, apply promotional discounts, and proceed to checkout
                    </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-bold">
                    <ShoppingCart className="w-4 h-4" />
                    <span>{cart.reduce((sum, item) => sum + item.quantity, 0)} Items in Cart</span>
                </div>
            </div>

            {/* Empty Cart View */}
            {cart.length === 0 && !loading ? (
                <div className="surface-card p-12 text-center space-y-5 max-w-md mx-auto my-8">
                    <div className="w-16 h-16 rounded-2xl bg-blue-900/20 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400">
                        <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-heading font-bold text-xl text-white">Your Shopping Cart is Empty</h3>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            Looks like you haven't added any items to your shopping bag yet. Explore our luxury collections!
                        </p>
                    </div>
                    <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 btn-primary text-xs font-bold">
                        <span>Start Shopping</span>
                        <ArrowRight className="w-4 h-4" />
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
                        <OrderSummary onCheckout={handleCheckout} />
                    </div>

                </div>
            )}
        </motion.div>
    );
};

export default CartPage;
