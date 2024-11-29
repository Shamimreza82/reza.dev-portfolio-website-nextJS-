import Image from "next/image";
import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"; // Icons for GitHub and External Link

const Projects = () => {
  const projects = [
    {
      title: "E-commerce Website",
      description:
        "A full-stack e-commerce website built using React, Node.js, and MongoDB. Features include product listing, cart functionality, and user authentication.",
      image: "/images/ecommerce.jpg", // Project image path
      demoLink: "https://demo-link.com",
      githubLink: "https://github.com/yourusername/ecommerce-website",
    },
    {
      title: "Personal Blog",
      description:
        "A personal blog built with Next.js, showcasing dynamic content with Markdown files and deploying using Vercel.",
      image: "/images/blog.jpg", // Project image path
      demoLink: "https://demo-link.com",
      githubLink: "https://github.com/yourusername/personal-blog",
    },
    {
      title: "Portfolio Website",
      description: "My personal portfolio website built with Next.js, showcasing my work, skills, and experience.",
      image: "/images/portfolio.jpg", // Project image path
      demoLink: "https://demo-link.com",
      githubLink: "https://github.com/yourusername/portfolio-website",
    },
    {
      title: "Portfolio Website",
      description:
        "My personal portfolio website built with Next.js, showcasing my work, skills, and experience.",
      image: "/images/portfolio.jpg", // Project image path
      demoLink: "https://demo-link.com",
      githubLink: "https://github.com/yourusername/portfolio-website",
    },
    // Add more projects as needed
  ];
  return (
    <div>
      <section id="projects" className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 neon-text">
            My Projects
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Check out some of the projects i have worked on. From ecommerce
            websites to personal blogs, each project reflects my skills and
            passion for web development.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-card p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
              >
                <Image
                height={45}
                width={45}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
                <h3 className="text-2xl font-semibold text-white">
                  {project.title}
                </h3>
                <p className="text-gray-300 mt-2">{project.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    <FaExternalLinkAlt className="inline-block mr-2" />
                    Live Demo
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-100"
                  >
                    <FaGithub className="inline-block" />
                    GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
