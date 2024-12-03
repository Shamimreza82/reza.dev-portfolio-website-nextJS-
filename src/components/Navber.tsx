"use client";

import Link from "next/link";
import React, { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Navber = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLink = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/about",
      name: "About",
    },
    {
      path: "/projects",
      name: "Projects",
    },
    {
      path: "/services",
      name: "Services",
    },
    {
      path: "/blog",
      name: "Blog",
    },
    {
      path: "/contact",
      name: "Contact",
    },
  ];

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
          {navLink.map((items) => (
            <li key={items.name}>
              <Link href={items.path}>
                <p className="hover:text-blue-400 transition">{items.name}</p>
              </Link>
            </li>
          ))}
        </ul>
        {/* <li>
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
          </li> */}

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-blue-400 transition"
          >
            {isOpen ? null : "☰"}
          </button>
          <div
            className={`fixed top-0 right-0 h-screen w-64 bg-slate-800 transform transition-transform duration-300 z-20 ${
              isOpen ? "translate-x-0 " : "translate-x-full"
            }`}
          >
            <button className="text-2xl w-full flex justify-end -mx-3 my-3" onClick={() => setIsOpen(false)}><IoIosCloseCircleOutline/></button>
            <ul className="flex flex-col gap-1 p-4 ">
              {navLink.map((items) => (
                <li  key={items.name}>
                  <Link href={items.path}>
                    <p onClick={() => setIsOpen(false)} className="hover:text-blue-400 transition bg-slate-700 rounded-md pl-3 py-4 text-xl">
                      {items.name}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navber;
