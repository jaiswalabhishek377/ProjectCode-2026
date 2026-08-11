import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
    Mail, 
    Lock, 
    Eye, 
    EyeOff, 
    LogIn, 
    Loader, 
    ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";
import { toast } from "react-hot-toast";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const { login, loading } = useUserStore();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            return toast.error("Please enter both email and password!");
        }

        await login(formData.email, formData.password);
    };

    return (
        <div className="w-full flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
            <motion.div 
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="w-full max-w-md space-y-6"
            >
                {/* Header Title */}
                <div className="text-center space-y-2">
                    <h2 className="font-heading font-black text-3xl text-white tracking-tight">
                        Welcome Back to <span className="text-gradient-accent">NEXUS</span>
                    </h2>
                    <p className="text-xs text-zinc-400">
                        Enter your credentials to access your account & order history.
                    </p>
                </div>

                {/* Monochromatic Form Card */}
                <div className="surface-card p-8 space-y-5">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                        {/* Email Address */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full pl-10 pr-4 py-3 input-minimal text-xs font-medium"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    className="w-full pl-10 pr-10 py-3 input-minimal text-xs font-medium"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 btn-primary font-bold text-sm flex items-center justify-center gap-2 mt-2 disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <Loader className="w-4 h-4 animate-spin text-black" />
                                    <span className="text-black">Logging In...</span>
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-4 h-4 text-black" />
                                    <span className="text-black">Log In</span>
                                </>
                            )}
                        </button>

                    </form>

                    {/* Footer link */}
                    <div className="pt-4 border-t border-[#27272a] text-center">
                        <p className="text-xs text-zinc-400">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-white font-bold hover:underline inline-flex items-center gap-1">
                                <span>Sign Up</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </p>
                    </div>
                </div>

            </motion.div>
        </div>
    );
};

export default LoginPage;
