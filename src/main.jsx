import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className=" bg-gray-100 px-2 ">
      <Navbar />
      <Hero />
      <Banner />
      <Shop/>
      <Categories />
      <Offer/>
      <Products/>
      <Collections/>
      {/* <Faq /> */}
      {/* <About /> */}
      <Soon/>
      <Footer/>
    </div>
  </StrictMode>
);
