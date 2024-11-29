"use client"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"; // React icons for social media links
import { useState } from "react";

const Contact = () => {
  // State for form submission
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  // Handle form input changes
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission (just for demo, actual submission will require a backend)
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a form submission process
    setTimeout(() => {
      setSubmitStatus("Message sent successfully!");
      setIsSubmitting(false);
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };
  return (
    <section id="contact" className="bg-slate-900 text-white py-20 relative">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
          Get in Touch
        </h2>
        <p className="mt-4 text-lg text-gray-300">
          I would love to hear from you! Whether you have a question, project
          proposal, or just want to connect, feel free to reach out.
        </p>

        {/* Contact Form Section */}
        <div className="mt-12">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 max-w-2xl mx-auto"
            method="POST"
          >
            {/* Name Input */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-gray-800 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
              />
            </div>

            {/* Email Input */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-gray-800 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Email"
              />
            </div>

            {/* Message Input */}
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 text-gray-800 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Message"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-6 py-3 text-white font-bold bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {/* Status Message */}
            {submitStatus && (
              <p className="mt-4 text-green-500 font-semibold">
                {submitStatus}
              </p>
            )}
          </form>
        </div>

        {/* Contact Information Section */}
        <div className="mt-12 text-gray-300">
          <h3 className="text-2xl font-semibold">Or connect with me on:</h3>
          <div className="mt-4 flex justify-center space-x-6">
            <a
              href="https://github.com/your-github"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="h-8 w-8 text-blue-400 hover:text-blue-500 transition" />
            </a>
            <a
              href="https://linkedin.com/in/your-linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="h-8 w-8 text-blue-400 hover:text-blue-500 transition" />
            </a>
            <a
              href="https://twitter.com/your-twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="h-8 w-8 text-blue-400 hover:text-blue-500 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Background Effect */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900 opacity-50 z-0"></div> */}
    </section>
  );
};

export default Contact;
