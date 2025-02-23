import React from 'react'
import { MdDeleteForever } from "react-icons/md";

const CartContent = () => {
    const cartProducts = [
        {
            productId: 1,
            name: "Customized Photo Frame",
            size: "12+18",
            quantity: 1,
            price: 599,
            image: "https://images.meesho.com/images/products/462493757/ng1zq_512.jpg",
        },
        {
            productId: 1,
            name: "Customized Photo Frame",
            size: "15+10",
            quantity: 1,
            price: 399,
            image: "https://giftsbyrashi.com/wp-content/uploads/2023/05/Heart-Photo-Frame.webp",
        },
        {
            productId: 1,
            name: "Printed Photo Satin Pillow",
            size: "12+12",
            quantity: 1,
            price: 289,
            image: "https://m.media-amazon.com/images/I/6177dPvhsJL.jpg",
        },
    ];
  return (
    <div>
      {cartProducts.map((product, index) => (
        <div key={index} className="flex items-start justify-between py-4 border-b">
            <div className="flex item-start">
                <img src={product.image} alt={product.name} className="w-20 h-24 object-cover mr-4 rounded"/>
                <div>
                    <h3>{product.name}</h3>
                    <p>
                        size: {product.size}
                    </p>
                    <div className="flex items-center mt-2">
                        <button className="border rounded px-2 py-1 font-medium">-</button>
                        <span className="mx-4">{product.quantity}</span>
                        <button className="border rounded px-2 py-1 font-medium">+</button>
                    </div>
                </div>
                <div className="px-4">
                <p >₹.{product.price.toLocaleString()}</p>
                <button>
                    <MdDeleteForever className="h-6 w-6 text-red-500"/>
                </button>
                </div>
            </div>
        </div>
      ))}
    </div>
  )
}

export default CartContent
