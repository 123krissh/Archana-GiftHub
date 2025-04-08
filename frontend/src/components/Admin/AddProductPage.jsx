import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createProduct } from '../../redux/slices/adminProductSlice';

const AddProductPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const {Product} = useSelector((state) => state.auth);
    // const {selectedProduct, loading, error} = useSelector((state) => state.products);

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        discountPrice: "",
        countInStock: "", 
        category: "",
        sizes: [],
        tags: [],
        collections: "",
        material: "",
        isFeatured: false,
        isPublished: false,
        images: [], 
    });

    const [uploading, setUploading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageUpload = async(e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        try {
            setUploading(true);
            const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, formData, 
                {
                    headers: {"Content-Type": "multiPart/form-data"},
                }
            );
            setProductData((prevData) => ({
                ...prevData,
                images: [...prevData.images, {url: data.imageUrl, altText: ""}],
            }));
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
    
      const payload = {
        ...productData,
        isFeatured: Boolean(productData.isFeatured),
        isPublished: Boolean(productData.isPublished),
      };
    
      // console.log("Sending payload:", payload);
    
      dispatch(createProduct(payload));
      navigate("/admin/products");
    };   
    

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Add new Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-6">
            <label className="block font-semibold mb-2">Product Name</label>
            <input type="text" name="name" value={productData.name} onChange={handleChange} className="w-full border-gray-400 border rounded-md p-2" required />
        </div>
        {/* Description */}
        <div className="mb-6">
            <label className="block font-semibold mb-2">Description</label>
            <textarea name="description" value={productData.description} onChange={handleChange} className="w-full  border-gray-400 border rounded-md p-2" rows={5} required />
        </div>
        {/* Price */}
        <div className="mb-6">
            <label className="block font-semibold mb-2">Price</label>
            <input type="number" name="price" value={productData.price} onChange={handleChange} className="w-full  border-gray-400 border rounded-md p-2" />
        </div>
         {/* discountPrice */}
         <div className="mb-6">
            <label className="block font-semibold mb-2">Discount Price</label>
            <input type="number" name="discountPrice" value={productData.discountPrice} onChange={handleChange} className="w-full  border-gray-400 border rounded-md p-2" />
        </div>
        {/* Count In Stock */}
        <div className="mb-6">
            <label className="block font-semibold mb-2">Count in Stock</label>
            <input type="number" name="countInStock" value={productData.countInStock} onChange={handleChange} className="w-full  border-gray-400 border rounded-md p-2" />
        </div>
        {/* Category */}
        <div className="mb-6">
            <label className="block font-semibold mb-2">Category</label>
            <input type="text" name="category" value={productData.category} onChange={handleChange} className="w-full  border-gray-400 border rounded-md p-2" />
        </div>
        {/* Collection */}
        <div className="mb-6">
            <label className="block font-semibold mb-2">Collection</label>
            <input type="text" name="collections" value={productData.collections} onChange={handleChange} className="w-full  border-gray-400 border rounded-md p-2" />
        </div>
         {/* Material */}
         <div className="mb-6">
            <label className="block font-semibold mb-2">Material</label>
            <input type="text" name="material" value={productData.material} onChange={handleChange} className="w-full  border-gray-400 border rounded-md p-2" />
        </div>
        {/* Sizes */}
        <div className="mb-6">
            <label className="block font-semibold mb-2">Sizes (comma-separated)</label>
            <input type="text" name="sizes" value={productData.sizes.join(", ")} onChange={(e) => setProductData({ ...productData, sizes:e.target.value.split(",").map((size) => size.trim()),})} className="w-full  border-gray-400 border rounded-md p-2" />
        </div>
        {/* Tags */}
        <div className="mb-6">
            <label className="block font-semibold mb-2">Tags (comma-separated)</label>
            <input type="text" name="tags" value={productData.tags.join(", ")} onChange={(e) => setProductData({ ...productData, tags:e.target.value.split(",").map((tags) => tags.trim()),})} className="w-full  border-gray-400 border rounded-md p-2" />
        </div>

        <div className="flex gap-6 mb-6">
           <label className="flex items-center gap-2 font-medium">
            <input
               type="checkbox"
               name="isFeatured"
               checked={productData.isFeatured}
               onChange={handleChange}
             />
             Featured
           </label>
           <label className="flex items-center gap-2 font-medium">
             <input
               type="checkbox"
               name="isPublished"
               checked={productData.isPublished}
               onChange={handleChange}
             />
             Published
          </label>
       </div>

        {/* Image Upload */}
        <div className="mb-6">
            <label className="block font-semibold mb-2">Upload Image</label>
            <input type="file" onChange={handleImageUpload} className="w-full  border-gray-400 border rounded-md p-2"/>
            {uploading && <p>Uploading image...</p>}
            <div className="flex gap-4 mt-4">
                {productData.images.map((image, index) => (
                    <div key={index}>
                        <img src={image.url} alt={image.altText || "Product Image"} className="w-20 h-20 object-cover rounded-md shadow-md" />
                    </div>
                ))}
            </div>
        </div>
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors">Add Product</button>
      </form>
    </div>
  )
}

export default AddProductPage