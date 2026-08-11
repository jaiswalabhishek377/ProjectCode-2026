import React from "react";
import { ShieldCheck } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const AdminPage = () => {
    const { user } = useUserStore();

    return (
        <div className="p-8 rounded-2xl bg-card-dark border border-amber-500/30 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-amber-400" />
                <h2 className="font-heading text-2xl font-bold text-white">Secret Admin Hub Dashboard</h2>
            </div>
            <p className="text-sm text-gray-300">
                Welcome, Admin <strong>{user?.name}</strong>! Full Admin Analytics, Cloudinary product creation form, and inventory toggle table will render here in Section 14.
            </p>
        </div>
    );
};

export default AdminPage;
