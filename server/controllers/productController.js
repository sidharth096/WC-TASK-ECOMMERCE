import Product from "../models/Product.js";

// Get All Products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        return res.status(200).json({
            success: true,
            error: false,
            message: "Products fetched successfully",
            data: {
                products
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: true,
            message: "Server error, please try again later"
        })
    }
};

// Get Single Product
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) return res.status(404).json({
            success: false,
            error: true,
            message: "Product not found"
        });

        return res.status(200).json({
            success: true,
            error: false,
            message: "Product fetched successfully",
            data: {
                product
            }
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: true,
            message: "Server error, please try again later"
        })
    }
};

export const createProduct = async (req, res) => {
    const { title, price, image, stock } = req.body;
    try {
        // Validate product data
        if (!title || !price || !image || !stock) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "All fields are required"
            });
        }
        // Check if product already exists
        const product = await Product.create({ title, price, image, stock });
        return res.status(200).json({
            success: true,
            error: false,
            message: "Product created successfully",
            data: {
                product
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: true,
            message: "Server error, please try again later"
        })
    }
};
