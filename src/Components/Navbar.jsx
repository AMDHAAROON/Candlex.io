// Navbar.jsx
// ✅ Navigation bar component with logo, links, cart icon, and mobile menu toggle

import { Bars3Icon } from "@heroicons/react/24/solid"; // Mobile menu icon
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // For SPA navigation
import candle from "/Assets/logo/candle.png"; // Logo image
import cartIcon from "/Assets/logo/cart.png"; // Cart icon image

// Props:
// - cart: array of cart items
// - setCartOpen: function to open/close cart panel
// - CartOpen: (not currently used, optional)
export default function Navbar({ cart = [], setCartOpen = () => {}, CartOpen = () => {} }) {
  // State to manage mobile menu toggle
  const [toggleMenu, setToggleMenu] = useState(false);

  // State to track scroll direction for hiding/showing navbar
  const [scrollDirection, setScrollDirection] = useState("up");

  // Effect to detect scroll direction
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setScrollDirection("down"); // Hide navbar
      } else {
        setScrollDirection("up"); // Show navbar
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, []);

  // Debug: logs CartOpen function reference
  useEffect(() => {
    console.log("Navbar setCartOpen:", CartOpen);
  }, []);

  return (
    // Navbar container: fixed at top, full width, hide/show on scroll
    <div
      className={`fixed px-3 pt-1 top-0 left-0 w-full z-50 transition-transform duration-500 ${
        scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <header className="flex justify-between rounded-2xl items-center px-4 md:px-10 py-3 border-b-2 border-[#fcf5f5] shadow-2xl bg-[#f1cc94]">
        {/* Logo */}
        <img src={candle} alt="logo" className="border-r-4 border-[#fcfaf7] h-14 pr-4" />

        {/* Title */}
        <p className="text-[#4E3D28] text-2xl md:text-4xl font-extrabold">Candlex</p>

        {/* Desktop navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-9 mt-2 text-gray-600 font-mono text-2xl">
            {/* Home link */}
            <li>
              <a
                href="/"
                className="pb-1 border-b-4 border-[#8a673d] hover:border-white transition-all duration-300"
              >
                Home
              </a>
            </li>

            {/* Other page links */}
            {["Products", "About", "Contact"].map((item, idx) => (
              <li key={idx}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="pb-1 border-b-4 border-[#8a673d] hover:border-white transition-all duration-300"
                >
                  {item}
                </a>
              </li>
            ))}

            {/* Login link */}
            <li>
              <Link
                to="/login"
                className="pb-1 border-b-4 border-[#8a673d] hover:border-white transition-all duration-300"
              >
                Login
              </Link>
            </li>

            {/* Cart icon */}
            <li
              className="relative cursor-pointer z-50"
              onClick={() => setCartOpen(true)} // Open cart panel
            >
              <img
                src={cartIcon}
                alt="Cart"
                className="h-10 w-10"
                onClick={() => {
                  console.log("Cart clicked");
                  setCartOpen(true);
                }}
              />
              {/* Show number of items in cart */}
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {cart.length}
                </span>
              )}
            </li>
          </ul>
        </nav>

        {/* Mobile menu toggle button */}
        <button onClick={() => setToggleMenu(!toggleMenu)} className="block md:hidden">
          <Bars3Icon className="text-black h-10" />
        </button>
      </header>

      {/* Mobile navigation menu */}
      {toggleMenu && (
        <nav className="fixed inset-0 top-20 z-50 bg-[#f1cc94] animate-slide-down md:hidden">
          <ul
            onClick={() => setToggleMenu(false)} // Close menu on link click
            className="flex flex-col items-center justify-center h-[700px] space-y-6 rounded-t-2xl text-white text-bold text-2xl bg-[#575252c2]"
          >
            {["Products", "Cart", "Faq", "About", "Contact"].map((item, idx) => (
              <li
                key={idx}
                className="w-full text-center cursor-pointer"
                onClick={() => item === "Cart" && setCartOpen(true)} // Open cart panel on Cart click
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  className="block w-full py-4 hover:border-white transition-all duration-300"
                >
                  {item}
                </a>
              </li>
            ))}

            {/* Login link in mobile menu */}
            <li className="w-full text-center">
              <Link
                to="/login"
                className="block w-full py-4 hover:border-white transition-all duration-300"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
