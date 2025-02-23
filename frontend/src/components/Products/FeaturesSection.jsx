import React from 'react'
import { HiShoppingBag } from 'react-icons/hi'
import { FaRegCreditCard } from "react-icons/fa6";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";


const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Feature 1 */}
            <div className="flex flex-col items-center">
                <div className="p-4 rounded-full mb-4">
                    <HiShoppingBag className="text-xl"/>
                </div>
                <h4 className="tracking-tighter mb-2">FREE SHIPPING</h4>
                <p className="text-gray-600 text-sm tracking-tighter">On all orders over ₹1000.00</p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center">
                <div className="p-4 rounded-full mb-4">
                    <HiArrowPathRoundedSquare  className="text-xl"/>
                </div>
                <h4 className="tracking-tighter mb-2">20 DAYS RETURN</h4>
                <p className="text-gray-600 text-sm tracking-tighter">Money back guarantee</p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center">
                <div className="p-4 rounded-full mb-4">
                    <FaRegCreditCard  className="text-xl"/>
                </div>
                <h4 className="tracking-tighter mb-2">SECURE CHCKOUT</h4>
                <p className="text-gray-600 text-sm tracking-tighter">100% secured checout process</p>
            </div>
        </div>
    </section>
  )
}

export default FeaturesSection
