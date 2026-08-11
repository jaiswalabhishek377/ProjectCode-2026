import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: true,

    // Register a new customer account
    signup: async ({ name, email, password, confirmPassword }) => {
        set({ loading: true });

        if (password !== confirmPassword) {
            set({ loading: false });
            return toast.error("Passwords do not match!");
        }

        try {
            const res = await axios.post("/auth/signup", { name, email, password });
            set({ user: res.data, loading: false });
            toast.success(res.data.message || "Account created successfully! Welcome 🎉");
        } catch (error) {
            set({ loading: false });
            const message = error.response?.data?.message || "Failed to create account";
            toast.error(message);
        }
    },

    // Log in existing user (Customer or Admin)
    login: async (email, password) => {
        set({ loading: true });

        try {
            const res = await axios.post("/auth/login", { email, password });
            set({ user: res.data, loading: false });
            toast.success(res.data.message || "Logged in successfully! Welcome back ✨");
        } catch (error) {
            set({ loading: false });
            const message = error.response?.data?.message || "Invalid credentials";
            toast.error(message);
        }
    },

    // Log out user
    logout: async () => {
        try {
            await axios.post("/auth/logout");
            set({ user: null });
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred during logout");
        }
    },

    // Verify user authentication status on application mount
    checkAuth: async () => {
        set({ checkingAuth: true });
        try {
            const response = await axios.get("/auth/profile");
            set({ user: response.data, checkingAuth: false });
        } catch (error) {
            set({ checkingAuth: false, user: null });
        }
    },

    // Manual refresh token action if needed
    refreshToken: async () => {
        if (get().checkingAuth) return;

        set({ checkingAuth: true });
        try {
            const response = await axios.post("/auth/refresh-token");
            set({ checkingAuth: false });
            return response.data;
        } catch (error) {
            set({ user: null, checkingAuth: false });
            throw error;
        }
    },
}));
