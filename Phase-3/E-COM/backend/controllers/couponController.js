import Coupon from "../models/couponModel.js";

// Global Store Promo Codes available to all customers
const GLOBAL_COUPONS = {
    WELCOME10: 10,
    NEXUS10: 10,
    SAVE15: 15,
    SAVE20: 20
};

// @desc    Get active coupon for logged-in user
// @route   GET /api/coupons
// @access  Private
export const getCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findOne({ userId: req.user._id, isActive: true });
        if (coupon) {
            return res.json(coupon);
        }
        
        // Return default WELCOME10 banner recommendation if no reward coupon found
        res.json({
            code: "WELCOME10",
            discountPercentage: 10,
            isActive: true
        });
    } catch (error) {
        console.error("Error in getCoupon controller:", error.message);
        res.status(500).json({ message: "Server error fetching coupon", error: error.message });
    }
};

// @desc    Validate coupon code entered by user (Supports Global & Reward Coupons)
// @route   POST /api/coupons/validate
// @access  Private
export const validateCoupon = async (req, res) => {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ message: "Coupon code is required" });
        }

        const normalizedCode = code.trim().toUpperCase();

        // 1. Check Global Store Promo Codes (WELCOME10, NEXUS10, SAVE15, SAVE20)
        if (GLOBAL_COUPONS[normalizedCode]) {
            return res.json({
                message: "Coupon is valid! 🎉",
                code: normalizedCode,
                discountPercentage: GLOBAL_COUPONS[normalizedCode]
            });
        }

        // 2. Check User Reward Coupon in Database
        const coupon = await Coupon.findOne({
            code: normalizedCode,
            userId: req.user._id,
            isActive: true
        });

        if (!coupon) {
            return res.status(404).json({ message: "Invalid or inactive coupon code" });
        }

        // Check if coupon has expired
        if (coupon.expirationDate < new Date()) {
            coupon.isActive = false;
            await coupon.save();
            return res.status(400).json({ message: "Coupon code has expired" });
        }

        res.json({
            message: "Coupon is valid! 🎉",
            code: coupon.code,
            discountPercentage: coupon.discountPercentage
        });
    } catch (error) {
        console.error("Error in validateCoupon controller:", error.message);
        res.status(500).json({ message: "Server error validating coupon", error: error.message });
    }
};
