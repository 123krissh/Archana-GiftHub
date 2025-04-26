import express from "express";
import Order from "../models/Order.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route POST /api/orders/my-orders
// @desc Get logged-in user's orders
// @access private
router.get("/my-orders", protect, async (req, res) => {
    // Find orders for the authenticated user
    try {
        if (!req.user || !req.user._id) {
            console.error("❌ req.user is missing or invalid in /my-orders");
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }
        
        const orders = await Order.find({user: req.user._id}).sort({
            createdAt: -1,
        });
        // sort by most recent orders
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});

// @route GET /api/orders/:id
// @desc Get orders ddetails by ID
// @access private
router.get("/:id", protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            "user", "name email"
        );

        if(!order) {
            return res.status(404).json({message: "Order not found"});
        }

        // Return the full order details
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});

export default router;  