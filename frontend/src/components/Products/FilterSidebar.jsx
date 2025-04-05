import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const FilterSidebar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        category: "",
        size: [],
        material: [],
        minPrice: 0,
        maxPrice: 100,
    });

    const [priceRange, setPriceRange] = useState([0, 100]);

    const categories = ["Customized Frame", "Collage Photo Frame", "Customized Cup", "Customized Pillow"];

    const sizes = ["8x10", "10x12", "12x15", "12x18", "15x20", "18x24"];

    const materials = ["Acrylic", "Polyester", "Cotton Blend", "PLA Plastic"];

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);

        setFilters({
            category: params.category || "",
            size: params.size ? params.size.split(",") : [],
            material: params.material ? params.material.split(",") : [],
            minPrice: params.minPrice || 0,
            maxPrice: params.maxPrice || 100,
        });
        setPriceRange([0, params.maxPrice || 100]);
    }, [searchParams]);

    const handleFilterChange = (e) => {
        const {name, value, checked, type} =e.target;
        let newFilters = {...filters};

        if(type === "checkbox") {
            if(checked) {
                newFilters[name] = [...(newFilters[name] || []), value];
            } else {
                newFilters[name] = newFilters[name].filter((item) => item !== value);
            }
        } else {
            newFilters[name] = value;
        }
        setFilters(newFilters);
        updateURLParams(newFilters);
    };

    const updateURLParams = (newFilters) => {
        const params = new URLSearchParams();
        Object.keys(newFilters).forEach((key) => {
            if(Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
                params.append(key, newFilters[key].join(","));
            } else if (newFilters[key]) {
                params.append(key, newFilters[key]);
            }
        });
        setSearchParams(params);
        navigate(`?${params.toString()}`);
    };

    const handlePriceChange = (e) => {
        const newPrice = e.target.value;
        setPriceRange([0, newPrice]);
        const newFilters = {...filters, minPrice: 0, maxPrice: newPrice};
        setFilters(filters);
        updateURLParams(newFilters);;
    };

  return (
    <div className="p-4">
        <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>
        {/* Category Filter */}
        <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-2">Category</label>
            {categories.map((category) => (
                <div key={category} className="flex items-center mb-1">
                    <input type="radio" name="category" value={category} onChange={handleFilterChange} checked={filters.category === category} className="mr-2 h-4 text-blue-500 focus:ring-blue-400 border-gray-300" />
                    <span className="text-gray-700">{category}</span>
                </div>
            ))}
        </div>

        {/* Size Filter */}
        <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-2">Size</label>
            {sizes.map((size) => (
                <div key={size} className="flex items-center mb-1">
                    <input type="checkbox" name="size" value={size} onChange={handleFilterChange} checked={filters.size.includes(size)} className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300" />
                    <span className="text-gray-700">{size}</span>
                </div>
            ))}
        </div>

        {/* Material Filter */}
        <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-2">Material</label>
            {materials.map((material) => (
                <div key={material} className="flex items-center mb-1">
                    <input type="checkbox" name="material" value={material} onChange={handleFilterChange} checked={filters.material.includes(material)} className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300" />
                    <span className="text-gray-700">{material}</span>
                </div>
            ))}
        </div>

        {/* Price Range Filter */}
        <div className="mb-8">
            <label className="block text-gray-600 font-medium mb-2">Price Range</label>
            <input type="range" name="priceRange" min={0} max={100} value={priceRange} onChange={handlePriceChange} className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer" />
            <div className="flex justify-between text-gray-600 mt-2">
                <span>₹0</span>
                <span>₹{priceRange[1]}</span>
            </div>
        </div>
    </div>
  )
}

export default FilterSidebar
