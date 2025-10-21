import AboutSection from "./components/AboutSection";
import BonusProgram from "./components/BonusProgram";
import ConsultationSection from "./components/ConsultationSection";
import DoctorsSection from "./components/DoctorsSection";
import Hero from "./components/Hero";
import Info from "./components/Info";
import MobileMenu from "./components/MobileMenu";
import ServicesAndPricing from "./components/ServicesAndPricing";
import TestimonialVideos from "./components/TestimonialVideos";

function App() {
  return (
    <div className="bg-dark-1 px-3 py-4 md:p-6 font-roboto">
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
    </div>
  );
}

export default App;
