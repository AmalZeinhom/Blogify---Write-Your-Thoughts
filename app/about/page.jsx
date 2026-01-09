"use client";

import React from "react";

import { motion } from "framer-motion";
import { features } from "@/app/constants/aboutFeatures.jsx";

export default function page() {
  return (
      <section className="container mx-auto px-4 py-16 min-h-screen max-w-[70%]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent">
            About Blogify
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The ultimate blogging platform designed for modern content creators
            and teams
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="rounded-xl mx-auto border-none shadow-xl bg-white/50 backdrop-blur-sm">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Our Story
              </h2>
              <span className="space-y-5 text-lg text-gray-600">
                <p>
                  Founded in 2025, Blogify was born from a simple observation:
                  bloggers and content creators needed a better way to manage
                  their content. We set out to build a platform that combines
                  powerful features with an intuitive interface.
                </p>
                <p>
                  Today, Blogify serves thousands of content creators worldwide,
                  from individual bloggers to large editorial teams. Our
                  commitment to innovation and user experience remains at the
                  heart of everything we do.
                </p>
                <p>
                  We believe that great content should be easy to create,
                  manage, and share. That&ados;s why we&ados;ve built Blogify
                  with cutting-edge technology and a user-first approach.
                </p>
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16 mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="h-full rounded-bl-3xl rounded-tr-2xl border-none shadow-xl hover:shadow-2xl transition-all bg-muted/10 backdrop-blur-sm">
                    <div className="mb-6 p-8">
                      <span className=" flex items-center gap-2 mb-3">
                        <div className="bg-linear-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">
                          {feature.title}
                        </h3>
                      </span>
                      <p className="text-gray-600 max-w-xl ml-12">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-center"
        >
          <div className="rounded-xl border-none shadow-xl bg-linear-to-r from-purple-600 to-blue-600">
            <div className="p-12">
              <h2 className="text-3xl font-bold mb-4 text-white">
                Join Our Growing Community
              </h2>
              <p className="text-xl text-white/90 mb-6">
                Thousands of bloggers trust Blogify for their content
                management needs
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-8 text-white">
                <div>
                  <div className="text-4xl font-bold">10K+</div>
                  <div className="text-white/80">Active Users</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">50K+</div>
                  <div className="text-white/80">Posts Published</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">99.9%</div>
                  <div className="text-white/80">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
  );
}
