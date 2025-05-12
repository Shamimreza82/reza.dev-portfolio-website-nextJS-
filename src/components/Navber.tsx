"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X, ChevronDown, Home, Info, FolderKanban, Briefcase, FileText, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const pathname = usePathname()

  //

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])


  const navLinks = [
    {
      path: "/",
      name: "Home",
      icon: <Home className="w-4 h-4 mr-2" />,
    },

    {
      path: "/projects",
      name: "Projects",
      icon: <FolderKanban className="w-4 h-4 mr-2" />,
    },
    {
      path: "/services",
      name: "Services",
      icon: <Briefcase className="w-4 h-4 mr-2" />,
      dropdown: [
        { path: "/services/web-development", name: "Web Development" },
        { path: "/services/app-development", name: "App Development" },
        { path: "/services/ui-design", name: "UI/UX Design" },
        { path: "/services/consulting", name: "Consulting" },
      ],
    },
    {
      path: "/blog",
      name: "Blog",
      icon: <FileText className="w-4 h-4 mr-2" />,
    },
    {
      path: "/about",
      name: "About",
      icon: <Info className="w-4 h-4 mr-2" />,
    },
    {
      path: "/contact",
      name: "Contact",
      icon: <Mail className="w-4 h-4 mr-2" />,
    },
  ]

  return (
    <nav className="fixed justify-between z-50 w-full text-white py-4 lg:px-20 px-4 bg-slate-900/95 backdrop-blur-sm shadow-lg">
      <div className="mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">
            <p className="hover:text-emerald-400 transition duration-300">
              Reza<span className="text-emerald-400">.dev</span>
            </p>
          </Link>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center space-x-1">
          <ul className="flex space-x-1 text-base">
            {navLinks.map((item) => {
              if (item.dropdown) {
                return (
                  <li key={item.name} className="relative group">
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                      className={cn(
                        "flex items-center px-4 py-2 rounded-md transition-colors",
                        pathname.startsWith(item.path)
                          ? "text-emerald-400 bg-slate-800"
                          : "hover:text-emerald-400 hover:bg-slate-800",
                      )}
                    >
                      {item.icon}
                      {item.name}
                      <ChevronDown
                        className={cn(
                          "ml-1 h-4 w-4 transition-transform duration-200",
                          servicesOpen ? "rotate-180" : "",
                        )}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    <div
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                      className={cn(
                        "absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-slate-800 ring-1 ring-black ring-opacity-5 transition-all duration-200 origin-top-left",
                        servicesOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
                      )}
                    >
                      <div className="py-1">
                        {item.dropdown.map((dropdownItem) => (
                          <Link key={dropdownItem.name} href={dropdownItem.path}>
                            <p
                              className={cn(
                                "block px-4 py-2 text-sm transition-colors",
                                pathname === dropdownItem.path
                                  ? "text-emerald-400 bg-slate-700"
                                  : "hover:text-emerald-400 hover:bg-slate-700",
                              )}
                            >
                              {dropdownItem.name}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </li>
                )
              }

              return (
                <li key={item.name}>
                  <Link href={item.path}>
                    <p
                      className={cn(
                        "flex items-center px-4 py-2 rounded-md transition-colors",
                        pathname === item.path
                          ? "text-emerald-400 bg-slate-800"
                          : "hover:text-emerald-400 hover:bg-slate-800",
                      )}
                    >
                      {item.icon}
                      {item.name}
                    </p>
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Dark/Light Mode Toggle */}

          {/* CTA Button */}
          <Button className="ml-4 bg-emerald-500 hover:bg-emerald-600 text-white">Hire Me</Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Dark/Light Mode Toggle - Mobile */}


          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2 rounded-md hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed top-0 right-0 h-screen w-72 bg-slate-800 transform transition-transform duration-300 ease-in-out z-20 overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <p className="text-xl font-bold text-emerald-400">Menu</p>
          <button
            className="text-white hover:text-emerald-400 transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <ul className="flex flex-col gap-1 p-4">
          {navLinks.map((item) => {
            if (item.dropdown) {
              return (
                <li key={item.name} className="mb-1">
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className={cn(
                      "flex items-center justify-between w-full text-left px-4 py-3 rounded-md transition-colors",
                      pathname.startsWith(item.path)
                        ? "text-emerald-400 bg-slate-700"
                        : "hover:text-emerald-400 hover:bg-slate-700",
                    )}
                  >
                    <span className="flex items-center">
                      {item.icon}
                      {item.name}
                    </span>
                    <ChevronDown
                      className={cn("h-5 w-5 transition-transform duration-200", servicesOpen ? "rotate-180" : "")}
                    />
                  </button>

                  {/* Mobile Dropdown */}
                  <div
                    className={cn(
                      "mt-1 ml-4 pl-2 border-l-2 border-slate-700 space-y-1 transition-all duration-200",
                      servicesOpen ? "block" : "hidden",
                    )}
                  >
                    {item.dropdown.map((dropdownItem) => (
                      <Link key={dropdownItem.name} href={dropdownItem.path}>
                        <p
                          className={cn(
                            "block px-4 py-2 rounded-md transition-colors",
                            pathname === dropdownItem.path
                              ? "text-emerald-400 bg-slate-700"
                              : "hover:text-emerald-400 hover:bg-slate-700",
                          )}
                        >
                          {dropdownItem.name}
                        </p>
                      </Link>
                    ))}
                  </div>
                </li>
              )
            }

            return (
              <li key={item.name} className="mb-1">
                <Link href={item.path}>
                  <p
                    className={cn(
                      "flex items-center px-4 py-3 rounded-md transition-colors",
                      pathname === item.path
                        ? "text-emerald-400 bg-slate-700"
                        : "hover:text-emerald-400 hover:bg-slate-700",
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </p>
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Mobile CTA Button */}
        <div className="p-4 mt-2">
          <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">Hire Me</Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
