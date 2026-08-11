import React from "react";
import { Plus, Minus, Star } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product, onOpenModal }) => {
    const { cart, addToCart, updateQuantity } = useCartStore();

    // Check if product is already in the user's cart
    const cartItem = cart.find((item) => item._id === product._id);
    const quantityInCart = cartItem ? cartItem.quantity : 0;

    return (
        <div className="surface-card overflow-hidden flex flex-col group">
            
            {/* Product Image */}
            <div 
                onClick={() => onOpenModal && onOpenModal(product)} 
                className="relative h-56 overflow-hidden bg-[#000000] cursor-pointer"
            >
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Featured Badge */}
                {product.isFeatured && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white text-black text-[10px] font-black tracking-wider uppercase shadow-md">
                        FEATURED
                    </span>
                )}
            </div>

            {/* Product Info & Controls */}
            <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        {product.category}
                    </span>
                    <h3 
                        onClick={() => onOpenModal && onOpenModal(product)}
                        className="font-heading font-bold text-sm text-white line-clamp-1 hover:underline cursor-pointer"
                    >
                        {product.name}
                    </h3>
                    
                    {/* Rating display */}
                    <div className="flex items-center gap-1.5 pt-1">
                        <div className="flex items-center text-amber-400">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span className="text-xs font-bold ml-1 text-zinc-200">{product.rating || 4.8}</span>
                        </div>
                        <span className="text-[11px] text-zinc-500">({product.reviewsCount || 24} reviews)</span>
                    </div>
                </div>

                {/* Price & In-Card Quantity Adjuster */}
                <div className="pt-3 border-t border-[#27272a] flex items-center justify-between gap-2">
                    <div>
                        <span className="text-base font-extrabold text-white">₹{product.price}</span>
                    </div>

                    {/* Inline Quantity Controls (`+` or `- cnt +`) */}
                    {quantityInCart === 0 ? (
                        /* Default State: Single '+' Button */
                        <button 
                            onClick={() => addToCart(product)}
                            className="w-9 h-9 rounded-xl btn-primary flex items-center justify-center cursor-pointer shadow-md hover:scale-105 transition-transform"
                            title="Add to Cart"
                        >
                            <Plus className="w-4 h-4 text-black font-bold" />
                        </button>
                    ) : (
                        /* Active Cart State: Inline '- cnt +' Controls */
                        <div className="flex items-center gap-1.5 bg-[#000000] border border-[#27272a] rounded-xl p-1">
                            <button
                                onClick={() => updateQuantity(product._id, quantityInCart - 1)}
                                className="w-7 h-7 rounded-lg bg-[#18181b] hover:bg-zinc-800 flex items-center justify-center text-white transition-colors cursor-pointer"
                                title="Decrease quantity"
                            >
                                <Minus className="w-3.5 h-3.5" />
                            </button>
                            
                            <span className="w-6 text-center text-xs font-extrabold text-white">
                                {quantityInCart}
                            </span>

                            <button
                                onClick={() => updateQuantity(product._id, quantityInCart + 1)}
                                className="w-7 h-7 rounded-lg bg-[#18181b] hover:bg-zinc-800 flex items-center justify-center text-white transition-colors cursor-pointer"
                                title="Increase quantity"
                            >
                                <Plus className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default ProductCard;
