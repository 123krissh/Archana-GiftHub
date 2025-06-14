import mongoose from "mongoose";

const checkoutItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    size: {
        type: String,
        required: true,
    }
}, {_id: false}
);

const checkoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    checkoutItems: [checkoutItemSchema],
    shippingAddress: {
        address: {type: String, required: true},
        city: {type: String, required: true},
        pinCode: {type: String, required: true},
        state: {type: String, required: true},
        country: {type: String, required: true},
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    isPaid: {
        type: Boolean,
        required: false,
    },
    paidAt: {
        type: Date,
    },
    paymentStatus: {
        type: String,
        default: "pending",
    },
    paymentDetails: {
        // store payment-related details(transection ID, payment response)
        type: mongoose.Schema.Types.Mixed,
    },
    isFinalized: {
        type: Boolean,
        default: false,
    },
    finalizedAt: {
        type: Date,
    },
}, {timestamps: true}
);

const Checkout = mongoose.model("Checkout", checkoutSchema);
export default Checkout;