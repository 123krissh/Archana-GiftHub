import React from 'react'
import P11 from '../../assets/P11.jpg'
import P16 from '../../assets/P16.jpg'
import P14 from '../../assets/P14.webp'
import P20 from '../../assets/P20.jpg'
import { Link } from 'react-router-dom'


const CollectionSection = () => {
  return (
    <section className="py-4 px-4">
        <div className="container mx-auto flex flex-col lg:flex-row gap-8 py-6">
            {/* Custom collage */}
            <div className="relative flex-1 ">
                <img src={P11} alt="Coustom Collage" className="w-full h-[30rem] object-cover shadow-2xl rounded-4xl transform transition duration-300 hover:scale-110"/>
                <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-3 rounded-2xl shadow-2xl">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Custom Collage</h2>
                     <Link to="/collections/all?product=Collage" className="text-gray-900 underline">Shop Now</Link>
                </div>
            </div>
            {/* Photo Frames */}
            <div className="relative flex-1">
                <img src={P14} alt="Photo Frames" className="w-full h-[30rem] object-cover shadow-2xl rounded-4xl transform transition duration-300 hover:scale-110"/>
                <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-3 rounded-2xl shadow-2xl ">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Photo Frames</h2>
                     <Link to="/collections/all?product=Collage" className="text-gray-900 underline">Shop Now</Link>
                </div>
            </div>
            {/* Custom Pillow */}
            <div className="relative flex-1">
                <img src={P16} alt="Custom Pillow" className="w-full h-[30rem] object-cover shadow-2xl rounded-4xl transform transition duration-300 hover:scale-110"/>
                <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-3 rounded-2xl shadow-2xl">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Custom Pillow</h2>
                     <Link to="/collections/all?product=Collage" className="text-gray-900 underline">Shop Now</Link>
                </div>
            </div>
            {/* Custom Cup */}
            <div className="relative flex-1">
                <img src={P20} alt="Custom Cup" className="w-full h-[30rem] object-cover shadow-2xl rounded-4xl transform transition duration-300 hover:scale-110"/>
                <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-3 rounded-2xl shadow-2xl">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Custom Cup</h2>
                     <Link to="/collections/all?product=Collage" className="text-gray-900 underline">Shop Now</Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default CollectionSection
