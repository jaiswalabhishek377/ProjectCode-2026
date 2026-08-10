import Product from "../models/productModel.js";
import cloudinary from "../lib/cloudinary.js";

// @desc    Get all products (Admin view)
// @route   GET /api/products
// @access  Private/Admin
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ products });
    } catch (error) {
        console.error("Error in getAllProducts controller:", error.message);
        res.status(500).json({ message: "Server error fetching products", error: error.message });
    }
};

// @desc    Get all featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = async (req, res) => {
    try {
        // Find products where isFeatured is true
        const featuredProducts = await Product.find({ isFeatured: true }).lean();

        if (!featuredProducts || featuredProducts.length === 0) {
            return res.status(404).json({ message: "No featured products found" });
        }

        res.json(featuredProducts);
    } catch (error) {
        console.error("Error in getFeaturedProducts controller:", error.message);
        res.status(500).json({ message: "Server error fetching featured products", error: error.message });
    }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;

        if (!name || !description || !price || !image || !category) {
            return res.status(400).json({ message: "Please provide all required product fields" });
        }

        let cloudinaryResponse = null;

        // Upload base64 image or image URL to Cloudinary 'products' folder
        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, {
                folder: "products"
            });
        }

        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            category
        });

        res.status(201).json(product);
    } catch (error) {
        console.error("Error in createProduct controller:", error.message);
        res.status(500).json({ message: "Server error creating product", error: error.message });
    }
};

// @desc    Delete product by ID
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Delete image from Cloudinary if Cloudinary URL exists
        if (product.image) {
            const publicId = product.image.split("/").pop().split(".")[0];
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`);
                console.log("Cloudinary image deleted successfully");
            } catch (err) {
                console.error("Error deleting image from Cloudinary:", err.message);
            }
        }

        await Product.findByIdAndDelete(req.params.id);

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error in deleteProduct controller:", error.message);
        res.status(500).json({ message: "Server error deleting product", error: error.message });
    }
};

// @desc    Get recommended products (4 random products)
// @route   GET /api/products/recommendations
// @access  Public
export const getRecommendedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            { $sample: { size: 4 } },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    image: 1,
                    price: 1
                }
            }
        ]);

        res.json(products);
    } catch (error) {
        console.error("Error in getRecommendedProducts controller:", error.message);
        res.status(500).json({ message: "Server error fetching recommendations", error: error.message });
    }
};

// @desc    Get products by category slug
// @route   GET /api/products/category/:category
// @access  Public
export const getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const products = await Product.find({ category: category.toLowerCase() });
        res.json({ products });
    } catch (error) {
        console.error("Error in getProductsByCategory controller:", error.message);
        res.status(500).json({ message: "Server error fetching products by category", error: error.message });
    }
};

// @desc    Toggle product featured status
// @route   PATCH /api/products/:id
// @access  Private/Admin
export const toggleFeaturedProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.isFeatured = !product.isFeatured;
        const updatedProduct = await product.save();

        res.json(updatedProduct);
    } catch (error) {
        console.error("Error in toggleFeaturedProduct controller:", error.message);
        res.status(500).json({ message: "Server error toggling featured status", error: error.message });
    }
};
