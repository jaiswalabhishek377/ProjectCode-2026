import axios from "axios";

// Create custom Axios instance with credentials enabled for HttpOnly cookies
const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api",
    withCredentials: true, // Send HttpOnly cookies automatically with every request
});

// Flag to prevent multiple simultaneous refresh token requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// Response Interceptor for handling token expiration and automatic renewal
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Ignore auth check endpoints, login, signup, or refresh requests to avoid infinite loops
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/auth/refresh-token") &&
            !originalRequest.url.includes("/auth/login") &&
            !originalRequest.url.includes("/auth/signup") &&
            !originalRequest.url.includes("/auth/profile")
        ) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => axiosInstance(originalRequest))
                    .catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Call backend silent token refresh endpoint
                await axiosInstance.post("/auth/refresh-token");
                processQueue(null);
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
