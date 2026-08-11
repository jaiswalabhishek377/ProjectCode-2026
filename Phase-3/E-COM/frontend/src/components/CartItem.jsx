import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
    const { removeFromCart, updateQuantity } = useCartStore();

    return (
        <div className="surface-card p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-between">
            
            {/* Product Image & Info */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
                <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 rounded-xl object-cover bg-[#000000] border border-[#27272a] shrink-0"
                />
                <div className="space-y-1 flex-grow">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        {item.category}
                    </span>
                    <h3 className="font-heading font-bold text-sm text-white line-clamp-1">
                        {item.name}
                    </h3>
                    <p className="text-xs text-zinc-400">
                        ₹{item.price} per unit
                    </p>
                </div>
            </div>

            {/* Quantity Adjuster & Item Subtotal */}
            <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#27272a]">
                
                {/* Quantity Controls */}
                <div className="flex items-center gap-2 bg-[#000000] border border-[#27272a] rounded-xl p-1">
                    <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg bg-[#0e0e11] hover:bg-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
                        title="Decrease quantity"
                    >
                        <Minus className="w-3.5 h-3.5" />
                    </button>
                    
                    <span className="w-8 text-center text-xs font-bold text-white">
                        {item.quantity}
                    </span>

                    <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg bg-[#0e0e11] hover:bg-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
                        title="Increase quantity"
                    >
                        <Plus className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* Total Price for this item */}
                <div className="text-right min-w-[80px]">
                    <span className="text-sm font-extrabold text-white">
                        ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                </div>

                {/* Remove Item Button */}
                <button
                    onClick={() => removeFromCart(item._id)}
                    className="p-2 rounded-xl text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    title="Remove item from cart"
                >
                    <Trash2 className="w-4 h-4" />
                </button>

            </div>

        </div>
    );
};

export default CartItem;
