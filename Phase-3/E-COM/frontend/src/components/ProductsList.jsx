import React, { useEffect } from "react";
import { Star, Trash2, Package } from "lucide-react";
import { motion } from "framer-motion";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
    const { products, fetchAllProducts, deleteProduct, toggleFeaturedProduct, loading } = useProductStore();

    useEffect(() => {
        fetchAllProducts();
    }, [fetchAllProducts]);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="surface-card p-6 sm:p-8 space-y-6"
        >
            <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
                <div>
                    <h3 className="font-heading font-black text-xl text-white tracking-tight flex items-center gap-2">
                        <Package className="w-5 h-5 text-white" />
                        <span>Inventory Products ({products.length})</span>
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                        Manage products, feature items on storefront, and remove inventory
                    </p>
                </div>
            </div>

            {loading && products.length === 0 ? (
                <div className="text-center py-12 text-zinc-500 text-xs font-bold animate-pulse">
                    Loading Product Inventory...
                </div>
            ) : products.length === 0 ? (
                <div className="text-center py-12 space-y-2">
                    <p className="text-sm font-bold text-white">No Products in Database</p>
                    <p className="text-xs text-zinc-400">Use the "Create Product" tab to add items to MongoDB.</p>
                </div>
            ) : (
                /* Products Table */
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-[#27272a] text-zinc-400 font-bold uppercase tracking-wider">
                                <th className="py-3 px-4">Product</th>
                                <th className="py-3 px-4">Category</th>
                                <th className="py-3 px-4">Price (₹)</th>
                                <th className="py-3 px-4 text-center">Featured</th>
                                <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#27272a]">
                            {products.map((product) => (
                                <tr key={product._id} className="hover:bg-zinc-900/50 transition-colors">
                                    {/* Product Image & Name */}
                                    <td className="py-3 px-4 flex items-center gap-3">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-10 h-10 rounded-lg object-cover bg-black border border-zinc-800 shrink-0"
                                        />
                                        <span className="font-bold text-white max-w-[200px] truncate">
                                            {product.name}
                                        </span>
                                    </td>

                                    {/* Category */}
                                    <td className="py-3 px-4 text-zinc-300 font-medium capitalize">
                                        {product.category}
                                    </td>

                                    {/* Price */}
                                    <td className="py-3 px-4 font-extrabold text-white">
                                        ₹{product.price}
                                    </td>

                                    {/* Toggle Featured Star */}
                                    <td className="py-3 px-4 text-center">
                                        <button
                                            onClick={() => toggleFeaturedProduct(product._id)}
                                            className={`p-2 rounded-lg transition-colors cursor-pointer ${
                                                product.isFeatured
                                                    ? "bg-amber-400/10 text-amber-400 border border-amber-400/30"
                                                    : "bg-zinc-900 text-zinc-600 border border-zinc-800 hover:text-white"
                                            }`}
                                            title={product.isFeatured ? "Unfeature product" : "Feature product on Storefront"}
                                        >
                                            <Star className={`w-4 h-4 ${product.isFeatured ? "fill-amber-400" : ""}`} />
                                        </button>
                                    </td>

                                    {/* Delete Button */}
                                    <td className="py-3 px-4 text-right">
                                        <button
                                            onClick={() => deleteProduct(product._id)}
                                            className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
                                            title="Delete product"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </motion.div>
    );
};

export default ProductsList;
