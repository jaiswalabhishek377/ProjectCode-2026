import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { generateTokens, setCookies } from "../lib/tokens.js";

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
export const signup = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide all required fields (name, email, password)" });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        // Generate JWT Access & Refresh Tokens and attach to httpOnly cookies
        const { accessToken, refreshToken } = generateTokens(user._id);
        setCookies(res, accessToken, refreshToken);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            message: "Account created successfully"
        });
    } catch (error) {
        console.error("Error in signup controller:", error.message);
        res.status(500).json({ message: error.message || "Internal server error during signup" });
    }
};

// @desc    Authenticate user & get tokens
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const user = await User.findOne({ email });

        if (user && (await user.comparePassword(password))) {
            const { accessToken, refreshToken } = generateTokens(user._id);
            setCookies(res, accessToken, refreshToken);

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                message: "Logged in successfully"
            });
        } else {
            res.status(400).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Error in login controller:", error.message);
        res.status(500).json({ message: error.message || "Internal server error during login" });
    }
};

// @desc    Log out user & clear cookies
// @route   POST /api/auth/logout
// @access  Public
export const logout = async (req, res) => {
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout controller:", error.message);
        res.status(500).json({ message: "Server error during logout" });
    }
};

// @desc    Re-issue Access Token using Refresh Token cookie
// @route   POST /api/auth/refresh-token
// @access  Public (via Refresh Cookie)
export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ message: "No refresh token provided" });
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || "fallback_refresh_secret");

        const accessToken = jwt.sign(
            { userId: decoded.userId },
            process.env.ACCESS_TOKEN_SECRET || "fallback_access_secret",
            { expiresIn: "15m" }
        );

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });

        res.json({ message: "Access token refreshed successfully" });
    } catch (error) {
        console.error("Error in refreshToken controller:", error.message);
        res.status(401).json({ message: "Invalid or expired refresh token" });
    }
};

// @desc    Get currently logged in user profile
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        console.error("Error in getProfile controller:", error.message);
        res.status(500).json({ message: "Server error fetching user profile" });
    }
};