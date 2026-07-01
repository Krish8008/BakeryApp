import React from "react";

function About() {
  return (
    <div className="bg-pink-50 min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About Cakes By Snehal
          </h1>

          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Creating delicious memories with handcrafted cakes made with love,
            creativity, and the finest ingredients.
          </p>
        </div>
      </section>

      {/* About Story */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>
            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587"
              alt="Cake"
              className="rounded-3xl shadow-xl w-full h-[450px] object-cover"
            />
          </div>

          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Our Story
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Welcome to <span className="font-semibold text-pink-600">
                Cakes By Snehal
              </span>,
              where every cake is crafted with passion and attention to detail.
              We specialize in creating beautiful and delicious cakes for
              birthdays, anniversaries, weddings, baby showers, and all your
              special celebrations.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed">
              Our mission is simple — to bring joy to every occasion through
              fresh ingredients, unique designs, and unforgettable flavors.
              Every order is prepared with care to make your celebrations even
              sweeter.
            </p>
          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-pink-50 p-8 rounded-3xl shadow-sm hover:shadow-lg transition">
              <div className="text-5xl mb-4">🎂</div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Freshly Baked
              </h3>

              <p className="text-gray-600">
                Every cake is freshly prepared using premium ingredients to
                ensure the perfect taste and quality.
              </p>
            </div>

            <div className="bg-pink-50 p-8 rounded-3xl shadow-sm hover:shadow-lg transition">
              <div className="text-5xl mb-4">✨</div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Custom Designs
              </h3>

              <p className="text-gray-600">
                Personalized cakes designed to match your celebration theme and
                special requirements.
              </p>
            </div>

            <div className="bg-pink-50 p-8 rounded-3xl shadow-sm hover:shadow-lg transition">
              <div className="text-5xl mb-4">🚚</div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Timely Delivery
              </h3>

              <p className="text-gray-600">
                Reliable and fast delivery to ensure your cake arrives fresh and
                on time for your celebration.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            <div className="bg-white rounded-3xl p-8 text-center shadow-md">
              <h3 className="text-4xl font-bold text-pink-600">500+</h3>
              <p className="text-gray-600 mt-2">Happy Customers</p>
            </div>

            <div className="bg-white rounded-3xl p-8 text-center shadow-md">
              <h3 className="text-4xl font-bold text-pink-600">1000+</h3>
              <p className="text-gray-600 mt-2">Cakes Delivered</p>
            </div>

            <div className="bg-white rounded-3xl p-8 text-center shadow-md">
              <h3 className="text-4xl font-bold text-pink-600">50+</h3>
              <p className="text-gray-600 mt-2">Cake Designs</p>
            </div>

            <div className="bg-white rounded-3xl p-8 text-center shadow-md">
              <h3 className="text-4xl font-bold text-pink-600">5★</h3>
              <p className="text-gray-600 mt-2">Customer Rating</p>
            </div>

          </div>

        </div>
      </section>

      {/* Instagram Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto text-center px-6">

          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Follow Us On Instagram
          </h2>

          <p className="text-gray-600 text-lg mb-8">
            See our latest cake creations, customer celebrations, and custom
            cake designs.
          </p>

          <a
            href="https://www.instagram.com/cakes_by_snehal_/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition"
          >
            📸 @cakes_by_snehal_
          </a>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">

          <h2 className="text-4xl font-bold mb-4">
            Ready To Order Your Dream Cake?
          </h2>

          <p className="text-lg mb-8">
            Let us make your special moments sweeter with a custom-made cake.
          </p>

          <button className="bg-white text-pink-600 px-8 py-4 rounded-full font-bold hover:bg-pink-100 transition">
            Order Now
          </button>

        </div>
      </section>

    </div>
  );
}

export default About;