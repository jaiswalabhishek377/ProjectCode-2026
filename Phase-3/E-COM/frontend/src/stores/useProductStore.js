import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useProductStore = create((set, get) => ({
    products: [],
    featuredProducts: [],
    loading: false,

    // Fetch featured products for storefront hero & best sellers showcase
    fetchFeaturedProducts: async () => {
        set({ loading: true });
        try {
            const response = await axios.get("/products/featured");
            set({ featuredProducts: response.data, loading: false });
        } catch (error) {
            set({ loading: false });
        }
    },

    // Fetch all products from database (Admin Inventory View)
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

    // Fetch products filtered by specific category
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

    // Admin Action: Create new product with Cloudinary image upload
    createProduct: async (productData) => {
        set({ loading: true });
        try {
            const res = await axios.post("/products", productData);
            set((state) => ({
                products: [...state.products, res.data],
                loading: false,
            }));
            toast.success("Product created successfully! 🚀");
            return true;
        } catch (error) {
            set({ loading: false });
            toast.error(error.response?.data?.message || "Failed to create product");
            return false;
        }
    },

    // Admin Action: Delete product from DB & Cloudinary
    deleteProduct: async (productId) => {
        set({ loading: true });
        try {
            await axios.delete(`/products/${productId}`);
            set((state) => ({
                products: state.products.filter((product) => product._id !== productId),
                loading: false,
            }));
            toast.success("Product deleted successfully");
        } catch (error) {
            set({ loading: false });
            toast.error(error.response?.data?.message || "Failed to delete product");
        }
    },

    // Admin Action: Toggle product featured status
    toggleFeaturedProduct: async (productId) => {
        set({ loading: true });
        try {
            const response = await axios.patch(`/products/${productId}`);
            set((state) => ({
                products: state.products.map((product) =>
                    product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
                ),
                loading: false,
            }));
            toast.success("Featured status updated!");
        } catch (error) {
            set({ loading: false });
            toast.error(error.response?.data?.message || "Failed to update featured status");
        }
    },
}));
