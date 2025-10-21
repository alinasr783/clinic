import {AnimatePresence, motion} from "framer-motion";
import {Plus} from "lucide-react";
import {useState} from "react";

const containerVariants = {
  initial: {backgroundColor: "rgb(255 255 255)"},
  hover: {backgroundColor: "rgb(249 250 251)"},
};

const titleVariants = {
  initial: {x: 0},
  hover: {x: 10},
};

const animations = {
  container: {
    layout: true,
    initial: {opacity: 0, y: 20},
    animate: {opacity: 1, y: 0},
    transition: {duration: 0.5, ease: "easeOut"},
  },
  header: {
    whileTap: {scale: 0.995},
    transition: {duration: 0.2, ease: "easeInOut"},
  },
  title: {
    transition: {duration: 0.3, ease: [0.4, 0, 0.2, 1]},
  },
  button: {
    whileHover: {scale: 1.1},
    whileTap: {scale: 0.95},
  },
  icon: {
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
  content: {
    initial: {opacity: 0, scaleY: 0, transformOrigin: "top"},
    animate: {opacity: 1, scaleY: 1, transformOrigin: "top"},
    exit: {opacity: 0, scaleY: 0, transformOrigin: "top"},
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
      opacity: {duration: 0.15},
    },
  },
  contentInner: {
    initial: {y: -30, opacity: 0},
    animate: {y: 0, opacity: 1},
    exit: {y: -30, opacity: 0},
    transition: {delay: 0.05, duration: 0.2, ease: [0.4, 0, 0.2, 1]},
  },
  image: {
    initial: {scale: 0.9, opacity: 0},
    animate: {scale: 1, opacity: 1},
    transition: {delay: 0.1, duration: 0.25, ease: [0.4, 0, 0.2, 1]},
  },
  textContent: {
    initial: {x: 30, opacity: 0},
    animate: {x: 0, opacity: 1},
    transition: {delay: 0.08, duration: 0.2, ease: [0.4, 0, 0.2, 1]},
  },
  subtitle: {
    initial: {opacity: 0},
    animate: {opacity: 1},
    transition: {delay: 0.12, duration: 0.15},
  },
  listItem: (index) => ({
    initial: {x: -20, opacity: 0},
    animate: {x: 0, opacity: 1},
    transition: {
      delay: 0.15 + index * 0.03,
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
  description: (detailsLength) => ({
    initial: {opacity: 0},
    animate: {opacity: 1},
    transition: {
      delay: 0.2 + (detailsLength ? detailsLength * 0.03 : 0),
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

const servicesData = [
  {
    id: 1,
    title: "Consultation and Diagnosis",
    price: "Free",
    image: "/items.jpg",
    details: [
      "Collection of information about the patient's health condition",
      "Clarifies the presence of allergies to the condition of teeth and gums",
      "Conducts oral cavity examination",
      "If necessary, takes a photo protocol",
      "Conducts radiography",
      "Can perform a quick analysis of saliva pH and resistance to caries",
      "Examines soft tissues for oncological vigilance",
      "Checks for hidden caries",
    ],
    description:
      "After the examination, a preliminary treatment plan is drawn up and measures for caries prevention are scheduled. The patient receives all necessary documentation of the treatment plan and cost.",
  },
  {
    id: 2,
    title: "Hygiene",
    price: "from 8000 ₽",
    image: "/items.jpg",
    details: [
      "Professional teeth cleaning",
      "Plaque and tartar removal",
      "Polishing and fluoride treatment",
      "Oral hygiene instructions",
    ],
    description:
      "We offer a range of dental hygiene services to keep your teeth clean, healthy, and safe. Our team of dental hygienists uses the latest techniques and equipment to provide you with the best possible care.",
  },
  {
    id: 3,
    title: "Teeth Whitening",
    price: "from 13000 $",
    image: "/items.jpg",
    details: [
      "Professional whitening procedures",
      "Safe whitening agents",
      "Custom whitening trays",
      "Post-treatment care instructions",
    ],
    description:
      "Teeth whitening is a cosmetic procedure that uses light to change the color of the teeth. It is a non-invasive and safe procedure that can help improve the appearance of your teeth.",
  },
  {
    id: 4,
    title: "Dental Implants",
    price: "from 50000 $",
    image: "/items.jpg",
    details: [
      "Implant consultation and planning",
      "Surgical implant placement",
      "Crown placement",
      "Follow-up care",
    ],
    description:
      "Dental implants are a type of dental therapy that replaces missing teeth with artificial teeth. They are a permanent solution that can help restore the functionality and appearance of your teeth.",
  },
  {
    id: 5,
    title: "Aesthetic Restoration",
    price: "from 20000 $",
    image: "/items.jpg",
    details: [
      "Veneers and crowns",
      "Composite bonding",
      "Smile design",
      "Color matching",
    ],
    description:
      "Aesthetic restoration is a process of restoring the appearance of your teeth and gums. It can include the use of veneers, crowns, and composite bonding to create a natural look.",
  },
  {
    id: 6,
    title: "Dental Treatment",
    price: "from 7000 $",
    image: "/items.jpg",
    details: [
      "Cavity treatment",
      "Root canal therapy",
      "Dental fillings",
      "Pain management",
    ],
    description:
      "Dental treatment is a process of removing dental problems, such as cavities, root canals, and tooth decay. It can include a range of procedures, such as dental fillings, crowns, and bridges.",
  },
  {
    id: 7,
    title: "Prosthetics",
    price: "from 13000 ₽",
    image: "/items.jpg",
    details: [
      "Partial and complete dentures",
      "Bridge work",
      "Implant-supported prosthetics",
      "Adjustments and repairs",
    ],
    description:
      "Prosthetics are a type of dental therapy that replaces missing teeth with artificial teeth. They are a permanent solution that can help restore the functionality and appearance of your teeth.",
  },
];

function ServiceAccordion() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderServiceHeader = (service) => (
    <motion.div
      className="flex items-center justify-between 
        p-2 sm:p-3 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => toggleItem(service.id)}
      initial="initial"
      whileHover="hover"
      whileTap={animations.header.whileTap}
      variants={containerVariants}
      transition={animations.header.transition}>
      <motion.div
        className="flex-1"
        variants={titleVariants}
        transition={animations.title.transition}>
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-700">
          {service.title}
        </h3>
      </motion.div>

      <div className="flex-1 text-center">
        {service.price && (
          <span className="text-xs sm:text-sm text-gray-500">
            ({service.price})
          </span>
        )}
        {service.id === 1 && service.price === "Free" && (
          <span className="bg-gray-100 text-gray-600 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
            Free
          </span>
        )}
      </div>

      <div className="flex-1 flex justify-end">
        <motion.button
          className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center"
          whileHover={animations.button.whileHover}
          whileTap={animations.button.whileTap}>
          <motion.div
            animate={{rotate: openItems[service.id] ? 45 : 0}}
            whileHover={{rotate: openItems[service.id] ? 90 : 45}}
            transition={animations.icon.transition}>
            <Plus className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800" />
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  );

  const renderServiceContent = (service) => (
    <motion.div
      className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6 border-t border-gray-100"
      initial={animations.content.initial}
      animate={animations.content.animate}
      exit={animations.content.exit}
      transition={animations.content.transition}
      style={{overflow: "hidden"}}>
      <motion.div
        className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6 pt-3 sm:pt-4 md:pt-6"
        {...animations.contentInner}>
        {service.image && (
          <motion.div className="lg:w-1/2" {...animations.image}>
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-xl"
              loading="lazy"
              decoding="async"
              style={{
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
              }}
            />
          </motion.div>
        )}

        <motion.div
          className={service.image ? "lg:w-1/2" : "w-full"}
          {...animations.textContent}>
          {service.details && (
            <div className="mb-3 sm:mb-4">
              <motion.h4
                className="font-medium text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base"
                {...animations.subtitle}>
                During consultation, the doctor will:
              </motion.h4>
              <ul className="space-y-1 sm:space-y-2">
                {service.details.map((detail, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start space-x-2 text-xs sm:text-sm text-gray-600"
                    {...animations.listItem(index)}>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                    <span>{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {service.description && (
            <motion.p
              className="text-xs sm:text-sm text-gray-600 leading-relaxed"
              {...animations.description(service.details?.length)}>
              {service.description}
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-0.5 sm:space-y-1">
      {servicesData.map((service) => (
        <motion.div
          key={service.id}
          className="bg-white rounded-xl overflow-hidden shadow-sm"
          {...animations.container}>
          {renderServiceHeader(service)}

          <AnimatePresence mode="wait">
            {openItems[service.id] && renderServiceContent(service)}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

export default ServiceAccordion;
