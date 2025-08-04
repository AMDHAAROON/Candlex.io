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

const HomePage = () => (
  <>
    <Navbar />
    <Hero />
    <Banner />
    <Shop />
    <Categories />
    <Offer />
    <Products />
    <Collections />
    <Soon />
    <Footer />
  </>
);

const ProductsPage = () => (
  <>
    <Navbar />
    <Products />
    <Footer />
  </>
);

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
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
