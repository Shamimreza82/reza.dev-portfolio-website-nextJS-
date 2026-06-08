"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Github, Code2, Rocket, Sparkles, Server, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import bannerImage1 from "../../asset/photo/protolio1.jpg";
import StatusBadge from "../ui/status-badge";

const Banner = () => {
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
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.05)_0%,transparent_70%)]" />
      </div>

      {/* Modern Grid/Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] -z-20" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Content Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col space-y-8 text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
              <StatusBadge 
                text="Available for new opportunities" 
                colorClass="bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
              />
            </motion.div>

            <div className="space-y-4">
              <motion.h1 
                variants={itemVariants}
                className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tight leading-[1.1]"
              >
                Engineering <span className="text-gradient">Backend</span><br /> 
                Systems.
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium"
              >
                I'm <span className="text-foreground font-bold underline decoration-primary/30 underline-offset-4">SHAMIM REZA</span>, a Full-Stack Developer specializing in scalable backend architectures and intelligent AI-powered solutions.
              </motion.p>
            </div>

            <motion.div 
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
            </motion.div>

            {/* Tech Stack Pills */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start items-center gap-3 pt-6"
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

          {/* Visual Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            {/* Smart Container - More compact (80% width) */}
            <div className="relative z-10 w-full max-w-[320px] md:max-w-[380px] p-1.5 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-transparent to-blue-500/20 backdrop-blur-md border border-white/10 shadow-2xl group">
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] bg-muted">
                <Image
                  src={bannerImage1}
                  alt="SHAMIM REZA - Backend Specialist"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, 30vw"
                  quality={95}
                />
                
                {/* Clean Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-60" />
              </div>

              {/* Floating UI Elements - Repositioned for a "Smart" feel */}
              <motion.div 
                animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-6 p-3 rounded-xl bg-background/80 backdrop-blur-xl border border-primary/20 shadow-lg z-20 hidden md:flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold tracking-tight uppercase text-muted-foreground whitespace-nowrap">Node.js Engine Active</span>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 8, 0], x: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -right-10 -translate-y-1/2 p-4 rounded-2xl bg-background/80 backdrop-blur-xl border border-blue-500/20 shadow-xl z-20 hidden md:block w-32"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold text-muted-foreground uppercase">Load</span>
                    <span className="text-[10px] font-black text-primary">14ms</span>
                  </div>
                  <div className="h-1 w-full bg-primary/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 2, delay: 1.5 }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Status Badge Integrated into frame */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[85%] p-3 rounded-2xl bg-background/90 backdrop-blur-md border border-border/50 shadow-xl z-20 flex items-center justify-between gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-background bg-muted overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-blue-500/20" />
                    </div>
                  ))}
                </div>
                <div className="h-4 w-px bg-border" />
                <span className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">Trusted by Teams</span>
              </div>
            </div>

            {/* Background Aesthetic Elements - Refined */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] -z-10">
              <div className="absolute top-1/4 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[80px]" />
              <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-blue-600/5 rounded-full blur-[80px]" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Banner;
