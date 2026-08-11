import React from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const OrderSummary = ({ onCheckout }) => {
    const { subtotal, total, coupon, isCouponApplied } = useCartStore();

    // Free shipping threshold = $99
    const shipping = subtotal > 99 || subtotal === 0 ? 0 : 10;
    const finalTotal = total + shipping;
    const discountAmount = isCouponApplied && coupon ? (subtotal * coupon.discountPercentage) / 100 : 0;

    return (
        <div className="surface-card p-6 space-y-6">
            <h3 className="font-heading font-bold text-lg text-white border-b border-[#27272a] pb-4">
                Order Summary
            </h3>

            <div className="space-y-3 text-xs">
                
                {/* Subtotal */}
                <div className="flex items-center justify-between text-zinc-300">
                    <span>Original Price</span>
                    <span className="font-bold text-white">${subtotal.toFixed(2)}</span>
                </div>

                {/* Coupon Savings */}
                {isCouponApplied && coupon && (
                    <div className="flex items-center justify-between text-emerald-400 font-bold">
                        <span>Discount ({coupon.discountPercentage}%)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                )}

                {/* Estimated Shipping */}
                <div className="flex items-center justify-between text-zinc-300">
                    <span>Estimated Delivery</span>
                    {shipping === 0 ? (
                        <span className="font-bold text-emerald-400 uppercase">FREE</span>
                    ) : (
                        <span className="font-bold text-white">${shipping.toFixed(2)}</span>
                    )}
                </div>

                {/* Final Total */}
                <div className="pt-3 border-t border-[#27272a] flex items-center justify-between text-sm">
                    <span className="font-bold text-white">Total Amount</span>
                    <span className="font-extrabold text-lg text-white">${finalTotal.toFixed(2)}</span>
                </div>

            </div>

            {/* Checkout Action Button */}
            <button
                onClick={onCheckout}
                className="w-full py-3.5 btn-primary text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
                <span className="text-black font-extrabold">Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-black" />
            </button>

            {/* Security Guarantee Note */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>256-Bit Stripe Encrypted Payment</span>
            </div>
        </div>
    );
};

export default OrderSummary;
