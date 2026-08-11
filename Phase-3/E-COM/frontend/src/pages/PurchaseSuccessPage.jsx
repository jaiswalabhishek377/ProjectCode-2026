import React, { useEffect, useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, ShoppingBag, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import axios from "../lib/axios";
import { useCartStore } from "../stores/useCartStore";

const PurchaseSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    
    const [isProcessing, setIsProcessing] = useState(true);
    const [orderId, setOrderId] = useState(null);
    const [error, setError] = useState(null);
    
    const { getCartItems } = useCartStore();
    const hasExecutedRef = useRef(false);

    useEffect(() => {
        const handleSuccess = async () => {
            if (!sessionId || hasExecutedRef.current) {
                return;
            }

            hasExecutedRef.current = true;

            try {
                // Fire celebratory confetti explosion
                confetti({
                    particleCount: 120,
                    spread: 80,
                    origin: { y: 0.6 }
                });

                const res = await axios.post("/payments/checkout-success", { sessionId });
                setOrderId(res.data.orderId);
                setIsProcessing(false);

                // Refresh cart state to reflect cleared cart
                getCartItems();
            } catch (err) {
                console.error("Payment confirmation error:", err);
                setError(err.response?.data?.message || "Failed to confirm order details");
                setIsProcessing(false);
            }
        };

        handleSuccess();
    }, [sessionId, getCartItems]);

    return (
        <div className="w-full flex items-center justify-center py-10 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-lg surface-card p-8 sm:p-10 text-center space-y-6 shadow-2xl"
            >
                {isProcessing ? (
                    <div className="space-y-4 py-8">
                        <Loader className="w-12 h-12 animate-spin text-white mx-auto" />
                        <h3 className="font-heading font-bold text-xl text-white">Confirming Your Order...</h3>
                        <p className="text-xs text-zinc-400">Verifying Stripe checkout session and generating receipt.</p>
                    </div>
                ) : error ? (
                    <div className="space-y-4 py-4">
                        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
                            <ShoppingBag className="w-8 h-8" />
                        </div>
                        <h3 className="font-heading font-bold text-xl text-white">Order Processing Note</h3>
                        <p className="text-xs text-zinc-400">{error}</p>
                        <Link to="/" className="inline-flex px-6 py-3 btn-primary text-xs font-bold mt-2">
                            <span className="text-black">Return to Storefront</span>
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Success Icon */}
                        <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center mx-auto shadow-xl">
                            <CheckCircle2 className="w-10 h-10 text-white" />
                        </div>

                        {/* Title & Order ID */}
                        <div className="space-y-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                PAYMENT VERIFIED & COMPLETE
                            </span>
                            <h2 className="font-heading font-black text-3xl text-white tracking-tight">
                                Thank You for Your Order!
                            </h2>
                            {orderId && (
                                <p className="text-xs font-mono text-zinc-300 bg-[#000000] border border-[#27272a] px-3 py-1.5 rounded-lg inline-block">
                                    Order ID: #{orderId}
                                </p>
                            )}
                        </div>

                        <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
                            We have received your payment and your order is now being processed. Track your live delivery status in <strong>My Orders</strong>.
                        </p>

                        {/* Return Action CTA */}
                        <div className="pt-4 border-t border-[#27272a] flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Link
                                to="/orders"
                                className="w-full py-3.5 btn-primary text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <span className="text-black font-extrabold">Track Order Status</span>
                                <ArrowRight className="w-4 h-4 text-black" />
                            </Link>
                            <Link
                                to="/"
                                className="w-full py-3.5 btn-secondary text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <span>Continue Shopping</span>
                            </Link>
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default PurchaseSuccessPage;
