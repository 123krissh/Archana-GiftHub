import React from 'react'
import heroImg from "../../assets/BG.jpg";
import { Link } from 'react-router-dom';


const Hero = () => {
  return (
    <section className="relative">
        <img src={heroImg} alt="GIFT HUB" className="w-full h-full md:h-[40rem] object-cover"/>

        <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center  p-6  text-black">
                <h1 className="text-3xl md:text-8xl font-bold  tracking-tighter uppercase mb-3" style={{fontFamily: "Grechen Fuemen",}}>ARCHANA GIFT HUB </h1>
                <p className=" font-semibold tracking-tighter mb-6" >Find the perfect personalized gifts for every occasion and make every moment memorable.</p>
                <Link to="#" className="bg-purple-400 px-5 py-2 rounded-sm text-lg font-semibold  hover:bg-purple-500">Shop Now</Link>
            </div>
        </div>
    </section>
  )
}

export default Hero
