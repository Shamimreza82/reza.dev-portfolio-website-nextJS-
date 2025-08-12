"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Code } from "lucide-react";
import Link from "next/link";

export default function WebDevelopmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b  text-white">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <Code className="h-16 w-16 text-purple-500" />
            </div>
            <h1 className="text-4xl font-extrabold mb-4">
              Web Development Services
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-300">
              I build dynamic, responsive, and high-performing web applications
              using cutting-edge technologies like Next.js, React, and Node.js.
              Perfect blend of design and functionality tailored to your needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills & Technologies */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-4">Technologies I Use</h2>
          <div className="flex flex-wrap gap-3">
            {[
              "Next.js",
              "React.js",
              "Node.js",
              "Express.js",
              "Tailwind CSS",
              "Prisma",
              "MongoDB",
              "PostgreSQL",
              "TypeScript",
            ].map((tech, idx) => (
              <Badge key={idx} variant="secondary" className="bg-purple-600">
                {tech}
              </Badge>
            ))}
          </div>
        </motion.div>
      </section>

      <Separator className="bg-gray-700" />

      {/* Service Details */}
      <section className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-4">
            What You’ll Get
          </h2>
          <ul className="space-y-3 text-gray-300">
            <li>✅ Fully responsive and mobile-friendly websites</li>
            <li>✅ Lightning-fast performance with SEO optimization</li>
            <li>✅ Scalable backend architecture</li>
            <li>✅ Integration with APIs & third-party services</li>
            <li>✅ Clean, maintainable, and well-documented code</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="bg-slate-800 border-none shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Project Workflow</h3>
              <ol className="list-decimal pl-5 space-y-2 text-gray-300">
                <li>Requirement analysis & consultation</li>
                <li>UI/UX design & wireframing</li>
                <li>Frontend & backend development</li>
                <li>Testing & quality assurance</li>
                <li>Deployment & ongoing support</li>
              </ol>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className=" py-12 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold mb-4">Let’s Build Something Amazing</h2>
          <p className="max-w-xl mx-auto text-gray-300 mb-6">
            Ready to turn your idea into a high-quality web application? Let’s
            discuss your project and make it happen.
          </p>
          <Link href={'/contact'} className='flex justify-center'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 sm:px-10 py-4 bg-gradient-to-br from-cyan-500 to-blue-600 text-gray-950 rounded-xl font-bold flex items-center gap-2 sm:gap-3 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-sm sm:text-base">Contact</span>
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
