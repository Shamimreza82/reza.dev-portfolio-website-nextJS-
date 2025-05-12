/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion, MotionValue, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { CodeBracketIcon, CommandLineIcon } from '@heroicons/react/24/outline';
import {AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';



const FloatingTech = ({ items }: { items: (string | ReactNode)[] }) => {
  return items.map((item: string | number | bigint | boolean | MotionValue<string> | MotionValue<number> | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined, index: Key | null | undefined) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const x = useSpring(useMotionValue(Math.random() * 100).get());
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const y = useSpring(useMotionValue(Math.random() * 100).get());
    
    return (
      <motion.span
        key={index}
        style={{ x: useMotionTemplate`calc(${x}vw - 50%)`, y: useMotionTemplate`calc(${y}vh - 50%)` }}
        animate={{
          scale: [0.8, 1.2, 0.8],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: Math.random() * 4 + 4,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute text-6xl opacity-10 blur-lg hover:opacity-20 transition-opacity"
      >
        {item}
      </motion.span>
    );
  });
};



const Banner = () => {


  return (
    <section className=" bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center px-4 md:px-8 lg:px-16 py-24">
      {/* Dynamic Gradient Mesh */}
      <div className="absolute inset-0 opacity-50">
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(18,147,154,0.15)_0%,_transparent_70%)]" 
        />
      </div>

      {/* Floating Tech Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingTech items={['</>', '{}', '()', '=>', '♾']} />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="space-y-8 md:space-y-12"
        >
          {/* Animated Header */}
          <div className="flex items-center gap-3 mb-8 group">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <CodeBracketIcon className="w-10 h-10 text-cyan-400/80 group-hover:text-cyan-300 transition-colors" />
            </motion.div>
            <span className="text-xl font-mono text-cyan-400/80 group-hover:text-cyan-300 transition-colors">
              Digital Experience Architect
            </span>
          </div>

          {/* Main Headline */}
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-100 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="inline-block bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Transformative
            </span>
            <span className="block mt-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Digital Solutions
            </span>
          </motion.h1>

          {/* Animated Description */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Blending <span className="text-cyan-300">aesthetic innovation</span> with{' '}
            <span className="text-blue-300">technical excellence</span> to create web experiences
            that <span className="underline decoration-purple-400">captivate</span> and{' '}
            <span className="underline decoration-cyan-400">convert</span>.
          </motion.p>

          {/* Interactive Tech Grid */}
          <motion.div 
            className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {['Next.js 14', 'React 18', 'Node.js 20', 'MongoDB', 'Figma', 'TypeScript', 'WebGL', 'AWS', 'Jest', 'Three.js'].map((tech) => (
              <motion.div
                key={tech}
                whileHover={{ scale: 1.05, y: -4 }}
                className="p-4 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-cyan-400/30 transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity" />
                <span className="font-medium text-gray-300">{tech}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Dynamic CTA Section */}
          <motion.div 
            className="flex gap-6 mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-br from-cyan-500 to-blue-600 text-gray-950 rounded-xl font-bold flex items-center gap-3 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CommandLineIcon className="w-6 h-6" />
              Explore Innovations
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 border-2 border-cyan-500/30 bg-gray-900/50 text-cyan-300 rounded-xl font-bold backdrop-blur-sm hover:border-cyan-400/60 transition-all relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-cyan-500/10 opacity-0 hover:opacity-100 transition-opacity" />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Connect & Create
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
     

Hi, I’m Shamim Reza,
A Dedicated MERN Stack Developer crafting seamless and dynamic web experiences.

I specialize in building modern, responsive, and innovative websites using MongoDB, Express, React, Node.js, and Next.js.


git


    </section>
  );
};

export default Banner;