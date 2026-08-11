import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, Clock, CheckCircle, Truck, XCircle, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get("/orders");
                setOrders(res.data.orders || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user orders:", error);
                toast.error(error.response?.data?.message || "Failed to load order history");
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case "delivered":
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Delivered</span>
                    </span>
                );
            case "shipped":
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase">
                        <Truck className="w-3.5 h-3.5" />
                        <span>Shipped</span>
                    </span>
                );
            case "cancelled":
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Cancelled</span>
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Processing</span>
                    </span>
                );
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-8 py-4"
        >
            {/* Header */}
            <div className="border-b border-[#27272a] pb-6 flex items-center justify-between">
                <div>
                    <h1 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
                        My Order <span className="text-gradient-accent">History</span>
                    </h1>
                    <p className="text-xs text-zinc-400 mt-1">
                        Track live status, receipt details, and purchased merchandise items
                    </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-bold">
                    <Package className="w-4 h-4 text-white" />
                    <span>{orders.length} Total Orders</span>
                </div>
            </div>

            {/* Loading Grid */}
            {loading ? (
                <div className="text-center py-16 space-y-3">
                    <Loader className="w-8 h-8 animate-spin text-white mx-auto" />
                    <p className="text-xs font-bold text-zinc-400">Loading your purchase history...</p>
                </div>
            ) : orders.length === 0 ? (
                /* Empty Orders State */
                <div className="surface-card p-12 text-center space-y-5 max-w-md mx-auto my-8">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center mx-auto text-white">
                        <Package className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-heading font-bold text-xl text-white">No Orders Placed Yet</h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                            You haven't completed any purchases yet. Explore our luxury collections!
                        </p>
                    </div>
                    <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 btn-primary text-xs font-bold">
                        <span className="text-black">Start Shopping</span>
                        <ArrowRight className="w-4 h-4 text-black" />
                    </Link>
                </div>
            ) : (
                /* Orders List Cards */
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="surface-card p-6 space-y-5">
                            
                            {/* Order Card Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272a] pb-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-mono font-bold text-white">
                                            Order ID: #{order._id}
                                        </span>
                                        {getStatusBadge(order.status)}
                                    </div>
                                    <p className="text-[11px] text-zinc-400">
                                        Placed on {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs text-zinc-400 block">Total Amount Paid</span>
                                    <span className="text-lg font-black text-white">₹{order.totalAmount}</span>
                                </div>
                            </div>

                            {/* Products Breakdown */}
                            <div className="space-y-3">
                                {order.products.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between gap-4 p-3 rounded-xl bg-[#000000] border border-[#27272a]">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={item.product?.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80"}
                                                alt={item.product?.name || "Product"}
                                                className="w-12 h-12 rounded-lg object-cover bg-zinc-900 border border-zinc-800 shrink-0"
                                            />
                                            <div>
                                                <h4 className="font-bold text-xs text-white">
                                                    {item.product?.name || "Product Item"}
                                                </h4>
                                                <span className="text-[11px] text-zinc-400">
                                                    Quantity: {item.quantity} × ₹{item.price}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="font-extrabold text-xs text-white">
                                            ₹{item.quantity * item.price}
                                        </span>
                                    </div>
                                ))}
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default OrdersPage;
