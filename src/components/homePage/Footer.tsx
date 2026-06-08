'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"
import logo from "../../asset/rezahub.png"


export function Footer() {
  const currentYear = new Date().getFullYear()
  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ]

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/Shamimreza82", label: "GitHub" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/in/shamim--reza/", label: "LinkedIn" },
    { icon: <Twitter className="h-5 w-5" />, href: "https://x.com/reza_shamim1", label: "Twitter"  },
  ]

  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Branding Section */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Image src={logo} height={40} width={120} alt="logoFooter" className="h-10 w-auto" />
            </Link>
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              Crafting high-performance web experiences with Next.js, React, and Node.js. Dedicated to quality and innovation.
            </p>
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                  asChild
                >
                  <Link href={social.href} target="_blank" rel="noopener noreferrer">
                    {social.icon}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Sitemap</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section or Quick Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Contact</h4>
            <p className="text-sm text-muted-foreground">
              Based in Bangladesh, available worldwide.
            </p>
            <Button variant="outline" size="sm" asChild className="rounded-full">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} <span className="font-medium text-foreground">Reza.dev</span>. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-xs text-muted-foreground hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}