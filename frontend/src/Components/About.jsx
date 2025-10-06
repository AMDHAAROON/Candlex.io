import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <section id="About" className="rounded-2xl border-2 border-white w-full  py-12 bg-gradient-to-b from-amber-50 via-yellow-50 to-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Left: YouTube Video */}
        <div
          className="w-full md:w-1/2 aspect-video shadow-2xl "
          data-aos="fade-right"
        >
          <iframe
            className="w-full h-full rounded-2xl  border-4 border-white"
            src="https://www.youtube.com/embed/j_P35HJn5Ow?autoplay=1&mute=1&controls=1"
            title="About Candle Brand"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Right: About Note */}
        <div className="w-full md:w-1/2" data-aos="fade-left">
        <div className="max-w-7xl mx-auto mb-4">
          <h2 className="text-4xl  font-bold text-amber-700 pb-4">OUR MAKINGS</h2>
          </div>
          <p className="text-[#4E3D28] text-xl  font-mono leading-relaxed">
            Welcome to our candle world 🔥<br/> 
           Each candle is crafted with love using natural ingredients and soothing scents.
We aim to light up your space with warmth, elegance, and a touch of calm.
Hand-poured in small batches, our candles are made to comfort and inspire.
          </p>
        
      </div>
      </div>
    </section>
  );
}
