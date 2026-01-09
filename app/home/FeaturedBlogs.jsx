"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { featuredBlogs } from "@/app/constants/featureBlog.jsx";

export default function FeaturedBlogs() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-4 text-center text-3xl md:text-5xl lg:text-5xl font-bold text-secondary"
        >
          Featured Articles
        </motion.h2>

        <div className="mx-auto mb-10 h-1 w-24 bg-secondary rounded-full" />

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {featuredBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group rounded-xl shadow-lg overflow-hidden bg-brand-background transition duration-300 hover:shadow-2xl hover:scale-95"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6 text-left">
                <h3 className="mb-2 text-xl font-semibold text-secondary group-hover:text-brand-primary transition-colors">
                  {blog.title}
                </h3>
                <p className="mb-4 text-sm text-gray-600">{blog.desc}</p>
                <p className="mb-2 text-xs text-gray-400">
                  {blog.date} · {blog.author}
                </p>
                <a
                  href={blog.link}
                  className="text-sm font-medium text-secondary hover:underline transition-colors"
                >
                  Read more →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
