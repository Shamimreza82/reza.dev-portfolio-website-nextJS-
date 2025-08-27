
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Reza is a talented and dedicated developer. He was able to take my vision and turn it into a beautiful, functional website. I would highly recommend him to anyone looking for a high-quality web developer.",
    name: "John Doe",
    title: "CEO, Example Inc.",
  },
  {
    quote:
      "I was so impressed with Reza's work. He was professional, responsive, and delivered a final product that exceeded my expectations. I would definitely work with him again.",
    name: "Jane Smith",
    title: "Marketing Manager, Another Company",
  },
  {
    quote:
      "Reza is a true professional. He is a skilled developer with a keen eye for design. He was a pleasure to work with and I would not hesitate to recommend him to anyone.",
    name: "Peter Jones",
    title: "Founder, A Third Company",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Testimonials</h2>
          <p className="text-lg text-gray-400">
            See what my clients have to say about my work.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-800 rounded-lg p-8 flex flex-col items-center text-center"
            >
              <p className="text-gray-400 mb-6">{testimonial.quote}</p>
              <h3 className="text-xl font-bold text-white mb-2">
                {testimonial.name}
              </h3>
              <p className="text-gray-500">{testimonial.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
