import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, PackageX } from "lucide-react";
import { motion } from "framer-motion";
import { useProductStore } from "../stores/useProductStore";

import ProductCard from "../components/ProductCard";
import ProductDetailModal from "../components/ProductDetailModal";

const CategoryPage = () => {
    const { category } = useParams();
    const { products, fetchProductsByCategory, loading } = useProductStore();
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        if (category) {
            fetchProductsByCategory(category);
        }
    }, [category, fetchProductsByCategory]);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-8 py-4"
        >
            {/* Header & Breadcrumb */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272a] pb-6">
                <div>
                    <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-zinc-300 font-bold hover:underline mb-2">
                        <ArrowLeft className="w-3.5 h-3.5 text-white" />
                        <span>Back to Storefront</span>
                    </Link>
                    <h1 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight capitalize">
                        {category} <span className="text-gradient-accent">Collection</span>
                    </h1>
                    <p className="text-xs text-zinc-400 mt-1">
                        Explore our curated selection of {category} products
                    </p>
                </div>
            </div>

            {/* Loading Grid State */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="surface-card h-80 animate-pulse bg-zinc-900/50" />
                    ))}
                </div>
            ) : products.length === 0 ? (
                /* Empty Category View */
                <div className="surface-card p-12 text-center space-y-4 max-w-md mx-auto">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center mx-auto text-white">
                        <PackageX className="w-8 h-8" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-white">No Products Found</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                        We haven't added items to the <strong className="text-white capitalize">{category}</strong> category yet. Check back soon or explore other collections!
                    </p>
                    <Link to="/" className="inline-flex px-6 py-2.5 btn-primary text-xs font-bold mt-2">
                        <span className="text-black">Browse All Collections</span>
                    </Link>
                </div>
            ) : (
                /* Products Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((prod) => (
                        <ProductCard 
                            key={prod._id} 
                            product={prod} 
                            onOpenModal={(product) => setSelectedProduct(product)} 
                        />
                    ))}
                </div>
            )}

            {/* Product Detail Modal */}
            {selectedProduct && (
                <ProductDetailModal 
                    product={selectedProduct} 
                    onClose={() => setSelectedProduct(null)} 
                />
            )}
        </motion.div>
    );
};

export default CategoryPage;
