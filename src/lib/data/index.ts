import bloodDobation from '@/asset/projects/blood.jpg'
import ECommerce from '@/asset/projects/ecommerce.jpg'



export const data = {
  services: [
    {
      title: "Frontend Development",
      icon: "💻",
      description: "Building responsive, modern user interfaces using React, Next.js, and TailwindCSS with optimized performance and SEO-friendly structure",
      tech: ["React", "Next.js", "TailwindCSS", "TypeScript"]
    },
    {
      title: "Backend Development",
      icon: "⚙️",
      description: "Developing robust server-side applications with Node.js, Express, and Prisma including RESTful APIs and authentication systems",
      tech: ["Node.js", "Express", "Prisma", "JWT"]
    },
    {
      title: "Database Solutions",
      icon: "🗃️",
      description: "Designing and implementing efficient database architectures with both SQL and NoSQL solutions",
      tech: ["MongoDB", "PostgreSQL", "Prisma", "Redis"]
    }
  ],
  
  skills: {
    frontend: [
      {
        name: "React",
        level: "Expert",
        icon: "⚛️",
        projects: 25,
        description: "Component-based architecture with hooks, context API, and Redux integration"
      },
      {
        name: "Next.js",
        level: "Advanced",
        icon: "🚀",
        projects: 15,
        description: "SSR/SSG applications with API routes and optimized performance"
      },
      {
        name: "TailwindCSS",
        level: "Advanced",
        icon: "🎨",
        projects: 20,
        description: "Utility-first CSS framework for rapid UI development"
      }
    ],
    backend: [
      {
        name: "Node.js",
        level: "Expert",
        icon: "🟢",
        projects: 30,
        description: "Building scalable backend services with Express.js middleware"
      },
      {
        name: "Express",
        level: "Advanced",
        icon: "📦",
        projects: 28,
        description: "Minimalist web framework for Node.js with REST API capabilities"
      },
      {
        name: "Prisma",
        level: "Advanced",
        icon: "🔷",
        projects: 18,
        description: "Type-safe database access and migrations management"
      }
    ],
    database: [
      {
        name: "MongoDB",
        level: "Advanced",
        icon: "🍃",
        projects: 22,
        description: "NoSQL database design with Mongoose ODM and aggregation pipelines"
      },
      {
        name: "PostgreSQL",
        level: "Intermediate",
        icon: "🐘",
        projects: 12,
        description: "Relational database modeling with complex queries and transactions"
      }
    ]
  },
  
  projects: [
    {
      title: "Blood Donation Application (Life Lines)",
      description: "A platform connecting blood donors with those in need.",
      techStack: ["React", "Node.js", "MongoDB", "Mongoose", "TailwindCSS"],
      liveUrl: "https://blood-donation-28936.web.app/",
      codeUrl: "https://github.com/yourusername/ecommerce-platform",
      image: bloodDobation
    },
    {
      title: "E-commerce",
      description: "REST API for E-commerce system with JWT authentication and PostgreSQL",
      techStack: ["Node.js", "Express", "PostgreSQL", "Prisma", "JWT"],
      liveUrl: "https://e-commerce-fronend-alpha.vercel.app/",
      codeUrl: "https://github.com/Shamimreza82/e-commerce-fronend",
      image: ECommerce
    },
    // {
    //   title: "Portfolio Website",
    //   description: "Modern portfolio built with Next.js 15 and Shadcn UI components",
    //   techStack: ["Next.js", "TypeScript", "TailwindCSS", "Shadcn UI"],
    //   liveUrl: "https://yourportfolio.com",
    //   codeUrl: "https://github.com/yourusername/portfolio",
    //   image: "/projects/portfolio.jpg"
    // }
  ]
};