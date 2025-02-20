import React from 'react'
import { Link } from 'react-router-dom';
import P21 from "../../assets/P21.webp";

const Card = () => {
  return (
    <div className="max-w-6xl p-6 mx-auto py-5 lg:w-[65rem] lg:h-[25rem]  md:h-[32rem] sm:h-[45rem] sm:w-[40rem]">
      <div className="relative bg-gray-100 rounded-xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
        {/* Left Side - Text */}
        <div className="p-6 flex flex-col justify-center w-full md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Special Gifts for your favourite people. <br/> Preserve your cherished moments.
          </h2>
          <p className="text-gray-600 mt-2">Start at Rs 350</p>
          <div className="mt-4">
            <Link to="/" className="cursor-pointer">
            <button className="bg-black text-white px-5 py-2 rounded-md font-semibold hover:bg-gray-800 transition ml-2 mb-2">
              Photo Albums
            </button>
            </Link>
            <Link to="/" className="cursor-pointer">
            <button className="bg-black text-white px-5 py-2 rounded-md font-semibold hover:bg-gray-800 transition ml-2">
              Layflat Photo Albums
            </button>
            </Link>
            <Link to="/" className="">
            <button className="bg-black text-white px-5 py-2 mt-2 rounded-md font-semibold hover:bg-gray-800 transition ml-2">
             Customized Gifts
            </button>
            </Link>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="w-full md:w-1/2">
          <img
            src={P21}
            alt="Photo Album"
            className="md:w-full md:h-full object-cover sm:w-[40rem] "
          />
        </div>
      </div>
    </div>
  );
};

export default Card
