import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order.js";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount,
      currency: "INR",
      receipt: `receipt_order_${Math.random() * 1000}`,
    };

    const order = await instance.orders.create(options);

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error in createOrder", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify Payment
export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                                  .update(body.toString())
                                  .digest("hex");

  if (expectedSignature === razorpay_signature) {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: razorpay_payment_id,
      status: "captured",
      update_time: new Date(),
      email_address: order.userEmail, // Assuming you store customer email
    };

    await order.save();

    res.status(200).json({ success: true, message: "Payment successful and order updated" });
  } else {
    res.status(400).json({ success: false, message: "Invalid signature" });
  }
};
