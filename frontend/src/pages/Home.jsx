import React, { useEffect, useState } from 'react'
import Hero from '../components/Layout/Hero'
import CollectionSection from '../components/Products/CollectionSection'
import ProductDetails from '../components/Products/ProductDetails'
import Card from '../components/Layout/Card'
import About from '../components/Layout/About'
import FeaturesSection from '../components/Products/FeaturesSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductGrid from '../components/Products/ProductGrid'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsByFilters } from '../redux/slices/productsSlice'
import axios from 'axios'

// const placeholderProducts = [
//   {
//       _id: 1,
//       name: "Product 1",
//       price: 149,
//       images: [{url: "https://images.meesho.com/images/products/462493757/ng1zq_512.jpg"}],
//   },
//   {
//       _id: 2,
//       name: "Product 2",
//       price: 149,
//       images: [{url: "https://images.meesho.com/images/products/462493757/ng1zq_512.jpg"}],
//   },
//   {
//       _id: 3,
//       name: "Product 3",
//       price: 99,
//       images: [{url: "https://giftsbyrashi.com/wp-content/uploads/2023/05/Heart-Photo-Frame.webp"}],
//   },
//   {
//       _id: 4,
//       name: "Product 4",
//       price: 249,
//       images: [{url: "https://giftsbyrashi.com/wp-content/uploads/2023/05/Heart-Photo-Frame.webp"}],
//   },
//   {
//     _id: 5,
//     name: "Product 5",
//     price: 149,
//     images: [{url: "https://images.meesho.com/images/products/462493757/ng1zq_512.jpg"}],
// },
// {
//     _id: 6,
//     name: "Product 6",
//     price: 149,
//     images: [{url: "https://images.meesho.com/images/products/462493757/ng1zq_512.jpg"}],
// },
// {
//     _id: 7,
//     name: "Product 7",
//     price: 99,
//     images: [{url: "https://giftsbyrashi.com/wp-content/uploads/2023/05/Heart-Photo-Frame.webp"}],
// },
// {
//     _id: 8,
//     name: "Product 8",
//     price: 249,
//     images: [{url: "https://giftsbyrashi.com/wp-content/uploads/2023/05/Heart-Photo-Frame.webp"}],
// },
// ]

const Home = () => {
  const dispatch = useDispatch();
  const {products, loading, error} = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // fetch products for a specific collection
    dispatch(
      fetchProductsByFilters({
        category: "Customized Frame",
        limit: 8,
      })
    );
    // fetch best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
        
      }
    };
    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
      <Hero/>

      <CollectionSection/>

      <NewArrivals/>

      <Card/>

      <div className="container mx-auto">
      <h2 className="text-3xl text-center font-bold mb-2 mt-4">Top Products</h2>
      {/* {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id}/>
      ) : (
        <p className="text-center ">Loading best seller product...</p>
      )} */}
      
      <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <About/>
    </div>
  )
}

export default Home
