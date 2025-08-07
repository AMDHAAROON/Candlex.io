import Navbar from "../Components/Navbar.jsx";
import Products from "../Components/Product.jsx";
import Footer from "../Components/Footer.jsx";

const Product = () => {
  return (
    <>
      <div className="px-2 bg-gray-300">
        <Navbar />
        <Products />
        <Footer />
      </div>
    </>
  );
};

export default Product;
