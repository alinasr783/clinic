const AboutSection = () => {
  const counter = [
    {
      id: 1,
      count: "28+",
      title: "Years of experience",
    },
    {
      id: 2,
      count: "1000+",
      title: "Satisfied patients",
    },
    {
      id: 3,
      count: 10,
      title: "Dentists",
    },
    {
      id: 4,
      count: "5+",
      title: "Branches",
    },
  ];

  return (
    <section className="bg-black text-white py-16 sm:py-20 lg:py-24 font-roboto">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <div className="flex flex-col items-center">
            <p className="text-sm sm:text-base text-gray-300 mb-4">About Us</p>
            <div className="w-px h-16 sm:h-20 bg-white"></div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2
            className="text-2xl lg:text-3xl xl:text-4xl 
            font-semibold leading-tight max-w-3xl mx-auto">
            Natura Smile Dental Clinic — a clinic created for people. Our
            mission — to help people become healthy, beautiful and happy
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="grid grid-cols-2 gap-6 md:max-w-[450px]">
            {counter.map((item) => (
              <div className="text-left">
                <div className="text-3xl lg:text-4xl font-semibold mb-2">
                  {item.count}
                </div>
                <div className="text-sm text-gray-300 leading-relaxed">
                  {item.title}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <div className="space-y-4">
                <p className="text-sm text-gray-300 leading-relaxed">
                  Our clinic exists not just as a medical institution, but as a
                  place where the best dental care, innovative technologies,
                  equipment and atmosphere come together to create the perfect
                  experience.
                </p>

                <p className="text-sm text-gray-300 leading-relaxed">
                  Every day we strive to provide exceptional dental care and
                  create a warm atmosphere. We carefully select our team and use
                  only the most advanced equipment to ensure that every visit is
                  comfortable and effective.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-gray-300 leading-relaxed">
                  Our impeccable reputation is built on trust, professionalism
                  and recommendations from our patients who have experienced
                  years of excellent service. We constantly improve our
                  expertise, undergo training, study innovations to provide the
                  highest level of care.
                </p>

                <p className="text-sm text-gray-300 leading-relaxed">
                  Treating patients with care: high quality work, safety and
                  comfort — our core values.
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <div className="h-64 lg:w-full lg:h-88">
                <img
                  src="https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg"
                  alt="Diamond representing excellence"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
