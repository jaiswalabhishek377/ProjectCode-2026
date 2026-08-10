import Coupon from "../models/couponModel.js";

// @desc    Get active coupon for logged-in user
// @route   GET /api/coupons
// @access  Private
export const getCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findOne({ userId: req.user._id, isActive: true });
        res.json(coupon || null);
    } catch (error) {
        console.error("Error in getCoupon controller:", error.message);
        res.status(500).json({ message: "Server error fetching coupon", error: error.message });
    }
};

// @desc    Validate coupon code entered by user
// @route   POST /api/coupons/validate
// @access  Private
export const validateCoupon = async (req, res) => {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ message: "Coupon code is required" });
        }

        const coupon = await Coupon.findOne({
            code: code.toUpperCase(),
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
            message: "Coupon is valid",
            code: coupon.code,
            discountPercentage: coupon.discountPercentage
        });
    } catch (error) {
        console.error("Error in validateCoupon controller:", error.message);
        res.status(500).json({ message: "Server error validating coupon", error: error.message });
    }
};
