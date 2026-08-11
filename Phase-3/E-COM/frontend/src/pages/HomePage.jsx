import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { 
    ArrowRight, 
    Star, 
    ShoppingCart, 
    Flame
} from "lucide-react";
import { motion } from "framer-motion";

const CATEGORIES = [
    {
        id: "tech",
        name: "Tech & Audio",
        count: "24 Items",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
        description: "Studio-grade acoustics & smart devices"
    },
    {
        id: "footwear",
        name: "Footwear",
        count: "18 Items",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
        description: "Performance sneakers & limited drops"
    },
    {
        id: "watches",
        name: "Luxury Timepieces",
        count: "12 Items",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
        description: "Precision chronographs & automatics"
    },
    {
        id: "apparel",
        name: "Streetwear Apparel",
        count: "30 Items",
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
        description: "Heavyweight hoodies & essential tees"
    },
];

const FEATURED_PRODUCTS = [
    {
        id: "prod-1",
        name: "NEXUS Pro Noise-Canceling Headphones",
        category: "Tech & Audio",
        price: 299.99,
        originalPrice: 349.99,
        rating: 4.9,
        reviews: 128,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80",
        tag: "BEST SELLER"
    },
    {
        id: "prod-2",
        name: "Chronograph Gold Edition Watch",
        category: "Watches",
        price: 450.00,
        originalPrice: 520.00,
        rating: 5.0,
        reviews: 94,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80",
        tag: "FEATURED"
    },
    {
        id: "prod-3",
        name: "AeroGlide Stealth Carbon Sneakers",
        category: "Footwear",
        price: 185.00,
        originalPrice: 210.00,
        rating: 4.8,
        reviews: 210,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80",
        tag: "HOT"
    },
    {
        id: "prod-4",
        name: "Heavyweight Oversized Streetwear Hoodie",
        category: "Apparel",
        price: 95.00,
        originalPrice: 120.00,
        rating: 4.9,
        reviews: 165,
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=80",
        tag: "NEW"
    },
];

const HomePage = () => {
    const handleAddToCart = (productName) => {
        toast.success(`Added ${productName} to cart!`);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-20 py-4"
        >
            
            {/* 1. Hero Showcase Banner */}
            <section className="relative rounded-3xl bg-[#0f1523] p-8 sm:p-14 overflow-hidden border border-white/10 shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
                    
                    {/* Left Hero Content */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-300 text-xs font-bold tracking-widest uppercase">
                            <Flame className="w-3.5 h-3.5 fill-blue-400" />
                            <span>2026 MERCHANDISE DROPS</span>
                        </div>

                        <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight leading-[1.1]">
                            CURATED LUXURY <br />
                            <span className="text-gradient-blue">MERCHANDISE</span>
                        </h1>

                        <p className="text-gray-400 text-sm sm:text-base max-w-xl leading-relaxed">
                            Explore high-performance wireless acoustics, limited footwear, precision chronographs, and streetwear apparel engineered for uncompromised quality.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <a 
                                href="#categories" 
                                className="px-7 py-3.5 btn-primary text-sm font-bold flex items-center gap-2"
                            >
                                <span>Shop Collections</span>
                                <ArrowRight className="w-4 h-4" />
                            </a>
                            <a 
                                href="#bestsellers" 
                                className="px-7 py-3.5 btn-secondary text-sm font-bold"
                            >
                                View Best Sellers
                            </a>
                        </div>
                    </div>

                    {/* Right Product Highlight Card */}
                    <div className="lg:col-span-5 relative">
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group bg-[#090e18]">
                            <img 
                                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80" 
                                alt="Hero Highlight Product"
                                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0f1523]/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                                <div>
                                    <span className="text-[10px] font-bold uppercase text-blue-400 tracking-wider">Spotlight Drop</span>
                                    <h4 className="text-sm font-bold text-white">NEXUS ANC Pro Headphones</h4>
                                </div>
                                <span className="text-sm font-extrabold text-blue-400">$299.99</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* 2. Category Grid Section */}
            <section id="categories" className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/10 pb-4">
                    <div>
                        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                            Shop by <span className="text-gradient-blue">Category</span>
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">Browse our top merchandise categories</p>
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
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1523] via-transparent to-transparent" />
                                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#080b11]/80 backdrop-blur-md text-[10px] font-bold text-blue-400 border border-white/10">
                                    {cat.count}
                                </span>
                            </div>
                            <div className="p-5 flex-grow flex flex-col justify-between">
                                <div>
                                    <h3 className="font-heading font-bold text-base text-white group-hover:text-blue-400 transition-colors">
                                        {cat.name}
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {cat.description}
                                    </p>
                                </div>
                                <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1 text-xs font-bold text-blue-400 group-hover:translate-x-1 transition-transform">
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
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/10 pb-4">
                    <div>
                        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                            Trending <span className="text-gradient-blue">Best Sellers</span>
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">Handpicked favorites backed by customer reviews</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FEATURED_PRODUCTS.map((prod) => (
                        <div 
                            key={prod.id} 
                            className="surface-card overflow-hidden flex flex-col"
                        >
                            <div className="relative h-56 overflow-hidden bg-[#090e18]">
                                <img 
                                    src={prod.image} 
                                    alt={prod.name} 
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-blue-900/90 border border-blue-500/40 text-blue-200 text-[10px] font-extrabold tracking-wider uppercase">
                                    {prod.tag}
                                </span>
                            </div>

                            <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                                <div className="space-y-1.5">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        {prod.category}
                                    </span>
                                    <h3 className="font-heading font-bold text-sm text-white line-clamp-1">
                                        {prod.name}
                                    </h3>
                                    <div className="flex items-center gap-1.5 pt-1">
                                        <div className="flex items-center text-amber-400">
                                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                                            <span className="text-xs font-bold ml-1 text-gray-200">{prod.rating}</span>
                                        </div>
                                        <span className="text-[11px] text-gray-500">({prod.reviews} reviews)</span>
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                                    <div>
                                        <span className="text-base font-extrabold text-white">${prod.price}</span>
                                        <span className="text-xs text-gray-500 line-through ml-2">${prod.originalPrice}</span>
                                    </div>
                                    <button 
                                        onClick={() => handleAddToCart(prod.name)}
                                        className="p-2.5 btn-primary flex items-center justify-center cursor-pointer"
                                        title="Add to Cart"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </motion.div>
    );
};

export default HomePage;
