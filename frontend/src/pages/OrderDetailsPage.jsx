import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const OrderDetailsPage = () => {
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() =>{
        const mockOrderDeatils = {
            _id: id,
            createdAt: new Date(),
            isPaid: true,
            isDelivered: false,
            paymentMethod: "UPI",
            shippingMethod: "Standard",
            shippingAddress: {city: "New Delhi", state: "Delhi", country: "India"},
            orderItems: [
                {
                    productId: "1",
                    name: "Photo frame",
                    price: 299,
                    quantity: 1,
                    image: "https://images.meesho.com/images/products/462493757/ng1zq_512.jpg",
                },
                {
                    productId: "2",
                    name: "Photo frame",
                    price: 299,
                    quantity: 1,
                    image: "https://images.meesho.com/images/products/462493757/ng1zq_512.jpg",
                },
                {
                    productId: "3",
                    name: "Photo frame",
                    price: 599,
                    quantity: 2,
                    image: "https://images.meesho.com/images/products/462493757/ng1zq_512.jpg",
                },
                {
                    productId: "4",
                    name: "Photo frame",
                    price: 299,
                    quantity: 1,
                    image: "https://images.meesho.com/images/products/462493757/ng1zq_512.jpg",
                },
            ],
        };
        setOrderDetails(mockOrderDeatils);
    }, [id]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>
      {!orderDetails ? (
        <p>No Order details found</p>
        ) : (
         <div className="p-4 sm:p-6 rounded-lg border">
            {/* Ordre info */}
            <div className="flex flex-col sm:flex-row justify-between mb-8">
                <div>
                    <h3 className="text-lg md:text-xl font-semibold">Order ID: #{orderDetails._id}</h3>
                    <p className="text-gray-600">{}</p>
                </div>
            </div>
         </div>   
        )}
    </div>
  )
}

export default OrderDetailsPage
