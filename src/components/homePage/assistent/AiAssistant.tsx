"use client";

import dynamic from "next/dynamic";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const AIChat = dynamic(() => import("../test-ai"), {
  ssr: false,
});

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
  const [open, setOpen] = useState(false);
  const constraintsRef = useRef(null);

  return (
    <div
      ref={constraintsRef}
      className="fixed bottom-8 lg:right-8 right-1 z-50 flex flex-col items-end"
    >
      <AnimatePresence>{open && <AIChat />}</AnimatePresence>

      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.3}
        onClick={() => setOpen((prev) => !prev)}
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0], transition: floatTransition }}
        whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 300 } }}
        whileTap={{ scale: 0.9 }}
        className="relative cursor-pointer"
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
      >
        <motion.div className="h-14 w-14 lg:h-24 lg:w-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-xl">
          <ChatBubbleOvalLeftEllipsisIcon className="lg:h-14 lg:w-14 h-10 w-10 text-white animate-in" />
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
