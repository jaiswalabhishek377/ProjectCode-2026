import express from "express";
import { getAnalytics } from "../controllers/analyticsController.js";
import { protectRoute, adminRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAnalytics);

export default router;
