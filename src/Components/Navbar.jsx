import { Bars3Icon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import candle from "/Assets/logo/candle.png";
import cartIcon from "/Assets/logo/cart.png";


export default function Header() {
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

  return (
    <div
      className={`fixed px-3 pt-1 top-0 left-0 w-full z-50 transition-transform duration-500 ${
        scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <header className="flex justify-between rounded-2xl items-center px-4 md:px-10 py-3 border-b-2 border-[#fcf5f5] shadow-2xl bg-[#f1cc94]">
        {/* Logo */}
        <img
          src={candle}
          alt="logo"
          className="border-r-4 border-[#fcfaf7] h-14 pr-4"
        />

        {/* Title */}
        <p className="text-[#4E3D28] text-2xl md:text-4xl font-extrabold">
          Candlex
        </p>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex gap-9 mt-2 text-gray-600 font-mono text-2xl">
            <li>
              <a
                href="/"
                className="pb-1 border-b-4 border-[#8a673d] hover:border-white transition-all duration-300"
              >
                Home
              </a>
            </li>
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
            {/* ✅ Login Link */}
            <li>
              <Link
                to="/login"
                className="pb-1 border-b-4 border-[#8a673d] hover:border-white transition-all duration-300"
              >
                Login
              </Link>
            </li>
            {/* Cart Icon */}
<li className="relative">
  <Link to="/cart" className="pb-1 border-b-4 border-[#8a673d] hover:border-white transition-all duration-300">
    <img src={cartIcon} alt="Cart" className="h-10 w-10" />
  </Link>
  {/* Badge */}
  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
    3
  </span>
</li>


          </ul>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setToggleMenu(!toggleMenu)}
          className="block md:hidden"
        >
          <Bars3Icon className="text-black h-10" />
        </button>
      </header>

      {/* Mobile Nav */}
      {toggleMenu && (
        <nav className="fixed inset-0 top-20 z-50 bg-[#f1cc947e] animate-slide-down md:hidden">
          <ul
            onClick={() => setToggleMenu(false)}
            className="flex flex-col items-center justify-center h-[700px] space-y-6 rounded-t-2xl text-white text-bold text-2xl bg-[#949494a8]"
          >
            {["Products", "Cart", "Faq", "About", "Contact"].map((item, idx) => (
              <li key={idx} className="w-full text-center">
                <a
                  href={`#${item.toLowerCase()}`}
                  className="block w-full py-4 hover:border-white transition-all duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
            {/* ✅ Mobile Login Link */}
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
