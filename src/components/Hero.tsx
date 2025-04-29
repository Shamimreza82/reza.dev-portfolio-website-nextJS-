import React from "react";

const Hero = () => {
  return (
    <div>
      <section className="hero bg-slate-900 text-white py-20 h-screen flex justify-center items-center">
        <div className="container mx-auto text-center">
          <h1 className="lg:text-5xl  font-bold">
            Hi, I’m Shamim Reza,
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300">
            A Dedicated{" "}
            <span className="text-blue-400">MERN Stack Developer</span> crafting
            seamless and dynamic web experiences.
          </p>
          <p className="mt-2 text-lg md:text-xl text-gray-300">
            I specialize in building modern, responsive, and innovative websites
            using MongoDB, Express, React, Node.js, and Next.js.
          </p>
          <div className="mt-6">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg-neon transition transform hover:scale-105 hover:bg-blue-600 text-shadow-neon">
              View My Work
            </button>
            <button className="ml-4 px-6 py-3 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-600 transition">
              Get in Touch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
