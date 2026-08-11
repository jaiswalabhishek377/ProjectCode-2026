import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";
import { useUserStore } from "./useUserStore";

export const useCartStore = create((set, get) => ({
    cart: [],
    coupon: null,
    total: 0,
    subtotal: 0,
    isCouponApplied: false,
    loading: false,

    calculateTotals: () => {
        const { cart, coupon } = get();
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        let total = subtotal;

        if (coupon && coupon.discountPercentage) {
            const discount = (subtotal * coupon.discountPercentage) / 100;
            total = subtotal - discount;
        }

        set({ subtotal, total: Math.max(0, total) });
    },

    getCartItems: async () => {
        const user = useUserStore.getState().user;
        if (!user) return;

        set({ loading: true });
        try {
            const response = await axios.get("/cart");
            set({ cart: response.data, loading: false });
            get().calculateTotals();
        } catch (error) {
            set({ loading: false, cart: [] });
        }
    },

    addToCart: async (product) => {
        const user = useUserStore.getState().user;
        if (!user) {
            toast.error("Please log in to add items to your cart!");
            return;
        }

        try {
            await axios.post("/cart", { productId: product._id });
            toast.success(`Added ${product.name} to cart!`);

            set((state) => {
                const existingItem = state.cart.find((item) => item._id === product._id);
                let updatedCart;

                if (existingItem) {
                    updatedCart = state.cart.map((item) =>
                        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                    );
                } else {
                    updatedCart = [...state.cart, { ...product, quantity: 1 }];
                }

                return { cart: updatedCart };
            });

            get().calculateTotals();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add product to cart");
        }
    },

    removeFromCart: async (productId) => {
        try {
            await axios.delete("/cart", { data: { productId } });
            set((state) => ({
                cart: state.cart.filter((item) => item._id !== productId),
            }));
            get().calculateTotals();
            toast.success("Item removed from cart");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to remove item");
        }
    },

    updateQuantity: async (productId, quantity) => {
        if (quantity === 0) {
            get().removeFromCart(productId);
            return;
        }

        try {
            await axios.put(`/cart/${productId}`, { quantity });
            set((state) => ({
                cart: state.cart.map((item) =>
                    item._id === productId ? { ...item, quantity } : item
                ),
            }));
            get().calculateTotals();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update quantity");
        }
    },

    applyCoupon: async (code) => {
        try {
            const response = await axios.post("/coupons/validate", { code });
            set({ coupon: response.data, isCouponApplied: true });
            get().calculateTotals();
            toast.success(`Coupon applied! ${response.data.discountPercentage}% OFF`);
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid coupon code");
        }
    },

    removeCoupon: () => {
        set({ coupon: null, isCouponApplied: false });
        get().calculateTotals();
        toast.success("Coupon removed");
    },
}));
