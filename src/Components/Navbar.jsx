import { Bars3Icon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import candle from "/Assets/logo/candle.png";

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
    <>
      <div
        className={`fixed px-3 pt-1 top-0 left-0 w-full z-50 transition-transform duration-500 ${
          scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <header className="flex justify-between px-10 py-3.5 rounded-2xl border-2 border-[#fcf5f5] shadow-2xl bg-[#f1cc94] transition-all duration-500">
          {/* Logo */}
          <img
            src={candle}
            alt="logo"
            className="border-r-4 border-[#fcfaf7] h-14 w-18 pr-4"
          />

          {/* Title */}
          <p className="text-[#4E3D28] text-4xl mt-2 font-extrabold">Candlex</p>

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
              {["Products", "Cart", "Faq", "About", "Contact"].map(
                (item, idx) => (
                  <li key={idx}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="pb-1 border-b-4 border-[#8a673d] hover:border-white transition-all duration-300"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setToggleMenu(!toggleMenu)}
            className="block md:hidden"
          >
            <Bars3Icon className="text-black h-10 pb-2" />
          </button>
        </header>

        {/* Mobile Nav */}
        {toggleMenu && (
          <nav className="fixed inset-0 top-20 z-40 bg-[#4E3D28] md:hidden">
            <ul
              onClick={() => setToggleMenu(false)}
              className="flex flex-col items-center justify-center h-full space-y-6 text-white text-2xl"
            >
              {["Products", "Cart", "Faq", "About", "Contact"].map(
                (item, idx) => (
                  <li key={idx}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="pb-4 border-b-4 border-[#8a673d] hover:border-white transition-all duration-300"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </nav>
        )}
      </div>
    </>
  );
}
