import {useRef, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

function CertificateSlider({certificates}) {
  const swiperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!certificates || certificates.length === 0) {
    return null;
  }

  return (
    <div className="relative bg-white p-2 rounded-lg max-w-xs mx-auto">
      <Swiper
        ref={swiperRef}
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          bulletClass: "cert-slider-bullet",
          bulletActiveClass: "cert-slider-bullet-active",
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
        className="certificate-slider rounded-lg overflow-hidden">
        {certificates.map((certificate, index) => (
          <SwiperSlide key={index}>
            <img
              src={certificate}
              alt={`Certificate ${index + 1}`}
              className="w-full h-auto object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Compact pagination dots */}
      {certificates.length > 1 && (
        <div
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 
        flex gap-1 z-10">
          {certificates.map((_, index) => (
            <button
              key={index}
              className={`cert-slider-bullet w-1.5 h-1.5 rounded-full 
              transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white cert-slider-bullet-active scale-125"
                  : "bg-white/60 hover:bg-white/80"
              }`}
              onClick={() => swiperRef.current?.swiper.slideTo(index)}
            />
          ))}
        </div>
      )}

      {/* Custom styles */}
      <style>{`
        .certificate-slider .swiper-pagination {
          position: static !important;
        }

        .cert-slider-bullet {
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cert-slider-bullet-active {
          transform: scale(1.25);
        }

        .cert-slider-bullet:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}

export default CertificateSlider;
