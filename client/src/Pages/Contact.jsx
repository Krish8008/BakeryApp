import React from "react";

function Contact() {
  return (
    <div className="bg-pink-50 min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Contact Us
          </h1>

          <p className="text-lg md:text-xl opacity-90">
            We'd love to hear from you. Let's make your celebrations sweeter!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Contact Information */}
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Get In Touch
            </h2>

            <div className="space-y-6">

              <div className="flex items-center gap-4">
                <div className="bg-pink-100 p-4 rounded-full">
                  📞
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Phone
                  </h3>
                  <p className="text-gray-600">
                    +91 2X2X2X2X2
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-pink-100 p-4 rounded-full">
                  📧
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Email
                  </h3>
                  <p className="text-gray-600">
                    cakesbysnehal@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-pink-100 p-4 rounded-full">
                  📍
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Location
                  </h3>
                  <p className="text-gray-600">
                    Nagpur, Maharashtra, India
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-pink-100 p-4 rounded-full">
                  ⏰
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Working Hours
                  </h3>
                  <p className="text-gray-600">
                    Mon - Sun : 9:00 AM - 9:00 PM
                  </p>
                </div>
              </div>

            </div>

            {/* Social Links */}
            <div className="mt-10">
              <h3 className="font-semibold text-gray-800 mb-4">
                Follow Us
              </h3>

              <a
                href="https://www.instagram.com/cakes_by_snehal_/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full hover:scale-105 transition"
              >
                📸 Instagram
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Send a Message
            </h2>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
              />

              <textarea
                rows="6"
                placeholder="Tell us about your cake requirement..."
                className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-xl font-semibold transition"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-6">

          <h2 className="text-4xl font-bold mb-4">
            Ready To Order Your Dream Cake?
          </h2>

          <p className="text-lg mb-8">
            Contact us today and let us create the perfect cake for your special occasion.
          </p>

          <a
            href="https://www.instagram.com/cakes_by_snehal_/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-pink-600 px-8 py-4 rounded-full font-bold hover:bg-pink-100 transition"
          >
            Order Now
          </a>

        </div>
      </section>

    </div>
  );
}

export default Contact;