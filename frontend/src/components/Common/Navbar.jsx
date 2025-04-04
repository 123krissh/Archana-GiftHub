import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {HiOutlineUser } from "react-icons/hi"
import { IoMdClose } from "react-icons/io";
import { FiAlignRight, FiShoppingBag  } from "react-icons/fi"
import SearchBar from './SearchBar'
import CartDrawer from '../Layout/CartDrawer'
import logo from "../../assets/Logo.png"
import { useSelector } from 'react-redux';


const Navbar = () => {
    const [drawerOpen, setDraweropen] = useState(false);
    const [navDrawerOpen, setNavDrawerOpen] = useState(false);
    const {cart} = useSelector((state) => state.cart);
    const {user} = useSelector((state) => state.auth);

    const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

    const toggleNavDrawer = () => {
        setNavDrawerOpen(!navDrawerOpen);     
    };

    const toggleCartDrawer = () => {
        setDraweropen(!drawerOpen);
    };
  return (
    <div>
    <nav className= "container bg-white mx-auto flex items-center justify-between py-4 px-2 h-20">
        {/*Left logo*/}
        <div>
            <Link to="/" className="">
              <img src={logo} alt="GIFT HUB" className="lg:h-40 py-10 sm:h-40"/>
            </Link>
        </div>
        {/*Center navigaton link */}
        <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-black text-sm font-medium uppercase">About Us</Link>
            <Link to="/collections/all" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Products</Link>
            <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Contact Us</Link>
        </div>
        {/*Right icons*/}
        <div className="flex items-center space-x-3 px-4">
            {user && user.role === "admin" && (
                 <Link to="/admin" className="block bg-black px-1 rounded text-sm text-white ">Admin</Link>
            )}
           
            <Link to="/profile" className="hover:text-black flex items-center gap-1"> 
            <HiOutlineUser className="h-6 w-6 text-gray-700"/> 
            {/* <span className="hidden md:flex">Sign in</span> */}
            </Link>
            <Link to="#" className=" hover:text-black flex items-center gap-3">
            <button onClick={toggleCartDrawer} className="relative hover:text-black">
                <FiShoppingBag  className="h-6 w-6 text-gray-700 cursor-pointer"/>
                {cartItemCount > 0 && (
                    <span className="absolute -top-1 bg-red-700 text-white text-xs rounded-full px-2 py-0.5">
                    {cartItemCount}
                  </span>
                )}
                
            </button>
            {/* <span className="hidden md:flex">Cart</span>  */}
            </Link>
            <div className="overflow-hidden">
            <SearchBar/>
            </div>
            <button onClick={toggleNavDrawer} className="md:hidden">
                <FiAlignRight  className="h-6 w-6 text-gray-700"/>
            </button>
        </div>
    </nav>
    <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer}/>

    {/* mobile navigation */}
    <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
    <div className="flex justify-end p-4">
     <button onClick={toggleNavDrawer}>
        <IoMdClose className="h-6 w-6 text-gray-600"/>
     </button>
    </div>
    <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Menu</h2>
        <nav className="space-y-4">
            <Link to="/" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">HOME</Link>
            <Link to="/about" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">ABOUT US</Link>
            <Link to="/collections/all" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">PRODUCTS</Link>
            <Link to="/contact" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">CONTACT US</Link>
        </nav>
    </div>
    </div>
    </div>
  )
}

export default Navbar
