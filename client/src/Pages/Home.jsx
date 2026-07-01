import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [cakes, setCakes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/cakes")
      .then((res) => res.json())
      .then((data) => setCakes(data.cakes))
      .catch((err) => console.log(err));
  }, []);

  const featuredCakes = cakes.slice(0, 6);

  return (
    <div className="bg-pink-50">

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-gradient-to-r from-pink-600 to-rose-500">
        <div className="text-center text-white px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Cakes By
          </h1>

          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Freshly baked cakes crafted with love for birthdays,
            anniversaries, weddings and every special occasion.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/cakes">
              <button className="bg-white text-pink-600 px-8 py-4 rounded-full font-bold hover:scale-105 transition">
                Explore Cakes
              </button>
            </Link>

            <Link to="/cakes">
              <button className="border-2 border-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-pink-600 transition">
                Order Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white p-8 rounded-3xl shadow-md text-center">
            <div className="text-5xl mb-4">🎂</div>
            <h3 className="font-bold text-xl mb-2">
              Fresh Cakes
            </h3>
            <p className="text-gray-600">
              Baked fresh daily with premium ingredients.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-md text-center">
            <div className="text-5xl mb-4">✨</div>
            <h3 className="font-bold text-xl mb-2">
              Custom Designs
            </h3>
            <p className="text-gray-600">
              Personalized cakes for every celebration.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-md text-center">
            <div className="text-5xl mb-4">🚚</div>
            <h3 className="font-bold text-xl mb-2">
              Fast Delivery
            </h3>
            <p className="text-gray-600">
              On-time delivery for all special occasions.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-md text-center">
            <div className="text-5xl mb-4">❤️</div>
            <h3 className="font-bold text-xl mb-2">
              Made With Love
            </h3>
            <p className="text-gray-600">
              Every cake is handcrafted with care.
            </p>
          </div>

        </div>
      </section>

      {/* Featured Cakes */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800">
            Featured Cakes
          </h2>

          <Link
            to="/cakes"
            className="text-pink-600 font-semibold"
          >
            View All →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCakes.map((cake) => (
            <div
              key={cake._id}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <img
                src={cake.images?.[0]}
                alt={cake.name}
                className="h-64 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  {cake.name}
                </h3>

                <p className="text-gray-500 mt-2">
                  {cake.category}
                </p>

                <div className="flex justify-between items-center mt-5">
                  <span className="text-pink-600 text-2xl font-bold">
                    ₹{cake.price}
                  </span>

                  <Link to={`/cake/${cake._id}`}>
                    <button className="bg-pink-600 text-white px-5 py-2 rounded-xl hover:bg-pink-700">
                      View
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-12">
            Cake Categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            {[
              "Birthday",
              "Wedding",
              "Anniversary",
              "Chocolate",
              "Cupcake",
              "Fruit",
              "Custom",
              "Pastry",
            ].map((category) => (
              <div
                key={category}
                className="bg-pink-50 rounded-2xl p-8 text-center shadow hover:shadow-lg transition cursor-pointer"
              >
                <h3 className="font-bold text-lg">
                  {category}
                </h3>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <div className="bg-white p-8 rounded-3xl shadow text-center">
            <h3 className="text-4xl font-bold text-pink-600">
              1000+
            </h3>
            <p>Cakes Delivered</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow text-center">
            <h3 className="text-4xl font-bold text-pink-600">
              500+
            </h3>
            <p>Happy Customers</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow text-center">
            <h3 className="text-4xl font-bold text-pink-600">
              50+
            </h3>
            <p>Cake Designs</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow text-center">
            <h3 className="text-4xl font-bold text-pink-600">
              5★
            </h3>
            <p>Customer Rating</p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-pink-600 to-rose-500 py-20 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">

          <h2 className="text-5xl font-bold mb-6">
            Make Every Celebration Sweeter
          </h2>

          <p className="text-xl mb-8">
            Order your dream cake today and create unforgettable memories.
          </p>

          <Link to="/contact">
            <button className="bg-white text-pink-600 px-10 py-4 rounded-full font-bold hover:scale-105 transition">
              Contact Us
            </button>
          </Link>

        </div>
      </section>

    </div>
  );
}

export default Home;