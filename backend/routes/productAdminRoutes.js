const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");
// const { upload } = require("../routes/uploadRoutes");

const router = express.Router();

//@route GET /api/admin/products
//@desc Get all products
//@access Private/Admin

router.get("/", protect, admin, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route POST /api/admin/add-product
// @desc Add new product
// @access Private/Admin
// router.post("/add-product", protect, admin, async (req, res) => {
//   try {
//     const newProduct = new Product({
//       ...req.body,
//       sku: `SKU-${Date.now()}`, // Simple auto SKU
//       user: req.user._id, // coming from protect middleware
//     });

//     const saved = await newProduct.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to add product" });
//   }
// });

module.exports = router;