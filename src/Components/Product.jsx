import { Card,Box } from "@mui/material";
import { useState,useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { candleProducts } from "../Utility/data";



export default function Header() {
  const [toggleMenu, settoggleMenu] = useState(false);
  useEffect(() => {
  AOS.init({ duration: 800, once: false });
}, []);
  return (
    <>
      <section className="pb-4" id="products">
      <div className="pb-16 relative px-8 bg-[linear-gradient(to_top_right,#ffba52_0%,#ffffff_50%,#ffba52_100%)] border-4 border-white w-full h-auto rounded-2xl">
        <h1 className="text-center mt-5 text-4xl font-hero text-[#4E3D28]">
          Our Products
        </h1>

        <div className="flex flex-wrap justify-center gap-6">
          {candleProducts.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 200}
              className="group relative my-8 rounded-2xl overflow-hidden h-[500px] w-[350px] transform transition-transform duration-1000 ease-in-out hover:scale-105 shadow-xl"
            >
              <img
                src={item.image}
                alt={item.name}
                className="rounded-2xl h-full w-full object-cover"
              />

              {/* Product name appears on hover */}
              <div className="absolute bottom-0 w-full bg-[#4E3D28]/80 text-white text-center py-2 text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.name}
              </div>

             
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
