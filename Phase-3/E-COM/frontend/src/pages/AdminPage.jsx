import React, { useState } from "react";
import { PlusCircle, Package, ShieldCheck, Truck, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import OrdersList from "../components/OrdersList";
import AnalyticsTab from "../components/AnalyticsTab";

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState("create");

    return (
        <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-8 py-4"
        >
            {/* Header */}
            <div className="border-b border-[#27272a] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-bold tracking-widest uppercase mb-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-white" />
                        <span>SECRET ADMIN HUB</span>
                    </div>
                    <h1 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
                        Admin <span className="text-gradient-accent">Dashboard</span>
                    </h1>
                    <p className="text-xs text-zinc-400 mt-1">
                        Manage inventory, upload Cloudinary product media, feature items, fulfill orders, and monitor sales analytics
                    </p>
                </div>

                {/* Tab Switcher Buttons */}
                <div className="flex items-center gap-2 p-1 rounded-xl bg-[#0e0e11] border border-[#27272a] shrink-0 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab("create")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            activeTab === "create"
                                ? "bg-white text-black shadow-md"
                                : "text-zinc-400 hover:text-white"
                        }`}
                    >
                        <PlusCircle className="w-4 h-4" />
                        <span>Create Product</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("products")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            activeTab === "products"
                                ? "bg-white text-black shadow-md"
                                : "text-zinc-400 hover:text-white"
                        }`}
                    >
                        <Package className="w-4 h-4" />
                        <span>Products Inventory</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("orders")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            activeTab === "orders"
                                ? "bg-white text-black shadow-md"
                                : "text-zinc-400 hover:text-white"
                        }`}
                    >
                        <Truck className="w-4 h-4" />
                        <span>Fulfill Orders</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("analytics")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            activeTab === "analytics"
                                ? "bg-white text-black shadow-md"
                                : "text-zinc-400 hover:text-white"
                        }`}
                    >
                        <BarChart3 className="w-4 h-4" />
                        <span>Sales Analytics</span>
                    </button>
                </div>
            </div>

            {/* Active Tab View */}
            <div>
                {activeTab === "create" && <CreateProductForm />}
                {activeTab === "products" && <ProductsList />}
                {activeTab === "orders" && <OrdersList />}
                {activeTab === "analytics" && <AnalyticsTab />}
            </div>

        </motion.div>
    );
};

export default AdminPage;
