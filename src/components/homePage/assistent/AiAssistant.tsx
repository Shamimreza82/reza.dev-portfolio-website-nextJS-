"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useRef } from "react";

const floatTransition = {
  duration: 4,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

const presenceVariants = {
  pulse: {
    scale: [1, 1.4, 1],
    opacity: [1, 0.6, 1],
    transition: { duration: 2, repeat: Infinity },
  },
};

export default function AiAssistant() {
  const constraintsRef = useRef(null);
  const phoneNumber = "8801531297879";
  const message = "Hello! I'm interested in your services.";
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div
      ref={constraintsRef}
      className="fixed bottom-8 lg:right-8 right-1 z-50 flex flex-col items-end"
    >
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.3}
        onClick={handleWhatsAppClick}
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0], transition: floatTransition }}
        whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 300 } }}
        whileTap={{ scale: 0.9 }}
        className="relative cursor-pointer"
        aria-label="Contact on WhatsApp"
      >
        <motion.div className="h-14 w-14 lg:h-20 lg:w-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-xl">
          <MessageCircle className="lg:h-12 lg:w-12 h-8 w-8 text-white" />
        </motion.div>
        <motion.span
          className="absolute top-1 right-1 h-3 w-3 bg-green-400 rounded-full"
          variants={presenceVariants}
          animate="pulse"
        />
      </motion.div>
    </div>
  );
}
