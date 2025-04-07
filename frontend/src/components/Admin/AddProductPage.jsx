import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../redux/slices/adminProductSlice';
import { useNavigate } from 'react-router-dom';

const AddProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    discountPrice: '',
    countInStock: '',
    category: '',
    collections: '',
    material: '',
    sizes: '',
    isFeatured: false,
    isPublished: false,
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   setImageFile(file);
  //   if (file) {
  //     setPreview(URL.createObjectURL(file));
  //   }
  // };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      'name', 'price', 'description', 'material', 'category', 'collections'
    ];
    const missingField = requiredFields.find(field => !productData[field]);
    if (missingField) {
      alert(`Please fill in the required field: ${missingField}`);
      return;
    }

    try {
      const formData = new FormData();

      if (imageFile) {
        formData.append('image', imageFile);
      }

      Object.entries(productData).forEach(([key, val]) => {
        if (key === 'sizes') {
          formData.append('sizes', JSON.stringify(val.split(',').map(s => s.trim())));
        } else {
          formData.append(key, typeof val === 'boolean' ? String(val) : val?.toString() ?? '');
        }
      });      

      setUploading(true);
      await dispatch(createProduct(formData)).unwrap();
      alert('✅ Product added successfully!');
      navigate('/admin/products');
    } catch (error) {
      console.error('❌ Error adding product:', error);
      alert(`Failed to add product: ${error.message || error}`);
    } finally {
      setUploading(false);
    }
  };

  const fields = [
    { label: 'Product Name', name: 'name', type: 'text' },
    { label: 'Description', name: 'description', type: 'textarea' },
    { label: 'Price', name: 'price', type: 'number' },
    { label: 'Discount Price', name: 'discountPrice', type: 'number' },
    { label: 'Count in Stock', name: 'countInStock', type: 'number' },
    { label: 'Category', name: 'category', type: 'text' },
    { label: 'Collections', name: 'collections', type: 'text' },
    { label: 'Material', name: 'material', type: 'text' },
    { label: 'Sizes (comma-separated)', name: 'sizes', type: 'text' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-8">
      <h2 className="text-3xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {fields.map(({ label, name, type }) => (
          <div key={name}>
            <label className="block font-semibold mb-2">{label}</label>
            {type === 'textarea' ? (
              <textarea
                name={name}
                value={productData[name]}
                onChange={handleChange}
                rows={4}
                required
                className="w-full border border-gray-300 rounded-md p-2"
              />
            ) : (
              <input
                type={type}
                name={name}
                value={productData[name]}
                onChange={handleChange}
                required={['name', 'price', 'description', 'category', 'collections'].includes(name)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            )}
          </div>
        ))}

        <div className="flex gap-6">
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

        <div>
          <label className="block font-semibold mb-2">Upload Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {uploading && <p className="text-sm text-gray-500 mt-2">Uploading image...</p>}
          {preview && (
            <div className="mt-4">
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-md border"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          {uploading ? 'Uploading...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;