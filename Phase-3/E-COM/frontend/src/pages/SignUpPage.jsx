import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
    User, 
    Mail, 
    Lock, 
    Eye, 
    EyeOff, 
    UserPlus, 
    Loader, 
    ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";
import { toast } from "react-hot-toast";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { signup, loading } = useUserStore();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            return toast.error("Please fill in all fields!");
        }

        if (formData.password.length < 6) {
            return toast.error("Password must be at least 6 characters long!");
        }

        if (formData.password !== formData.confirmPassword) {
            return toast.error("Passwords do not match!");
        }

        await signup(formData);
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
                        Create Your <span className="text-gradient-accent">NEXUS</span> Account
                    </h2>
                    <p className="text-xs text-zinc-400">
                        Join NEXUS to unlock private collections, tracking, and instant checkout.
                    </p>
                </div>

                {/* Monochromatic Form Card */}
                <div className="surface-card p-8 space-y-5">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                        {/* Full Name */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    required
                                    className="w-full pl-10 pr-4 py-3 input-minimal text-xs font-medium"
                                />
                            </div>
                        </div>

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

                        {/* Confirm Password */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    className="w-full pl-10 pr-10 py-3 input-minimal text-xs font-medium"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                                    <span className="text-black">Creating Account...</span>
                                </>
                            ) : (
                                <>
                                    <UserPlus className="w-4 h-4 text-black" />
                                    <span className="text-black">Create Account</span>
                                </>
                            )}
                        </button>

                    </form>

                    {/* Footer link */}
                    <div className="pt-4 border-t border-[#27272a] text-center">
                        <p className="text-xs text-zinc-400">
                            Already have an account?{" "}
                            <Link to="/login" className="text-white font-bold hover:underline inline-flex items-center gap-1">
                                <span>Log In</span>
                                <ArrowRight className="w-3 h-3" />
                            </Link>
                        </p>
                    </div>
                </div>

            </motion.div>
        </div>
    );
};

export default SignUpPage;
