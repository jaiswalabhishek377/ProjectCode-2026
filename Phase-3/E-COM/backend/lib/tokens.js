import jwt from "jsonwebtoken";

// Generate short-lived Access Token and long-lived Refresh Token
export const generateTokens = (userId) => {
    const accessToken = jwt.sign(
        { userId },
        process.env.ACCESS_TOKEN_SECRET || "fallback_access_secret",
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        { userId },
        process.env.REFRESH_TOKEN_SECRET || "fallback_refresh_secret",
        { expiresIn: "7d" }
    );

    return { accessToken, refreshToken };
};

// Set secure HttpOnly cookies on the Express response object
export const setCookies = (res, accessToken, refreshToken) => {
    const isProduction = process.env.NODE_ENV === "production";

    // 15 minutes maxAge for Access Token cookie
    res.cookie("accessToken", accessToken, {
        httpOnly: true, // Prevents XSS attacks (JS cannot read token)
        secure: isProduction, // HTTPS only in production
        sameSite: "strict", // Prevents CSRF attacks
        maxAge: 15 * 60 * 1000 // 15 minutes in ms
    });

    // 7 days maxAge for Refresh Token cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true, // Prevents XSS attacks
        secure: isProduction, // HTTPS only in production
        sameSite: "strict", // Prevents CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in ms
    });
};
