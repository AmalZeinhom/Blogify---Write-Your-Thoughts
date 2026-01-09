"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { categories } from "@/app/constants/mockBlogs";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [hoverCategory, setHoverCategory] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Blogs", href: "/blogs" },
    { name: "Categories", href: "/category" },
    { name: "Write for Us", href: "/write-for-us" },
  ];

  return (
    <nav className="w-full border-b border-gray-200 bg-background relative z-50">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 md:px-6 lg:px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/images/logo.png"
            alt="Blogify"
            width={220}
            height={72}
            className="w-32 sm:w-40 md:w-48 h-auto"
            priority
          />
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-lg font-medium text-secondary">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            if (link.name === "Categories") {
              return (
                <li
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setHoverCategory(true)}
                  onMouseLeave={() => setHoverCategory(false)}
                >
                  <span
                    className={`cursor-pointer group relative transition-colors duration-200
                      ${
                        isActive
                          ? "text-primary font-semibold"
                          : "hover:text-brand-primary"
                      }`}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300
                      ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                    />
                  </span>

                  <AnimatePresence>
                    {hoverCategory && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute left-1/2 top-10 -translate-x-1/2 w-100 bg-background rounded-2xl shadow-2xl p-6 z-50"
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4">
                          {categories.map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/category/${cat.slug}`}
                              className="group rounded-xl py-4 px-8 text-center hover:bg-primary/20 text-primary transition"
                            >
                              <h4 className="font-semibold group-hover:text-primary">
                                {cat.icon} {cat.title}
                              </h4>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            }

            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`group relative transition-colors duration-200
                    ${
                      isActive
                        ? "text-primary font-semibold"
                        : "hover:text-primary"
                    }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300
                      ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="md:hidden">
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((s) => !s)}
            className="p-2 rounded-md bg-muted/20"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="absolute left-0 top-full w-full bg-background border-b border-gray-200 md:hidden z-50"
            >
              <div className="mx-auto max-w-7xl px-4 py-4">
                <ul className="flex flex-col gap-3 text-base font-medium text-secondary">
                  {links.map((link) => (
                    <li key={link.name} className="py-2">
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block w-full transition-colors duration-200 ${
                          pathname === link.href ||
                          (link.href !== "/" && pathname.startsWith(link.href))
                            ? "text-primary font-semibold"
                            : "hover:text-primary"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
