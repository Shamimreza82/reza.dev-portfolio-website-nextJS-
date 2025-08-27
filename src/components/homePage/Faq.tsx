
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "I offer a variety of services, including web development, API development, and mobile development. I specialize in building high-performance websites and applications using modern technologies like Next.js, React, and Node.js.",
  },
  {
    question: "What is your development process?",
    answer:
      "My development process is collaborative and iterative. I work closely with my clients to understand their needs and goals, and I provide regular updates and opportunities for feedback throughout the development process.",
  },
  {
    question: "How much do your services cost?",
    answer:
      "The cost of my services depends on the scope and complexity of the project. I offer competitive rates and I am happy to provide a free consultation and estimate for your project.",
  },
  {
    question: "How can I get started?",
    answer:
      "The best way to get started is to contact me to schedule a free consultation. We can discuss your project in detail and I can answer any questions you have.",
  },
];

const Faq = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-400">
            Here are some common questions I get. If you have other questions,
            please feel free to contact me.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-white">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;
