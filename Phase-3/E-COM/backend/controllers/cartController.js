import Product from "../models/productModel.js";

// @desc    Get user cart products with full details
// @route   GET /api/cart
// @access  Private
export const getCartProducts = async (req, res) => {
    try {
        const productIds = req.user.cartItems.map((item) => item.product);
        const products = await Product.find({ _id: { $in: productIds } });

        // Merge DB product details with quantity stored in user's cartItems
        const cartItems = products.map((product) => {
            const item = req.user.cartItems.find((cartItem) => cartItem.product.toString() === product._id.toString());
            return { ...product.toJSON(), quantity: item ? item.quantity : 1 };
        });

        res.json(cartItems);
    } catch (error) {
        console.error("Error in getCartProducts controller:", error.message);
        res.status(500).json({ message: "Server error fetching cart", error: error.message });
    }
};

// @desc    Add item to cart or increment quantity
// @route   POST /api/cart
// @access  Private
export const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const existingItem = user.cartItems.find((item) => item.product.toString() === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cartItems.push({ product: productId, quantity: 1 });
        }

        await user.save();
        res.json(user.cartItems);
    } catch (error) {
        console.error("Error in addToCart controller:", error.message);
        res.status(500).json({ message: "Server error adding to cart", error: error.message });
    }
};

// @desc    Remove specific item from cart or clear entire cart
// @route   DELETE /api/cart
// @access  Private
export const removeAllFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        if (!productId) {
            user.cartItems = [];
        } else {
            user.cartItems = user.cartItems.filter((item) => item.product.toString() !== productId);
        }

        await user.save();
        res.json(user.cartItems);
    } catch (error) {
        console.error("Error in removeAllFromCart controller:", error.message);
        res.status(500).json({ message: "Server error removing cart item", error: error.message });
    }
};

// @desc    Update item quantity in cart
// @route   PUT /api/cart/:id
// @access  Private
export const updateQuantity = async (req, res) => {
    try {
        const { id: productId } = req.params;
        const { quantity } = req.body;
        const user = req.user;

        const existingItem = user.cartItems.find((item) => item.product.toString() === productId);

        if (existingItem) {
            if (quantity === 0) {
                user.cartItems = user.cartItems.filter((item) => item.product.toString() !== productId);
                await user.save();
                return res.json(user.cartItems);
            }

            existingItem.quantity = quantity;
            await user.save();
            res.json(user.cartItems);
        } else {
            res.status(404).json({ message: "Item not found in cart" });
        }
    } catch (error) {
        console.error("Error in updateQuantity controller:", error.message);
        res.status(500).json({ message: "Server error updating cart quantity", error: error.message });
    }
};
