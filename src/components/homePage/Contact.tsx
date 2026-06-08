"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Github, 
  Linkedin, 
  Twitter,
  MessageSquare
} from "lucide-react";
import { data } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const Contact = () => {
  const { email, phone, location } = data.personalInfo;

  const contactMethods = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: phone,
      href: `tel:${phone}`,
      color: "bg-emerald-500/10 text-emerald-500",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: location,
      href: "#",
      color: "bg-orange-500/10 text-orange-500",
    },
  ];

  const socials = [
    { icon: <Github className="w-5 h-5" />, href: "https://github.com/Shamimreza82", label: "GitHub" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/shamim--reza/", label: "LinkedIn" },
    { icon: <Twitter className="w-5 h-5" />, href: "https://x.com/reza_shamim1", label: "Twitter" },
  ];

  return (
    <section className="py-24 relative overflow-hidden min-h-screen">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      
      <div className="container mx-auto px-4 md:px-6">
        <header className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6"
          >
            <MessageSquare className="w-3 h-3" /> Get In Touch
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black mb-6 tracking-tight"
          >
            Let's build something <br />
            <span className="text-gradient">extraordinary</span> together.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl"
          >
            Have a project in mind or just want to say hi? Feel free to reach out. 
            I'm always open to discussing new projects, creative ideas or original architectures.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Contact Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="grid gap-4">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Card className="border-border/50 bg-card/40 backdrop-blur-md hover:border-primary/30 transition-all duration-300">
                    <CardContent className="p-6 flex items-center gap-6">
                      <div className={`p-4 rounded-2xl ${method.color}`}>
                        {method.icon}
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">{method.label}</p>
                        <Link href={method.href} className="text-lg font-semibold hover:text-primary transition-colors">
                          {method.value}
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-8 rounded-[2rem] bg-gradient-to-br from-primary/10 via-background to-background border border-primary/20"
            >
              <h3 className="text-xl font-bold mb-4">Connect on Social</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Follow my work and stay updated with my latest technical insights.
              </p>
              <div className="flex gap-4">
                {socials.map((social) => (
                  <Button key={social.label} variant="outline" size="icon" className="rounded-full h-12 w-12 border-primary/20 hover:bg-primary/10 hover:text-primary" asChild>
                    <Link href={social.href} target="_blank">
                      {social.icon}
                    </Link>
                  </Button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact Form Column */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-7"
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl p-8 md:p-12 rounded-[2.5rem]">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                    <Input placeholder="John Doe" className="h-14 rounded-2xl bg-background/50 border-border/50 focus:ring-primary/20" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                    <Input placeholder="john@example.com" type="email" className="h-14 rounded-2xl bg-background/50 border-border/50 focus:ring-primary/20" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground ml-1">Subject</label>
                  <Input placeholder="Project Inquiry" className="h-14 rounded-2xl bg-background/50 border-border/50 focus:ring-primary/20" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground ml-1">Your Message</label>
                  <Textarea placeholder="Tell me about your project..." className="min-h-[200px] rounded-[2rem] bg-background/50 border-border/50 focus:ring-primary/20 p-6" />
                </div>

                <Button className="w-full h-16 rounded-[2rem] text-lg font-black uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all duration-300">
                  Send Message <Send className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
