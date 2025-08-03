export default function Soon() {
  return (
    <>
      <section className="pb-4" id="products">
        <div className="pb-2 relative px-8 bg-[linear-gradient(to_top_right,#ffba52_0%,#FFEBD4_0%,#ffba52_220%)] border-4 border-white w-full h-auto rounded-2xl">
          
          {/* Flex container with no wrapping */}
          <div className="flex items-center justify-center">
            
            {/* Left: Image */}
            <div className="w-1/2  ">
              <img src="Assets/hero/soon.png" alt="Kaori Diffuser Oil" className="w-full h-auto rounded-2xl" />
            </div>

            {/* Right: Text */}
            <div className="w-1/2  text-center">
              <h1 className="text-7xl font-bold text-[#4E3D28] ">
               Kaori Diffuser Oil
              </h1>
              <p className="mt-8 text-5xl inline-block  p-3 rounded-lg bg-[#8d6f49] text-[#FFEBD4] font-bold">
                 Comming soon
              </p>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}
