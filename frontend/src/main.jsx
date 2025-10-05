import { createRoot } from "react-dom/client"; // React 18 root API
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"; // React Router for routing
import { useState,useEffect } from "react"; // React hook for state management
import { getAuth } from 'firebase/auth';
// Components
import Navbar from "./Components/Navbar.jsx";
import Cartpanel from "./Components/Cartpanel.jsx";
import HomePage from "./Pages/home.jsx";
import CandleShop from "./Pages/Products.jsx";
import About from "./Components/About.jsx";
import Footer from "./Components/Footer.jsx";
import Loginpage from "./Pages/Loginpage.jsx";
import Signup from "./Pages/Signup.jsx";


import "./index.css"; // Global CSS

// ✅ Layout component wraps the app and decides whether to show the Navbar
function Layout() {
  const location = useLocation(); // React Router hook to get current path
  const hideNavbarPaths = ["/login", "/signup"]; // Paths where Navbar should be hidden
  const showNavbar = !hideNavbarPaths.includes(location.pathname); // Boolean flag

  // ✅ Cart state
  const [cart, setCart] = useState([]); // Stores cart items
  const [cartOpen, setCartOpen] = useState(false); // Controls whether CartPanel is visible

  // ✅ Function to add a product to the cart
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id); // Check if product already exists
      if (existing) {
        // If exists, increase quantity
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      // If not, add new product with qty 1
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // ✅ Function to remove a product from the cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

useEffect(() => {
  const auth = getAuth();

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      // Extract user info
      const uid = user.uid;
      const email = user.email;
      const display_name = user.displayName || '';

      try {
        const res = await fetch('http://localhost:4000/saveUser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uid, email, display_name })
        });

        const data = await res.json();
        console.log('User saved in Supabase:', data);
      } catch (err) {
        console.error('Error saving user:', err);
      }
    }
  });
}, []);


  return (
    <>
      {/* Show Navbar if not on login/signup pages */}
      {showNavbar && (
        <Navbar
          cart={cart} // Pass current cart items
          setCartOpen={setCartOpen} // Function to open/close cart panel
          removeFromCart={removeFromCart} // Function to remove items
        />
      )}

      {/* CartPanel component, visible based on cartOpen state */}
      <Cartpanel
        isOpen={cartOpen} // Controls visibility
        onClose={() => setCartOpen(false)} // Close handler
        cart={cart} // Pass cart items
        removeFromCart={removeFromCart} // Remove item handler
      />

      {/* Routes for different pages */}
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home page */}
        <Route
          path="/products"
          element={
            <CandleShop
              addToCart={addToCart} // Pass function to add items from Products page
              setCartOpen={setCartOpen} // Pass function to open cart panel
            />
          }
        />
        <Route
          path="/about"
          element={
            <>
              <About /> {/* About component */}
              <Footer /> {/* Footer always shown on About page */}
            </>
          }
        />
        <Route path="/login" element={<Loginpage />} /> {/* Login page */}
        <Route path="/signup" element={<Signup />} /> {/* Signup page */}
      </Routes>
    </>
  );
}

// ✅ Main App component wraps Layout in BrowserRouter
function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

// ✅ Render the React App into root element
createRoot(document.getElementById("root")).render(<App />);
