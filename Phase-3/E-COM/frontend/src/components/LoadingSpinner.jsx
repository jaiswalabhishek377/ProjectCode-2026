import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
    return (
        <div className="min-h-screen bg-[#0b0f19] flex flex-col items-center justify-center relative overflow-hidden bg-grid-pattern">
            {/* Ambient Background Glow Orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative flex flex-col items-center gap-6 z-10">
                {/* Neon Ring Spinner */}
                <div className="relative w-20 h-20">
                    <motion.div
                        className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 border-r-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.5)]"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute inset-2 rounded-full border-4 border-cyan-500/10 border-b-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_10px_#10b981]" />
                    </div>
                </div>

                {/* Text Indicator */}
                <motion.div
                    className="flex flex-col items-center gap-1"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span className="text-lg font-bold tracking-wider font-heading text-gradient-emerald">
                        E-COM NEXUS
                    </span>
                    <span className="text-xs text-gray-400 tracking-widest uppercase animate-pulse">
                        Authenticating Session...
                    </span>
                </motion.div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
