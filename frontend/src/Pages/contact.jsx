import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Mail, Phone, MapPin, Instagram, Facebook, MessageCircle, Brush, Users, ShoppingBag, Mic, Camera, HeartHandshake } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

export default function Contact() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const scrolltoTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const services = [
    
    { icon: Users, title: "Community Events" },
    { icon: ShoppingBag, title: "Merchandise" },
    { icon: HeartHandshake, title: "Collaborations" },
  ];

  return (
    <section className="bg-gradient-to-br from-yellow-50 to-orange-100">
      <div className="bg-gradient-to-br from-yellow-50 to-orange-100 min-h-screen flex flex-col items-center text-center px-6 py-16">

        {/* Header */}
        <div data-aos="fade-down" className="max-w-3xl">
          <h1 className="text-5xl mt-24 md:text-6xl font-extrabold text-[#4E3D28] mb-4">
            Contact <span className="text-orange-600">CandleX</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Have a question, feedback, or collaboration idea?  
            We’d love to hear from you and light up new connections!
          </p>
        </div>

        {/* Contact Info Section */}
        <div data-aos="fade-up" className="mt-16 max-w-4xl bg-white shadow-xl rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-semibold text-orange-700 mb-8">Get in Touch</h2>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-gray-700">
            <div className="flex items-center gap-3">
              <Mail className="text-orange-600" size={24} />
              <span>support@candlex.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-orange-600" size={24} />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-orange-600" size={24} />
              <span>Kumbakonam, Tamil Nadu</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-10 flex justify-center gap-6 text-orange-700">
            <a href="#" aria-label="Instagram" className="hover:text-orange-500">
              <Instagram size={28} />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-orange-500">
              <Facebook size={28} />
            </a>
            <a href="#" aria-label="WhatsApp" className="hover:text-orange-500">
              <MessageCircle size={28} />
            </a>
          </div>
        </div>

        {/* Services Section */}
      <div data-aos="fade-up" className="mt-20 mb-10 max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
  {services.map((service, idx) => (
    <div
      key={idx}
      className="bg-gradient-to-br from-white/90 to-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-lg flex flex-col items-center text-center
                 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:from-white/30 hover:to-white/20"
    >
      <service.icon size={36} className="text-orange-500 mb-3 animate-bounce-slow" />
      <p className="text-[#4E3D28] font-semibold text-lg">{service.title}</p>
    </div>
  ))}
</div>


         {/* Map Section */}
      <div data-aos="fade-up" className="my-8 w-full max-w-5xl">
        <h2 className="text-3xl font-semibold text-orange-700 mb-6">
          Meet Us at Our Place
        </h2>
        <p className="text-gray-600 mb-8">
          Drop by our creative workspace to experience the making of CandleX
          firsthand. We’d love to connect, collaborate, and share ideas that
          inspire.
        </p>
        <div className=" shadow-lg rounded-2xl p-4 backdrop-blur-md shadow-amber-300 border-orange-500  hover:shadow-amber-200 transition-all">
        <div className="w-full h-[400px] rounded-2xl border-t-2 border-amber-200  shadow-amber-300  overflow-hidden">
          <iframe
            title="CandleX Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3910.438294283149!2d79.3795!3d10.9571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baab8b8cf14dcb1%3A0xe1fcb35f61b04e0f!2sKumbakonam%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1696933029194!5m2!1sen!2sin"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        </div>
      </div>
         {/* Contact Form Section */}
        <div
          data-aos="fade-up"
          className="mt-24 w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 md:p-10"
        >
          <h2 className="text-3xl font-semibold text-orange-700 mb-6">
            Send Us a Message
          </h2>
          <form className="flex flex-col gap-5 text-left">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <textarea
              rows="4"
              placeholder="Your Message..."
              className="p-3 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-orange-500 text-white font-semibold py-3 rounded-xl hover:bg-orange-600 transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      

      {/* Footer */}
      <Footer/>
    </section>
  );
}
