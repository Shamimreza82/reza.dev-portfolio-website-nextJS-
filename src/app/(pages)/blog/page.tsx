"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Brain, Code2, Rocket, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const blogs = [
  {
    slug: "integrating-generative-ai-modern-saas",
    title: "Integrating Generative AI in Modern SaaS",
    description: "From OpenAI to local Ollama integration: How to build intelligent automated workflows that scale.",
    category: "AI",
    icon: <Brain className="w-4 h-4" />,
    date: "2024-06-17",
    author: "Shamim Reza",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "nextjs-15-deep-dive-app-router",
    title: "Next.js 15 Deep Dive: Beyond the App Router",
    description: "Mastering Server Actions, Partial Prerendering, and the new caching paradigms for ultra-fast web experiences.",
    category: "Next.js",
    icon: <Rocket className="w-4 h-4" />,
    date: "2024-06-15",
    author: "Shamim Reza",
    image: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "javascript-performance-optimization",
    title: "High-Performance JavaScript Patterns",
    description: "Deep dive into event loop optimization, memory management, and modern async patterns for backend-heavy apps.",
    category: "JavaScript",
    icon: <Code2 className="w-4 h-4" />,
    date: "2024-06-10",
    author: "Shamim Reza",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "postgresql-at-scale-optimizing-queries",
    title: "PostgreSQL for Scale: Optimizing Complex Queries",
    description: "Architecting relational databases for 10k+ concurrent requests and mastering Prisma for type-safe data access.",
    category: "PostgreSQL",
    icon: <Database className="w-4 h-4" />,
    date: "2024-06-08",
    author: "Shamim Reza",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1000&auto=format&fit=crop"
  },
];

export default function BlogPage() {
  return (
    <section className="py-24 relative overflow-hidden min-h-screen">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(var(--primary-rgb),0.05)_0%,transparent_50%)] -z-10" />
      
      <div className="container mx-auto px-4 md:px-6">
        <header className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Code2 className="w-3 h-3" /> Technical Insights
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tight"
          >
            The <span className="text-gradient">Engine Room</span> Blog
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Deep dives into backend architecture, AI integration, and full-stack performance. 
            Sharing the blueprints of scalable digital systems.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/blog/${blog.slug}`} className="group block h-full">
                <Card className="h-full border-border/50 bg-card/40 backdrop-blur-md overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-background/80 backdrop-blur-md text-foreground border-border/50 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5 py-1.5 px-3">
                        {blog.icon}
                        {blog.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(blog.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        {blog.author}
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300 leading-tight">
                      {blog.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed line-clamp-2">
                      {blog.description}
                    </p>
                    <div className="flex items-center text-primary text-sm font-bold gap-2 group/btn">
                      Read Full Article 
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
