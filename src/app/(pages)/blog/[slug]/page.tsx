"use client";

import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Brain, Code2, Rocket, Database, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const blogs = [
  {
    slug: "integrating-generative-ai-modern-saas",
    title: "Integrating Generative AI in Modern SaaS",
    description: "From OpenAI to local Ollama integration: How to build intelligent automated workflows that scale.",
    category: "AI",
    icon: <Brain className="w-4 h-4" />,
    date: "2024-06-17",
    author: "Shamim Reza",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
    content: "Generative AI is transforming how we build software. In this deep dive, we explore how to integrate OpenAI's powerful models and local alternatives like Ollama into your SaaS architecture. We'll cover everything from prompt engineering to managing long-running inference tasks in a scalable backend environment."
  },
  {
    slug: "nextjs-15-deep-dive-app-router",
    title: "Next.js 15 Deep Dive: Beyond the App Router",
    description: "Mastering Server Actions, Partial Prerendering, and the new caching paradigms for ultra-fast web experiences.",
    category: "Next.js",
    icon: <Rocket className="w-4 h-4" />,
    date: "2024-06-15",
    author: "Shamim Reza",
    image: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1000&auto=format&fit=crop",
    content: "Next.js 15 brings significant changes to how we handle data fetching and caching. This article explores the nuances of Partial Prerendering and how Server Actions are evolving to provide even better developer experiences and end-user performance."
  },
  {
    slug: "javascript-performance-optimization",
    title: "High-Performance JavaScript Patterns",
    description: "Deep dive into event loop optimization, memory management, and modern async patterns for backend-heavy apps.",
    category: "JavaScript",
    icon: <Code2 className="w-4 h-4" />,
    date: "2024-06-10",
    author: "Shamim Reza",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=1000&auto=format&fit=crop",
    content: "Writing fast JavaScript isn't just about syntax; it's about understanding the engine. We dive into the V8 engine's optimization pipeline, how to avoid memory leaks in long-running Node.js processes, and which async patterns truly lead to the best throughput."
  },
  {
    slug: "postgresql-at-scale-optimizing-queries",
    title: "PostgreSQL for Scale: Optimizing Complex Queries",
    description: "Architecting relational databases for 10k+ concurrent requests and mastering Prisma for type-safe data access.",
    category: "PostgreSQL",
    icon: <Database className="w-4 h-4" />,
    date: "2024-06-08",
    author: "Shamim Reza",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1000&auto=format&fit=crop",
    content: "Relational databases are the backbone of most applications. Mastering PostgreSQL indexing, query planning, and connection pooling is essential for any backend engineer. We also look at how Prisma simplifies database interactions without sacrificing performance."
  },
];

const BlogDetail = () => {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    
    const blog = blogs.find(b => b.slug === slug);

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
                    <Button onClick={() => router.push('/blog')}>Back to Blog</Button>
                </div>
            </div>
        );
    }

    return (
        <article className="py-24 relative min-h-screen">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <Button 
                        variant="ghost" 
                        onClick={() => router.back()}
                        className="group flex items-center gap-2 hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to articles
                    </Button>
                </motion.div>

                <header className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 py-1.5 px-4 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2 w-fit">
                            {blog.icon}
                            {blog.category}
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight text-gradient pb-2">
                            {blog.title}
                        </h1>
                        
                        <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-y border-border/40 py-6">
                            <div className="flex items-center gap-2.5">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                    SR
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-foreground leading-none">{blog.author}</p>
                                    <p className="text-xs uppercase tracking-widest mt-1">Author</p>
                                </div>
                            </div>
                            <div className="h-8 w-px bg-border/40 hidden md:block" />
                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="w-4 h-4" />
                                {new Date(blog.date).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric"
                                })}
                            </div>
                            <div className="ml-auto flex gap-2">
                                <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                                    <Share2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </header>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative aspect-[21/9] rounded-[2rem] overflow-hidden mb-16 border border-border/50 shadow-2xl shadow-primary/5"
                >
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="prose prose-invert prose-lg max-w-none"
                >
                    <p className="text-xl text-muted-foreground leading-relaxed mb-8 italic">
                        {blog.description}
                    </p>
                    <div className="text-foreground leading-relaxed space-y-6">
                        <p>{blog.content}</p>
                        <p>Stay tuned for more updates as I continue to document my journey in building the next generation of scalable backend systems and intelligent AI-powered applications.</p>
                    </div>
                </motion.div>

                {/* Footer Section of Article */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 p-8 rounded-[2rem] bg-card border border-border/50 text-center"
                >
                    <h3 className="text-2xl font-bold mb-4">Want more insights?</h3>
                    <p className="text-muted-foreground mb-8">
                        Follow me on GitHub to see the code behind these articles and 
                        stay updated with my latest open-source contributions.
                    </p>
                    <Button asChild className="rounded-full px-8 h-12">
                        <Link href="https://github.com/Shamimreza82" target="_blank">
                            Follow on GitHub
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </article>
    );
};

import Link from 'next/link';

export default BlogDetail;
