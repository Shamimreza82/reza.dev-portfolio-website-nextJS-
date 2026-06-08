"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Github, Code2, Rocket, Sparkles } from "lucide-react";
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
                Crafting <span className="text-gradient">Digital</span><br /> 
                Masterpieces.
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium"
              >
                I'm <span className="text-foreground font-bold underline decoration-primary/30 underline-offset-4">Reza</span>, a Full-Stack Engineer who blends aesthetic design with robust architecture to build world-class web experiences.
              </motion.p>
            </div>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2"
            >
              <Button asChild size="lg" className="h-14 px-10 rounded-2xl text-base font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300">
                <Link href="/projects">
                  Explore Work <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-10 rounded-2xl text-base font-bold bg-background/50 backdrop-blur-sm border-border/50 hover:bg-accent/50 hover:-translate-y-1 transition-all duration-300" asChild>
                <Link href="https://github.com/Shamimreza82" target="_blank">
                  <Github className="mr-2 h-5 w-5" /> GitHub
                </Link>
              </Button>
            </motion.div>

            {/* Tech Stack Pills */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start items-center gap-3 pt-6"
            >
              {[
                { name: "Next.js", icon: <Rocket className="w-3 h-3" /> },
                { name: "TypeScript", icon: <Code2 className="w-3 h-3" /> },
                { name: "Node.js", icon: <Sparkles className="w-3 h-3" /> },
                { name: "PostgreSQL", icon: <Code2 className="w-3 h-3" /> }
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
            className="lg:col-span-5 relative"
          >
            {/* Main Image Container with Modern Frame */}
            <div className="relative z-10 p-2 rounded-[3rem] bg-gradient-to-br from-primary/20 via-transparent to-blue-500/20 backdrop-blur-sm border border-white/10 shadow-2xl group">
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] lg:aspect-square">
                <Image
                  src={bannerImage1}
                  alt="Reza - Full Stack Developer"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                  quality={90}
                />
                
                {/* Modern Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                
                {/* Decorative Inner Border */}
                <div className="absolute inset-4 border border-white/5 rounded-[2rem] pointer-events-none" />
              </div>

              {/* Floating UI Elements for Tech Feel */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 p-4 rounded-2xl bg-background/60 backdrop-blur-xl border border-primary/20 shadow-xl z-20 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">System Online</span>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-8 -left-8 p-5 rounded-3xl bg-background/80 backdrop-blur-2xl border border-blue-500/20 shadow-2xl z-20 hidden md:block max-w-[180px]"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Projects</span>
                    <span className="text-xs font-black text-primary">40+</span>
                  </div>
                  <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 2, delay: 1.5 }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Background Aesthetic Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]" />
              
              {/* Geometric Accents */}
              <div className="absolute top-1/4 -right-4 w-12 h-12 border-2 border-primary/20 rounded-lg rotate-12 animate-spin-slow" />
              <div className="absolute bottom-1/4 -left-4 w-8 h-8 border-2 border-blue-500/20 rounded-full" />
            </div>
            
            {/* Performance Metric Badge */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute right-4 bottom-20 z-30 hidden xl:block p-4 rounded-2xl bg-primary/10 backdrop-blur-xl border border-primary/20 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-primary/80 uppercase tracking-tighter">Latency</p>
                  <p className="text-sm font-black italic">14ms</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Banner;
