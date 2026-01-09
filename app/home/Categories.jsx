"use client";

import React from "react";
import { motion } from "framer-motion";

const categories = ["Technology", "Design", "Business", "Lifestyle", "Writing"];

export default function Categories() {
  return (
    <section className="bg-brand-background py-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-3xl md:text-5xl font-bold text-secondary"
        >
          Browse by Category
        </motion.h2>

        <div className="mx-auto mb-10 h-1 w-24 bg-secondary rounded-full" />

        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat, index) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.08 }}
              className="rounded-full border border-primary px-7 py-2 text-lg md:text-xl font-medium text-primary transition-colors hover:bg-primary hover:text-white"
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
