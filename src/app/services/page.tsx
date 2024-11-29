import React from 'react';
import { FaCode, FaPaintBrush, FaMobileAlt, FaDatabase, FaCloud, FaLaptopCode } from "react-icons/fa"; // Additional icons

const Services = () => {
    return (
        <section id="services" className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 neon-text">
            My Services
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            I offer a range of services that can help you build stunning websites and web applications. From design to development, I’ve got you covered.
          </p>
  
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Service 1: Web Development */}
            <div className="service-card">
              <div className="icon-container">
                <FaCode className="service-icon neon-icon" />
              </div>
              <h3 className="text-2xl font-semibold mt-4 neon-text">Web Development</h3>
              <p className="mt-2 text-lg text-gray-300">
                I specialize in creating dynamic, responsive websites using the latest technologies such as React, Node.js, and Next.js.
              </p>
            </div>
  
            {/* Service 2: Web Design */}
            <div className="service-card">
              <div className="icon-container">
                <FaPaintBrush className="service-icon neon-icon" />
              </div>
              <h3 className="text-2xl font-semibold mt-4 neon-text">Web Design</h3>
              <p className="mt-2 text-lg text-gray-300">
                I design modern, user-friendly, and visually appealing websites that deliver an excellent user experience.
              </p>
            </div>
  
            {/* Service 3: Mobile Development */}
            <div className="service-card">
              <div className="icon-container">
                <FaMobileAlt className="service-icon neon-icon" />
              </div>
              <h3 className="text-2xl font-semibold mt-4 neon-text">Mobile Development</h3>
              <p className="mt-2 text-lg text-gray-300">
                I build mobile-friendly websites and applications that work seamlessly across all devices and platforms.
              </p>
            </div>
  
            {/* Service 4: Database Management */}
            <div className="service-card">
              <div className="icon-container">
                <FaDatabase className="service-icon neon-icon" />
              </div>
              <h3 className="text-2xl font-semibold mt-4 neon-text">Database Management</h3>
              <p className="mt-2 text-lg text-gray-300">
                I can help you manage and optimize databases using technologies like MongoDB, MySQL, and PostgreSQL.
              </p>
            </div>
  
            {/* Service 5: Cloud Solutions */}
            <div className="service-card">
              <div className="icon-container">
                <FaCloud className="service-icon neon-icon" />
              </div>
              <h3 className="text-2xl font-semibold mt-4 neon-text">Cloud Solutions</h3>
              <p className="mt-2 text-lg text-gray-300">
                I offer cloud services, including cloud hosting, cloud storage, and cloud computing for scalable and efficient solutions.
              </p>
            </div>
  
            {/* Service 6: Custom Software Development */}
            <div className="service-card">
              <div className="icon-container">
                <FaLaptopCode className="service-icon neon-icon" />
              </div>
              <h3 className="text-2xl font-semibold mt-4 neon-text">Custom Software Development</h3>
              <p className="mt-2 text-lg text-gray-300">
                From enterprise software to custom tools, I create software tailored to your specific business needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
};

export default Services;