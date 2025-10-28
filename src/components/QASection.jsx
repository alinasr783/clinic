import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useState } from "react";

const qaData = [
  {
    id: 1,
    question:
      "What material is used for tooth restoration and cosmetic restorations?",
    answer:
      "For tooth restoration and cosmetic restorations, we use modern composite materials of the latest generation, ceramic inlays and veneers. All materials are certified and safe for health.",
  },
  {
    id: 2,
    question: "What aesthetic dentistry procedures do you offer?",
    answer:
      "We offer a wide range of aesthetic procedures: teeth whitening, veneer installation, artistic restoration, correction of tooth shape and color, as well as comprehensive aesthetic rehabilitation programs.",
  },
  {
    id: 3,
    question:
      "What teeth whitening procedures are offered and what results can be expected?",
    answer:
      "We offer professional whitening with the latest generation systems. The result is lightening by 6-8 shades in one procedure. The effect lasts up to 2-3 years with proper care.",
  },
  {
    id: 4,
    question: "How long does the aesthetic tooth restoration process take?",
    answer:
      "The duration of the process depends on the complexity of the case. Simple restoration takes 1-2 hours, complex work may require 2-4 visits. We always create an individual treatment plan.",
  },
  {
    id: 5,
    question: "Can I see examples of your work before deciding on treatment?",
    answer:
      "Of course! We have an extensive portfolio of completed work. We also use digital modeling to demonstrate the expected treatment results.",
  },
  {
    id: 6,
    question: "What factors affect the cost of aesthetic dentistry procedures?",
    answer:
      "The cost depends on the complexity of the case, chosen materials, number of teeth for treatment, and technologies used. We provide a detailed estimate after consultation.",
  },
  {
    id: 7,
    question: "Do you have financial programs or installment payment options?",
    answer:
      "Yes, we offer various payment options: installments up to 12 months without interest, discounts for full prepayment, as well as special programs for regular patients.",
  },
  {
    id: 8,
    question:
      "Can I get a consultation before starting treatment to discuss my goals and wishes?",
    answer:
      "Absolutely! The initial consultation includes examination, diagnostics, treatment plan development, and detailed discussion of all your wishes. The consultation is free of charge.",
  },
  {
    id: 9,
    question:
      "What recommendations for dental and gum care do you provide after aesthetic dentistry procedures?",
    answer:
      "After treatment, we provide detailed care recommendations, schedule preventive visits, teach proper hygiene, and select individual care products.",
  },
];

function QASection() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const openModal = (question) => {
    setSelectedQuestion(question);
  };

  const closeModal = () => {
    setSelectedQuestion(null);
  };

  return (
    <section className="relative bg-dark-1 min-h-screen py-4" id="faq">
      <div className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-2 items-stretch">
          <div className="relative h-[600px] lg:h-[700px]">
            <div className="relative h-full">
              <img
                src="/items.jpg"
                alt="Dental Equipment"
                className="w-full h-full object-cover rounded-2xl"
                style={{
                  filter: "brightness(0.8) contrast(1.1)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent rounded-2xl"></div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <p className="text-sm text-gray-300 mb-4 uppercase tracking-wider">
                  Question - Answer
                </p>
                <div className="w-px h-12 bg-white mx-auto mb-6"></div>
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                  We answer frequently
                  <br />
                  asked questions
                </h2>
              </div>
            </div>
          </div>

          <div className="space-y-1 h-[600px] lg:h-[700px] flex flex-col justify-center">
            {qaData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{opacity: 0, x: 20}}
                whileInView={{opacity: 1, x: 0}}
                transition={{duration: 0.5, delay: index * 0.1}}
                viewport={{once: true}}
                className="bg-white rounded-2xl p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-300"
                onClick={() => openModal(item)}>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 pr-4 leading-relaxed">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8  flex items-center justify-center">
                      <Plus className="w-5 h-5 text-dark-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedQuestion && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}>
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={closeModal}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
            />

            {/* Modal Content */}
            <motion.div
              className="relative bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              initial={{opacity: 0, scale: 0.9, y: 20}}
              animate={{opacity: 1, scale: 1, y: 0}}
              exit={{opacity: 0, scale: 0.9, y: 20}}
              transition={{duration: 0.3, ease: "easeOut"}}
              onClick={(e) => e.stopPropagation()}>
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 w-10 h-10 bg-gray-100 
                  hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <div className="pr-12">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 leading-relaxed">
                  {selectedQuestion.question}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {selectedQuestion.answer}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default QASection;
