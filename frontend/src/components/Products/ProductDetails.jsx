import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import ProductGrid from "./ProductGrid";

const selectedProduct = {
    name: "gifts for love Wood Wall Photo Frame  (Multicolor, 1 Photo(s), A4)",
    Price: 399,
    OriginalPrice: 599,
    Description: "This photo frame is Made of Premium Wood Fibre and Washable Frame (No Glass Required ) Colour - Multicolour, Frame Can be washable with Water Photo required: Multiple Images Required. Quality frame with your Photo. After placing the order send photos and other customised details to the contact details given in product images",
    material: "Wood",
    sizes: ["8+12", "12+16", "13+9"],
    colors: ["red", "white", "black", "blue"],
    images: [
        {
            url: "https://images.meesho.com/images/products/462493757/ng1zq_512.jpg",
            altText: "Product",
        },
        {
            url: "https://giftsbyrashi.com/wp-content/uploads/2023/05/Heart-Photo-Frame.webp",
            altText: "Product",
        },
    ],
};


const similarProducts = [
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
        images: [{url: "https://images.meesho.com/images/products/462493757/ng1zq_512.jpg"}],
    },
    {
        _id: 4,
        name: "Product 4",
        price: 249,
        images: [{url: "https://images.meesho.com/images/products/462493757/ng1zq_512.jpg"}],
    },
    {
        _id: 5,
        name: "Product 5",
        price: 449,
        images: [{url: "https://images.meesho.com/images/products/462493757/ng1zq_512.jpg"}],
    },
]

const ProductDetails = () => {
    const [mainImage, setMainImage] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);


    useEffect(() => {
        if (selectedProduct?.images?.lenght > 0) {
            setMainImage(selectedProduct.images[0].url);
        }
    }, [selectedProduct]);

    const handleQuantityChange = (action) => {
        if (action === "plus") setQuantity((prev) => prev + 1);
        if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
    };

    const handleAddToCart = () => {
        if(!selectedSize || !selectedColor) {  
            toast.error("Please select a size and color before adding to cart.", {
                duration: 1000,
            });
            return;
        }
        setIsButtonDisabled(true);  
        setTimeout(() => {
            toast.success("Product added to cart!", {
                duration: 1000,
            });
            setIsButtonDisabled(false);
        }, 500);
    };


  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto bg-gray-100 p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
            {/* Left Thumbnails */}
            <div className="hidden md:flex flex-col space-y-4 mr-6">
                {selectedProduct.images.map((image, index) => (
                    <img key={index} src={image.url} alt={image.altText || `Thumbnail ${index}`} className= {`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black" : "border-gray-300"}`} onClick={() => setMainImage(image.url)} />
                ))}
            </div>
            {/* Main Image */}
            <div className="md:w-1/2">
            <div className="mb=4">
                <img src={mainImage} alt="Main Product" className="w-full h-auto object-cover rounded-lg"/>
            </div>
            </div>
            {/* Mobile Thumbnail */}
            <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4 mt-4">
                {selectedProduct.images.map((image, index) => (
                    <img key={index} src={image.url} alt={image.altText || `Thumbnail ${index}`} className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black" : "border-gray-300"}`} onClick={() => setMainImage(image.url)} />
                ))}
            </div>
            {/* Right Side */}
            <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">{selectedProduct.name}</h1>
            <p className="text-lg text-gray-600 mb-1 line-through">{selectedProduct.OriginalPrice && `${selectedProduct.OriginalPrice}`}</p>
            <p className="text-xl text-gray-500 mb-2">₹{selectedProduct.Price}</p>
            <p className=" text-gray-600 mb-4">{selectedProduct.Description}</p>
            <div className="mb-4">
                <p className="text-gray-700">Color:</p>
                <div className="flex gap-2 mt-2">
                    {selectedProduct.colors.map((color) => (
                        <button key={color} onClick={() => setSelectedColor(color)} className={`w-8 h-8 rounded-full border ${selectedColor === color ? "border-black border-4" : "border-gray-300"}`} style={{backgroundColor: color.toLocaleLowerCase(), filter: "brightness(0.5)",}}></button>
                    ))}
                </div>
            </div>
            <div className="mb-4">
            <p className="text-gray-700">Size:</p>
                <div className="flex gap-2 mt-2">
                    {selectedProduct.sizes.map((size) => (
                        <button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2 rounded border ${selectedSize === size ? "bg-black text-white" : ""}`}>{size}</button>
                    ))}
                </div>
            </div>
            <div className="mb-6">
                <p className="text-gray-700">Quantity:</p>
                <div className="flex items-center space-x-4 mt-2">
                    <button onClick={() => handleQuantityChange("minus")} className="px-2 py-1 bg-gray-200 rounded text-lg">-</button>
                    <span className="text-lg">{quantity}</span>
                    <button onClick={() => handleQuantityChange("plus")} className="px-2 py-1 bg-gray-200 rounded text-lg">+</button>
                </div>
            </div>
            <button onClick={handleAddToCart} disabled={isButtonDisabled} className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${isButtonDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-800"}`}>
                {isButtonDisabled ? "Adding..." : "ADD TO CART"}
                </button>

            <div className="mt-2 text-gray-700">
                <h3 className="text-xl font-bold mb-2">Characteristics:</h3>
                <table className="w-80 text-left text-sm text-gray-600">
                    <tbody>
                        <tr>
                            <td className="py-1">Material</td>
                            <td className="py-1">{selectedProduct.material}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
        </div>
        <div className="mt-10">
            <h2 className="text-xl text-center font-medium mb-4">You May Also Like</h2>
            <ProductGrid products={similarProducts}/>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
