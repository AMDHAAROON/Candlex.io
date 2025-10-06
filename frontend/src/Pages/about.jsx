import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../Components/Footer.jsx";
import Aboutsection from "../Components/About.jsx";

export default function About() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 100,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section>
    <div className="min-h-screen mt-8 bg-gradient-to-b from-amber-50 via-yellow-50 to-white text-gray-800 flex flex-col items-center  px-6">
      {/* Heading */}
      <h1
        data-aos="fade-down"
        className="text-4xl mt-20 md:text-5xl font-bold text-amber-700 mb-4 text-center"
      >
        About Candlex
      </h1>

      <p
        data-aos="fade-up"
        className="text-lg italic text-gray-600 mb-12 text-center"
      >
        “Where Light Meets Art.”
      </p>

      {/* Content Grid */}
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 leading-relaxed">
        {/* Who We Are */}
        <div
          data-aos="fade-up"
          className="bg-white/80 shadow-lg rounded-2xl p-6 backdrop-blur-md shadow-amber-300 hover:shadow-amber-200 transition-all"
        >
          <h2 className="text-2xl font-semibold text-amber-600 mb-2">
            Who We Are
          </h2>
          <p>
            CandleX is more than just a candle shop — it’s a space where
            creativity and craftsmanship come together to spread warmth, calm,
            and beauty. Every CandleX product is handcrafted with care, designed
            to bring peaceful energy to your space and turn everyday moments
            into something special.
          </p>
        </div>

        {/* Our Story */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="bg-white/80 shadow-lg rounded-2xl p-6 backdrop-blur-md shadow-amber-300 hover:shadow-amber-200 transition-all"
        >
          <h2 className="text-2xl font-semibold text-amber-600 mb-2">
            Our Story
          </h2>
          <p>
            Founded by a group of passionate creators, CandleX began as a small
            project to combine art and aroma. What started as a spark has grown
            into a brand known for unique designs, sustainable ingredients, and
            soothing fragrances that tell a story in every glow.
          </p>
        </div>

        {/* What We Offer */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="bg-white/80 shadow-lg rounded-2xl p-6 backdrop-blur-md shadow-amber-300 hover:shadow-amber-200 transition-all md:col-span-2"
        >
          <h2 className="text-2xl font-semibold text-amber-600 mb-2">
            What We Offer
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>🌿 Eco-Friendly Candles: Made with natural soy wax.</li>
            <li>🎨 Custom Designs: Personalized candles for gifts & decor.</li>
            <li>💬 WhatsApp Checkout: Direct and quick order system.</li>
            <li>🔥 Workshops: Learn candle crafting and scent blending.</li>
          </ul>
        </div>

        {/* Our Vision */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="bg-white/80 shadow-lg rounded-2xl p-6 backdrop-blur-md shadow-amber-300 hover:shadow-amber-200 transition-all"
        >
          <h2 className="text-2xl font-semibold text-amber-600 mb-2">
            Our Vision
          </h2>
          <p>
            To light up lives — not just with candles, but with creativity,
            calmness, and connection. CandleX believes in sustainability,
            authenticity, and the small joys that come from mindful living.
          </p>
        </div>

        {/* Join the Glow */}
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="bg-white/80 shadow-lg rounded-2xl p-6 backdrop-blur-md shadow-amber-300 hover:shadow-amber-200 transition-all"
        >
          <h2 className="text-2xl font-semibold text-amber-600 mb-2">
            Join the Glow
          </h2>
          <p>
            Explore our collection, connect with us, and experience the warmth
            of CandleX. Whether it’s your first candle or your fiftieth, every
            flame tells a story — let’s make it yours.
          </p>
        </div>
      </div>

     <Aboutsection/>
    </div>
    <Footer />
    </section>
  );
}
