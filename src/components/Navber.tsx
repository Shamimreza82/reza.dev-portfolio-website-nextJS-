"use client";

import Link from "next/link";
import React, { useState } from "react";

const Navber = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">
            <p className="hover:text-blue-400 transition">Reza.dev</p>
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-8 text-lg">
          <li>
            <Link href="/">
              <p className="hover:text-blue-400 transition">Home</p>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <p className="hover:text-blue-400 transition">About</p>
            </Link>
          </li>
          <li>
            <Link href="/projects">
              <p className="hover:text-blue-400 transition">Projects</p>
            </Link>
          </li>
          <li>
            <Link href="/services">
              <p className="hover:text-blue-400 transition">Services</p>
            </Link>
          </li>
          <li>
            <Link href="/blog">
              <p className="hover:text-blue-400 transition">Blog</p>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <p className="hover:text-blue-400 transition">Contact</p>
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-blue-400 transition"
          >
            {isOpen ? "✕" : "☰"} {/* X for close, ☰ for open */}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navber;
