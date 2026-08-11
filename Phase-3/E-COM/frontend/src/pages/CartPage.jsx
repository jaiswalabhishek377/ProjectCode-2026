import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const CartPage = () => {
    return (
        <div className="py-12 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-amber-400">
                <ShoppingCart className="w-8 h-8" />
            </div>
            <h2 className="font-heading text-3xl font-extrabold text-white">Your Shopping Cart</h2>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
                Shopping Cart items, quantity controls, and Stripe coupon checkout will be built in Section 12!
            </p>
            <Link to="/" className="inline-flex px-6 py-2.5 rounded-xl btn-primary text-xs font-bold">
                Continue Shopping
            </Link>
        </div>
    );
};

export default CartPage;
