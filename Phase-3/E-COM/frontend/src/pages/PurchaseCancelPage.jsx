import React from "react";
import { Link } from "react-router-dom";
import { XCircle, ShoppingCart, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const PurchaseCancelPage = () => {
    return (
        <div className="w-full flex items-center justify-center py-12 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-lg surface-card p-8 sm:p-10 text-center space-y-6 shadow-2xl"
            >
                {/* Cancel Icon */}
                <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-400 flex items-center justify-center mx-auto shadow-xl">
                    <XCircle className="w-10 h-10 text-white" />
                </div>

                {/* Title & Message */}
                <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                        CHECKOUT CANCELLED
                    </span>
                    <h2 className="font-heading font-black text-3xl text-white tracking-tight">
                        Order Was Not Completed
                    </h2>
                    <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
                        No charges were made to your account. Your cart items remain saved so you can complete your order whenever you're ready.
                    </p>
                </div>

                {/* Return Action Buttons */}
                <div className="pt-4 border-t border-[#27272a] flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        to="/cart"
                        className="w-full py-3.5 btn-primary text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <ShoppingCart className="w-4 h-4 text-black" />
                        <span className="text-black">Return to Shopping Cart</span>
                    </Link>
                    <Link
                        to="/"
                        className="w-full py-3.5 btn-secondary text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4 text-white" />
                        <span>Return to Storefront</span>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default PurchaseCancelPage;
