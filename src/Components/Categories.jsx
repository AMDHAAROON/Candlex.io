import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { categories } from "../Utility/data";

export default function Categories() {
//   const [toggleMenu, settoggleMenu] = useState(false);
//   const [liked, setLiked] = useState({}); // 🟢 FIX: Declare it here

//   useEffect(() => {
//     AOS.init({ duration: 800, once: false });
//   }, []);

//   const toggleLike = (index) => {
//     setLiked((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   };

  return (
    <>
      <section className="pb-4" id="">
        <div className="pb-4 relative px-8 bg-[linear-gradient(to_top,#ffba52_0%,#ffffff_70%,#ffba52_100%)] border-4 border-white w-full h-auto rounded-2xl">
          <div className="flex justify-between items-center  mt-1">
            <h1
              className="relative inline-block px-8 pb-5 mt-5 text-2xl font-hero text-[#4E3D28] underline-on-scroll"
              data-aos="fade"
              data-aos-once="false"
            >
              POPULAR CATEGORIES
            </h1>
            <h1
              className="cursor-pointer font-semibold relative z-30 px-4 py-2 mt-5 text-xl font-hero text-[#4E3D28] floatlr-img shadow-2xl bg-[#f1cc94] hover:bg-white hover:border-[#ffce85] rounded-[300px] border-4 border-white"
              data-aos="fade"
              data-aos-once="false"
            >
              see all
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 ml-2 text-black inline"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 4.5l7.5 7.5-7.5 7.5M4.5 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </h1>
          </div>

          <div className="flex flex-wrap justify-center gap-6  rounded-2xl">
            {categories.map((item, index) => (
              <div
                key={index}
              
                className="group relative my-8 rounded-xl overflow-hidden h-[380px] w-[330px] transform transition-transform duration-700 ease-in-out group-hover:scale-105 shadow-2xl"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="shadow-2xl rounded-lg h-[380px] w-full object-cover transform transition-transform duration-700 ease-in-out group-hover:scale-105"
                />

                <div className="absolute bottom-0 w-full bg-[#4E3D28]/80 text-white flex justify-between items-center px-4 py-2 text-lg font-semibold opacity-100 transition-opacity duration-700">
                  <span>{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
