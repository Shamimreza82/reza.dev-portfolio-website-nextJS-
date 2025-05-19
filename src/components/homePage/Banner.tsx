/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion';
import { CodeBracketIcon, CommandLineIcon } from '@heroicons/react/24/outline';
import bannerImage1 from '../../asset/photo/protolio1.jpg'; // Adjust the path as necessary
import StatusBadge from '../ui/status-badge';

const Banner = () => {
  return (
    <section className="flex flex-col md:flex-row pt-24 min-h-screen items-center px-4 py-12 gap-5 md:gap-10 lg:gap-20 bg-gradient-to-b" >
      <div className="relative z-10 w-full max-w-4xl text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="space-y-8 md:space-y-12"
        >
          {/* Animated Header */}
          <div className="flex items-center justify-center md:justify-start gap-3 mb-6 md:mb-8 group">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="neon-light"
            >
              <CodeBracketIcon className="w-10 h-10 text-cyan-400/80 group-hover:text-cyan-300 transition-colors" />
            </motion.div>
            <span className="text-lg md:text-xl font-mono text-cyan-400/80 group-hover:text-cyan-300 transition-colors neon-light">
              High-performance web experiences
            </span>
          </div>

          {/* Main Headline */}
          <motion.h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-100 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >

            <span className="inline-block bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Hi,
              <br />
              I am Reza,
              <br />Web developer
            </span>
            {/* You can add a second line here if needed */}
          </motion.h1>

          {/* Animated Description */}
          <motion.p
            className="text-base sm:text-base md:text-xl text-gray-300 max-w-3xl mx-auto md:mx-0 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="text-cyan-300">Passionate full-stack developer</span> dedicated{' '}
            <span className="text-blue-300">to crafting seamless, high-performance web experiences.</span>
          </motion.p>

          {/* Interactive Tech Grid */}
          {/* <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-8 md:mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {['MongoDB', 'ExtressJS', 'React', 'Node.JS', 'TypeScript', 'Prosgress', 'Prisma'].map((tech) => (
              <motion.div
                key={tech}
                whileHover={{ scale: 1.05, y: -4 }}
                className="lg:p-4 p-2 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-cyan-400/30 transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity" />
                <span className="font-medium text-gray-300 text-sm sm:text-base">{tech}</span>
              </motion.div>
            ))}
          </motion.div> */}

          {/* Dynamic CTA Section */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-10 md:mt-16 justify-center md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 sm:px-10 py-4 bg-gradient-to-br from-cyan-500 to-blue-600 text-gray-950 rounded-xl font-bold flex items-center gap-2 sm:gap-3 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CommandLineIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-sm sm:text-base">Hire me</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 sm:px-10 py-4 border-2 border-cyan-500/30 bg-gray-900/50 text-cyan-300 rounded-xl font-bold backdrop-blur-sm hover:border-cyan-400/60 transition-all relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-cyan-500/10 opacity-0 hover:opacity-100 transition-opacity" />
              <span className="text-sm sm:text-base bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                View my work
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      <div>
        <div className="relative  rounded-2xl lg:ml-28 ">
          <motion.img
            src={bannerImage1.src}
            alt="Portfolio"
            className="max-w-md mx-auto w-80 md:max-w-lg lg:max-w-xl shadow-2xl shadow-cyan-500/50 rounded-2xl   mt-8 md:mt-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.02, delay: 1.2, ease: 'easeOut' }}
            whileHover={{ scale: 1.01, rotate: 2 }}
          />
        </div>
        <div className='lg:ml-48 mt-8'>
          <StatusBadge
            text='Available for projects'
            colorClass='bg-green-500'
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
