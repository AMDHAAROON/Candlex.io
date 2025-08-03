import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { candleProducts } from "../Utility/data";

export default function Product() {
  const [toggleMenu, settoggleMenu] = useState(false);
  const [liked, setLiked] = useState({}); // 🟢 FIX: Declare it here

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  const toggleLike = (index) => {
    setLiked((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <section className="pb-4" id="products">
        <div className="pb-10 relative px-8 bg-[linear-gradient(to_top_right,#ffba52_0%,#ffffff_50%,#ffba52_100%)] border-4 border-white w-full h-auto rounded-2xl">
          <div className="flex justify-between items-center  mt-1">
            <h1
              className="relative inline-block px-8 pb-5 mt-5 text-2xl font-hero text-[#4E3D28] underline-on-scroll"
              data-aos="fade"
              data-aos-once="false"
            >
              HANDPICKED OFFERS
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

          <div className="flex flex-wrap justify-center gap-6 ">
            {candleProducts.map((item, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 200}
                className="group relative my-8 rounded-2xl overflow-hidden h-[600px] w-[450px] transform transition-transform duration-700 ease-in-out group-hover:scale-105 shadow-2xl"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-2xl h-[600px] w-full object-cover transform transition-transform duration-700 ease-in-out group-hover:scale-105"
                />

                <div className="absolute bottom-0 w-full bg-[#4E3D28]/80 text-white flex justify-between items-center px-4 py-2 text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <span>{item.name}</span>
                  <button onClick={() => toggleLike(index)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={liked[index] ? "red" : "none"}
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 text-white transition-all duration-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 6.677c0-2.39-1.94-4.32-4.33-4.32-1.466 0-2.768.722-3.555 1.825A4.344 4.344 0 0 0 10.312 2.4c-2.39 0-4.33 1.93-4.33 4.32 0 6.234 7.158 10.197 7.158 10.197s7.158-3.963 7.158-10.197z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
