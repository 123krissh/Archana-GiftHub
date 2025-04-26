// import express from "express";
// import { createOrder, verifyPayment } from "../controllers/paymentController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/create-order", protect, createOrder);
// router.post("/verify-payment", protect, verifyPayment);

// export default router;

import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @route   POST /api/payment/create-order
// @desc    Create Razorpay order
// @access  Private
router.post("/create-order", protect, async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to create order" });
  }
});

// @route   POST /api/payment/verify-payment
// @desc    Verify Razorpay payment signature
// @access  Private
router.post("/verify-payment", protect, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment verification failed" });
  }
});

export default router;
