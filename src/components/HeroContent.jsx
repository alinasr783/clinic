import {motion as Motion} from "framer-motion";
import {useState, useEffect} from "react";

function HeroContent() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/hero.png";
    img.onload = () => {
      setImageLoaded(true);
      setTimeout(() => setStartAnimation(true), 100);
    };
    img.onerror = () => {
      setImageLoaded(true);
      setStartAnimation(true);
    };
  }, []);

  const container = {
    hidden: {opacity: 0},
    show: {
      opacity: 1,
      transition: {staggerChildren: 0.15, delayChildren: 0.2},
    },
  };

  const fadeOnly = {
    hidden: {opacity: 0},
    show: {
      opacity: 1,
      transition: {duration: 0.8, ease: "easeOut"},
    },
  };

  return (
    <div
      className="relative h-full w-full flex 
        items-center justify-center text-center overflow-hidden">
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-8 h-8 border-2 border-white/30 
            border-t-white rounded-full animate-spin"
          />
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/hero.png"
          alt="Diamond"
          className={`lg:w-[50vw] object-contain transition-opacity duration-300 ${
            imageLoaded ? "opacity-90" : "opacity-0"
          }`}
          loading="eager"
          fetchPriority="high"
          style={{
            backfaceVisibility: "hidden",
          }}
        />
      </div>

      <Motion.div
        variants={container}
        initial="hidden"
        animate={startAnimation ? "show" : "hidden"}
        className="relative z-10">
        <Motion.h1
          variants={fadeOnly}
          className="font-script font-light text-white 
            leading-none text-[60px] md:text-[90px] lg:text-[120px]"
          style={{willChange: "transform, opacity"}}>
          Aesthetic
        </Motion.h1>
        <Motion.h2
          variants={fadeOnly}
          className="font-bold text-white uppercase tracking-wider 
          leading-none text-[45px] sm:text-[90px] md:text-[120px] lg:text-[160px]"
          style={{willChange: "transform, opacity"}}>
          DENTISTRY
        </Motion.h2>
      </Motion.div>

      <Motion.div
        variants={fadeOnly}
        initial="hidden"
        animate={startAnimation ? "show" : "hidden"}
        className="absolute bottom-1 left-0 right-0 text-gray-300"
        style={{willChange: "transform, opacity"}}>
        <p className="text-xs md:text-sm">October Field, Panfilovskaya</p>
        <p className="text-xs md:text-sm">
          Marshal Rybalko St. 2 Bldg 9 Office 229
        </p>
      </Motion.div>
    </div>
  );
}

export default HeroContent;
