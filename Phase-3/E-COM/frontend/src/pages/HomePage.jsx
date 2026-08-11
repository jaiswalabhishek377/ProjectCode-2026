import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, PackageX } from "lucide-react";
import { motion } from "framer-motion";
import { useProductStore } from "../stores/useProductStore";

import HeroCarousel from "../components/HeroCarousel";
import ProductCard from "../components/ProductCard";
import ProductDetailModal from "../components/ProductDetailModal";
import boatwatch from "../assets/boatwatch.jpg"
import noiseheadphone from "../assets/noisehead.jpg"
import airjordan1 from "../assets/airjordan1.jpg"

const CATEGORIES = [
    {
        id: "tech",
        name: "Tech & Audio",
        description: "Studio-grade acoustics & smart devices",
        image: noiseheadphone
    },
    {
        id: "footwear",
        name: "Footwear",
        description: "Performance sneakers & limited drops",
        image: airjordan1
    },
    {
        id: "watches",
        name: "Luxury Timepieces",
        description: "Precision chronographs & automatics",
        image: boatwatch
    },
    {
        id: "apparel",
        name: "Streetwear Apparel",
        description: "Heavyweight hoodies & essential tees",
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80"
    },
];

const HomePage = () => {
    const { featuredProducts, fetchFeaturedProducts, loading } = useProductStore();
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchFeaturedProducts();
    }, [fetchFeaturedProducts]);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-16 py-4"
        >
            
            {/* 1. Interactive Hero Product Carousel */}
            <section>
                <HeroCarousel />
            </section>

            {/* 2. Category Grid Section */}
            <section id="categories" className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#27272a] pb-4">
                    <div>
                        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                            Shop by <span className="text-gradient-accent">Category</span>
                        </h2>
                        <p className="text-xs text-zinc-400 mt-1">Browse our top merchandise categories</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {CATEGORIES.map((cat) => (
                        <Link 
                            key={cat.id} 
                            to={`/category/${cat.id}`}
                            className="group surface-card overflow-hidden flex flex-col"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img 
                                    src={cat.image} 
                                    alt={cat.name} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e11] via-transparent to-transparent" />
                            </div>
                            <div className="p-5 flex-grow flex flex-col justify-between">
                                <div>
                                    <h3 className="font-heading font-bold text-base text-white group-hover:text-zinc-300 transition-colors">
                                        {cat.name}
                                    </h3>
                                    <p className="text-xs text-zinc-400 mt-1">
                                        {cat.description}
                                    </p>
                                </div>
                                <div className="mt-4 pt-3 border-t border-[#27272a] flex items-center gap-1 text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
                                    <span>Explore Collection</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 3. Featured Best Sellers Grid */}
            <section id="bestsellers" className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#27272a] pb-4">
                    <div>
                        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                            Trending <span className="text-gradient-accent">Products</span>
                        </h2>
                        <p className="text-xs text-zinc-400 mt-1">Real products fetched dynamically from MongoDB inventory</p>
                    </div>
                </div>

                {loading && featuredProducts.length === 0 ? (
                    /* Loading Skeleton */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="surface-card h-80 animate-pulse bg-zinc-900/50" />
                        ))}
                    </div>
                ) : featuredProducts.length === 0 ? (
                    /* Empty Real Products State */
                    <div className="surface-card p-12 text-center space-y-4 max-w-md mx-auto my-6">
                        <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center mx-auto text-white">
                            <PackageX className="w-8 h-8" />
                        </div>
                        <h3 className="font-heading font-bold text-xl text-white">No Products in Database Yet</h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                            Upload products using the <strong className="text-white">Admin Hub</strong> to display items live on the storefront!
                        </p>
                        <Link to="/secret-dashboard" className="inline-flex px-6 py-2.5 btn-primary text-xs font-bold mt-2">
                            <span className="text-black">Open Admin Hub</span>
                        </Link>
                    </div>
                ) : (
                    /* Real Products Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map((prod) => (
                            <ProductCard 
                                key={prod._id} 
                                product={prod} 
                                onOpenModal={(product) => setSelectedProduct(product)} 
                            />
                        ))}
                    </div>
                )}
            </section>

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

export default HomePage;
