"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Github, Code2, Rocket, Sparkles, Server, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import bannerImage1 from "../../asset/photo/protolio1.webp";
import StatusBadge from "../ui/status-badge";
import { useState, useEffect, useCallback } from "react";

const roles = [
  "Backend Systems",
  "AI Solutions",
  "SaaS Platforms",
  "RESTful APIs"
];

const Banner = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentRole = roles[roleIndex];

  const handleTyping = useCallback(() => {
    if (!isDeleting) {
      if (charIndex < currentRole.length) {
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (charIndex > 0) {
        setCharIndex(prev => prev - 1);
      } else {
        setIsDeleting(false);
        setRoleIndex(prev => (prev + 1) % roles.length);
      }
    }
  }, [charIndex, isDeleting, currentRole]);

  useEffect(() => {
    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [handleTyping, isDeleting]);
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden perspective-1000">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.05)_0%,transparent_70%)]" />
      </div>

      {/* Modern Grid/Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] -z-20" />

      {/* Full-Screen Image on Right */}
      <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
        <Image
          src={bannerImage1}
          alt="SHAMIM REZA - Backend Specialist"
          className="w-full h-full object-cover object-left"
          priority
          sizes="50vw"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Content Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col space-y-8 text-center lg:text-left"
          >
            {/* <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
              <StatusBadge 
                text="Available for new opportunities" 
                colorClass="bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
              /> */}
            {/* </motion.div> */}

            <div className="space-y-4">
              <motion.h1 
                variants={itemVariants}
                className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tight leading-[1.1]"
              >
                Engineering<br />
                <span className="text-gradient inline-flex">
                  {currentRole.substring(0, charIndex)}
                  <span className="animate-pulse ml-0.5 font-light">|</span>
                </span>
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium"
              >
                I'm <span className="text-foreground font-bold underline decoration-primary/30 underline-offset-4">SHAMIM REZA</span>, a Full-Stack Developer specializing in scalable backend architectures and intelligent AI-powered solutions.
              </motion.p>
            </div>

            {/* <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2"
            >
              <Button asChild size="lg" className="h-14 px-10 rounded-2xl text-base font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300">
                <Link href="/projects">
                  View Projects <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-10 rounded-2xl text-base font-bold bg-background/50 backdrop-blur-sm border-border/50 hover:bg-accent/50 hover:-translate-y-1 transition-all duration-300" asChild>
                <Link href="https://github.com/Shamimreza82" target="_blank">
                  <Github className="mr-2 h-5 w-5" /> GitHub
                </Link>
              </Button>
              <Button variant="secondary" size="lg" className="h-14 px-10 rounded-2xl text-base font-bold shadow-lg hover:-translate-y-1 transition-all duration-300" asChild>
                <a href="/Shamim_Reza_Resume.pdf" download="Shamim_Reza_Resume.pdf">
                  <Download className="mr-2 h-5 w-5" /> Resume
                </a>
              </Button>
            </motion.div> */}

            {/* Tech Stack Pills */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start items-center gap-3 pt-8"
            >
              {[
                { name: "Node.js", icon: <Server className="w-3 h-3" /> },
                { name: "PostgreSQL", icon: <Code2 className="w-3 h-3" /> },
                { name: "Next.js", icon: <Rocket className="w-3 h-3" /> },
                { name: "AI Tech", icon: <Sparkles className="w-3 h-3" /> }
              ].map((tech) => (
                <div 
                  key={tech.name}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/50 border border-border/40 text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground/80 hover:text-primary hover:border-primary/30 transition-colors"
                >
                  {tech.icon}
                  {tech.name}
                </div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Banner;
