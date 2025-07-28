import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Navbar from "./Components/Navbar.jsx";
import Hero from "./Components/Hero.jsx";
import Products from "./Components/Product.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className=" bg-gray-300 px-2 ">
      <Navbar />
      <Hero />
      <section className="pb-4">
        <div className="relative w-full   rounded-2xl  border-2 border-[#e7c99b] ">
          <img
            src="Assets/banner.jpg"
            alt="Banner"
            className="w-full h-[30vh] object-cover object-left rounded-2xl"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#ffba52] to-white opacity-50 rounded-2xl ">
            <h1 className="text-center pt-20 text-5xl text-black font-cursive">
              Light your life with our candles
            </h1>
          </div>
        </div>
      </section>
      <Products/>
    </div>
  </StrictMode>
);
