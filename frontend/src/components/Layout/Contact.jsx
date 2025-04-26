import React, { useState } from 'react'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        email: "",
        message: "",
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        setFormData({ name: "", contact: "", email: "", message: "" });
      };
    
      return (
        <div className="flex flex-col items-center gap-8 p-6">
          {/* Information Section */}
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-100 p-8 rounded-lg shadow-lg">
            <div>
              <h2 className="text-2xl font-semibold mb-4">OUR INFORMATION</h2>
              <p className="text-gray-600"><strong>Office Address:</strong>Front of Bhargaw Complex, Station Rd, Bhandariyon Ki Gali, Nagaur, Rajasthan 341001</p>
              <p className="text-gray-600"><strong>Call Us:</strong> +91 8619604816</p>
              <p className="text-gray-600"><strong>Call Us:</strong> +91 8432085210</p>
              <p className="text-gray-600"><strong>General Enquiry:</strong> Archana.gifthub@gmail.com</p>
              <p className="text-gray-600"><strong>Our Timing:</strong> Mon - Sat: 10:00 AM - 07:00 PM</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">ENQUIRY FORM</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    className="w-1/2 p-3 border rounded-md"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="contact"
                    placeholder="Contact No."
                    required
                    className="w-1/2 p-3 border rounded-md"
                    value={formData.contact}
                    onChange={handleChange}
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Id"
                  required
                  className="w-full p-3 border rounded-md"
                  value={formData.email}
                  onChange={handleChange}
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  className="w-full p-3 border rounded-md"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                <button type="submit" className="bg-gray-700 text-white py-2 px-6 rounded-md hover:bg-gray-900">
                  Submit
                </button>
              </form>
            </div>
          </div>
    
          {/* Map Section */}
          <div className="w-full max-w-5xl flex flex-col items-center">
            <button className="bg-gray-700 text-white py-2 px-6 rounded-md mb-4 hover:bg-gray-900">
              Get Direction
            </button>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d673.9735690657284!2d73.73242489468528!3d27.199695583690488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396a9176e485afd3%3A0xa33e43009f91619!2sArchana%20Studio!5e0!3m2!1sen!2sin!4v1743694894930!5m2!1sen!2sin" 
              className="w-full h-64 rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      );
    };

export default Contact
