const express = require("express");
const Product = require("../models/Product");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

// @route POST /api/products
// @desc Create a new Product
// @access Private/Admin
router.post("/", protect, async (req, res) => {
    try {
        const { name, description, price, discountPrice, countInStock, category, sizes, collections, material, images, isFeatured, isPublished, tags, dimensions, weight, sku,} = req.body;
        const product = new Product({
            name, description, price, discountPrice, countInStock, category, sizes, collections, material, images, isFeatured, isPublished, tags, dimensions, weight, sku,
            // Reference to the admin user who created it
            user: req.user._id,
        });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});