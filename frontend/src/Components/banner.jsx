import { useInView } from "react-intersection-observer";

const BannerSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.8, // section is considered visible when 30% is in view
    triggerOnce: false,
  });

  return (
    <section className="pb-4" ref={ref} id="banner">
      <div className="relative w-full rounded-2xl border-2 border-[#e7c99b] overflow-hidden shadow-xl">
        {/* Banner Image */}
        <img
          src="Assets/banner.jpg"
          alt="Banner"
          className="w-full h-[10vh] sm:h-[50vh] md:h-[20vh] object-cover object-left rounded-2xl"
        />

        {/* Gradient Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-[#f1cc94] to-white opacity-50 rounded-2xl transition-opacity duration-1000 ${
            inView ? "opacity-50" : "opacity-0"
          }`}
        />

        {/* Text */}
        <div
       className={`absolute inset-0 flex flex-col justify-center z-10 transition-opacity duration-2000 ${
            inView ? "opacity-100" : "opacity-0"}
          
     pt-[10%] pb-[15%] md:pt-[5%] md:pb-[10%]`}
          
        >
          <h1 className="text-center text-2xl sm:text-4xl md:text-6xl text-[#4E3D28] font-cursive px-4">
            Light your life with our Candles
          </h1>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
