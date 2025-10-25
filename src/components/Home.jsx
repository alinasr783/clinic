import AboutSection from "./AboutSection";
import BackToTopButton from "./BackToTopButton";
import BonusProgram from "./BonusProgram";
import CircularCarousel from "./CircularCarousel";
import ConsultationSection from "./ConsultationSection";
import ContactSection from "./ContactSection";
import DoctorsSection from "./DoctorsSection";
import Footer from "./Footer";
import HealthAndBeautySection from "./HealthAndBeautySection";
import Hero from "./Hero";
import Info from "./Info";
import MobileMenu from "./MobileMenu";
import QASection from "./QASection";
import ServicesAndPricing from "./ServicesAndPricing";
import TestimonialVideos from "./TestimonialVideos";

function Home() {
  return (
    <main className="bg-dark-1 px-3 py-4 md:p-6 font-roboto">
      <MobileMenu />
      <Hero />

      <div className="mt-3 sm:mt-4 md:mt-6">
        <Info />
      </div>

      <div className="mt-3 sm:mt-4 md:mt-6">
        <ServicesAndPricing />
      </div>
      <div className="mt-3 sm:mt-4 md:mt-6">
        <ConsultationSection />
      </div>
      <div className="mt-3 sm:mt-4 md:mt-6">
        <BonusProgram />
      </div>
      <div className="mt-3 sm:mt-4 md:mt-6">
        <TestimonialVideos />
      </div>
      <div className="mt-3 sm:mt-4 md:mt-6">
        <DoctorsSection />
      </div>
      <div className="mt-3 sm:mt-4 md:mt-6">
        <AboutSection />
      </div>
      <div className="mt-3 sm:mt-4 md:mt-6">
        <CircularCarousel />
      </div>
      <div className="mt-3 sm:mt-4 md:mt-6">
        <HealthAndBeautySection />
      </div>

      <div className="mt-3 sm:mt-4 md:mt-6">
        <QASection />
      </div>

      <div className="mt-3 sm:mt-4 md:mt-6">
        <ContactSection />
      </div>

      <Footer />
      <BackToTopButton />
    </main>
  );
}

export default Home;
