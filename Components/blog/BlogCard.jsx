"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Calendar, Clock } from "lucide-react";

export default function BlogCard({ blog }) {
  const router = useRouter();

  const avatarUrl =
    blog.avatar ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
      blog.author
    )}`;

  return (
    <article
      key={blog.id}
      onClick={() => router.push(`/blogs/${blog.id}`)}
      className="group cursor-pointer rounded-xl overflow-hidden bg-white shadow-md 
                             hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={blog.featuredImage}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent">
          <div className="top-3 absolute right-3">
            <span className="bg-brand-background backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm">
              {blog.category}
            </span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(blog.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>

          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {blog.readTime}
          </span>
        </div>

        <h2 className="text-xl text-gray-800 font-semibold mb-2 line-clamp-2 group-hover:text-secondary/90 transition-colors">
          {blog.title}
        </h2>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {blog.excerpt}
        </p>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <img
              src={avatarUrl}
              alt={blog.author}
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>

          <p className="text-sm font-medium text-gray-700">{blog.author}</p>
        </div>
      </div>
    </article>
  );
}
