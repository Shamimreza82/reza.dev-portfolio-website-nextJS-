'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter, Mail, ArrowRight, ExternalLink } from "lucide-react"
import Image from "next/image"
import logo from "../../asset/rezahub.png"
import { data } from "@/lib/data"

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  const navLinks = [
    { name: "About Me", href: "/about" },
    { name: "My Work", href: "/projects" },
    { name: "Services", href: "/services" },
    { name: "Latest Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/Shamimreza82", label: "GitHub", color: "hover:text-foreground" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/in/shamim--reza/", label: "LinkedIn", color: "hover:text-[#0077B5]" },
    { icon: <Twitter className="h-5 w-5" />, href: "https://x.com/reza_shamim1", label: "Twitter", color: "hover:text-[#1DA1F2]"  },
    { icon: <Mail className="h-5 w-5" />, href: "mailto:shamimrezaone@gmail.com", label: "Email", color: "hover:text-primary" },
  ]

  const services = data.services.map(s => s.title)

  return (
    <footer className="relative w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 py-16 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Branding Section */}
          <div className="space-y-6 lg:col-span-1">
            <div className="space-y-4">
              <Link href="/" className="inline-block transition-opacity hover:opacity-80">
                <Image src={logo} height={40} width={120} alt="logoFooter" className="h-10 w-auto" />
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                Building scalable, high-performance backend systems and elegant full-stack applications with a focus on modern architectures.
              </p>
            </div>
            
            {/* Availability Status */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Available for new projects
              </span>
            </div>

            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className={`rounded-xl border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-300 ${social.color} hover:border-primary/50 hover:bg-primary/5`}
                  asChild
                >
                  <Link href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                    {social.icon}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/90">Navigation</h4>
            <ul className="grid grid-cols-1 gap-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-sm text-muted-foreground hover:text-primary transition-all duration-200"
                  >
                    <ArrowRight className="h-0 w-0 opacity-0 -ml-4 transition-all duration-200 group-hover:h-3 group-hover:w-3 group-hover:opacity-100 group-hover:ml-0 mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Section */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/90">What I Do</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-primary/60 shrink-0" />
                  {service}
                </li>
              ))}
              <li>
                <Link href="/services" className="text-xs font-medium text-primary hover:underline inline-flex items-center gap-1 mt-2">
                  View all services <ExternalLink className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact/CTA Section */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/90">Get in Touch</h4>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Have a project in mind? Let's discuss how I can help you build something great.
              </p>
              <Button asChild className="w-full rounded-xl shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30 active:scale-95 group">
                <Link href="/contact" className="flex items-center justify-center gap-2">
                  Start a Conversation
                  <Mail className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <div className="pt-2">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Current Location</p>
                <p className="text-sm font-medium">{data.personalInfo.location} (GMT+6)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-sm text-muted-foreground font-medium">
              © {currentYear} <span className="text-foreground">SHAMIM REZA</span>
            </p>
            <p className="text-[10px] text-muted-foreground/60 tracking-wider">
              DESIGNED & DEVELOPED WITH ❤️
            </p>
          </div>
          
          <div className="flex items-center gap-8">
            <Link href="/privacy-policy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <div className="h-4 w-px bg-border/60 hidden sm:block" />
            <p className="text-xs text-muted-foreground hidden sm:block">
              v1.2.0
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}