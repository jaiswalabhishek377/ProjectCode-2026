import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useProductStore = create((set) => ({
    products: [],
    featuredProducts: [],
    loading: false,

    fetchFeaturedProducts: async () => {
        set({ loading: true });
        try {
            const response = await axios.get("/products/featured");
            set({ featuredProducts: response.data, loading: false });
        } catch (error) {
            set({ loading: false });
        }
    },

    fetchAllProducts: async () => {
        set({ loading: true });
        try {
            const response = await axios.get("/products");
            set({ products: response.data.products || response.data, loading: false });
        } catch (error) {
            set({ loading: false });
            toast.error(error.response?.data?.message || "Failed to fetch products");
        }
    },

    fetchProductsByCategory: async (category) => {
        set({ loading: true });
        try {
            const response = await axios.get(`/products/category/${category}`);
            set({ products: response.data.products || response.data, loading: false });
        } catch (error) {
            set({ loading: false });
            toast.error(error.response?.data?.message || "Failed to fetch category products");
        }
    },
}));
