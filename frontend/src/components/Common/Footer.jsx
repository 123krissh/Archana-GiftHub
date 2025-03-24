import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaWhatsapp, FaPhoneAlt   } from "react-icons/fa";

const Footer = () => {
  return <footer className=" py-10 bg-gray-900">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-5 lg:px-0">
        <div className="ml-10">
            <h3 className="text-lg text-gray-200 mb-3">Newsletter</h3>
            <p className="text-gray-400 mb-3">Be the first to hear about new products, exclusive events, and online offers.</p>
            <p className="font-medium text-sm text-gray-500 mb-6">Sign up and get 10% off your first order.</p>

            {/* Newsletter form */}
            <form className="flex">
                <input type="email" placeholder="Enter your email" className="p-3 w-full md:w-40 text-sm border-t border-l border-b rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all text-white" required />
                <button type="submit" className="bg-black text-white border-gray-300 px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all">Subscribe</button>
            </form>
        </div>
    
    {/* Links */}
    <div>
        <h3 className="text-lg text-gray-200 mb-4">Shop</h3>
        <ul className="space-y-2 text-gray-400">
            <li>
                <Link to="/collections/all?product=persnalised-photo-frames" className="hover:text-gray-500 transition-colors">Persnalised Photo Frames </Link>
            </li>
            <li>
                <Link to="/collections/all?product=pillow-printing" className="hover:text-gray-500 transition-colors">Pillow Printing </Link>
            </li>
            <li>
                <Link to="/collections/all?product=cup-printing" className="hover:text-gray-500 transition-colors">Cup Printing </Link>
            </li>
            <li>
                <Link to="/collections/all?product=customized-gift-items" className="hover:text-gray-500 transition-colors">Customized Gift Items</Link>
            </li>
        </ul>
    </div>

    <div>
        <h3 className="text-lg text-gray-200 mb-4">Support</h3>
        <ul className="space-y-2 text-gray-400">
            <li>
                <Link to="#" className="hover:text-gray-500 transition-colors">Contact Us</Link>
            </li>
            <li>
                <Link to="#" className="hover:text-gray-500 transition-colors">About Us</Link>
            </li>
            <li>
                <Link to="#" className="hover:text-gray-500 transition-colors">FAQs</Link>
            </li>
            <li>
                <Link to="#" className="hover:text-gray-500 transition-colors">Features</Link>
            </li>
        </ul>
    </div>
    {/* Follow us */}
    <div>
        <h3 className="text-lg text-gray-200 mb-4">Follow Us</h3>
        <div className="flex items-center space-x-4 mb-6">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
            <FaFacebookF className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
            <FaInstagram className="h-6 w-6" />
            </a>
            <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
            <FaWhatsapp className="h-6 w-6" />
            </a>
        </div>
        <p className="text-gray-200">Call Us</p>
        <p className="text-gray-400"> <FaPhoneAlt className="inline-block mr-2 text-gray-400"/> +91 8619604816 </p>
        <p className="text-gray-400"> <FaPhoneAlt className="inline-block mr-2 text-gray-400"/> +91 8432085210 </p>
    </div>
    </div> 
    {/* Footer Bottom */}
    <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
        <p className="text-gray-400 text-sm tracking-tighter text-center">&copy; 2025 GIFT HUB. All rights reserved. </p>
    </div>
  </footer>
}

export default Footer
