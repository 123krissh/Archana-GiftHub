import React from 'react'
import Hero from '../components/Layout/Hero'
import CollectionSection from '../components/Products/CollectionSection'
import ProductDetails from '../components/Products/ProductDetails'
import Card from '../components/Layout/Card'
import About from '../components/Layout/About'

const Home = () => {
  return (
    <div>
      <Hero/>
      <div className="mt-10">
        <h1 className="text-3xl ml-8 font-bold">Our Collections</h1>
      <CollectionSection/>
      </div>
      <Card/>
      <div className="mt-5">
        <h1 className="text-3xl ml-8 font-bold mb-4">Our New Arivals</h1>
      <ProductDetails/>
      </div>
      
      
    
      <About/>
    </div>
  )
}

export default Home
