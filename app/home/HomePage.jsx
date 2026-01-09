"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heroSlides } from "@/app/constants/data";
import { slideRight } from "@/utility/animation.js";
import Link from "next/link";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <section className="relative w-full min-h-125 overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence>
          <motion.div
            key={heroSlides[currentSlide].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${heroSlides[currentSlide].image})`,
            }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/20 backdrop-blur-xs z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-125 text-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroSlides[currentSlide].id}
            variants={slideRight(0.3)}
            initial="hidden"
            animate="show"
            exit="exit"
            className="flex flex-col items-center gap-6 max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 text-white drop-shadow-lg">
              {heroSlides[currentSlide].title}
            </h1>

            <p className="text-white/90 text-lg sm:text-xl md:text-2xl leading-relaxed">
              {heroSlides[currentSlide].desc}
            </p>

            <div className="flex flex-wrap gap-4 mt-4 justify-center">
              <Link
                href="/blogs"
                className="px-6 py-3 bg-primary text-white rounded-md hover:opacity-90 transition"
              >
                Explore Blogs
              </Link>
              <a
                href="/write-for-us"
                className="px-6 py-3 bg-foreground text-white rounded-md hover:bg-brand-primary transition"
              >
                Write for Us
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
