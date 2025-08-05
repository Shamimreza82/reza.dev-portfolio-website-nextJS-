'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { motion } from "framer-motion"
import Image from "next/image"
import { Code, File, Github, Linkedin, Rocket, Server } from "lucide-react"
import Link from "next/link"
import reza from '@/asset/photo/reza.jpg'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * index }
  })
}

export default function About() {
  const skills = [
    { name: "TypeScript", icon: <Code className="h-4 w-4" /> },
    { name: "Javascript", icon: <Code className="h-4 w-4" /> },
    { name: "React", icon: <Rocket className="h-4 w-4" /> },
    { name: "Next.js", icon: <Server className="h-4 w-4" /> },
    { name: "Node.js", icon: <Code className="h-4 w-4" /> },
    { name: "Tailwind CSS", icon: <Rocket className="h-4 w-4" /> },
    { name: "Mongodb", icon: <Server className="h-4 w-4" /> },
    { name: "Mongoose", icon: <Code className="h-4 w-4" /> },
    { name: "Prosgress", icon: <Rocket className="h-4 w-4" /> },
    { name: "Prisma", icon: <Code className="h-4 w-4" /> },
  ]

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/Shamimreza82", label: "GitHub" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/in/shamim--reza/", label: "LinkedIn" },
    { icon: <File className="h-5 w-5" />, href: "https://drive.google.com/file/d/1V4v3cIAmBX7VvkypTz9QRATk5lOtsi7A/view?usp=sharing", label: "Resume" },
  ]

  return (
    <section className="container mx-auto px-4 py-12 md:px-6 pt-24">
      <motion.div 
        initial="initial"
        animate="animate"
        className="flex flex-col gap-12 md:flex-row md:items-start"
      >
        {/* Profile Image with Gradient Border */}
        <div className="md:w-1/3 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-sky-800 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-transparent bg-gradient-to-br from-background to-muted">
            <Image
              src={reza}
              alt="Developer Profile"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              placeholder="blur"
              blurDataURL="/placeholder-profile.jpg"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="md:w-2/3 space-y-8">
          <motion.div 
            variants={fadeIn}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-400 to-green-600 bg-clip-text text-transparent">
              Full-Stack Web Developer
            </h1>
            <p className="text-lg text-muted-foreground font-light">
              Crafting digital experiences with modern web technologies
            </p>
          </motion.div>

          {/* Introduction Card */}
          <motion.div variants={fadeIn}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 w-2 h-6 block rounded-full"></span>
                  About Me
                </h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  I am a passionate web developer with 5+ years of experience crafting 
                  scalable web applications. Specializing in modern JavaScript ecosystems 
                  and cloud-native architectures, I transform complex challenges into 
                  elegant, performant solutions.
                </p>
                <div className="flex gap-4 flex-wrap">
                  {socialLinks.map((link, index) => (
                    <motion.div
                      key={index}
                      variants={fadeIn}
                      custom={index}
                    >
                      <Button 
                        variant="outline" 
                        className="gap-2 hover:-translate-y-1 transition-transform"
                        asChild
                      >
                        <Link href={link.href} target="_blank">
                          {link.icon}
                          {link.label}
                        </Link>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills Grid */}
          <motion.div variants={fadeIn}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 w-2 h-6 block rounded-full"></span>
                  Technical Expertise
                </h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      variants={fadeIn}
                      custom={index}
                    >
                      <Badge 
                        variant="outline" 
                        className="w-full px-4 py-3 flex items-center gap-2 hover:bg-muted/50 transition-colors"
                      >
                        {skill.icon}
                        {skill.name}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div variants={fadeIn}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 w-2 h-6 block rounded-full"></span>
                  Professional Journey
                </h2>
              </CardHeader>
              <CardContent>
                <div className="relative space-y-8">
                  <div className="absolute left-0 h-full w-px bg-gradient-to-b from-purple-600/20 to-pink-600/20"></div>
                  
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-2 w-4 h-4 bg-purple-600 rounded-full"></div>
                    <h3 className="font-semibold text-lg">Backend Developer at FinupsBD</h3>
                    <p className="text-sm text-muted-foreground mb-2">2024 - Present</p>
                    <p className="text-muted-foreground">
                      Led development of enterprise SaaS platform handling 1M+ MAU using Next.js and Node.js
                    </p>
                  </div>

                  <div className="relative pl-8">
                    <div className="absolute left-0 top-2 w-4 h-4 bg-pink-600 rounded-full"></div>
                    <h3 className="font-semibold text-lg">Frontend Developer at Desh Universal LTD</h3>
                    <p className="text-sm text-muted-foreground mb-2">2019 - 2021</p>
                    <p className="text-muted-foreground">
                      Built customer-facing applications with React + TypeScript, improving performance by 40%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}