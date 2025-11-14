/**
 * Entry point and routing structure for the web application.
 * This file defines a layout wrapper that manages global UI elements
 * such as the navigation bar and cart panel, and sets up page routing
 * using React Router.
 */

import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

// Components
import Navbar from "./Components/Navbar.jsx";
import Cartpanel from "./Components/Cartpanel.jsx";
import HomePage from "./Pages/home.jsx";
import CandleShop from "./Pages/Products.jsx";
import About from "./Components/About.jsx";
import Footer from "./Components/Footer.jsx";
import Loginpage from "./Pages/Loginpage.jsx";
import Signup from "./Pages/Signup.jsx";
import Aboutpage from "./Pages/about.jsx";
import Contactpage from "./Pages/contact.jsx";

import "./index.css";

/**
 * Layout Component
 *
 * Responsibilities:
 * - Controls visibility of the navigation bar based on the current route.
 * - Maintains a unified cart state shared across the application.
 * - Provides cart operations including adding and removing items.
 * - Renders the cart panel and all route-based pages.
 */
function Layout() {
  const location = useLocation();

  /**
   * Routes where the navigation bar should be hidden.
   * Typically used for authentication-related pages.
   */
  const hideNavbarPaths = ["/login", "/signup"];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  /**
   * Global cart state.
   * cartItems: Stores all cart products with their respective quantities.
   * cartOpen: Controls the visibility of the cart panel.
   */
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  /**
   * Adds a product to the cart.
   * If the product already exists, its quantity is incremented.
   *
   * @param {Object} product - Product object to be added to the cart.
   */
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  /**
   * Removes a product from the cart using its identifier.
   *
   * @param {number|string} id - Unique identifier of the product to remove.
   */
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      {/* Navigation bar (hidden on login and signup pages) */}
      {showNavbar && (
        <Navbar
          cart={cartItems}
          setCartOpen={setCartOpen}
          removeFromCart={removeFromCart}
          setCartItems={setCartItems}
        />
      )}

      {/* Cart panel used for viewing and modifying cart items */}
      <Cartpanel
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cartItems}
        setCart={setCartItems}
        removeFromCart={removeFromCart}
      />

      {/* Routing structure for all application pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/products"
          element={
            <CandleShop
              addToCart={addToCart}
              setCartOpen={setCartOpen}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutpage" element={<Aboutpage />} />
        <Route path="/contactpage" element={<Contactpage />} />
      </Routes>
    </>
  );
}

/**
 * App Component
 *
 * Wraps the application in a BrowserRouter to enable
 * client-side routing throughout the project.
 */
function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

// Mounts the application to the root DOM node.
createRoot(document.getElementById("root")).render(<App />);
