<<<<<<< HEAD
=======
<<<<<<< HEAD
const  express=require("express")
=======
>>>>>>> main
const express = require("express");
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
<<<<<<< HEAD
const mongoose = require("mongoose");

const { protect } = require("../middleware/authMiddleware");
=======
const {protect} = require("../middleware/authMiddleware");
>>>>>>> main

const router = express.Router();

// @route POST /api/checkout
// @desc Create a new checkout session
// @access private
router.post("/", protect, async (req, res) => {
<<<<<<< HEAD
  const { checkoutItem, shippingAddress, paymentMethod, totalPrice } = req.body;

  if (!checkoutItem || checkoutItem.length === 0) {
    return res.status(400).json({ message: "No item in checkout" });
  }

  try {
    // Create a new checkout session
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItem: checkoutItem,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });
    console.log(`Checkout created for user: ${req.user._id}`);
    res.status(201).json(newCheckout);
  } catch (error) {
    console.error("Error Creating checkout session:", error);
    res.status(500).json({ message: "Server Error" });
  }
=======
    const {checkoutItems, shippingAddress, paymentMethod, totalPrice} = req.body;

    if(!checkoutItems || checkoutItems.length === 0) {
        return res.status(400).json({message: "No item in checkout"});
    }

    try {
        // Create a new checkout session
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems: checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "Pending",
            isPaid: false,
        });
        console.log(`Checkout created for user: ${req.user._id}`);
        res.status(201).json(newCheckout);
    } catch (error) {
        console.error("Error Creating checkout session:", error);
        res.status(500).json({message: "Server Error"});
    }
>>>>>>> main
});

// @route POST /api/checkout/:id/pay
// @desc Update checkout to mark as paid after successful payment
// @access private
router.put("/:id/pay", protect, async (req, res) => {
<<<<<<< HEAD
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();
      await checkout.save();

      res.status(200).json(checkout);
    } else {
      res.status(400).json({ message: "Invalid Payment Status" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
=======
    const {paymentStatus, paymentDetails} = req.body;

    try {
        const checkout = await Checkout.findById(req.params.id);

        if(!checkout) {
            return res.status(404).json({message: "Checkout not found"});
        }

        if(paymentStatus === "paid") {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();
            await checkout.save();

            res.status(200).json(checkout);
        } else {
            res.status(400).json({message: "Invalid Payment Status"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
>>>>>>> main
});

// @route POST /api/checkout/:id/finalize
// @desc Finalize checkout and convert to an order after payment confirmation
// @access private
router.post("/:id/finalize", protect, async (req, res) => {
<<<<<<< HEAD
  // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  //   return res.status(400).json({ message: "Invalid checkout ID format" });
  // }
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (checkout.isPaid && !checkout.isFinalized) {
      // Create final order based on the checkout details
      // console.log("Shipping Address:", checkout.shippingAddress);

      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItem,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
      });

      // Mark the checkout as finalized
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();
      // Delete the cart associated with the user
      await Cart.findOneAndDelete({ user: checkout.user });
      res.status(201).json(finalOrder);
    } else if (checkout.isFinalized) {
      res.status(400).json({ message: "Checkout already finalized" });
    } else {
      res.status(400).json({ message: "Checkout is not paid" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
=======
    try {
        const checkout = await Checkout.findById(req.params.id);

        if(!checkout) {
            return res.status(404).json({message: "Checkout not found"});
        }

        if(checkout.isPaid && !checkout.isFinalized) {
            // Create final order based on the checkout details
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.checkoutItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails,
            });

            // Mark the checkout as finalized
            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();
            await checkout.save();
            // Delete the cart associated with the user
            await Cart.findOneAndDelete({user: checkout.user});
            res.status(201).json(finalOrder);
        } else if (checkout.isFinalized) {
            res.status(400).json({message: "Checkout already finalized"});
        } else {
            res.status(400).json({message: "Checkout is not paid"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error", error: error.message});
    }
});

module.exports = router;
>>>>>>> 962c5b31ef316eb527ea0178910ba920de2b941c
>>>>>>> main
