"use client";

import React, { useState } from "react";
import BlogCard from "@/Components/blog/BlogCard.jsx";
import CategoriesFilter from "@/Components/blog/CategoriesFilter.jsx";
import Pagination from "@/Components/blog/Pagination.jsx";

import { mockBlogs, categories } from "@/app/constants/mockBlogs.jsx";

import { motion } from "framer-motion";

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const filteredBlogs =
    selectedCategory === "all"
      ? mockBlogs
      : mockBlogs.filter(
          (blog) => blog.category.toLowerCase() === selectedCategory,
        );

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const displayedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage,
  );

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-16 py-10 bg-brand-background min-h-screen">
      <h1 className="text-3xl font-bold text-brand-primary mb-6">All Blogs</h1>

      <CategoriesFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={handleCategorySelect}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedBlogs.map((blog, index) => (
          <motion.div
            key={index}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <BlogCard key={blog.id} blog={blog} />
          </motion.div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
