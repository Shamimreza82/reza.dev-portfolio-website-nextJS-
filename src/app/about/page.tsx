import React from "react";
import {
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaCss3Alt,
  FaHtml5,
} from "react-icons/fa"; // Font Awesome icons
import { DiMongodb } from "react-icons/di";
import Image from "next/image";

const About = () => {
  return (
    <section
      id="about"
      className="bg-slate-900 text-white py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 text-center">
        {/* Header Section */}
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
          About Me
        </h2>
        <p className="mt-4 text-lg text-gray-300">
          i am Shamim Reza, a passionate Full-Stack Developer. With a background
          in Civil Engineering, I transitioned to the world of web development,
          specializing in building dynamic and innovative web applications using
          the MERN stack.
        </p>

        <div className="mt-12 flex flex-col items-center md:flex-row md:space-x-12">
          {/* Image Section */}
          <div className="mb-8 md:mb-0 w-48 h-48 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out">
            <Image
              width={100}
              height={100}
              src="/images/your-photo.jpg"
              alt="Shamim Reza"
              className="w-full h-full object-cover transform hover:rotate-6 transition-all duration-500"
            />
          </div>

          {/* Text Section */}
          <div className="md:w-2/3 text-left">
            <h3 className="text-2xl md:text-3xl font-semibold text-gradient bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              My Journey & Vision
            </h3>
            <p className="mt-4 text-lg text-gray-300">
              Transitioning from Civil Engineering to Full-Stack Web
              Development, i have embraced the challenge of mastering the MERN
              stack. I am driven by the desire to solve problems creatively and
              efficiently through code, and to craft solutions that elevate user
              experience.
            </p>

            <div className="mt-8">
              <h4 className="text-xl font-semibold text-gray-300">
                Skills & Technologies:
              </h4>

              <ul className="mt-4 grid grid-cols-2 gap-4 text-gray-300">
                <li className="flex items-center space-x-2 hover:text-blue-400 transition">
                  <FaJsSquare className="h-6 w-6 text-blue-400" />
                  <span>JavaScript</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-blue-400 transition">
                  <FaReact className="h-6 w-6 text-blue-400" />
                  <span>React</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-blue-400 transition">
                  <FaNodeJs className="h-6 w-6 text-blue-400" />
                  <span>Node.js</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-blue-400 transition">
                  <DiMongodb className="h-6 w-6 text-blue-400" />
                  <span>MongoDB</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-blue-400 transition">
                  <FaGithub className="h-6 w-6 text-blue-400" />
                  <span>GitHub</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-blue-400 transition">
                  <FaCss3Alt className="h-6 w-6 text-blue-400" />
                  <span>CSS</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-blue-400 transition">
                  <FaHtml5 className="h-6 w-6 text-blue-400" />
                  <span>HTML5</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Parallax Background */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900 opacity-50 z-0">
        sdjodsifodsjfosdf
      </div> */}
    </section>
  );
};

export default About;
