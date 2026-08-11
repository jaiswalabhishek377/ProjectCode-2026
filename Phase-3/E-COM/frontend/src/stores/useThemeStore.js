import { create } from "zustand";

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("theme") || "light",

    // Toggle between White Porcelain (Light) & Obsidian Dark themes
    toggleTheme: () => set((state) => {
        const nextTheme = state.theme === "light" ? "dark" : "light";
        localStorage.setItem("theme", nextTheme);
        if (nextTheme === "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
        return { theme: nextTheme };
    }),

    // Initialize theme state on application load
    initTheme: () => {
        const savedTheme = localStorage.getItem("theme") || "light";
        if (savedTheme === "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }
}));
