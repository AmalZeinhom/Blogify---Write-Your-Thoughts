"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Categories from "./home/Categories";
import FeaturedBlogs from "./home/FeaturedBlogs";
import HomePage from "./home/HomePage";
import NewsLetters from "./home/NewsLetters";
import WhyBlogify from "./home/WhyBlogify";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

   const secretAdminKey = "allowedAccess"; 
  const isAdminMode = searchParams.get("admin") === secretAdminKey;

  useEffect(() => {
    if (isAdminMode) {
      sessionStorage.setItem("admin", "true");
    }
  }, [isAdminMode]);

  return (
    <div>
      {isAdminMode && (
        <button
          onClick={() => router.push("/admin/login")}
          className="fixed top-[5%] left-[45%] z-50 opacity-50 hover:opacity-100 bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          Admin Login
        </button>
      )}

      <HomePage />
      <FeaturedBlogs />
      <Categories />
      <WhyBlogify />
      <NewsLetters />
    </div>
  );
}
