import React, { useEffect, useState } from 'react'
// import { FaFilter } from 'react-icons/fa';
import SortOption from '../components/Products/SortOption';
import ProductGrid from '../components/Products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productsSlice';

const CollectionPage = () => {
  const {collection} = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const {products, loading, error} = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);

  useEffect(() => {
    dispatch(fetchProductsByFilters({collection, ...queryParams}));
  }, [dispatch, collection, searchParams]);
   
  return (
     <div className="flex flex-col lg:flex-row">
      {/* Mobile filter button
      <button className="lg:hidden border p-2 flex justify-center items-center">
        <FaFilter className="mr-2"/>
      </button> */}

      <div className="flex-grow p-4">
        {/* <h2 className="text-xl uppercase mb-4">All Products</h2> */}

        {/* Sort Option */}
        <SortOption/>

        {/* Product Grid */}
        <ProductGrid products={products} loading={loading} error={error}/>
      </div>
     </div>
  )
}

export default CollectionPage
