import express from "express";
import {
    getCartProducts,
    addToCart,
    removeAllFromCart,
    updateQuantity
} from "../controllers/cartController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

// All cart routes require user login protection
router.get("/", protectRoute, getCartProducts);
router.post("/", protectRoute, addToCart);
router.delete("/", protectRoute, removeAllFromCart);
router.put("/:id", protectRoute, updateQuantity);

export default router;
