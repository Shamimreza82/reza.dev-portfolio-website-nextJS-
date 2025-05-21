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
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with Next.js frontend and Node.js microservices",
      techStack: ["Next.js", "Node.js", "MongoDB", "Prisma", "TailwindCSS"],
      liveUrl: "https://example-ecommerce.com",
      codeUrl: "https://github.com/yourusername/ecommerce-platform",
      image: "/projects/ecommerce.jpg"
    },
    {
      title: "Task Management API",
      description: "REST API for task management system with JWT authentication and PostgreSQL",
      techStack: ["Node.js", "Express", "PostgreSQL", "Prisma", "JWT"],
      liveUrl: "https://api.taskmanager.example.com",
      codeUrl: "https://github.com/yourusername/task-api",
      image: "/projects/task-api.jpg"
    },
    {
      title: "Portfolio Website",
      description: "Modern portfolio built with Next.js 15 and Shadcn UI components",
      techStack: ["Next.js", "TypeScript", "TailwindCSS", "Shadcn UI"],
      liveUrl: "https://yourportfolio.com",
      codeUrl: "https://github.com/yourusername/portfolio",
      image: "/projects/portfolio.jpg"
    }
  ]
};