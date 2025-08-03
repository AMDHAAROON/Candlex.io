import { useInView } from "react-intersection-observer";

const Offer = () => {
 
  return (
    <section className="pb-4"  id="">
      <div className="z-20 relative w-full rounded-2xl border-2 border-[#ffffff] overflow-hidden  shadow-2xl">
        {/* Banner Image */}
        <img
          src="Assets/hero/banner-offer.png"
          alt="Banner"
          className="w-full h-[30vh] object-cover object-left rounded-2xl"
        />
      </div>
    </section>
  );
};

export default Offer;
