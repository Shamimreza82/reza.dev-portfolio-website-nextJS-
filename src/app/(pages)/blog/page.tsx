import Link from "next/link";
import Image from "next/image";

const blogs = [
  {
    slug: "future-of-web-development",
    title: "The Future of Web Development",
    description: "Exploring trends and technologies shaping web development in 2024.",
    image: "/images/blog1.jpg",
    date: "2024-06-17",
    author: "Shamim Reza",
  },
  {
    slug: "why-nextjs-is-best",
    title: "Why Next.js is the Best Framework",
    description: "Learn why developers are choosing Next.js for modern web applications.",
    image: "/images/blog2.jpg",
    date: "2024-06-15",
    author: "Shamim Reza",
  },
  {
    slug: "mastering-typescript-react",
    title: "Mastering TypeScript for React",
    description: "A beginner-friendly guide to using TypeScript with React.",
    image: "/images/blog3.jpg",
    date: "2024-06-10",
    author: "Shamim Reza",
  },
];

export default function BlogPage() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold">Blog</h1>
          <p className="text-gray-500 mt-2">
            Insights on web development, technologies, and best practices.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              className="block rounded-lg overflow-hidden border hover:scale-105 transition-transform duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={blog.image}
                  alt={blog.title}   // ✅ SEO alt text
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-500 text-sm">
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  • {blog.author}
                </p>
                <p className="text-gray-600 mt-2">{blog.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
