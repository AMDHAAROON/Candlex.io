import { useState } from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";

// Dummy product data
const candleProducts = [
  {
    id: 1,
    name: "Rose Bliss",
    price: 250,
    fragrance: "Rose",
    image: "../Assets/seperate/c1.png",
  },
  {
    id: 2,
    name: "Vanilla Calm",
    price: 300,
    fragrance: "Vanilla",
    image: "../Assets/seperate/c2.png",
  },
  {
    id: 3,
    name: "Sandal Serenity",
    price: 350,
    fragrance: "Sandalwood",
    image: "../Assets/seperate/c3.png",
  },
  {
    id: 4,
    name: "Lavender Dreams",
    price: 220,
    fragrance: "Lavender",
    image: "../Assets/seperate/c4.png",
  },
  // Add more as needed
];

export default function CandleShop() {
  const [selectedFragrance, setSelectedFragrance] = useState("All");
  const [priceRange, setPriceRange] = useState(500);

  const fragrances = ["All", ...new Set(candleProducts.map((p) => p.fragrance))];

  const filteredProducts = candleProducts.filter((product) => {
    const matchesFragrance =
      selectedFragrance === "All" || product.fragrance === selectedFragrance;
    const matchesPrice = product.price <= priceRange;
    return matchesFragrance && matchesPrice;
  });

  return (
    <>
    <Navbar className=""/>
    <div className="flex flex-col md:flex-row gap-6 mt-24 p-6 bg-yellow-50 min-h-screen">
      
      {/* Filter Sidebar */}
      <aside className="w-full md:w-1/4 bg-white rounded-xl p-4 shadow-md sticky top-4 h-fit">
        <h2 className="text-xl font-bold text-amber-600 mb-4">Filters</h2>

        {/* Fragrance Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Fragrance</h3>
          <ul className="space-y-1">
            {fragrances.map((fragrance) => (
              <li key={fragrance}>
                <label className="inline-flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="radio"
                    name="fragrance"
                    value={fragrance}
                    checked={selectedFragrance === fragrance}
                    onChange={() => setSelectedFragrance(fragrance)}
                    className="accent-amber-500"
                  />
                  {fragrance}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Range Filter */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Price (Up to ₹{priceRange})</h3>
          <input
            type="range"
            min="100"
            max="500"
            step="10"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>
      </aside>

      {/* Product Grid */}
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg p-4 transition-all hover:shadow-amber-300 hover:scale-[1.02]"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-[350px] w-full object-cover rounded-xl"
              />
              <h2 className="mt-3 text-lg font-bold text-gray-800">{product.name}</h2>
              <p className="text-amber-600 font-semibold text-md mt-1">₹{product.price}</p>
              <p className="text-sm text-gray-500">{product.fragrance} fragrance</p>
              <button className="mt-4 w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg font-semibold transition">
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">No products match your filters.</p>
        )}
      </section>
    </div>
        <Footer className=""/>
    </>
  );
}