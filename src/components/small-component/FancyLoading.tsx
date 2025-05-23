import React from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function FancyLoading() {
  const controls = useAnimation();

  React.useEffect(() => {
    controls.start(i => ({
      opacity: [0.2, 1, 0.2],
      y: [0, -10, 0],
      transition: { delay: i * 0.2, repeat: Infinity, duration: 1 }
    }));
  }, [controls]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-6 rounded-2xl shadow-2xl w-72 mx-auto"
      style={{
        background: 'linear-gradient(135deg, #6b21a8, #9333ea, #ec4899)',
        backgroundSize: '400% 400%'
      }}
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.div
        className="w-20 h-20 mb-4 rounded-full border-4 border-t-transparent border-white"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
      />

      <motion.h3
        className="text-white text-xl font-bold mb-2 flex items-center"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
      >
        Loading
        <span className="flex ml-2 space-x-1">
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              custom={i}
              className="block w-2 h-2 bg-white rounded-full"
              animate={controls}
            />
          ))}
        </span>
      </motion.h3>

      <motion.div
        className="w-full h-2 bg-white bg-opacity-30 rounded-full overflow-hidden mt-2"
        initial={{ width: '0%' }}
        animate={{ width: ['0%', '70%', '0%'] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      />

      <motion.p
        className="text-white text-sm opacity-75 text-center mt-3"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        Preparing things just for you...
      </motion.p>
    </motion.div>
  );
}
