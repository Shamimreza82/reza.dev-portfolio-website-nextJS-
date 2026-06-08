"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "I specialize in full-stack web development, creating high-performance applications using Next.js, React, and Node.js. My services include front-end design, back-end architecture, API integration, and database management.",
  },
  {
    question: "What is your development process?",
    answer:
      "My process is agile and collaborative. It typically involves discovery and planning, UI/UX design, development with regular updates, thorough testing, and finally, deployment and support.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on complexity. A simple landing page might take 1-2 weeks, while a complex SaaS platform or e-commerce site could take 2-4 months. I provide detailed timelines after our initial consultation.",
  },
  {
    question: "Do you offer post-launch support?",
    answer:
      "Yes, I offer ongoing maintenance and support packages to ensure your application remains secure, up-to-date, and continues to perform optimally as your business grows.",
  },
];

const Faq = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wider uppercase">
            <HelpCircle className="h-3 w-3" /> FAQ
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Common <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to the most common questions about my development process, services, and how we can work together.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border/50 rounded-xl px-4 bg-card/50 backdrop-blur-sm">
                <AccordionTrigger className="text-left font-medium hover:text-primary transition-colors py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
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
