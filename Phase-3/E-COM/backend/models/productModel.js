import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true
        },
        description: {
            type: String,
            required: [true, "Description is required"]
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price must be a positive number"]
        },
        image: {
            type: String,
            required: [true, "Image URL is required"]
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            lowercase: true,
            trim: true
        },
        isFeatured: {
            type: Boolean,
            default: false
        },
        rating: {
            type: Number,
            default: 4.8
        },
        reviewsCount: {
            type: Number,
            default: 34
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
