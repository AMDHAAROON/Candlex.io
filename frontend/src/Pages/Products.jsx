
/* 
  Component: Product page
  Purpose: Displays the candle products with filtering, sorting, and purchasing options.
  Props:
    - addToCart: Function to update the cart state in the parent component.
    - setCartOpen: Function to toggle cart UI visibility.
  Description:
    This main shop page handles product listing, product card actions
    (Add to Cart / Buy Now), user authentication detection, filtering
    by fragrance, filtering by price, and sorting by name or price.
*/
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import { Products } from "../Utility/data.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function CandleShop({ addToCart, setCartOpen }) {
  /* 
    State: user
    Purpose: Holds the currently logged-in Firebase user object.
  */
  const [user, setUser] = useState(null);

  /* 
    State: userId
    Purpose: Stores Firebase user's unique ID for DB operations.
  */
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  /* 
    State: selectedFragrance
    Purpose: Stores currently selected fragrance filter.
    Default: "All"
  */
  const [selectedFragrance, setSelectedFragrance] = useState("All");

  /* 
    State: priceRange
    Purpose: Upper limit for product price filtering.
    Default: 500
  */
  const [priceRange, setPriceRange] = useState(500);

  /* 
    State: sortOption
    Purpose: Stores selected sorting option (A-Z, Z-A, price low-high, etc.).
    Default: ""
  */
  const [sortOption, setSortOption] = useState("");

  /* 
    Effect: Firebase Authentication Listener
    Purpose: Detects user login/logout status and updates user & userId.
    Runs: Once on component mount.
  */
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setUserId(currentUser.uid);
      } else {
        setUser(null);
        setUserId(null);
      }
    });
  }, []);

  /* 
    Variable: fragrances
    Purpose: Extract unique fragrance types from product list for filtering.
  */
  const fragrances = ["All", ...new Set(Products.map((p) => p.fragrance))];

  /* 
    Variable: filteredProducts
    Purpose: Filter products based on selected fragrance and price range.
  */
  const filteredProducts = Products.filter((product) => {
    const matchesFragrance =
      selectedFragrance === "All" || product.fragrance === selectedFragrance;
    const matchesPrice = product.price <= priceRange;
    return matchesFragrance && matchesPrice;
  });

  /* 
    Variable: sortedProducts
    Purpose: Sort filtered products based on selected sorting option.
  */
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "name-asc") return a.name.localeCompare(b.name);
    if (sortOption === "name-desc") return b.name.localeCompare(a.name);
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    return 0;
  });

  // -------------------------------
  // Product Card Component
  // -------------------------------
  /*
    Component: ProductCard
    Purpose: Renders individual product item with image, name, price,
             fragrance, Add to Cart button, and Buy Now button.
    Props:
      - product: Single product object from Products list.
    Notes:
      Contains logic for both Add to Cart (UI + Backend) and Buy Now
      (Order creation + WhatsApp redirection).
  */
  function ProductCard({ product }) {
    /*
      Function: handleAddToCart
      Purpose:
        1. Redirects user to login if not authenticated.
        2. Updates cart in frontend UI using addToCart().
        3. Sends PUT request to backend to save/update cart.
    */
    const handleAddToCart = async () => {
      if (!userId) {
        navigate("/login");
        return;
      }

      // UI update
      addToCart(product);

      // Backend update
      try {
        const res = await fetch(
          `https://candlex-io.onrender.com/api/CartCollection/${userId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              productId: product.id,
              productName: product.name,
              price: product.price,
              qty: 1,
            }),
          }
        );

        if (!res.ok) throw new Error("Failed to update cart");
        const data = await res.json();
        // Console logs preserved exactly
        console.log("🛍️ Cart updated:", data);
      } catch (err) {
        console.error("Error adding to cart:", err);
      }
    };

    /*
      Function: handleBuyNow
      Purpose:
        1. Ensures user is logged in.
        2. Creates an order on the backend.
        3. After success, generates a WhatsApp order message.
        4. Opens WhatsApp with encoded order details.
    */
    const handleBuyNow = async () => {
      if (!userId) {
        alert("Please login to place an order!");
        navigate("/login");
        return;
      }

      const userName = user.displayName || user.email || "Guest";
      const price = Number(product.price);
      const qty = 1;
      const totalAmount = price * qty;

      const orderData = {
        userId,
        userName,
        products: [
          {
            productId: product.id.toString(),
            productName: product.name,
            price,
            qty,
          },
        ],
        totalAmount,
      };

      try {
        const res = await fetch("https://candlex-io.onrender.com/api/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });

        const data = await res.json();

        if (res.ok) {
          // Console log preserved exactly
          console.log("🧾 Order placed successfully:", data.order);

          const message = `🕯️ *New Candle Order* 🕯️
          Name: ${userName}
          Product: ${product.name}
          Qty: ${qty}
          Price: ₹${price}
          Total: ₹${totalAmount}

          ✅ Order placed successfully!
          (This is a test message for development purposes. Thank you for assisting with website testing.)`;

          const whatsappNumber = "+919500669628";
          const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            message
          )}`;

          window.open(whatsappURL, "_blank");
          alert("Order placed successfully! Redirecting to WhatsApp...");
        } else {
          alert(data.error || "Something went wrong while placing order.");
        }
      } catch (err) {
        console.error("Buy Now error:", err);
      }
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
          onClick={handleAddToCart}
          className="mt-4 w-auto px-2 mx-10 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg font-semibold transition"
        >
          Add to Cart
        </button>

        <button
          onClick={handleBuyNow}
          className="mt-4 w-auto px-2 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg font-semibold transition"
        >
          Buy Now
        </button>
      </div>
    );
  }

  // -------------------------------
  // Main Layout Rendering
  // -------------------------------
  /*
    Section: Main Shop Layout
    Description:
      Contains two major areas:
        1. Sidebar (filters and sorting controls)
        2. Product grid area (renders products after filtering/sorting)
  */
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

          {/* Sort Dropdown */}
          <div className="flex justify-start mb-4">
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="name-asc">Name (A - Z)</option>
              <option value="name-desc">Name (Z - A)</option>
              <option value="price-asc">Price (Low - High)</option>
              <option value="price-desc">Price (High - Low)</option>
            </select>
          </div>

          {/* Price Filter */}
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

        {/* Product Section */}
        <section className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-center font-mono text-xl col-span-full text-gray-600">
                Oops! Nothing matches your criteria right now. 🧐
              </p>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
