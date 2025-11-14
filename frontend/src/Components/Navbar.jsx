/**
 * Navbar Component
 * ----------------
 * Props received from parent component:
 * 
 * @param {Array} cart 
 *    - Contains the list of cart items currently stored in the app state.
 *    - Each item includes properties like id, qty, name, price, etc.
 *    - Used here to display the total item count on the cart icon.
 *
 * @param {Function} setCartOpen
 *    - Function passed from parent to open/close the cart panel.
 *    - This component calls setCartOpen(true) when the cart icon is clicked.
 *
 * @param {Function} removeFromCart
 *    - Function used to remove items from the cart (not used directly here).
 *    - Still accepted as a prop for consistency across components.
 *
 * @param {Function} setCartItems
 *    - Updates the cart items in parent state.
 *    - Used here when fetching cart data from backend and updating parent.
 *
 * Why these props are needed:
 * - This Navbar does not own the cart state; it relies on the parent's state.
 * - Parent (Layout/App) controls the centralized cart.
 * - Navbar only triggers updates or opens the cart panel.
 *
 * Overall Purpose:
 * - Show navigation links
 * - Show cart icon with accurate cart count
 * - Fetch user cart via backend polling
 * - Handle mobile/desktop menu toggle
 * - Adjust visibility based on scroll direction
 */


import { Bars3Icon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import candle from "/Assets/logo/candle.png";
import cartIcon from "/Assets/logo/cart.png";
import { getAuth, onAuthStateChanged } from "firebase/auth";

/* 
  Navbar Component
  ----------------
  Renders the main navigation bar, handles scroll hiding, cart updates,
  Firebase user detection, and responsive mobile menu.
*/
export default function Navbar({
  cart = [],
  setCartOpen = () => {},
  removeFromCart,
  setCartItems,
}) {
  const [toggleMenu, setToggleMenu] = useState(false);     // Controls mobile menu
  const [scrollDirection, setScrollDirection] = useState("up");  // Tracks scroll to hide/show navbar
  const [loadingCart, setLoadingCart] = useState(false);   // Indicates cart loading state

  /*
    Polling Effect: Fetches the user's cart every 5 seconds.
    Runs only if Firebase auth has a logged-in user.
  */
  useEffect(() => {
    const auth = getAuth();

    const fetchCart = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      try {
        const res = await fetch(`http://localhost:5000/api/CartCollection/${currentUser.uid}`);
        if (!res.ok) return;

        const data = await res.json();
        if (typeof setCartItems === "function") {
          setCartItems(data?.products || []);
        }
      } 
      
      catch (err) {
        console.error("[Navbar] Polling fetchCart error:", err);
      }
    
    };

    fetchCart(); // Initial fetch on mount
    const intervalId = setInterval(fetchCart, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Cleanup
  }, [setCartItems]);


  /*
    Handles cart icon click.
    - Ensures user is logged in
    - Fetches cart items from backend
    - Opens cart panel after loading data
  */
  const handleCartClick = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    setCartOpen(true);

    if (!currentUser) {
      alert("Please login to view your cart.");
      return;
    }

    const uid = currentUser.uid;
    setLoadingCart(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/CartCollection/${uid}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );
      console.log("Navbar fetch cart response:", res.status);

      if (!res.ok) {
        const text = await res.text();
        console.error("[Navbar] fetch error:", res.status, text);
        alert(`Could not load cart (status ${res.status}).`);
        setLoadingCart(false);
        return;
      }

      const data = await res.json();

      // Update cart list in parent
      if (typeof setCartItems === "function") {
        setCartItems(data?.products || []);
      }

      setCartOpen(true);
    } catch (err) {
      console.error("[Navbar] Error fetching cart:", err);
      alert("Error fetching cart. Check console for details.");
    } finally {
      setLoadingCart(false);
    }
  };

  /*
    Scroll Effect: Tracks scroll direction to hide navbar
    when the user scrolls down.
  */
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

  // Navigation links displayed in both desktop and mobile menus
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

        {/* Logo Section */}
        <Link to="/">
          <img
            src={candle}
            alt="logo"
            className="border-r-4 border-[#fcfaf7] h-14 pr-4 cursor-pointer"
          />
        </Link>

        {/* Website Title */}
        <Link to="/">
          <p className="text-[#4E3D28] text-2xl md:text-4xl font-extrabold cursor-pointer">
            Candlex
          </p>
        </Link>

        {/* Desktop Navigation Links */}
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

            {/* Cart Icon (Desktop) */}
            <li className="relative cursor-pointer z-50" onClick={handleCartClick}>
              <img src={cartIcon} alt="Cart" className="h-10 w-10" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {cart.reduce((total, item) => total + (item.qty || 1), 0)}
                </span>
              )}
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setToggleMenu(!toggleMenu)}
          className="block md:hidden"
        >
          <Bars3Icon className="text-black h-10" />
        </button>
      </header>

      {/* Mobile Navigation Menu */}
      {toggleMenu && (
        <nav className="fixed inset-0 top-20 z-50 bg-[#f1cc94] animate-slide-down md:hidden">
          <ul className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] space-y-6 rounded-t-2xl text-white font-bold text-2xl bg-[#575252c2]">
            {navLinks.map((link, idx) => (
              <li key={idx} className="w-full text-center cursor-pointer">
                <Link
                  to={link.path}
                  onClick={() => setToggleMenu(false)}
                  className="block w-full py-4 hover:border-white transition-all duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Cart Icon (Mobile) */}
            <li className="relative cursor-pointer mt-6" onClick={handleCartClick}>
              <img src={cartIcon} alt="Cart" className="h-12 w-12" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {cart.reduce((total, item) => total + (item.qty || 1), 0)}
                </span>
              )}
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
