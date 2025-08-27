'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { Code, Palette, Smartphone, Database, Cloud, Laptop } from "lucide-react"

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
    icon: <Code className="h-10 w-10 text-purple-500" />,
    title: "Web Development",
    description: "Dynamic, responsive websites using Next.js, React, and Node.js.",
    link: "/services-ditiles/web-development"
  },
  {
    icon: <Palette className="h-10 w-10 text-pink-500" />,
    title: "Web Design",
    description: "Modern, user-friendly designs that enhance user experience.",
    link: "/services/web-design"
  },
  {
    icon: <Smartphone className="h-10 w-10 text-green-500" />,
    title: "Mobile Development",
    description: "Cross-platform apps & mobile-friendly sites for all devices.",
    link: "/services/mobile-development"
  },
  {
    icon: <Database className="h-10 w-10 text-yellow-500" />,
    title: "Database Management",
    description: "Efficient database design & optimization with PostgreSQL, MySQL, MongoDB.",
    link: "/services/database-management"
  },
  {
    icon: <Cloud className="h-10 w-10 text-blue-500" />,
    title: "Cloud Solutions",
    description: "Scalable cloud hosting, storage & computing solutions.",
    link: "/services/cloud-solutions"
  },
  {
    icon: <Laptop className="h-10 w-10 text-indigo-500" />,
    title: "Custom Software",
    description: "Tailor-made software to match your business needs.",
    link: "/services/custom-software"
  }
]

export default function Services() {
  return (
    <section className="container mx-auto px-4 py-20 md:px-6">
      <motion.div
        initial="initial"
        animate="animate"
        className="text-center space-y-4 mb-12"
      >
        <motion.h2
          variants={fadeIn}
          custom={0}
          className="text-4xl md:text-5xl font-bold  inline-block bg-gradient-to-r from-cyan-300 to-blue-400  bg-clip-text text-transparent"
        >
          My Services
        </motion.h2>
        <motion.p
          variants={fadeIn}
          custom={1}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          From design to deployment — I provide full-stack solutions that bring ideas to life.
        </motion.p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            custom={index}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 group">
              <CardContent className="pt-6 space-y-4">
                <div className="p-4 rounded-xl flex items-center group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>

                {/* See More Button */}
                <Link href={service.link}>
                  <Button
                    className="px-8 sm:px-10 py-4 mt-3 w-full bg-gradient-to-br from-cyan-500 to-blue-600 text-gray-950 rounded-xl font-bold flex items-center gap-2 sm:gap-3 group relative overflow-hidden"
                  >
                    See More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
