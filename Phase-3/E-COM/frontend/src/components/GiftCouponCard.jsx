import React, { useState } from "react";
import { Tag, Check, X } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const GiftCouponCard = () => {
    const [userCode, setUserCode] = useState("");
    const { coupon, isCouponApplied, applyCoupon, removeCoupon } = useCartStore();

    const handleApply = (e) => {
        e.preventDefault();
        if (userCode.trim()) {
            applyCoupon(userCode.trim());
            setUserCode("");
        }
    };

    return (
        <div className="surface-card p-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-300">
                <Tag className="w-4 h-4 text-white" />
                <span>Have a Coupon or Promo Code?</span>
            </div>

            {isCouponApplied && coupon ? (
                /* Active Coupon Badge */
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Code "{coupon.code}" Applied ({coupon.discountPercentage}% OFF)</span>
                    </div>
                    <button
                        onClick={removeCoupon}
                        className="p-1 rounded-lg hover:bg-emerald-500/20 text-emerald-400 transition-colors cursor-pointer"
                        title="Remove coupon"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                /* Coupon Input Form */
                <form onSubmit={handleApply} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={userCode}
                        onChange={(e) => setUserCode(e.target.value)}
                        placeholder="Enter coupon code (e.g. WELCOME10)"
                        className="w-full px-3.5 py-2.5 input-minimal text-xs font-medium uppercase placeholder:normal-case"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2.5 btn-primary text-xs font-bold shrink-0 cursor-pointer"
                    >
                        <span className="text-black">Apply</span>
                    </button>
                </form>
            )}
        </div>
    );
};

export default GiftCouponCard;
