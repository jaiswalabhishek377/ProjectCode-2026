import Order from "../models/orderModel.js";

// @desc    Get logged-in user's order history
// @route   GET /api/orders
// @access  Private
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .populate("products.product", "name image category price");

        res.json({ orders });
    } catch (error) {
        console.error("Error in getMyOrders controller:", error.message);
        res.status(500).json({ message: "Server error fetching user orders", error: error.message });
    }
};

// @desc    Get all orders (Admin view)
// @route   GET /api/orders/all
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .sort({ createdAt: -1 })
            .populate("user", "name email")
            .populate("products.product", "name image category price");

        res.json({ orders });
    } catch (error) {
        console.error("Error in getAllOrders controller:", error.message);
        res.status(500).json({ message: "Server error fetching all orders", error: error.message });
    }
};

// @desc    Update order status (Admin action)
// @route   PATCH /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

        if (!status || !validStatuses.includes(status.toLowerCase())) {
            return res.status(400).json({ message: "Invalid order status value" });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status.toLowerCase();
        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } catch (error) {
        console.error("Error in updateOrderStatus controller:", error.message);
        res.status(500).json({ message: "Server error updating order status", error: error.message });
    }
};
