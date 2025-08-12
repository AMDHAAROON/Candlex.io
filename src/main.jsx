import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Navbar from "./Components/Navbar.jsx";
import Hero from "./Components/Hero.jsx";
import Products from "./Components/Product.jsx";
import Banner from "./Components/banner.jsx";
import Faq from "./Components/Faq.jsx";
import About from "./Components/About.jsx";
import Footer from "./Components/Footer.jsx";
import Shop from "./Components/Shop.jsx";
import Categories from "./Components/Categories.jsx";
import Offer from "./Components/Offer.jsx";
import Collections from "./Components/Collections.jsx";
import Soon from "./Components/Soon.jsx";
import HomePage from "./Pages/home.jsx";
import ProductsPage from "./Pages/Products.jsx";
import Login from "./Pages/Loginpage.jsx";
import Loginpage from "./Pages/Loginpage.jsx";
import Signup from "./Pages/Signup.jsx";
import ProtectedRoute from "./Utility/firebase/ProtectedRoute.jsx";


const AboutPage = () => (
  <>
    <Navbar />
    <About />
    <Footer />
  </>
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signup />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
