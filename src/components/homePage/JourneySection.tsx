"use client";

import React from "react";
import { motion } from "framer-motion";
import { data } from "@/lib/data";
import { 
  Code2, 
  Layers, 
  Zap, 
  Target, 
  Award, 
  Users, 
  CheckCircle2,
  Rocket
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { label: "Years Experience", value: "3+", icon: <Zap className="w-5 h-5" /> },
  { label: "Leadership", value: "Team Lead", icon: <Users className="w-5 h-5" /> },
  { label: "Backend Projects", value: "30+", icon: <Code2 className="w-5 h-5" /> },
  { label: "AI Solutions", value: "Expert", icon: <Target className="w-5 h-5" /> },
];

const JourneySection = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Achievements / Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border/50 text-center hover:border-primary/50 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Services Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Rocket className="w-3 h-3" /> My Expertise
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Tailored Solutions for <br /> Modern Digital Needs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            I combine technical excellence with creative thinking to build scalable, 
            high-performance web applications that drive real business value.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                <CardContent className="p-8">
                  <div className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-500 inline-block">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3">
                    {service.tech.map((t) => (
                      <div key={t} className="flex items-center gap-2 text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action for Journey */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-background to-background border border-primary/20 text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-full bg-primary/20">
              <Award className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to start your journey?</h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Whether you have a fully-fledged idea or just a spark of inspiration, 
            I'm here to help you navigate the digital landscape.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity">
              Hire Me Today
            </button>
            <button className="px-8 py-3 rounded-full bg-secondary text-secondary-foreground font-bold hover:bg-secondary/80 transition-colors">
              Download Resume
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneySection;
