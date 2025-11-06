import Navbar from "../Components/Navbar.jsx";
import Hero from "../Components/Hero.jsx";
import Products from "../Components/Product.jsx";
import Banner from "../Components/banner.jsx";
import Faq from "../Components/Faq.jsx";
import About from "../Components/About.jsx";
import Footer from "../Components/Footer.jsx";
import Shop from "../Components/Shop.jsx";
import Categories from "../Components/Categories.jsx";
import Offer from "../Components/Offer.jsx";
import Collections from "../Components/Collections.jsx";
import Soon from "../Components/Soon.jsx";
import Whatapp from "../Components/WhatsAppBubble .jsx";

import React, { useEffect, useState } from "react";

const home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
  }, []);
  return (
    <>
      <div
        className={`px-2 bg-gray-100 `}
      >
        
        <Hero />
        <Banner />
        <Shop />
        <Categories />
        <Offer />
        <Products />
        <Collections />
        <Soon />
        <Footer />
        <Whatapp/>
      </div>
    </>
  );
};

export default home;
