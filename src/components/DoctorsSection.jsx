import {useState} from "react";
import DoctorCard from "./DoctorCard";
import DoctorModal from "./DoctorModal";

const doctorsData = [
  {
    id: 1,
    name: "Dr. Elena Vladimirovna",
    specialty: "Dental surgeon, aesthetics specialist",
    experience: "26 years of experience",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    details: {
      fullName: "Dr. Elena Vladimirovna Savkina",
      specialization: "Dental surgeon, implantologist, orthodontist",
      yearsOfExperience: "28+",
      experienceDescription: "Experience since 1998",
      patientsCount: "4000+",
      patientsDescription:
        "Successful treatments performed with excellent results",
      certificatesCount: "35+",
      certificatesDescription: "Certificates and professional achievements",
      education: "Higher education",
      educationDetails:
        "1991-1997 - Krasnoyarsk Medical Institute named after S.I. Georgievsky",
      certificates: [
        "https://images.unsplash.com/photo-1742415888265-d5044039d8e6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1392",
        "https://images.unsplash.com/photo-1742415888265-d5044039d8e6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1392",
        "https://images.unsplash.com/photo-1742415888265-d5044039d8e6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1392",
      ],
      qualifications: [
        "1998-1999 - Received internship in the specialty 'Stomatology orthopedics'",
        "2021 - Advanced qualification in the specialty 'Stomatology orthodontics'",
        "2008 - Advanced qualification in the specialty 'Stomatology orthodontics'",
        "2008 - Completed retraining in the specialty 'Stomatology surgery'",
        "2015 - Advanced qualification in the specialty 'Stomatology orthodontics'",
        "2015 - Advanced qualification in the specialty 'Stomatology surgery'",
      ],
    },
  },
  {
    id: 2,
    name: "Dr. Alexey Vasilyevich",
    specialty: "Dental surgeon, implantologist, orthodontist",
    experience: "24 years of experience",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    details: {
      fullName: "Dr. Alexey Vasilyevich Chernikov",
      specialization: "Dental surgeon, implantologist, orthodontist",
      yearsOfExperience: "28+",
      experienceDescription: "Experience since 1998",
      patientsCount: "4000+",
      patientsDescription:
        "Successful treatments performed with excellent results",
      certificatesCount: "35+",
      certificatesDescription: "Certificates and professional achievements",
      education: "Higher education",
      educationDetails:
        "1991-1997 - Krasnoyarsk Medical Institute named after S.I. Georgievsky",
      certificates: [
        "/api/placeholder/300/400",
        "/api/placeholder/300/400",
        "/api/placeholder/300/400",
      ],
      qualifications: [
        "Specialist in dental implantation, gnathology, bone plastic, complex orthopedic operations",
        "Advanced training in modern implantation techniques",
        "Certified in complex oral rehabilitation procedures",
        "Expert in aesthetic dentistry and smile design",
      ],
    },
  },
  {
    id: 3,
    name: "Dr. Anna Andreevna",
    specialty: "Dental therapist, endodontist",
    experience: "3 years of experience",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    details: {
      fullName: "Dr. Anna Andreevna Zakharova",
      specialization: "Dental therapist, endodontist",
      yearsOfExperience: "3+",
      experienceDescription: "Experience since 2021",
      patientsCount: "800+",
      patientsDescription:
        "Successful treatments with focus on conservative therapy",
      certificatesCount: "15+",
      certificatesDescription: "Modern certificates in therapeutic dentistry",
      education: "Higher education",
      educationDetails: "2018-2024 - Moscow State Medical University",
      certificates: ["/api/placeholder/300/400", "/api/placeholder/300/400"],
      qualifications: [
        "Specialist in endodontic treatment and root canal therapy",
        "Advanced training in microscopic dentistry",
        "Certified in aesthetic restorations",
        "Expert in preventive dentistry",
      ],
    },
  },
];

function DoctorsSection() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const openModal = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const closeModal = () => {
    setSelectedDoctor(null);
  };

  return (
    <section className="text-white py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-sm text-gray-400 mb-2">Doctors</div>
          <div className="w-px h-8 bg-white mx-auto mb-4"></div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight max-w-3xl mx-auto">
            Our specialists care about the smallest details so that every
            patient feels special
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctorsData.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onDetailsClick={() => openModal(doctor)}
            />
          ))}
        </div>
      </div>

      {selectedDoctor && (
        <DoctorModal doctor={selectedDoctor} onClose={closeModal} />
      )}
    </section>
  );
}

export default DoctorsSection;
