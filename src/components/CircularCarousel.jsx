import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const CircularCarousel = () => {
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const [viewedCircles, setViewedCircles] = useState(new Set());
  const [canAdvance, setCanAdvance] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInCenter, setIsInCenter] = useState(false);

  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const carouselItems = [
    {
      id: 1,
      title: "Safe Treatment",
      subtitle: "Professional Care",
      description:
        "We adhere to the highest hygiene standards and use only proven methods. Our team follows all safety protocols to ensure your comfort and health.",
    },
    {
      id: 2,
      title: "Modern Technologies",
      subtitle: "Advanced Equipment",
      description:
        "We invest in the latest technological innovations and equipment. This allows us to achieve the best results and provide the highest quality treatment.",
    },
    {
      id: 3,
      title: "Best Price Guarantee",
      subtitle: "Transparent Pricing",
      description:
        "We offer competitive prices for services and guarantee high quality. Our pricing is transparent, and we work with various payment programs.",
    },
    {
      id: 4,
      title: "Professional Care",
      subtitle: "Expert Team",
      description:
        "Our experienced team provides personalized care for each patient. We ensure comfort and attention to detail throughout your treatment journey.",
    },
    {
      id: 5,
      title: "Quality Assurance",
      subtitle: "Guaranteed Results",
      description:
        "We provide comprehensive quality assurance and follow-up care. Your satisfaction and health are our top priorities in every treatment.",
    },
  ];

  useEffect(() => {
    // Intersection Observer to detect when carousel is in center of screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Check if the carousel is intersecting and is roughly in the center
          const rect = entry.boundingClientRect;
          const windowHeight = window.innerHeight;
          const elementCenter = rect.top + rect.height / 2;
          const screenCenter = windowHeight / 2;
          
          // Consider it "centered" if the element center is within 20% of screen center
          const threshold = windowHeight * 0.2;
          const isCentered = Math.abs(elementCenter - screenCenter) < threshold;
          
          setIsInCenter(entry.isIntersecting && isCentered);
        });
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: "-10% 0px -10% 0px"
      }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      // Only update scroll progress when carousel is in center
      if (isInCenter) {
        setScrollProgress(latest);

        const totalItems = carouselItems.length;
        const currentIndex = Math.floor(latest * totalItems);
        const clampedIndex = Math.max(0, Math.min(currentIndex, totalItems - 1));

        setViewedCircles((prev) => {
          const newSet = new Set(prev);
          newSet.add(clampedIndex);

          if (newSet.size === totalItems) {
            setCanAdvance(true);
          }

          return newSet;
        });
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, carouselItems.length, isInCenter]);

  // Only apply transform when carousel is in center
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    isInCenter ? [0, -((carouselItems.length - 1) * 450)] : [0, 0]
  );

  const itemVariants = {
    hidden: {opacity: 0, y: 30},
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className="relative py-12 min-h-screen"
      style={{
        height: "500vh",
      }}>
      {/* <div
        className="sticky top-0 h-screen bg-black text-white 
        overflow-hidden flex items-center justify-center">

      </div> */}

      <div
        ref={carouselRef}
        className="sticky top-0 py-12 text-white 
        overflow-hidden flex items-center justify-center">
        <div className="w-full pt-8 md:pt-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            className="text-center mb-8 md:mb-12 relative">
            <p className="text-xs text-gray-300 mb-2 uppercase tracking-wider">
              Service comes first
            </p>
            <div className="w-px h-12 bg-white mx-auto mb-2"></div>
            <h2
              className="text-2xl lg:text-3xl xl:text-4xl text-white
                font-semibold leading-tight max-w-3xl mx-auto">
              We pay special attention to prevention and preservation of teeth.
              We sincerely believe that you can live your whole life with your
              own teeth
            </h2>
          </motion.div>

          <div
            className="relative py-12
            flex items-center justify-start overflow-hidden">
            <motion.div
              className="flex items-center space-x-16 lg:space-x-20 pl-8"
              style={{x}}>
              {carouselItems.map((item, index) => {
                return (
                  <motion.div
                    key={item.id}
                    className="flex-shrink-0 flex flex-col items-center justify-center"
                    initial={{opacity: 0, scale: 0.8}}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05,
                      ease: "easeOut",
                    }}
                    viewport={{once: false, margin: "-20px"}}>
                    <div className="relative">
                      <motion.div
                        className="relative w-80 h-80 lg:w-[400px] lg:h-[400px]"
                        whileHover={{scale: 1.02}}
                        transition={{duration: 0.3}}>
                        <div className="absolute inset-0 rounded-full border border-gray-500/70"></div>

                        <motion.div
                          className="absolute inset-2 rounded-full 
                            bg-dark-3 flex flex-col items-center justify-center text-center shadow-2xl"
                          initial={{scale: 0.8, opacity: 0}}
                          whileInView={{scale: 1, opacity: 1}}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.1,
                            ease: "easeOut",
                          }}>
                          <div className="space-y-4 px-8 relative">
                            <div
                              className="absolute inset-0 bg-gradient-radial 
                                from-white/10 via-white/5 to-transparent rounded-full blur-xl"></div>

                            <motion.h3
                              className="text-2xl lg:text-3xl font-light text-white leading-tight relative z-10 drop-shadow-lg"
                              initial={{y: 30, opacity: 0}}
                              whileInView={{y: 0, opacity: 1}}
                              transition={{delay: 0.2 + index * 0.05}}>
                              {item.title}
                            </motion.h3>
                            <motion.p
                              className="text-lg text-gray-300 font-light relative z-10 drop-shadow-md"
                              initial={{y: 30, opacity: 0}}
                              whileInView={{y: 0, opacity: 1}}
                              transition={{delay: 0.25 + index * 0.05}}>
                              {item.subtitle}
                            </motion.p>
                          </div>
                        </motion.div>

                        <motion.div
                          className="absolute w-10 h-10 rounded-full border-2 border-gray-500/70 bg-black flex items-center justify-center"
                          style={{
                            top: "-20px",
                            left: "calc(50% - 30px)",
                            transform: "translateX(-50%)",
                          }}
                          initial={{scale: 0, rotate: -180}}
                          whileInView={{scale: 1, rotate: 0}}
                          transition={{
                            delay: 0.3 + index * 0.05,
                            duration: 0.3,
                          }}>
                          <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                        </motion.div>

                        <motion.div
                          className="absolute w-10 h-10 rounded-full border-2 border-gray-500/70 bg-black flex items-center justify-center"
                          style={{
                            bottom: "-20px",
                            right: "calc(50% - 30px)",
                            transform: "translateX(50%)",
                          }}
                          initial={{scale: 0, rotate: 180}}
                          whileInView={{scale: 1, rotate: 0}}
                          transition={{
                            delay: 0.35 + index * 0.05,
                            duration: 0.3,
                          }}>
                          <span className="text-white text-xs font-medium">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </motion.div>
                      </motion.div>

                      <motion.div
                        className="mt-6 max-w-xs text-center"
                        initial={{y: 30, opacity: 0}}
                        whileInView={{y: 0, opacity: 1}}
                        transition={{delay: 0.3 + index * 0.05}}>
                        <p className="text-xs text-gray-300 leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularCarousel;
