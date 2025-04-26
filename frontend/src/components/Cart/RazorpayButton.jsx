import React from "react";

const RazorpayButton = ({ amount, orderId, onSuccess, onError, user, phone }) => {
  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Failed to load Razorpay SDK. Please refresh and try again!");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Razorpay public key
      amount: amount * 100, // Amount in paisa
      currency: "INR",
      name: "Archana GiftHub",
      description: "Order Payment",
      order_id: orderId, // Razorpay Order ID from backend
      handler: function (response) {
        // On payment success
        onSuccess(response); // Pass the payment details to parent
      },
      prefill: {
        name: user?.name || "Guest User",
        email: user?.email || "guest@example.com",
        contact: phone || "9999999999",
      },
      theme: {
        color: "#4b626e",
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      console.error(response.error);
      onError(response.error);
    });
    rzp.open();
  };

  return (
    <button
      className="w-full bg-gray-800 hover:bg-gray-950 text-white py-3 rounded"
      onClick={handlePayment}
    >
      Pay ₹{amount} with Razorpay
    </button>
  );
};

export default RazorpayButton;
