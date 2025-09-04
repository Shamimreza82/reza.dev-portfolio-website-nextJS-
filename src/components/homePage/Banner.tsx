/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { CodeBracketIcon } from "@heroicons/react/24/outline";
import bannerImage1 from "../../asset/photo/protolio1.jpg";
import StatusBadge from "../ui/status-badge";

import RightSocialRail from "../banner/RightSocialRail";
import SoundButton from "../small-component/SoundButton";

import CosmosRealistic from "../visuals/CosmosRealistic";
import Particles from "../visuals/Particles";

import Image from "next/image";

const Banner = () => {
  return (
    <section
      className="flex flex-col md:flex-row pt-24 min-h-screen items-center px-4 py-12 gap-5 md:gap-10 lg:gap-20
                 bg-gradient-to-b  overflow-hidden"
    >

      <div className="block lg:hidden">
        <Particles
          count={80}
          linkDistance={120}
          parallax={34}
          className="text-cyan-300/60"
        />
      </div>

      <div className="hidden">
        {/* <Starfield
    count={200}
    parallax={34}
    twinkle={0.4}
    shootingEverySec={1}
    className="text-cyan-300/50"
  /> */}
      </div>

      <div className="hidden lg:block">
        <CosmosRealistic
          quality="low"
          bloom={1.12}
          sunPos={[0.6, 0.3]}
          galaxyPos={[0.1, 1.0]}
          sunRadius={5}
          galaxyRotation={0.20}
          parallax={50}
          planets={true}
        />
      </div>





      {/* soft glow overlay (optional) */}
      {/* <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-blue-500/10 blur-3xl" /> */}

      <div className="relative z-10 w-full max-w-4xl text-center md:text-left">
        {/* ...the rest of your existing content remains unchanged... */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="space-y-8 md:space-y-12"
        >
          <div className="flex items-center justify-center md:justify-start gap-3 mb-6 md:mb-8 group">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="neon-light"
            >
              <CodeBracketIcon className="w-10 h-10 text-cyan-400/80 group-hover:text-cyan-300 transition-colors" />
            </motion.div>
            <span className="text-lg md:text-xl font-mono text-cyan-400/80 group-hover:text-cyan-300 transition-colors neon-light">
              High-performance web experiences
            </span>
          </div>

          <motion.h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-100 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="inline-block bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent text-shadow-lg/30">
              Hi,
              <br />
              I am Reza,
              <br />
              Web developer
            </span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-base md:text-xl text-gray-300 max-w-3xl mx-auto md:mx-0 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="text-cyan-300 text-shadow-lg/60 ">Passionate full-stack developer</span> dedicated{" "}
            <span className="text-blue-300">to crafting seamless, high-performance web experiences.</span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-10 md:mt-16 justify-center md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >


            <SoundButton
              href="https://drive.google.com/file/d/1V4v3cIAmBX7VvkypTz9QRATk5lOtsi7A/view?usp=sharing"
              name="Resume"
              target="_blank"
              size={"lg"}
              variant={"default"}
              className="mx-auto"
            />


            <SoundButton
              href="/projects"
              name=" View my work"
              size={"lg"}
              variant={"outline"}
              className="mx-auto"
            />

          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-10">
        <div className="relative rounded-2xl lg:ml-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.02, delay: 1.2, ease: "easeOut" }}
            whileHover={{ scale: 1.01, rotate: 2 }}
          >
            <Image
              src={bannerImage1}
              alt="A picture of Reza, the full-stack web developer"
              className="max-w-md mx-auto w-80 md:max-w-lg lg:max-w-xl shadow-2xl shadow-cyan-500/50 rounded-2xl mt-8 md:mt-0"
              priority
            />
          </motion.div>
        </div>
        <div className="lg:ml-48 mt-8">
          <StatusBadge text="Available for projects" colorClass="bg-green-500" />
        </div>
      </div>
      <RightSocialRail />
    </section>
  );
};

export default Banner;
