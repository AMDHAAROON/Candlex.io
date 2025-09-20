import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Collections } from "../Utility/data";

export default function Collection() {
  const [toggleMenu, settoggleMenu] = useState(false);
  const [liked, setLiked] = useState({});

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
          <div className="flex justify-between items-center mt-1">
            <h1
              className="relative inline-block px-8 pb-5 mt-5 text-2xl font-hero text-[#4E3D28] underline-on-scroll"
              data-aos="fade"
              data-aos-once="false"
            >
              COLLECTIONS
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

          <div className="flex flex-wrap justify-center gap-6">
            {Collections.map((item, index) => {
              const isSecond = index === 1;

              return (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 200}
                  className={`group relative my-8 rounded-2xl overflow-hidden transform transition-transform duration-700 ease-in-out group-hover:scale-105 shadow-2xl ${
                    isSecond ? "h-[650px] w-[500px]" : "h-[650px] w-[700px]"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`rounded-2xl object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 w-full ${
                      isSecond ? "h-[650px]" : "h-[650px]"
                    }`}
                  />

                  <div className="absolute bottom-0 w-full bg-[#4E3D28]/80 text-white flex justify-between items-center px-4 py-2 text-xl font-semibold opacity-100 transition-opacity duration-700">
                    <span>{item.name}</span>
                    <button className="bg-red-400 p-2 rounded-xl cursor-pointer hover:bg-white hover:text-red-400 font-bold">
                        shop now

                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
