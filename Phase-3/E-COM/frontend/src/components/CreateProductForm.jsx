import React, { useState } from "react";
import { PlusCircle, Upload, Loader, Image as ImageIcon, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useProductStore } from "../stores/useProductStore";

const CATEGORIES = ["tech", "footwear", "watches", "apparel"];

const CreateProductForm = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        isFeatured: false
    });

    const { createProduct, loading } = useProductStore();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProduct({ ...newProduct, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await createProduct(newProduct);
        if (success) {
            setNewProduct({
                name: "",
                description: "",
                price: "",
                category: "",
                image: "",
                isFeatured: false
            });
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="surface-card p-6 sm:p-8 max-w-2xl mx-auto space-y-6"
        >
            <div className="border-b border-[#27272a] pb-4">
                <h3 className="font-heading font-black text-xl text-white tracking-tight flex items-center gap-2">
                    <PlusCircle className="w-5 h-5 text-white" />
                    <span>Create New Product</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                    Upload image to Cloudinary CDN and list product in MongoDB inventory
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Product Name */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                        Product Name
                    </label>
                    <input
                        type="text"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="e.g. NEXUS Stealth Wireless Headphones"
                        required
                        className="w-full px-4 py-3 input-minimal text-xs font-medium"
                    />
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                        Description
                    </label>
                    <textarea
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        placeholder="Detailed product acoustics, materials, and specification details..."
                        rows={3}
                        required
                        className="w-full px-4 py-3 input-minimal text-xs font-medium resize-none"
                    />
                </div>

                {/* Price & Category 2-Column Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Price */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                            Price (₹ INR)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            placeholder="1499.00"
                            required
                            className="w-full px-4 py-3 input-minimal text-xs font-medium"
                        />
                    </div>

                    {/* Category Selector */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                            Category
                        </label>
                        <select
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                            required
                            className="w-full px-4 py-3 input-minimal text-xs font-medium capitalize cursor-pointer"
                        >
                            <option value="" disabled>Select Category</option>
                            {CATEGORIES.map((cat) => (
                                <option key={cat} value={cat} className="bg-[#0e0e11] text-white capitalize">
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

                {/* Featured Checkbox */}
                <div className="flex items-center gap-3 pt-1">
                    <input
                        type="checkbox"
                        id="isFeatured"
                        checked={newProduct.isFeatured}
                        onChange={(e) => setNewProduct({ ...newProduct, isFeatured: e.target.checked })}
                        className="w-4 h-4 rounded bg-[#0e0e11] border-zinc-700 text-white focus:ring-0 cursor-pointer"
                    />
                    <label htmlFor="isFeatured" className="text-xs font-bold text-zinc-300 flex items-center gap-1.5 cursor-pointer">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>Feature product on Storefront Homepage</span>
                    </label>
                </div>

                {/* Cloudinary Image Upload & Preview */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                        Product Image Upload (Cloudinary)
                    </label>
                    
                    <div className="flex items-center gap-4">
                        <label className="flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-zinc-700 bg-[#000000] hover:border-zinc-500 cursor-pointer transition-colors text-xs font-bold text-zinc-300">
                            <Upload className="w-4 h-4 text-white" />
                            <span>{newProduct.image ? "Change Image File" : "Choose Image File"}</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                required={!newProduct.image}
                            />
                        </label>

                        {/* Image Live Preview */}
                        {newProduct.image ? (
                            <img
                                src={newProduct.image}
                                alt="Preview"
                                className="w-16 h-16 rounded-xl object-cover border border-zinc-700 bg-black shrink-0"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-xl border border-zinc-800 bg-[#000000] flex items-center justify-center text-zinc-600 shrink-0">
                                <ImageIcon className="w-6 h-6" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 btn-primary font-bold text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
                >
                    {loading ? (
                        <>
                            <Loader className="w-4 h-4 animate-spin text-black" />
                            <span className="text-black">Uploading to Cloudinary & Saving...</span>
                        </>
                    ) : (
                        <>
                            <PlusCircle className="w-4 h-4 text-black" />
                            <span className="text-black">Add Product to Inventory</span>
                        </>
                    )}
                </button>

            </form>
        </motion.div>
    );
};

export default CreateProductForm;
