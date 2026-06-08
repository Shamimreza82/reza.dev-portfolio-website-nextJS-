"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github, CheckCircle2, Trophy } from "lucide-react";
import { data } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ProjectsSection = () => {
  return (
    <section className="py-20 px-6 bg-background/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            A deep dive into some of my most impactful work, showcasing technical 
            complexity and real-world results.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {data.projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden group border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <Button asChild variant="secondary" size="sm" className="rounded-full font-bold">
                      <Link href={project.liveUrl} target="_blank">
                        <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 font-bold">
                      <Link href={project.codeUrl} target="_blank">
                        <Github className="w-4 h-4 mr-2" /> Source Code
                      </Link>
                    </Button>
                  </div>
                </div>
                <CardContent className="p-8 flex-grow">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Key Features
                    </h4>
                    <ul className="grid grid-cols-1 gap-2">
                      {project.features?.map((feature) => (
                        <li key={feature} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="mt-1 w-1 h-1 rounded-full bg-primary shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                      <Trophy className="w-3 h-3" /> Technical Impact
                    </h4>
                    <p className="text-sm font-medium italic">
                      "{project.impact}"
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-[10px] font-bold uppercase tracking-wider py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button asChild variant="outline" className="rounded-full px-8 py-6 text-lg font-bold border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
            <Link href="/projects">Explore Full Portfolio</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
