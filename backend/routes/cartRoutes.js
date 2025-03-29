const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

// Helper function to get a cart by user Id or guest ID
const getCart = async (userId, guestId) => {
    if(userId) {
        return await Cart.findOne({user: userId});
    } else if (guestId) {
        return await Cart.findOne({guestId});
    }
    return null;
};

// @route POST /api/cart
// @desc Add a product to the cart for a guest or logged in user
// @access public
router.post("/", async (req, res) => {
    const {productId, quantity, size, guestId, userId} = req.body;
    try {
        const product = await Product.findById(productId);
        if(!product) return res.status(404).json({message: "Product not found"});

        // Determine if the user is logged in or guest
        let cart = await getCart(userId, guestId);

        // if the cart exists, update it
        if (cart) {
            const productIndex = cart.products.findIndex(
                (p) => 
                    p.productId.toString() === productId && p.size === size
            );

            if(productIndex > -1) {
                // if the product already exists, update the quantity
                cart.products[productIndex].quantity += Number(quantity);
            } else {
                // add new product
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    quantity,
                });
            }

            // Recalculate the total price
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );
            await cart.save();
            return res.status(200).json(cart);
        } else {
            // Create a new cart for the guest or user
            const newCart = await Cart.create({
                user: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + new Date().getTime(),
                products: [
                    {
                        productId,
                        name: product.name,
                        image: product.images[0].url,
                        price: product.price,
                        size,
                        quantity,
                    },
                ],
                totalPrice: product.price * quantity,
            });
            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});

// @route POST /api/cart
// @desc update product quantity in the cart for a guest or logged in user
// @access public
router.put("/", async (req, res) => {
    const {productId, quantity, size, guestId, userId} = req.body;

    try {
        let cart = await getCart(userId, guestId);
        if(!cart) return res.status(404).json({message: "Cart not found"});

        const productIndex = cart.products.findIndex((p) =>
            p.productId.toString() === productId && p.size === size
        );

        if(productIndex > -1) {
            // update quantity
            if(quantity > 0) {
                cart.products[productIndex].quantity = quantity;
            } else {
                // remove product if quantity is 0
                cart.products.splice(productIndex, 1);
            }

            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
            await cart.save();
            return res.status(404).json(cart);
        } else {
            return res.status(404).json({message: "Product not found in cart"});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Server Error"});
    }
});

// @route Delete /api/cart
// @desc remove a product from the cart
// @access public
router.delete("/", async (req, res) => {
    const {productId, quantity, size, guestId, userId} = req.body;
    try {
        let cart = await getCart(userId, guestId);
        if(!cart) return res.status(404).json({message: "Cart not found"});

        const productIndex = cart.products.findIndex((p) =>
            p.productId.toString() === productId && p.size === size
        );

        if(productIndex > -1) {
            cart.products.splice(productIndex, 1);

            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({message: "Product not found in cart"});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Server Error"});
    }
});

// @route Get /api/cart
// @desc get logged-in user's or guest user's cart
// @access public
router.get("/", async (req, res) => {
    const {userId, guestId} = req.query;

    try {
        const cart = await getCart(userId, guestId);
        if(cart) {
            res.json(cart);
        } else {
            res.status(404).json({message: "Cart not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});

module.exports = router;