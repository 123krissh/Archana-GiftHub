import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { createCheckout } from '../../redux/slices/checkoutSlice';
import axios from 'axios';
// import PayPalButton from '../Cart/PayPalButton';
import RazorpayButton from "./RazorpayButton";

const Checkout = () => {
    const [paymentSuccess, setPaymentSuccess] = useState(false); // To track payment status
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {cart, loading, error} = useSelector((state) => state.cart);
    const {user} = useSelector((state) => state.auth);

    const [checkoutId, setCheckoutId] = useState(null);
    const [razorpayOrderId, setRazorpayOrderId] = useState(null);
    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        pinCode: "",
        state: "",
        country: "",
        phone: "",
    });

    // Ensure cart is loaded before proceeding
    useEffect(() => {
        if(!cart || !cart.products || cart.products.length === 0) {
            navigate("/");
        }
    }, [cart, Navigate]);

    const handleCreateCheckout = async (e) => {
        e.preventDefault();
        if (cart && cart.products.length > 0) {
            const res = await dispatch(
                createCheckout({
                    checkoutItems: cart.products,
                    shippingAddress,
                    paymentMethod: "Razorpay",
                    totalPrice: cart.totalPrice,
                })
            );
            if (res.payload && res.payload._id) {
                setCheckoutId(res.payload._id);
                setRazorpayOrderId(res.payload.razorpayOrderId); // Set Razorpay Order ID
            }
        }
    };

    // This effect will handle the navigation when payment is successful
  useEffect(() => {
    if (paymentSuccess && checkoutId) {
      // Navigate to the order confirmation page when payment is successful
      navigate("/order-confirmation");
    }
  }, [paymentSuccess, checkoutId, navigate]); // Depend on paymentSuccess and checkoutId

    const handlePaymentSuccess = async (details) => {
        try {
          // Call your backend API to update the payment status
          const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
            {
              paymentStatus: "paid", // Update the payment status
              paymentDetails: details, // Pass Razorpay payment details
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`, // Add JWT token for authentication
              },
            }
          );

          // Debugging: Log the response from backend
          // console.log("Payment update response:", response);
      
          // Mark payment as successful after response from backend
          if (response.status === 200) {
            setPaymentSuccess(true); // Update state to reflect successful payment
            // console.log("Payment Success: ", paymentSuccess); // Check the value of paymentSuccess

            // Now finalize the checkout
            await handleFinalizeCheckout(checkoutId); // Call the function to finalize the order
          }
        } catch (error) {
          console.error("Payment update failed", error);
          alert("Payment failed. Please try again.");
        }
      };
      
      const handleFinalizeCheckout = async (checkoutId) => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
            {}, // Empty object for the request body
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`, // JWT token for authentication
              },
            }
          );

           // Debugging: Check if the order finalization is successful
           console.log("Order Finalization Response:", response);
      
          // Finalize the checkout and navigate only if payment was successful
          if (paymentSuccess) {
            // console.log("Navigating to Order Confirmation Page"); // Ensure this is logged
            navigate("/order-confirmation"); // Navigate to order confirmation page
          } else {
            console.log("Payment not successful, no navigation.");
          }
        } catch (error) {
          console.error("Error finalizing the checkout", error);
        }
      };  
    
    // const handlePaymentSuccess = async (details) => {
    //     try {
    //       const response = await axios.put(
    //         `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
    //         {
    //           paymentStatus: "paid",
    //           paymentDetails: details,
    //         },
    //         {
    //           headers: {
    //             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    //           },
    //         }
    //       );
    
    //       console.log("Payment update response:", response);
    
    //       if (response.status === 200) {
    //         setPaymentSuccess(true); // Set state to true when payment is successful
    //       }
    //     } catch (error) {
    //       console.error("Payment update failed", error);
    //       alert("Payment failed. Please try again.");
    //     }
    //   };
    
    //   const handleFinalizeCheckout = async () => {
    //     try {
    //       const response = await axios.post(
    //         `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
    //         {},
    //         {
    //           headers: {
    //             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    //           },
    //         }
    //       );
    
    //       console.log("Order Finalization Response:", response);
    
    //       // Finalize checkout logic can go here if needed
    //     } catch (error) {
    //       console.error("Error finalizing the checkout", error);
    //     }
    //   };

    if(loading) return <p>Loading cart ...</p>;
    if(error) return <p>Error: {error}</p>;
    if(!cart || !cart.products || cart.products.length === 0) {
        return <p>Your cart is empty</p>;
    }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-6 px-6 tracking-tighter">
     {/* Left Section */}
     <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
            <h3 className="text-lg mb-4">Delivery Details</h3>
            <div className="mb-4 ">
                <label className="block text-gray-700">Email</label>
                <input type="email" value={user? user.email : ""} className="w-full p-2 rounded border" disabled />
            </div>
            {/* <h3 className="text-lg mb-4">Delivery</h3> */}
            <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700">First Name</label>
                    <input type="text" value={shippingAddress.firstName} 
                    onChange={(e) => setShippingAddress({...shippingAddress, firstName: e.target.value,})}
                    className="w-full p-2 rounded border" required/>
                </div>
                <div>
                    <label className="block text-gray-700">Last Name</label>
                    <input type="text" value={shippingAddress.lastName} 
                    onChange={(e) => setShippingAddress({...shippingAddress, lastName: e.target.value,})}
                    className="w-full p-2 rounded border" required/>
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input type="text" value={shippingAddress.address} onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value,})}
                className="w-full p-2 rounded border" required />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
               <div>
                    <label className="block text-gray-700">City</label>
                    <input type="text" value={shippingAddress.city} 
                    onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value,})}
                    className="w-full p-2 rounded border" required/>
                </div>
                <div>
                    <label className="block text-gray-700">Pin Code</label>
                    <input type="text" value={shippingAddress.pinCode} 
                    onChange={(e) => setShippingAddress({...shippingAddress, pinCode: e.target.value,})}
                    className="w-full p-2 rounded border" required/>
                </div>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700">State</label>
                    <input type="text" value={shippingAddress.state} 
                    onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value,})}
                    className="w-full p-2 rounded border" required/>
                </div>
                <div>
                    <label className="block text-gray-700">Country</label>
                    <input type="text" value={shippingAddress.country} 
                    onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value,})}
                    className="w-full p-2 rounded border" required/>
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Phone Number</label>
                <input type="tel" value={shippingAddress.phone} onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value,})}
                className="w-full p-2 rounded border" required />
            </div>
            <div className="mt-6">
                {!checkoutId ? (
                    <button type="submit" className="w-full bg-gray-800 hover:bg-gray-950 text-white py-3 rounded">Continue to Payment</button>
                ) : (
                    <div>
                        {/* <h3 className="text-lg mb-4">Pay Now</h3> */}
                        <RazorpayButton
                            amount={cart.totalPrice}
                            orderId={razorpayOrderId} // Correct Razorpay Order ID
                            user={user}
                            phone={shippingAddress.phone}
                            onSuccess={handlePaymentSuccess}
                            onError={(err) => alert("Payment failed. Try again.")}
                        />
                    </div>
                ) } 
            </div>
        </form>
     </div>
     {/* Right Section */}
     <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4">
            {cart.products.map((product, index) => (
                <div key={index} className="flex items-start justify-between py2 border-b">
                    <div className="flex items-start">
                        <img src={product.image} alt={product.name} className="w-20 h-24 object-cover mr-4 mb-2 mt-1" />
                        <div>
                            <h3 className="text-md">{product.name}</h3>
                            <p className="text-gray-500">Size: {product.size}</p>
                            <p className="text-gray-500">Qty: {product.quantity}</p>
                        </div>
                    </div>
                    <p className="lg:text-xl">₹{product.price?.toLocaleString()}</p>
                </div>
            ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
            <p>Subtotal</p>
            <p>₹{cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg">
            <p>Shipping Charge</p>
            <p>₹{cart.shippingCharge?.toLocaleString() || 0}</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
            <p>Total</p>
            <p>₹{cart.totalPrice?.toLocaleString()}</p>
        </div>
     </div>
    </div>
  )
}

export default Checkout
