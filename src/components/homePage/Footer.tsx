import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
    return (
        <footer className="border-t py-8 md:py-12 w-full mx-auto bg-gray-900/50 backdrop-blur-sm border-gray-800">
            <div className="container flex flex-col justify-around md:flex-row items-center gap-4">
                <div className="text-center md:text-left">
                    <h3 className="font-bold text-xl">Shamim Reza</h3>
                    <p className="text-sm text-muted-foreground">Full Stack Developer</p>
                </div>
                <div className="flex gap-4">
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Twitter className="h-5 w-5" />
                        <span className="sr-only">Twitter</span>
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Mail className="h-5 w-5" />
                        <span className="sr-only">Email</span>
                    </Link>
                </div>
                <div className="text-center md:text-right text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Shamim Reza. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
