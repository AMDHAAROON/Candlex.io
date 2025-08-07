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

const home = () => {
  return (
    <>
      <div className="px-2 bg-gray-300">
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
      </div>
    </>
  );
};

export default home;
