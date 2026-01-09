"use client";

import { useParams } from "next/navigation";
import { mockBlogs } from "@/app/constants/mockBlogs";
import { motion } from "framer-motion";
import BlogCard from "@/Components/blog/BlogCard";

export default function CategoryPage() {
  const { slug } = useParams();

  const blogs = mockBlogs.filter(
    (blog) => blog.category.toLowerCase() === slug.toLowerCase()
  );

  if (!blogs.length)
    return (
      <p className="p-10 text-center text-gray-500 text-lg">
        No posts in this category
      </p>
    );

  return (
    <section className="px-6 md:px-16 py-14">
      <h1 className="text-4xl text-brand-primary font-bold capitalize mb-10">
        {slug} Blogs
      </h1>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, index) => (
          <motion.div
            key={index}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <BlogCard blog={blog} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
