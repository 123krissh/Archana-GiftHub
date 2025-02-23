import React from 'react'
import Hero from '../components/Layout/Hero'
import CollectionSection from '../components/Products/CollectionSection'
import ProductDetails from '../components/Products/ProductDetails'
import Card from '../components/Layout/Card'
import About from '../components/Layout/About'
import FeaturesSection from '../components/Products/FeaturesSection'
import NewArrivals from '../components/Products/NewArrivals'

const Home = () => {
  return (
    <div>
      <Hero/>

      <CollectionSection/>

      <Card/>

      <NewArrivals/>

      <div>
      <ProductDetails/>
      </div>

      <About/>
      
      <FeaturesSection/>
    </div>
  )
}

export default Home
