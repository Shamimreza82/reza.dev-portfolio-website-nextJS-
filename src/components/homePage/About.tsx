import Image from 'next/image'
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

interface AboutProps {
  name: string
  title: string
  intro: string
  journey: string
  imageSrc: string
  resumeLink?: string
  skills?: string[]
}

const About: React.FC<AboutProps> = ({
  name,
  intro,
  journey,
  imageSrc,
  resumeLink,
  skills = [],
}) => {
  return (
    <motion.section
      id="about"
      className="bg-slate-900 text-white py-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 text-center md:text-left grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            About Me
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            {intro}
          </p>

          <Card className="mt-8 bg-slate-800 border-0 shadow-lg">
            <CardContent>
              <h3 className="text-2xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                My Journey & Vision
              </h3>
              <p className="text-gray-300">
                {journey}
              </p>
            </CardContent>
          </Card>

          {skills.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-medium text-gray-200 mb-2">Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {resumeLink && (
            <Button
              asChild
              className="mt-8"
            >
              <a
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume
              </a>
            </Button>
          )}
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="w-64 h-64 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 shadow-2xl">
            <Image
              src={imageSrc}
              alt={name}
              width={256}
              height={256}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default About
