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
      <section className="pb-4 " id="products" >
        <div className="pb-16 relative px-8 bg-[linear-gradient(to_top_right,#ffba52_0%,#ffffff_50%,#ffba52_100%)] border-4 border-white w-full h-auto rounded-2xl">
          <h1 className="text-center mt-5 text-4xl font-bold text-[#4E3D28] ">
            Our products
          </h1>
          <div className="flex flex-wrap justify-center gap-6">
          {candleProducts.map((item, index) => (
            <div
              key={index}
                data-aos="fade-up"
    data-aos-delay={index * 500}
              className=" flex flex-wrap w-80 h-auto p-3 border-2 border-white my-6 rounded-2xl bg-gradient-to-t from-[#ffba52] to-white shadow-2xl"
            >
              <img src={item.image} className="pb-4 rounded-[30px]" />
              <button className="mx-24 z-10  font-bold p-2  rounded-2xl text-[#4E3D28] bg-gradient-to-l from-[#ffba52] to-white border-2 border-white hover:bg-gradient-to-t from-[#ffba52] to-white">
                Tap to buy
              </button>

              {/* <button className=' font-bold ml-24 p-2 rounded-2xl text-[#4E3D28] bg-[#ffff] '>
        view more
    </button> */}
            </div>
          ))}{" "}
          
          </div>
         
    {/* Scroll Button */}
    <Box className="float-img absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center bg-[#f1cc94] hover:bg-white bg-opacity-90 rounded-full px-4 py-2 shadow-md border-4 border-white hover:border-[#f1cc94]">
      <a href="#banner" className="mr-2 font-semibold text-lg text-black">
        see more
      </a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5 text-black"
      >
        <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 4.5l7.5 7.5-7.5 7.5M4.5 4.5l7.5 7.5-7.5 7.5"
      />
      </svg>
      
    </Box> 
        </div>
      </section>
    </>
  );
}
