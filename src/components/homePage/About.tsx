'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import Image from "next/image"
import { Code, File, Github, Linkedin, Rocket, Server, User } from "lucide-react"
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
    { name: "React", icon: <Rocket className="h-4 w-4" /> },
    { name: "Next.js", icon: <Server className="h-4 w-4" /> },
    { name: "Node.js", icon: <Code className="h-4 w-4" /> },
    { name: "Tailwind CSS", icon: <Rocket className="h-4 w-4" /> },
    { name: "MongoDB", icon: <Server className="h-4 w-4" /> },
    { name: "PostgreSQL", icon: <Rocket className="h-4 w-4" /> },
    { name: "Prisma", icon: <Code className="h-4 w-4" /> },
  ]

  const socialLinks = [
    { icon: <Github className="h-4 w-4" />, href: "https://github.com/Shamimreza82", label: "GitHub" },
    { icon: <Linkedin className="h-4 w-4" />, href: "https://www.linkedin.com/in/shamim--reza/", label: "LinkedIn" },
    { icon: <File className="h-4 w-4" />, href: "https://drive.google.com/file/d/1V4v3cIAmBX7VvkypTz9QRATk5lOtsi7A/view?usp=sharing", label: "Resume" },
  ]

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Profile Image Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/3 w-full max-w-md mx-auto"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-border shadow-2xl group">
              <Image
                src={reza}
                alt="Reza - Full Stack Developer"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                <div className="flex gap-4">
                   {socialLinks.map((link, idx) => (
                     <Button key={idx} size="icon" variant="secondary" className="rounded-full h-10 w-10" asChild>
                       <Link href={link.href} target="_blank" aria-label={link.label}>{link.icon}</Link>
                     </Button>
                   ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <div className="lg:w-2/3 w-full space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wider uppercase">
                <User className="h-3 w-3" /> About Me
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Crafting robust <span className="text-gradient">digital solutions</span> with purpose.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I am a passionate Full-Stack Developer with over 5 years of experience in the digital world. I specialize in building highly scalable, performant, and user-friendly web applications using the modern JavaScript ecosystem. My goal is to transform complex business requirements into elegant software solutions.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Technical Expertise */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm h-full">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" /> Technical Stack
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge key={skill.name} variant="secondary" className="px-3 py-1 font-medium bg-primary/5 hover:bg-primary/10 border-primary/10 transition-colors">
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Experience Highlights */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm h-full">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Rocket className="h-5 w-5 text-primary" /> Career Journey
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-l-2 border-primary/20 pl-4 space-y-1">
                      <h4 className="font-semibold text-sm">Backend Developer at FinupsBD</h4>
                      <p className="text-xs text-muted-foreground">2024 - Present</p>
                    </div>
                    <div className="border-l-2 border-primary/20 pl-4 space-y-1">
                      <h4 className="font-semibold text-sm">Frontend Developer at Desh Universal LTD</h4>
                      <p className="text-xs text-muted-foreground">2019 - 2021</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button size="lg" className="rounded-full px-8" asChild>
                <Link href="/contact">Let's work together</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
