import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import { useUserStore } from "./stores/useUserStore";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";

import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
    const { user, checkAuth, checkingAuth } = useUserStore();
    const location = useLocation();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (checkingAuth) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-[#000000] text-white flex flex-col relative">
            
            {/* Navigation Header */}
            <Navbar />

            {/* Main Page Content */}
            <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/category/:category" element={<CategoryPage />} />
                        
                        {/* Smooth Transition Authentication Routes */}
                        <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to="/" />} />
                        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />

                        {/* Secret Admin Dashboard Protected Route */}
                        <Route path="/secret-dashboard" element={user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />} />

                        {/* Cart Route */}
                        <Route path="/cart" element={user ? <CartPage /> : <Navigate to="/login" />} />
                    </Routes>
                </AnimatePresence>
            </main>

            {/* Footer */}
            <Footer />

            {/* Global Hot Toaster */}
            <Toaster 
                position="top-right"
                toastOptions={{
                    style: {
                        background: '#0e0e11',
                        color: '#ffffff',
                        border: '1px solid #27272a',
                        boxShadow: '0 0 25px rgba(0, 0, 0, 0.8)',
                        fontSize: '14px',
                        fontWeight: '600'
                    },
                    success: {
                        iconTheme: {
                            primary: '#ffffff',
                            secondary: '#000000',
                        },
                    },
                }}
            />
        </div>
    );
};

export default App;