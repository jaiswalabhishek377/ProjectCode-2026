import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
    ShoppingCart, 
    User, 
    LogOut, 
    ShieldCheck, 
    ShoppingBag, 
    Search,
    Heart,
    Menu, 
    X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";

const Navbar = ({ cartCount = 0 }) => {
    const { user, logout } = useUserStore();
    const isAdmin = user?.role === "admin";
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-[#080b11]/95 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 gap-4 sm:gap-8">
                    
                    {/* Brand Logo */}
                    <Link to="/" className="flex items-center gap-3 shrink-0 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-900 via-blue-800 to-indigo-900 border border-blue-500/30 flex items-center justify-center text-blue-300 shadow-md">
                            <ShoppingBag className="w-5 h-5" />
                        </div>
                        <span className="font-heading font-black text-2xl tracking-wider text-white">
                            NEXUS
                        </span>
                    </Link>

                    {/* Search Bar (Desktop) */}
                    <form 
                        onSubmit={handleSearchSubmit} 
                        className="hidden md:flex flex-1 max-w-md relative"
                    >
                        <input 
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products, sneakers, watches..."
                            className="w-full pl-10 pr-4 py-2.5 input-minimal text-xs font-medium placeholder-gray-400"
                        />
                        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </form>

                    {/* Category Links (Desktop) */}
                    <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold text-gray-300">
                        <Link to="/" className="hover:text-white transition-colors">
                            All Products
                        </Link>
                        <Link to="/category/tech" className="hover:text-white transition-colors">
                            Tech & Audio
                        </Link>
                        <Link to="/category/footwear" className="hover:text-white transition-colors">
                            Footwear
                        </Link>
                        <Link to="/category/watches" className="hover:text-white transition-colors">
                            Watches
                        </Link>
                    </nav>

                    {/* Actions (Desktop) */}
                    <div className="hidden md:flex items-center gap-4 shrink-0">
                        
                        {/* Wishlist */}
                        <button 
                            className="p-2.5 rounded-xl bg-[#0f1523] border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all"
                            title="Wishlist"
                        >
                            <Heart className="w-4 h-4" />
                        </button>

                        {/* Cart */}
                        <Link 
                            to="/cart" 
                            className="relative p-2.5 rounded-xl bg-[#0f1523] border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all group"
                            title="Shopping Cart"
                        >
                            <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform text-blue-400" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-blue-700 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Admin Hub Link */}
                        {isAdmin && (
                            <Link 
                                to="/secret-dashboard"
                                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-900/30 border border-blue-500/30 text-blue-300 hover:bg-blue-900/50 text-xs font-bold transition-all"
                            >
                                <ShieldCheck className="w-4 h-4" />
                                <span>ADMIN HUB</span>
                            </Link>
                        )}

                        {/* User Profile / Auth */}
                        {user ? (
                            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0f1523] border border-white/10">
                                    <User className="w-3.5 h-3.5 text-blue-400" />
                                    <span className="text-xs font-bold text-white max-w-[100px] truncate">
                                        {user.name}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 transition-all"
                                    title="Logout"
                                >
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link 
                                    to="/login"
                                    className="px-4 py-2 text-xs font-semibold btn-secondary"
                                >
                                    Log In
                                </Link>
                                <Link 
                                    to="/signup"
                                    className="px-4 py-2 text-xs font-semibold btn-primary"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}

                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <Link to="/cart" className="relative p-2 text-gray-300">
                            <ShoppingCart className="w-5 h-5 text-blue-400" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 bg-blue-700 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-xl bg-[#0f1523] border border-white/10 text-gray-300"
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#080b11] border-b border-white/10 px-4 pt-3 pb-6 flex flex-col gap-4"
                    >
                        <form onSubmit={handleSearchSubmit} className="relative">
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products..."
                                className="w-full pl-10 pr-4 py-2 rounded-xl input-minimal text-xs"
                            />
                            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </form>

                        <div className="flex flex-col gap-3 font-semibold text-sm text-gray-300">
                            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>All Products</Link>
                            <Link to="/category/tech" onClick={() => setIsMobileMenuOpen(false)}>Tech & Audio</Link>
                            <Link to="/category/footwear" onClick={() => setIsMobileMenuOpen(false)}>Footwear</Link>
                            <Link to="/category/watches" onClick={() => setIsMobileMenuOpen(false)}>Watches</Link>
                            {isAdmin && (
                                <Link to="/secret-dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-blue-400 font-bold">
                                    Admin Hub Dashboard
                                </Link>
                            )}
                        </div>

                        {user ? (
                            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                                <span className="text-xs font-bold text-white">{user.name}</span>
                                <button onClick={handleLogout} className="text-xs font-bold text-rose-400">Logout</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-center rounded-xl btn-secondary text-xs">Log In</Link>
                                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-center rounded-xl btn-primary text-xs">Sign Up</Link>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
