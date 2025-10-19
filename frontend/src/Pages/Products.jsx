// CandleShop.jsx
// ✅ Page to display products with filters, add-to-cart functionality, and cart panel control

import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import { Products } from "../Utility/data.js"; // Array of product data
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase authentication
import { useNavigate } from "react-router-dom";

export default function CandleShop({ addToCart, setCartOpen }) {
  // State to track logged-in user
  const [user, setUser] = useState(null);

  // Filter states
  const [selectedFragrance, setSelectedFragrance] = useState("All");
  const [priceRange, setPriceRange] = useState(500);
      // ✅ Buy now for single product
   
  // Check user authentication on component mount
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // null if not logged in, user object if logged in
    });
  }, []);

  // Create fragrance filter options from product data
  const fragrances = ["All", ...new Set(Products.map((p) => p.fragrance))];

  // Filter products based on selected fragrance and price range
  const filteredProducts = Products.filter((product) => {
    const matchesFragrance =
      selectedFragrance === "All" || product.fragrance === selectedFragrance;
    const matchesPrice = product.price <= priceRange;
    return matchesFragrance && matchesPrice;
  });

  // ProductCard Component: displays a single product
  function ProductCard({ product }) {
    const navigate = useNavigate();

    // Handle adding product to cart
    const handleAddToCart = () => {
      if (!user) {
        navigate("/login"); // Redirect to login if not logged in
        return;
      }
      addToCart(product); // Add product to cart
      // setCartOpen(true);    // Open cart panel
    };
    const logincheck = () => {
      if (!user) {
        navigate("/login"); // Redirect to login if not logged in
        return;
      }
    };
    const handleClick = () => {
      handleAddToCart();
      logincheck();
    };
     const handleBuyNow = async () => {
  if (!user) {
    navigate("/login");
    return;
  }

  // ✅ 1. Save order to MongoDB via backend
  const orderData = {
    userName: user.displayName || user.email,
    productName: product.name,
    price: product.price,
    quantity: 1,
  };

  try {
    await fetch("http://localhost:5000/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    console.log("Order saved to MongoDB");
  } catch (error) {
    console.error("Error saving order:", error);
  }

  // ✅ 2. Send order via WhatsApp to admin
  const adminNumber = "919500669628";
  const message = `🛒 New Order:\n${product.name} x 1\nPrice: ₹${product.price}`;
  const url = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};



    return (
      <div className="bg-white rounded-2xl h-[550px] shadow-lg p-4 transition-all hover:shadow-amber-300 hover:scale-[1.02]">
        <img
          src={product.image}
          alt={product.name}
          className="h-[350px] w-full object-cover rounded-xl"
        />
        <h2 className="mt-3 text-lg font-bold text-gray-800">{product.name}</h2>
        <p className="text-amber-600 font-semibold text-md mt-1">
          ₹{product.price}
        </p>
        <p className="text-sm text-gray-500">{product.fragrance} fragrance</p>
        <button
          onClick={handleClick}
          className="mt-4 w-auto px-2 mx-10 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg font-semibold transition"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="mt-4 w-auto px-2  bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg font-semibold transition"
        >
          Buy now
        </button>
      </div>
    );
  }

  return (
    <>
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

      {/* Footer */}
      <Footer />
    </>
  );
}
