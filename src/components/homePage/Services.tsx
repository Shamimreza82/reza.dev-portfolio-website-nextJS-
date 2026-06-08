'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { Code, Palette, Smartphone, Database, Cloud, Laptop, ArrowRight } from "lucide-react"


const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * index }
  })
}

const services = [
  {
    icon: <Code className="h-8 w-8 text-blue-500" />,
    title: "Web Development",
    description: "Building fast, SEO-optimized, and scalable web applications using Next.js and Node.js.",
    link: "/services-ditiles/web-development"
  },
  {
    icon: <Palette className="h-8 w-8 text-indigo-500" />,
    title: "Web Design",
    description: "Creating modern, user-centric designs that convert visitors into customers.",
    link: "/services/web-design"
  },
  {
    icon: <Smartphone className="h-8 w-8 text-emerald-500" />,
    title: "Mobile Solutions",
    description: "Developing responsive and intuitive mobile-first experiences for all platforms.",
    link: "/services/mobile-development"
  },
  {
    icon: <Database className="h-8 w-8 text-amber-500" />,
    title: "Backend & API",
    description: "Architecting robust backend systems and secure RESTful/GraphQL APIs.",
    link: "/services/database-management"
  },
  {
    icon: <Cloud className="h-8 w-8 text-sky-500" />,
    title: "Cloud & DevOps",
    description: "Seamless deployment and infrastructure management on AWS, Vercel, or DigitalOcean.",
    link: "/services/cloud-solutions"
  },
  {
    icon: <Laptop className="h-8 w-8 text-violet-500" />,
    title: "Custom Software",
    description: "Tailor-made software solutions to solve your specific business challenges.",
    link: "/services/custom-software"
  }
]


export default function Services() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <motion.h2
            variants={fadeIn}
            custom={0}
            className="text-3xl md:text-5xl font-bold tracking-tight"
          >
            Core <span className="text-gradient">Services</span>
          </motion.h2>
          <motion.p
            variants={fadeIn}
            custom={1}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Delivering high-quality digital solutions tailored to your business needs, from concept to deployment.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              custom={index}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group">
                <CardHeader>
                  <div className="p-3 w-fit rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm leading-relaxed min-h-[60px]">
                    {service.description}
                  </CardDescription>
                  
                  <Link href={service.link} className="inline-flex items-center text-sm font-medium text-primary hover:underline group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
