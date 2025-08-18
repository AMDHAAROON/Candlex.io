import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import { Products } from "../Utility/data.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";


export default function CandleShop() {
  const [user, setUser] = useState(null); // track logged-in user
  const [selectedFragrance, setSelectedFragrance] = useState("All");
  const [priceRange, setPriceRange] = useState(500);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // null if not logged in, user object if logged in
    });
  }, []);

  const fragrances = ["All", ...new Set(Products.map((p) => p.fragrance))];

  const filteredProducts = Products.filter((product) => {
    const matchesFragrance =
      selectedFragrance === "All" || product.fragrance === selectedFragrance;
    const matchesPrice = product.price <= priceRange;
    return matchesFragrance && matchesPrice;
  });

  // ProductCard Component
  function ProductCard({ product }) {
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate();


    const handleAddToCart = () => {
      if (!user) {
     navigate("/login");// redirect to login page
        return;
      }
      // setCartCount(cartCount + 1);
    };

    return (
      <div className="bg-white rounded-2xl shadow-lg p-4 transition-all hover:shadow-amber-300 hover:scale-[1.02]">
        <img
          src={product.image}
          alt={product.name}
          className="h-[350px] w-full object-cover rounded-xl"
        />
        <h2 className="mt-3 text-lg font-bold text-gray-800">{product.name}</h2>
        <p className="text-amber-600 font-semibold text-md mt-1">₹{product.price}</p>
        <p className="text-sm text-gray-500">{product.fragrance} fragrance</p>
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg font-semibold transition"
        >
          Add to Cart
        </button>
        {/* <span className="mt-2 block">Cart: {cartCount}</span> */}
      </div>
    );
  }

  return (
    <>
      <Navbar />
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
            <h3 className="font-semibold text-gray-700 mb-2">
              Price (Up to ₹{priceRange})
            </h3>
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
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">
              No products match your filters.
            </p>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
}
