"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import bannerImage1 from "../../asset/photo/protolio1.jpg";
import StatusBadge from "../ui/status-badge";

const Banner = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] -z-10" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-20" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <StatusBadge text="Available for new projects" colorClass="bg-emerald-500" />
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Building <span className="text-gradient">exceptional</span> digital experiences.
              </motion.h1>
              
              <motion.p 
                className="text-xl text-muted-foreground max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Hi, I'm <span className="font-semibold text-foreground">Reza</span>. A Full-Stack Developer specialized in building modern, scalable, and high-performance web applications.
              </motion.p>
            </div>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button asChild size="lg" className="h-12 px-8 rounded-full">
                <Link href="/projects">
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 rounded-full" asChild>
                <Link href="https://github.com/Shamimreza82" target="_blank">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-8 pt-4 grayscale opacity-50"
            >
              {/* Add some tech stack icons or simplified text here */}
              <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Next.js</span>
              <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">React</span>
              <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Node.js</span>
              <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">PostgreSQL</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
              <Image
                src={bannerImage1}
                alt="Reza - Full Stack Developer"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl -z-10" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
