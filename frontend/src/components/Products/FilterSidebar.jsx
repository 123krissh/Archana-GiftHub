import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = ({ products, setFilteredProducts }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: "",
    size: [],
    material: [],
    minPrice: 0,
    maxPrice: 10000,
  });

  const categories = [
    "Customized Frame",
    "Collage Photo Frame",
    "Customized Cup",
    "Customized Pillow",
  ];

  const sizes = ["8x10", "10x12", "12x15", "15x18", "20x20"];

  const materials = [
    "Premium Wood Fibre",
    "Engraved Wood",
    "Ceramic",
    "Soft Fabric",
    "Premium Wood",
    "Acrylic & LED",
    "Polyester",
    "PLA Plastic",
  ];

  // Apply filters to product list
  const applyFilters = () => {
    if (!filters || !products || products.length === 0) return;
  
    const {
      category,
      size: selectedSizes,
      material: selectedMaterials,
      minPrice,
      maxPrice,
    } = filters;
  
    const filtered = products.filter((product) => {
      const price = product.price || product.discountPrice;
  
      const matchesCategory =
        !category || product.category === category;
  
      const matchesMaterial =
        selectedMaterials.length === 0 ||
        selectedMaterials.includes(product.material);
  
      const matchesPrice = price >= minPrice && price <= maxPrice;
  
      const matchesSize =
        selectedSizes.length === 0 ||
        (Array.isArray(product.sizes) &&
           selectedSizes.some((selectedSize) =>
              product.sizes.includes(selectedSize)
            ));
  
      return (
        matchesCategory &&
        matchesMaterial &&
        matchesPrice &&
        matchesSize
      );
    });
  
    setFilteredProducts(filtered);
  };  

  // Update state from URL
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    const min = parseInt(params.minPrice) || 0;
    const max = parseInt(params.maxPrice) || 10000;

    const updatedFilters = {
      category: params.category || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      minPrice: min,
      maxPrice: max,
    };

    setFilters(updatedFilters);
  }, [searchParams]);

  useEffect(() => {
    if (products) applyFilters();
  }, [filters, products]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };

    if (type === "checkbox") {
      newFilters[name] = checked
        ? [...newFilters[name], value]
        : newFilters[name].filter((item) => item !== value);
    } else if (type === "radio") {
      newFilters[name] = value;
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value);
    let newFilters = { ...filters };

    if (type === "min") {
      newFilters.minPrice = Math.min(value, newFilters.maxPrice);
    } else {
      newFilters.maxPrice = Math.max(value, newFilters.minPrice);
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();

    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.set(key, newFilters[key].join(","));
      } else if (
        newFilters[key] !== "" &&
        newFilters[key] !== undefined &&
        !Array.isArray(newFilters[key])
      ) {
        params.set(key, newFilters[key]);
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const clearFilters = () => {
    const cleared = {
      category: "",
      size: [],
      material: [],
      minPrice: 0,
      maxPrice: 10000,
    };
    setFilters(cleared);
    setSearchParams({});
    navigate("?");
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* Category */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        <div className="flex items-center mb-1">
          <input
            type="radio"
            name="category"
            value=""
            onChange={handleFilterChange}
            checked={filters.category === ""}
            className="mr-2 h-4 text-blue-500 border-gray-300"
          />
          <span className="text-gray-700">All</span>
        </div>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              onChange={handleFilterChange}
              checked={filters.category === category}
              className="mr-2 h-4 text-blue-500 border-gray-300"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      {/* Size */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Size</label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="size"
              value={size}
              onChange={handleFilterChange}
              checked={filters.size.includes(size)}
              className="mr-2 h-4 w-4 text-blue-500 border-gray-300"
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>

      {/* Material */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Material</label>
        {materials.map((material) => (
          <div key={material} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="material"
              value={material}
              onChange={handleFilterChange}
              checked={filters.material.includes(material)}
              className="mr-2 h-4 w-4 text-blue-500 border-gray-300"
            />
            <span className="text-gray-700">{material}</span>
          </div>
        ))}
      </div>

      {/* Price */}
      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2">
          Price Range
        </label>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-500">
              Min: ₹{filters.minPrice}
            </label>
            <input
              type="range"
              min="0"
              max="10000"
              value={filters.minPrice}
              onChange={(e) => handlePriceChange(e, "min")}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">
              Max: ₹{filters.maxPrice}
            </label>
            <input
              type="range"
              min="0"
              max="10000"
              value={filters.maxPrice}
              onChange={(e) => handlePriceChange(e, "max")}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="w-full bg-red-100 text-red-600 p-2 rounded-lg text-sm hover:bg-red-200"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterSidebar;