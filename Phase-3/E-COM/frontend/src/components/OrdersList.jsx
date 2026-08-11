import React, { useEffect, useState } from "react";
import { Package, Truck, Clock, CheckCircle, XCircle, Loader } from "lucide-react";
import { motion } from "framer-motion";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

const STATUS_OPTIONS = ["processing", "shipped", "delivered", "cancelled"];

const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    const fetchAllOrders = async () => {
        try {
            const res = await axios.get("/orders/all");
            setOrders(res.data.orders || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching all orders:", error);
            toast.error("Failed to load customer orders");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        setUpdatingId(orderId);
        try {
            const res = await axios.patch(`/orders/${orderId}/status`, { status: newStatus });
            setOrders((prevOrders) =>
                prevOrders.map((order) => (order._id === orderId ? { ...order, status: res.data.status } : order))
            );
            toast.success(`Order status updated to ${newStatus.toUpperCase()}! 🚚`);
            setUpdatingId(null);
        } catch (error) {
            console.error("Error updating order status:", error);
            toast.error(error.response?.data?.message || "Failed to update status");
            setUpdatingId(null);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="surface-card p-6 sm:p-8 space-y-6"
        >
            <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
                <div>
                    <h3 className="font-heading font-black text-xl text-white tracking-tight flex items-center gap-2">
                        <Truck className="w-5 h-5 text-white" />
                        <span>Customer Orders ({orders.length})</span>
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                        View customer purchases and update order fulfillment status in real-time
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12 text-zinc-500 text-xs font-bold animate-pulse">
                    Loading Customer Orders...
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-12 space-y-2">
                    <p className="text-sm font-bold text-white">No Customer Orders Yet</p>
                    <p className="text-xs text-zinc-400">Placed customer orders will appear here for fulfillment.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order._id} className="p-5 rounded-2xl bg-[#000000] border border-[#27272a] space-y-4">
                            
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272a] pb-3">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-xs font-bold text-white">
                                            ID: #{order._id}
                                        </span>
                                        <span className="text-xs text-zinc-400">
                                            by <strong className="text-white">{order.user?.name || "Customer"}</strong> ({order.user?.email})
                                        </span>
                                    </div>
                                    <span className="text-[11px] text-zinc-500">
                                        {new Date(order.createdAt).toLocaleString()}
                                    </span>
                                </div>

                                {/* Status Selector Dropdown */}
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-zinc-400">Status:</span>
                                    <select
                                        value={order.status || "processing"}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        disabled={updatingId === order._id}
                                        className="px-3 py-1.5 rounded-xl bg-[#0e0e11] border border-zinc-700 text-xs font-bold text-white capitalize cursor-pointer focus:outline-none"
                                    >
                                        {STATUS_OPTIONS.map((st) => (
                                            <option key={st} value={st} className="bg-[#0e0e11] text-white capitalize">
                                                {st}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Products breakdown */}
                            <div className="space-y-2">
                                {order.products.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-xs text-zinc-300">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-white" />
                                            <span>{item.product?.name || "Product"}</span>
                                            <span className="text-zinc-500">(Qty: {item.quantity})</span>
                                        </div>
                                        <span className="font-bold text-white">₹{item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Footer total */}
                            <div className="pt-2 border-t border-[#27272a] flex items-center justify-between text-xs">
                                <span className="text-zinc-400">Stripe Session ID: <span className="font-mono text-zinc-500">{order.stripeSessionId?.substring(0, 18)}...</span></span>
                                <div className="text-right">
                                    <span className="text-zinc-400 mr-2">Total Amount:</span>
                                    <span className="font-black text-sm text-white">₹{order.totalAmount}</span>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default OrdersList;
