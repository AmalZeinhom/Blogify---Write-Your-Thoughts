"use client";

import React from "react";
import { motion } from "framer-motion";
import { blogifyTips } from "@/app/constants/whyBlogify.jsx";

export default function WhyBlogify() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-3xl md:text-5xl font-bold text-secondary"
        >
          Why Blogify?
        </motion.h2>

        <div className="mx-auto mb-10 h-1 w-24 bg-secondary rounded-full" />

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {blogifyTips.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{ y: -8 }}
              className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="mx-auto mb-4 flex justify-center items-center h-17 w-17 rounded-xl shadow-lg bg-primary/10">
                <item.icon className="h-7 w-7 text-primary" />
              </div>

              <h3 className="mb-3 text-xl font-semibold text-secondary">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
