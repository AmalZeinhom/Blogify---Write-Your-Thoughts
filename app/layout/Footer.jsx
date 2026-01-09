"use client";

import Link from "next/link";
import React from "react";
import { FaFacebook, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-linear-to-br from-secondary via-[#213448] to-[#1A2A4F] py-4 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-14 grid grid-cols-1 gap-12 md:grid-cols-4">
        <div>
          <h2 className="text-lg font-bold mb-4 text-white">About Us</h2>
          <p className="text-sm leading-relaxed md:text-base max-w-sm">
            We are dedicated to providing the best content and resources for our
            community. Our mission is to inspire and educate through
            high-quality articles and insights.
          </p>
          <ul className="flex space-x-4 mt-6">
            {[
              { icon: <FaFacebook size={30} />, href: "#" },
              { icon: <FaTwitter size={30} />, href: "#" },
              { icon: <FaLinkedinIn size={30} />, href: "#" },
            ].map((item, i) => (
              <li key={i}>
                <a
                  href={item.href}
                  className="group inline-flex transform transition duration-300"
                  aria-label="social-media"
                >
                  <span className="text-xl transition-all duration-300 group-hover:text-white group-hover:scale-110 group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]">
                    {item.icon}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4 text-white">Explore</h2>
          <ul className="space-y-3 text-sm">
            {[
              { name: "Home", href: "/" },
              { name: "Blogs", href: "/blogs" },
              { name: "Categories", href: "/categories" },
              { name: "Write for Us", href: "/write-for-us" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="hover:text-white transition-colors duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4 text-white">Resources</h2>
          <ul className="space-y-3 text-sm">
            {[
              { name: "About Us", href: "/about"},
              { name: "Terms of Service" },
              { name: "Contact Us", href: "/contacts" },
              { name: "Support" },
            ].map((item) => (
              <li key={item.name}>
                <a href={item.href} className="transition-colors hover:text-white">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 text-white">Stay Updated</h3>
          <p className="mb-4 text-sm">
            Subscribe to get the latest posts directly in your inbox.
          </p>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="rounded-md bg-white/10 px-4 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-background"
            />
            <button
              type="submit"
              className="rounded-md bg-brand-primary px-4 py-2 text-sm font-medium transition hover:opacity-90"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-sm text-gray-400">
        @ {new Date().getFullYear()} Blogify. All rights reserved.
      </div>
    </footer>
  );
}
