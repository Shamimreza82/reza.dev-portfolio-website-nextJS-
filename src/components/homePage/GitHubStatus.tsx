"use client";

import React from "react";
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { Github, Activity, GitCommit, Code } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "next-themes";

const GitHubStatus = () => {
  const { theme } = useTheme();
  const username = "Shamimreza82"; // Extracted from projects data

  return (
    <section className="py-24 px-6 bg-background/30 border-y border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ea44f]/10 text-[#2ea44f] text-xs font-bold uppercase tracking-wider mb-4"
            >
              <Activity className="w-3 h-3" /> Live Activity
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3"
            >
              <Github className="w-8 h-8" /> GitHub Contributions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground max-w-xl"
            >
              My open-source journey and daily coding activity. I believe in consistent 
              improvement and sharing knowledge through code.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardContent className="p-4 flex flex-col items-center">
                <GitCommit className="text-[#2ea44f] mb-2" />
                <span className="text-xl font-bold">Daily</span>
                <span className="text-[10px] text-muted-foreground uppercase">Commits</span>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardContent className="p-4 flex flex-col items-center">
                <Code className="text-primary mb-2" />
                <span className="text-xl font-bold">Clean</span>
                <span className="text-[10px] text-muted-foreground uppercase">Architecture</span>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Contribution Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card/50 border border-border/50 rounded-3xl p-8 backdrop-blur-sm flex justify-center overflow-hidden"
        >
          <div className="overflow-x-auto w-full flex justify-center py-4">
            <GitHubCalendar 
              username={username}
              blockSize={12}
              blockMargin={5}
              fontSize={14}
              colorScheme={theme === "dark" ? "dark" : "light"}
              theme={{
                light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
              }}
            />
          </div>
        </motion.div>

        {/* GitHub Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <img 
              src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${theme === 'dark' ? 'dark' : 'flat'}&hide_border=true&bg_color=00000000`}
              alt="GitHub Stats"
              className="w-full h-auto rounded-xl"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <img 
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${theme === 'dark' ? 'dark' : 'flat'}&hide_border=true&bg_color=00000000`}
              alt="Top Languages"
              className="w-full h-auto rounded-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GitHubStatus;
