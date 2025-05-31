'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Phone, MapPin, Facebook } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"


const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * index }
  })
}

export default function Contact() {
  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6 text-green-600" />,
      title: "Email",
      content: "shamimreza.services@gmail.com",
      href: "mailto:shamimreza.services@gmail.com"
    },
    {
      icon: <Phone className="h-6 w-6 text-green-600" />,
      title: "Phone/What's app",
      content: "+8801531297879",
      href: "tel:+15550000000"
    },
    {
      icon: <MapPin className="h-6 w-6 text-blue-600" />,
      title: "Office",
      content: "H-424/10, Gazipur, Dhaka, Bangladesh",
      href: "#"
    }
  ]

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/Shamimreza82", label: "GitHub" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/in/shamim--reza/", label: "LinkedIn" },
    { icon: <Facebook className="h-5 w-5" />, href: "https://www.facebook.com/rezashamimone/", label: "Facebook" },
  ]

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()



    const form = e.target as HTMLFormElement
    const name  = (form.name as unknown as HTMLInputElement).value
    const email = (form.email as HTMLInputElement).value
    const subject = (form.subject as HTMLInputElement).value
    const massage = (form.massage as HTMLInputElement).value

    console.log(name, email, subject, massage)


  }

  return (
    <section className="container mx-auto px-4 py-12 md:px-6 pt-24">
      <motion.div
        initial="initial"
        animate="animate"
        className="grid md:grid-cols-2 gap-12"
      >
        {/* Contact Form */}
        <motion.div
          variants={fadeIn}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground font-light">
              Have a project in mind? Lets create something amazing together.
            </p>
          </div>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="pt-6 space-y-6">
              <form onSubmit={handelSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <motion.div variants={fadeIn} custom={0}>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="h-12 rounded-xl"
                      />
                    </motion.div>
                    <motion.div variants={fadeIn} custom={1}>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="h-12 rounded-xl"
                      />
                    </motion.div>
                  </div>

                  <motion.div variants={fadeIn} custom={2}>
                    <Input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      className="h-12 rounded-xl"
                    />
                  </motion.div>

                  <motion.div variants={fadeIn} custom={3}>
                    <Textarea
                      name="massage"
                      placeholder="Message"
                      className="min-h-[150px] rounded-xl"
                    />
                  </motion.div>
                </div>

                <motion.div
                  variants={fadeIn}
                  custom={4}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button type="submit"
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    Send Message
                  </Button>
                </motion.div>

              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          variants={fadeIn}
          className="space-y-8"
        >
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="pt-6 space-y-8">
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    custom={index}
                    className="flex items-start gap-4 p-4 hover:bg-muted/50 rounded-xl transition-colors"
                  >
                    <div className="p-2 bg-muted rounded-lg">
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{method.title}</h3>
                      <Link
                        href={method.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {method.content}
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Follow Me</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={index}
                      variants={fadeIn}
                      custom={index + 3}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-xl h-12 w-12"
                        asChild
                      >
                        <Link href={social.href} target="_blank">
                          {social.icon}
                        </Link>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Section */}
          <motion.div
            variants={fadeIn}
            className="relative aspect-video overflow-hidden rounded-2xl border bg-gradient-to-br from-background to-muted"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-muted-foreground">Map Integration Here</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}