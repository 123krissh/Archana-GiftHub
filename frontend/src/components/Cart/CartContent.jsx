import React from 'react'
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../../redux/slices/cartSlice';

const CartContent = ({cart, userId, guestId}) => {
    const dispatch = useDispatch();

    // Handle adding or substracting to cart
    const handleAddToCart = ({productId, delta, quantity, size}) => {
        const newQuantity = quantity + delta;
        if(newQuantity >= 1) {
            dispatch(
                updateCartItemQuantity({
                    productId,
                    quantity: newQuantity,
                    guestId,
                    userId,
                    size,
                })
            );
        }
    };

    const handleRemoveFromCart = (productId, size) => {
        dispatch(removeFromCart({productId, guestId, userId, size}));
    };
  
  return (
    <div>
      {cart.products.map((product, index) => (
        <div key={index} className="flex items-start justify-between py-4 border-b">
            <div className="flex item-start">
                <img src={product.image} alt={product.name} className="w-20 h-24 object-cover mr-4 rounded"/>
                <div>
                    <h3>{product.name}</h3>
                    <p>
                        size: {product.size}
                    </p>
                    <div className="flex items-center mt-2">
                        <button 
                        onClick={() =>handleAddToCart({
                            productId: product.productId,
                            delta: -1,
                            quantity: product.quantity,
                            size: product.size
                          })
                        }
                        className="border rounded px-2 py-1 font-medium">-</button>
                        <span className="mx-4">{product.quantity}</span>
                        <button
                        onClick={() => handleAddToCart({
                            productId: product.productId,
                            delta: 1,
                            quantity: product.quantity,
                            size: product.size
                          })
                        }
                        className="border rounded px-2 py-1 font-medium">+</button>
                    </div>
                </div>
                <div className="px-1">
                <p >₹{product.price.toLocaleString()}</p>
                <button onClick={() => handleRemoveFromCart(product.productId, product.size)}>
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
