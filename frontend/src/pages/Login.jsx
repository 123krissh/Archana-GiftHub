import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import login from "../assets/login.png";
import { loginUser } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { mergeCart } from '../redux/slices/cartSlice';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {user, guestId} = useSelector((state) => state.auth);
  const {cart} = useSelector((state) => state.cart);

// Get redirect parameter and check if it's checkout or something
const redirect = new URLSearchParams(location.search).get("redirect") || "/";
const isCheckoutRedirect = redirect.includes("checkout");

useEffect(() => {
  if(user) {
    if(cart?.products.length > 0 && guestId) {
      dispatch(mergeCart({guestId, user})).then(() => {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      });
    } else {
      navigate(isCheckoutRedirect ? "/checkout" : "/");
    }
  }
}, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-100 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl">
        <div className="flex justify-center mb-6">
          <h1 className=" font-medium">Welcome in Archana Gift Hub</h1>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Hey there!👋 </h2>
        <p className="text-center mb-6">Enter your username and password to Login.</p>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-2xl" placeholder='Enter your email address' />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-2xl" placeholder='Enter your password' />
        </div>
        <button type='submit' className="w-full bg-black text-white p-2 rounded-2xl font-semibold hover:bg-gray-800 transition">Sign In</button>
        <p className="mt-6 text-center text-sm">Don't have an account?{" "}
          <Link to={`/register?redirect=${encodeURIComponent(redirect)}`} className="text-blue-500">Register</Link>
        </p>
      </form>
      </div>
      <div className="hidden md:block w-1/2 bg-gray-800">
       <div className="h-full flex flex-col justify-center items-center">
        <img src={login} alt="Login to Account" className="h-[700px] w-full object-cover" />
       </div>
      </div>
    </div>
  )
}

export default Login
