import { Bars3Icon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import candle from "/Assets/logo/candle.png";
import cartIcon from "/Assets/logo/cart.png";

export default function Navbar({ cart = [], setCartOpen = () => {} }) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, []);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "About", path: "/aboutpage" },
    { label: "Contact", path: "/contactpage" },
    { label: "Login", path: "/login" },
  ];

  return (
    <div
      className={`fixed px-3 pt-1 top-0 left-0 w-full z-50 transition-transform duration-500 ${
        scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <header className="flex justify-between rounded-2xl items-center px-4 md:px-10 py-3 border-b-2 border-[#fcf5f5] shadow-2xl bg-[#f1cc94d2]">
        {/* Logo */}
        <Link to="/">
          <img
            src={candle}
            alt="logo"
            className="border-r-4 border-[#fcfaf7] h-14 pr-4 cursor-pointer"
          />
        </Link>

        {/* Title */}
        <Link to="/">
          <p className="text-[#4E3D28] text-2xl md:text-4xl font-extrabold cursor-pointer">
            Candlex
          </p>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:block">
          <ul className="flex gap-9 mt-2 text-gray-600 font-mono text-2xl">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.path}
                  className="pb-1 border-b-4 border-[#8a673d] hover:border-white transition-all duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* 🛒 Cart icon (desktop) */}
            <li
              className="relative cursor-pointer z-50"
              onClick={() => setCartOpen(true)}
            >
              <img src={cartIcon} alt="Cart" className="h-10 w-10" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {cart.length}
                </span>
              )}
            </li>
          </ul>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setToggleMenu(!toggleMenu)}
          className="block md:hidden"
        >
          <Bars3Icon className="text-black h-10" />
        </button>
      </header>

      {/* Mobile Menu */}
      {toggleMenu && (
        <nav className="fixed inset-0 top-20 z-50 bg-[#f1cc94] animate-slide-down md:hidden">
          <ul
            className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] 
                 space-y-6 rounded-t-2xl text-white font-bold text-2xl bg-[#575252c2]"
          >
            {navLinks.map((link, idx) => (
              <li key={idx} className="w-full text-center cursor-pointer">
                <Link
                  to={link.path}
                  onClick={() => setToggleMenu(false)} // close menu on link click
                  className="block w-full py-4 hover:border-white transition-all duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* 🛒 Cart icon (mobile) */}
            <li
              className="relative cursor-pointer mt-6"
              onClick={() => {
                setCartOpen(true); // open cart
                setToggleMenu(false); // close mobile menu
              }}
            >
              <img src={cartIcon} alt="Cart" className="h-12 w-12" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {cart.length}
                </span>
              )}
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
