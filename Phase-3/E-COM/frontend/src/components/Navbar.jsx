import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
    ShoppingCart, 
    User, 
    LogOut, 
    ShieldCheck, 
    ShoppingBag
} from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
    const { user, logout } = useUserStore();
    const { cart, getCartItems } = useCartStore();
    const isAdmin = user?.role === "admin";
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            getCartItems();
        }
    }, [user, getCartItems]);

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <header className="sticky top-0 z-50 bg-[#000000]/95 backdrop-blur-md border-b border-[#27272a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    
                    {/* Brand Logo */}
                    <Link to="/" className="flex items-center gap-3 shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-bold shadow-md">
                            <ShoppingBag className="w-5 h-5 text-black" />
                        </div>
                        <span className="font-heading font-black text-2xl tracking-wider text-white">
                            NEXUS
                        </span>
                    </Link>

                    {/* Category Links */}
                    <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-wider uppercase text-zinc-400">
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
                        <Link to="/category/apparel" className="hover:text-white transition-colors">
                            Apparel
                        </Link>
                    </nav>

                    {/* Right User Actions */}
                    <div className="flex items-center gap-4">
                        
                        {/* Cart Link */}
                        <Link 
                            to="/cart" 
                            className="relative p-2.5 rounded-xl bg-[#0e0e11] border border-[#27272a] text-zinc-300 hover:text-white transition-all"
                            title="Shopping Cart"
                        >
                            <ShoppingCart className="w-4 h-4 text-white" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-white text-black font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Admin Hub Link */}
                        {isAdmin && (
                            <Link 
                                to="/secret-dashboard"
                                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 hover:bg-zinc-800 text-xs font-bold transition-all"
                            >
                                <ShieldCheck className="w-4 h-4 text-white" />
                                <span>ADMIN HUB</span>
                            </Link>
                        )}

                        {/* User Session Profile / Auth Buttons */}
                        {user ? (
                            <div className="flex items-center gap-2 pl-2 border-l border-[#27272a]">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0e0e11] border border-[#27272a]">
                                    <User className="w-3.5 h-3.5 text-zinc-300" />
                                    <span className="text-xs font-bold text-white max-w-[120px] truncate">
                                        {user.name}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer"
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

                </div>
            </div>
        </header>
    );
};

export default Navbar;
