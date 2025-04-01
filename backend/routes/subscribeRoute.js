const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

// @route POST /api/subscribe
// @desc Handle newsletter subscription
// @access Public
router.post("/subscribe", async (req, res) => {
    const {email} = req.body;

    if(!email) {
        return res.status(400).json({Message: "Email is required"});
    }

    try {
        // Check if the email is already subscribed
        let subscriber = await Subscriber.findOne({email});

        if(subscriber) {
            return res.status(400).json({Message: "email is already subscribed"});
        }

        // Create a new subscriber
        subscriber = new Subscriber({email});
        await subscriber.save();

        res.status(201).json({Message: "Successfully subscribed to the newsletter!"});
    } catch (error) {
        console.error(error);
        res.status(500).json({Message: "Server Error"});
    }
});

module.exports = router;