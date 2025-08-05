'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter } from "lucide-react"


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
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          {/* Branding Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold">Reza.dev</span>
            </Link>
            <p className="text-muted-foreground max-w-sm text-sm">
              Building digital experiences with modern web technologies.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {navLinks.map((link) => (
              <div key={link.name} className="space-y-2">
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-medium">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  asChild
                >
                  <Link href={social.href} target="_blank" rel="noopener noreferrer">
                    {social.icon}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          © {currentYear} Reza.dev All rights reserved.
        </div>
      </div>
    </footer>
  )
}