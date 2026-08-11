import React, { useEffect, useState } from "react";
import { Users, Package, ShoppingCart, TrendingUp, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

const AnalyticsTab = () => {
    const [analyticsData, setAnalyticsData] = useState({
        users: 0,
        products: 0,
        totalSales: 0,
        totalRevenue: 0
    });
    const [dailySalesData, setDailySalesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await axios.get("/analytics");
                setAnalyticsData(res.data.analyticsData || {});
                setDailySalesData(res.data.dailySalesData || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching analytics data:", error);
                toast.error(error.response?.data?.message || "Failed to load sales analytics");
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <div className="surface-card p-12 text-center space-y-3">
                <Loader className="w-8 h-8 animate-spin text-white mx-auto" />
                <p className="text-xs font-bold text-zinc-400">Loading Revenue & Order Analytics...</p>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            {/* Top 4 Stat Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Total Users */}
                <div className="surface-card p-6 flex items-center justify-between">
                    <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Total Customers</span>
                        <h4 className="font-heading font-black text-2xl text-white">{analyticsData.users || 0}</h4>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white">
                        <Users className="w-6 h-6" />
                    </div>
                </div>

                {/* Total Products */}
                <div className="surface-card p-6 flex items-center justify-between">
                    <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Total Products</span>
                        <h4 className="font-heading font-black text-2xl text-white">{analyticsData.products || 0}</h4>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white">
                        <Package className="w-6 h-6" />
                    </div>
                </div>

                {/* Total Sales Orders */}
                <div className="surface-card p-6 flex items-center justify-between">
                    <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Total Orders</span>
                        <h4 className="font-heading font-black text-2xl text-white">{analyticsData.totalSales || 0}</h4>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white">
                        <ShoppingCart className="w-6 h-6" />
                    </div>
                </div>

                {/* Total Revenue */}
                <div className="surface-card p-6 flex items-center justify-between">
                    <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Total Revenue</span>
                        <h4 className="font-heading font-black text-2xl text-white">₹{analyticsData.totalRevenue || 0}</h4>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center font-extrabold shadow-md">
                        <TrendingUp className="w-6 h-6 text-black" />
                    </div>
                </div>

            </div>

            {/* Recharts Daily Revenue Chart */}
            <div className="surface-card p-6 sm:p-8 space-y-6">
                <div className="border-b border-[#27272a] pb-4">
                    <h3 className="font-heading font-black text-xl text-white tracking-tight flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-white" />
                        <span>Daily Revenue & Sales Trends</span>
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                        7-day performance breakdown of completed transactions and order volume
                    </p>
                </div>

                <div className="h-80 w-full pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dailySalesData}>
                            <defs>
                                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                            <XAxis 
                                dataKey="date" 
                                stroke="#71717a" 
                                fontSize={11} 
                                tickLine={false}
                            />
                            <YAxis 
                                stroke="#71717a" 
                                fontSize={11} 
                                tickLine={false}
                                tickFormatter={(val) => `₹${val}`}
                            />
                            <Tooltip 
                                contentStyle={{
                                    backgroundColor: "#0e0e11",
                                    borderColor: "#27272a",
                                    borderRadius: "12px",
                                    color: "#ffffff",
                                    fontSize: "12px",
                                    fontWeight: "600"
                                }}
                                formatter={(value, name) => [
                                    name === "revenue" ? `₹${value}` : value,
                                    name === "revenue" ? "Revenue" : "Orders"
                                ]}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="revenue" 
                                stroke="#ffffff" 
                                strokeWidth={2.5}
                                fillOpacity={1} 
                                fill="url(#revenueGradient)" 
                            />
                            <Line 
                                type="monotone" 
                                dataKey="sales" 
                                stroke="#a1a1aa" 
                                strokeWidth={2} 
                                dot={{ fill: "#ffffff", r: 4 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </motion.div>
    );
};

export default AnalyticsTab;
