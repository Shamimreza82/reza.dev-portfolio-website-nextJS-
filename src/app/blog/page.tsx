import Link from 'next/link';
import React from 'react';
import { FaRegNewspaper } from "react-icons/fa"; // Icon for blog

const Blog = () => {



    return (
        <section id="blogs" className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 ">
            My Blogs
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Here are some of my latest blog posts where I share insights on web development, technologies, and best practices.
          </p>
  
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {blogs.map((blog, index) => (
              <div key={index} className="blog-card p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
                <div className="icon-container mb-4">
                  <FaRegNewspaper className="blog-icon neon-icon" />
                </div>
                <h3 className="text-2xl font-semibold text-white">{blog.title}</h3>
                <p className="text-gray-300 mt-2">{blog.description}</p>
                <div className="mt-4">
                  <Link href={`/blog/${blog.id}`} className="text-blue-500 hover:underline">
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
};


const blogs = [
    {
        id: 1,
      title: "Understanding React Hooks",
      description: "A deep dive into React Hooks, explaining how they work and when to use them in functional components.",
      link: "/blogs/understanding-react-hooks" // Link to the full blog post
    },
    {
        id: 2,
      title: "Next.js for SEO Optimization",
      description: "Learn how Next.js can help with SEO optimization by rendering pages server-side and improving page load speeds.",
      link: "/blogs/nextjs-for-seo-optimization" // Link to the full blog post
    },
    {
        id: 3,
      title: "How to Build a Full Stack App with MERN",
      description: "Step-by-step guide to building a full-stack application using MongoDB, Express, React, and Node.js.",
      link: "/blogs/how-to-build-a-full-stack-app-with-mern" // Link to the full blog post
    },
    // Add more blog entries as needed
  ];





export default Blog;