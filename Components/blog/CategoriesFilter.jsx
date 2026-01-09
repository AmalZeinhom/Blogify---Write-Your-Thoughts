"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CategoriesFilter({ categories, selected, onSelect }) {
  const allCategories = [{ slug: "all", title: "All" }, ...categories];

  return (
    <div className="relative flex flex-wrap gap-3 mb-10">
      {allCategories.map((cat) => {
        const isActive = selected === cat.slug;

        return (
          <motion.button
            key={cat.slug}
            onClick={() => onSelect(cat.slug)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className={`relative px-5 py-2 rounded-full text-sm font-medium transition
              ${
                isActive
                  ? "text-white"
                  : "text-gray-700 bg-gray-100 hover:bg-gray-200"
              }`}
          >
            {isActive && (
              <motion.span
                layoutId="activeCategory"
                className="absolute inset-0 rounded-full bg-primary shadow-md"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}

            <span className="relative z-10">{cat.title}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
