"use client";

import Image from "next/image";
import React from "react";
import { mockBlogs } from "@/app/constants/mockBlogs.jsx";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiLink } from "react-icons/fi";

export default function BlogDetails() {
  const { id } = useParams();
  const router = useRouter();
  const blog = mockBlogs.find((item) => item.id === id);

  if (!blog) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-xl text-gray-500">
        Blog not found
      </div>
    );
  }

  const readingTime = blog.content
    ? Math.ceil(blog.content.split(" ").length / 200)
    : 1;

  return (
    <section className="w-full bg-background">
      <div className="relative h-[80vh] overflow-hidden w-full">
        <Image
          alt={blog.title}
          src={blog.featuredImage}
          fill
          priority
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-16 left-6 md:left-16 right-6 text-white max-w-4xl"
        >
          <span className="uppercase tracking-widest text-sm opacity-80">
            {blog.category} Blog
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mt-4">{blog.title}</h1>
          <p className="text-sm mt-6 opacity-80">
            {blog.publishDate} • {readingTime} min read • By {blog.author}
          </p>
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-0 py-20">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl text-gray-800 mb-16 leading-relaxed"
        >
          {blog.excerpt}
        </motion.p>

        <div className="space-y-6">
          {blog.content ? (
            blog.content.split(". ").map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-lg leading-relaxed text-gray-700"
              >
                {paragraph}.
              </motion.p>
            ))
          ) : (
            <p className="text-gray-700 text-lg">No content available.</p>
          )}
        </div>

        {blog.expertInsight && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="my-20 p-10 bg-primary/10 border-l-4 border-primary rounded-2xl"
          >
            <p className="text-prbg-primary font-semibold mb-2">
              💡 Expert Insight
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              {blog.expertInsight}
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-24"
        >
          <h3 className="text-3xl font-bold text-secondary mb-6">
            Want more insights?
          </h3>
          <button
            onClick={() => router.push("/blogs")}
            className="px-10 py-4 bg-secondary text-white rounded-full text-lg font-medium hover:scale-105 transition"
          >
            Explore More Articles
          </button>
        </motion.div>
      </div>

      <div className="fixed bottom-16 left-6 flex flex-col gap-4 z-50">
        <button
          className="bg-secondary text-background shadow-2xl w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link Copied!");
          }}
        >
          <FiLink size={20} />
        </button>
      </div>
    </section>
  );
}
