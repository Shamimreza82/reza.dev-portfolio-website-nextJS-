"use client";

import { motion } from "framer-motion";
import { data } from "@/lib/data";
import { Code2, Box, Database, Cloud, Wrench } from "lucide-react";

const categoryConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  programming: {
    icon: <Code2 className="w-4 h-4" />,
    color: "bg-yellow-500",
    label: "Programming Languages"
  },
  frameworks: {
    icon: <Box className="w-4 h-4" />,
    color: "bg-blue-500",
    label: "Frameworks & Libraries"
  },
  database: {
    icon: <Database className="w-4 h-4" />,
    color: "bg-emerald-500",
    label: "Databases & ORMs"
  },
  cloud: {
    icon: <Cloud className="w-4 h-4" />,
    color: "bg-purple-500",
    label: "Cloud & DevOps"
  },
  other: {
    icon: <Wrench className="w-4 h-4" />,
    color: "bg-orange-500",
    label: "Tools & Practices"
  }
};

const skillProficiency: Record<string, number> = {
  JavaScript: 90, TypeScript: 85, Python: 70,
  React: 85, "Next.js": 88, "Node.js": 92, Express: 90, Redux: 78, Zustand: 80,
  PostgreSQL: 88, MySQL: 80, MongoDB: 82, Prisma: 90, Mongoose: 82, Redis: 78,
  "AWS (EC2, S3)": 82, "Google Cloud": 70, Vercel: 85, Supabase: 75, Railway: 72,
  "RESTful APIs": 92, Microservices: 82, "Multi-tenant Architecture": 80, "CI/CD Pipelines": 78, Docker: 80, Zod: 85
};

const SkillsSection = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/3 -right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Code2 className="w-3 h-3" /> Technical Skills
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Technologies I Work With
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            A comprehensive overview of my technical toolkit and proficiency levels
            across different domains of modern web development.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(Object.keys(data.skills) as Array<keyof typeof data.skills>).map((category, catIndex) => {
            const config = categoryConfig[category];
            const skills = data.skills[category];

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.15 }}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-9 h-9 rounded-lg ${config.color}/20 flex items-center justify-center ${config.color} text-white`}>
                    {config.icon}
                  </div>
                  <h3 className="text-lg font-bold">{config.label}</h3>
                </div>

                <div className="space-y-4">
                  {skills.map((skill, skillIndex) => {
                    const proficiency = skillProficiency[skill] || 75;

                    return (
                      <div key={skill}>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-sm font-medium">{skill}</span>
                          <span className="text-xs text-muted-foreground font-mono">{proficiency}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: skillIndex * 0.08, ease: "easeOut" }}
                            className={`h-full rounded-full ${config.color}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
