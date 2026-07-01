import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cakes() {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCakes();
  }, []);

  const fetchCakes = async () => {
    
    try {
      const response = await fetch(
        "http://localhost:5000/api/cakes"
      );

      const data = await response.json();

      if (data.success) {
        setCakes(data.cakes);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-pink-50">
        <h2 className="text-xl font-semibold text-pink-600">
          Loading Cakes...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r text-pink-500 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Freshly Baked Cakes 🎂
          </h1>

          <p className="text-lg md:text-xl opacity-90">
            Celebrate every moment with delicious handmade cakes
          </p>
        </div>
      </section>

      {/* Cake Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Our Collection
        </h2>

        {cakes.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No Cakes Available
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cakes.map((cake) => (
              <Link to={`/cake/${cake._id}`}>
                <div
                  key={cake._id}
                  className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative">
                    <img
                      src={
                        cake.images?.[0] ||
                        "https://via.placeholder.com/500x350"
                      }
                      alt={cake.name}
                      className="w-full h-64 object-cover"
                    />

                    <span className="absolute top-3 right-3 bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {cake.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {cake.name}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4">
                      {cake.description}
                    </p>

                    <div className="flex justify-between text-sm text-gray-500 mb-4">
                      <span>⚖️ {cake.weight}</span>
                      <span>🍫 {cake.flavor}</span>
                    </div>

                    {cake.eggless && (
                      <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs mb-4">
                        Eggless
                      </span>
                    )}

                    <div className="flex justify-between items-center mt-2">
                      <h4 className="text-2xl font-bold text-pink-600">
                        ₹{cake.price}
                      </h4>

                      
                              <button className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-xl transition">
                                      View Details
                              </button>
                      

                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Cakes;