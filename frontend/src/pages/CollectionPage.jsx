import React, { useEffect, useState } from 'react'
import { FaFilter } from 'react-icons/fa';
import SortOption from '../components/Products/SortOption';
import ProductGrid from '../components/Products/ProductGrid';

const CollectionPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: 1,
          name: "Product 1",
          price: 149,
          images: [{url: "https://images.meesho.com/images/products/462493757/ng1zq_512.jpg"}],
      },
      {
          _id: 2,
          name: "Product 2",
          price: 149,
          images: [{url: "https://images.meesho.com/images/products/462493757/ng1zq_512.jpg"}],
      },
      {
          _id: 3,
          name: "Product 3",
          price: 99,
          images: [{url: "https://giftsbyrashi.com/wp-content/uploads/2023/05/Heart-Photo-Frame.webp"}],
      },
      {
          _id: 4,
          name: "Product 4",
          price: 249,
          images: [{url: "https://giftsbyrashi.com/wp-content/uploads/2023/05/Heart-Photo-Frame.webp"}],
      },
      {
        _id: 5,
        name: "Product 5",
        price: 149,
        images: [{url: "https://images.meesho.com/images/products/462493757/ng1zq_512.jpg"}],
    },
    {
        _id: 6,
        name: "Product 6",
        price: 149,
        images: [{url: "https://images.meesho.com/images/products/462493757/ng1zq_512.jpg"}],
    },
    {
        _id: 7,
        name: "Product 7",
        price: 99,
        images: [{url: "https://giftsbyrashi.com/wp-content/uploads/2023/05/Heart-Photo-Frame.webp"}],
    },
    {
        _id: 8,
        name: "Product 8",
        price: 249,
        images: [{url: "https://giftsbyrashi.com/wp-content/uploads/2023/05/Heart-Photo-Frame.webp"}],
    },
    ];
    setProducts(fetchedProducts);
    }, 1000);
  }, []);
  return (
     <div className="flex flex-col lg:flex-row">
      {/* Mobile filter button
      <button className="lg:hidden border p-2 flex justify-center items-center">
        <FaFilter className="mr-2"/>
      </button> */}

      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Products</h2>

        {/* Sort Option */}
        <SortOption/>

        {/* Product Grid */}
        <ProductGrid products={products}/>
      </div>
     </div>
  )
}

export default CollectionPage
