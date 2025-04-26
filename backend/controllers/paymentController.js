import Razorpay from "razorpay";
import Checkout from "../models/Checkout.js";

// Initialize Razorpay with the keys from environment variables
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Controller function to handle checkout creation and Razorpay order creation
const createCheckout = async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  try {
    // Create a new checkout document
    const checkout = new Checkout({
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    // Save the checkout document to the database
    await checkout.save();

    // Create a Razorpay order based on the total price
    const razorpayOrder = await razorpay.orders.create({
      amount: totalPrice * 100, // Razorpay expects the amount in paisa (1 INR = 100 paisa)
      currency: 'INR',
      receipt: checkout._id.toString(),
      notes: {
        userId: req.user._id.toString(), // Optional: Store the user ID for reference
      },
    });

    // Save the Razorpay order ID in the checkout document
    checkout.razorpayOrderId = razorpayOrder.id;
    await checkout.save();

    // Respond with the checkout ID and Razorpay order ID
    res.json({
      _id: checkout._id,
      razorpayOrderId: razorpayOrder.id, // Send Razorpay order ID to the frontend
    });
  } catch (error) {
    // Handle any errors that occur during the checkout or Razorpay order creation
    console.error(error);
    res.status(500).json({ message: 'Error creating checkout order' });
  }
};

// Export the controller functions

 export default createCheckout;
