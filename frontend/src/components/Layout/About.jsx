import React from 'react'

const About = () => {
  return (
    <div className="bg-gray-100 py-12 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Section */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Archana Gift Hub: The Leader in Customisation
          </h2>
          <p className="text-gray-600 leading-relaxed">
            For more than 20 years, Archana Gift & Print Hub has helped business owners, 
            entrepreneurs, and individuals create their identities with custom 
            designs and professional marketing. We make Special Gifts for your favourite people,
            Preserve your cherished moments. Our online printing services 
            are intended to help you find high-quality customised products 
            you need—visiting cards, personalized clothing, gifting products, customized cups,
            and much more.
          </p>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Even Low Quantities @ Best Prices</h3>
            <p className="text-gray-600">
              We offer low/single product quantities at affordable prices.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">High Quality Products and Easy Design</h3>
            <p className="text-gray-600">
              Our wide selection of high-quality products and online design 
              tools make it easy for you to customize and order your favorite products.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Free Replacement or Full Refund</h3>
            <p className="text-gray-600">
              We stand by everything we sell. So if you’re not satisfied, we’ll make it right.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
