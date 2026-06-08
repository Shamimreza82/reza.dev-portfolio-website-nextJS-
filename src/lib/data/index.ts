import fintechMain from '@/asset/projects/fintech/mainpage.jpg'
import inventoryShop from '@/asset/projects/inventory/public-shop.jpg'
import fintechDash from '@/asset/projects/fintech/dashboard.jpg'

export const data = {
  personalInfo: {
    name: "SHAMIM REZA",
    email: "shamimrezaone@gmail.com",
    phone: "+8801531297879",
    location: "Bangladesh",
    title: "Full Stack Developer (Backend Focused)",
    experience: "3+ Years",
    education: "Bachelor of Social Science, Moheshpur govt degree college (2019)"
  },

  services: [
    {
      title: "Backend Engineering",
      icon: "⚙️",
      description: "Architecting scalable systems and REST APIs using Node.js, Express, and PostgreSQL with a focus on performance and security.",
      tech: ["Node.js", "Express", "PostgreSQL", "Prisma", "Redis"]
    },
    {
      title: "Full-Stack SaaS Development",
      icon: "🚀",
      description: "Building multi-tenant SaaS applications with Next.js, TypeScript, and modern state management like Redux or Zustand.",
      tech: ["Next.js", "React", "TypeScript", "Zustand"]
    },
    {
      title: "AI Integration",
      icon: "🤖",
      description: "Enhancing applications with intelligent features using OpenAI, Gemini API, and local model integration via Ollama.",
      tech: ["OpenAI", "Gemini API", "Ollama", "Generative AI"]
    }
  ],
  
  skills: {
    programming: ["JavaScript", "TypeScript", "Python"],
    frameworks: ["React", "Next.js", "Node.js", "Express", "Redux", "Zustand"],
    database: ["PostgreSQL", "MySQL", "MongoDB", "Prisma", "Mongoose", "Redis"],
    cloud: ["AWS (EC2, S3)", "Google Cloud", "Vercel", "Supabase", "Railway"],
    other: ["RESTful APIs", "Microservices", "Multi-tenant Architecture", "CI/CD Pipelines", "Docker", "Zod"]
  },

  experience: [
    {
      role: "Full Stack Developer (Backend Focused)",
      company: "finupsbd",
      location: "Gazipur",
      period: "December 2024 - Present",
      achievements: [
        "Architected scalable backend systems using Node.js, Express.js, PostgreSQL, and Prisma.",
        "Implemented CI/CD pipelines and deployment automation.",
        "Improved performance through optimized microservices architecture and database design."
      ]
    },
    {
      role: "Team Lead",
      company: "Fintech Project",
      period: "3 Months",
      achievements: [
        "Led a team of 3 developers to build a fintech project.",
        "Managed project planning, development workflow, and deployment."
      ]
    }
  ],
  
  projects: [
    {
      title: "Fintech Application",
      description: "A secure and scalable fintech backend platform featuring a complete loan management ecosystem with multi-role dashboards.",
      features: [
        "Secure JWT authentication and Role-Based Access Control (RBAC)",
        "Loan application tracking and automated eligibility checks",
        "Redis caching for high performance and Cloudinary for file management",
        "AI-powered financial assistance and smart workflow automation"
      ],
      impact: "Integrated OpenAI and Google AI for intelligent financial assistance and automated smart eligibility processing.",
      techStack: ["Node.js", "Express", "Prisma", "PostgreSQL", "Redis", "Cloudinary"],
      liveUrl: "https://e-commerce-fronend-alpha.vercel.app/", // Placeholder or actual if different
      codeUrl: "#",
      image: fintechMain
    },
    {
      title: "Inventory Management SaaS",
      description: "A multi-tenant SaaS inventory system designed for Bangladesh businesses with BDT/Bangla support and advanced bulk operations.",
      features: [
        "Multi-tenant architecture with secure tenant-based access control",
        "Product management, stock tracking, and sales processing",
        "Excel bulk customer upload and automated stock updates",
        "Bangladesh-focused BDT and Bangla language support"
      ],
      impact: "Built with a focus on local business needs, featuring Zod validation and Docker deployment for reliability.",
      techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Docker", "Zod"],
      liveUrl: "#",
      codeUrl: "#",
      image: inventoryShop
    },
    {
      title: "Blood Donation Application (Life Lines)",
      description: "A comprehensive platform connecting blood donors and recipients with real-time tracking.",
      features: [
        "Real-time donor search with location-based filtering",
        "Automated emergency blood request notification system",
        "Donor eligibility tracking and medical history logging"
      ],
      impact: "Facilitated over 500+ life-saving donations and reduced search time by 60%.",
      techStack: ["React", "Node.js", "MongoDB", "Mongoose", "TailwindCSS"],
      liveUrl: "https://blood-donation-28936.web.app/",
      codeUrl: "#",
      image: fintechDash
    }
  ]
};