import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";

const Cart = {
  Products: [
    {
      name: "Customized Photo Frame",
      size: "12+18",
      price: 599,
      image:
        "https://images.meesho.com/images/products/462493757/ng1zq_512.jpg",
    },
    {
      name: "Customized Photo Frame",
      size: "15+10",
      price: 399,
      image:
        "https://giftsbyrashi.com/wp-content/uploads/2023/05/Heart-Photo-Frame.webp",
    },
    {
      name: "Printed Photo Satin Pillow",
      size: "12+12",
      price: 289,
      image: "https://m.media-amazon.com/images/I/6177dPvhsJL.jpg",
    },
  ],
  subtotal: 1287,
  shippingCharge: 20,
  totalPrice: 1307,
};

const Checkout = () => {
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firtName: "",
    lastName: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
    phone: "",
  });

  const handleCreateCheckout = (e) => {
    e.preventDefault();
    setCheckoutId(123);
  };

  const handlePaymentSuccess = (details) => {
    console.log("Payment Success", details);
    navigate("/order-confirmation");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Delivery Details</h3>
          <div className="mb-4 ">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value="user@example.com"
              className="w-full p-2 rounded border"
              disabled
            />
          </div>
          {/* <h3 className="text-lg mb-4">Delivery</h3> */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstname: e.target.value,
                  })
                }
                className="w-full p-2 rounded border"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full p-2 rounded border"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full p-2 rounded border"
              required
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 rounded border"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Pin Code</label>
              <input
                type="text"
                value={shippingAddress.pincode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    pincode: e.target.value,
                  })
                }
                className="w-full p-2 rounded border"
                required
              />
            </div>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">State</label>
              <input
                type="text"
                value={shippingAddress.state}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    state: e.target.value,
                  })
                }
                className="w-full p-2 rounded border"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Country</label>
              <input
                type="text"
                value={shippingAddress.country}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    country: e.target.value,
                  })
                }
                className="w-full p-2 rounded border"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 rounded border"
              required
            />
          </div>
          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded"
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Pay Now</h3>
              </div>
            )}
          </div>
        </form>
      </div>
      {/* Right Section */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4">
          {Cart.Products.map((product, index) => (
            <div
              key={index}
              className="flex items-start justify-between py2 border-b"
            >
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover mr-4 mb-2 mt-1"
                />
                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">Size: {product.size}</p>
                </div>
              </div>
              <p className="text-xl">₹{product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>
          <p>₹{Cart.subtotal?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p>Shipping Charge</p>
          <p>₹{Cart.shippingCharge?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
          <p>Total</p>
          <p>₹{Cart.totalPrice?.toLocaleString()}</p>
        </div>

        <div className="mt-6">
          {!checkoutId ? (
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded"
            >
              Continue to Payment
            </button>
          ) : (
            <div>
              <h3> Pay with Paypal</h3>
              <PayPalButton
                amount={100}
                onSuccess={handlePaymentSuccess}
                onError={(err) => alert("Payment failed.")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
