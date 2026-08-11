import express from "express";
import { getMyOrders, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";
import { protectRoute, adminRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

// Customer Order Endpoint
router.get("/", protectRoute, getMyOrders);

// Admin Order Endpoints
router.get("/all", protectRoute, adminRoute, getAllOrders);
router.patch("/:id/status", protectRoute, adminRoute, updateOrderStatus);

export default router;
