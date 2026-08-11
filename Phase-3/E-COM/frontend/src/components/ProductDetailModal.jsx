import React from "react";
import { X, Plus, Minus, Star, ShoppingCart, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";

const ProductDetailModal = ({ product, onClose }) => {
    const { cart, addToCart, updateQuantity } = useCartStore();

    if (!product) return null;

    const cartItem = cart.find((item) => item._id === product._id);
    const quantityInCart = cartItem ? cartItem.quantity : 0;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                
                {/* Backdrop Click Handler */}
                <div className="absolute inset-0" onClick={onClose} />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full max-w-2xl surface-card p-6 sm:p-8 overflow-hidden z-10 space-y-6 shadow-2xl"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        title="Close details"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                        
                        {/* Product Image Column */}
                        <div className="sm:col-span-5 relative">
                            <div className="rounded-2xl overflow-hidden bg-[#000000] border border-[#27272a] h-64 sm:h-72">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Product Details Column */}
                        <div className="sm:col-span-7 space-y-4">
                            
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                    {product.category}
                                </span>
                                <h2 className="font-heading font-black text-xl text-white tracking-tight leading-snug">
                                    {product.name}
                                </h2>
                                <div className="flex items-center gap-2 pt-1">
                                    <div className="flex items-center text-amber-400">
                                        <Star className="w-4 h-4 fill-amber-400" />
                                        <span className="text-xs font-bold ml-1 text-white">{product.rating || 4.8}</span>
                                    </div>
                                    <span className="text-xs text-zinc-500">({product.reviewsCount || 34} customer reviews)</span>
                                </div>
                            </div>

                            {/* Price & In-Stock Status */}
                            <div className="flex items-center justify-between py-2 border-y border-[#27272a]">
                                <span className="text-2xl font-black text-white">${product.price}</span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-emerald-400 text-xs font-bold">
                                    <CheckCircle className="w-3.5 h-3.5" />
                                    <span>In Stock</span>
                                </span>
                            </div>

                            {/* Full Description */}
                            <div className="space-y-1">
                                <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                                    Product Description
                                </h4>
                                <p className="text-xs text-zinc-400 leading-relaxed max-h-32 overflow-y-auto pr-1">
                                    {product.description || "High-performance engineering with premium materials and uncompromised build quality."}
                                </p>
                            </div>

                            {/* Actions / Quantity Controls */}
                            <div className="pt-3">
                                {quantityInCart === 0 ? (
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="w-full py-3.5 btn-primary font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                                    >
                                        <Plus className="w-4 h-4 text-black" />
                                        <span className="text-black">Add to Shopping Cart</span>
                                    </button>
                                ) : (
                                    <div className="flex items-center justify-between p-2 rounded-xl bg-[#000000] border border-[#27272a]">
                                        <span className="text-xs font-bold text-zinc-300 pl-2">Quantity in Cart:</span>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => updateQuantity(product._id, quantityInCart - 1)}
                                                className="w-8 h-8 rounded-lg bg-[#18181b] hover:bg-zinc-800 flex items-center justify-center text-white cursor-pointer"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-6 text-center text-sm font-black text-white">
                                                {quantityInCart}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(product._id, quantityInCart + 1)}
                                                className="w-8 h-8 rounded-lg bg-[#18181b] hover:bg-zinc-800 flex items-center justify-center text-white cursor-pointer"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>

                    </div>

                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ProductDetailModal;
