"use client";

import { usePathname } from "next/navigation";
import React, { useState, useContext } from "react";
import {
  Shield,
  LayoutDashboard,
  ClipboardList,
  Mail,
  FolderOpen,
  Users2,
  ChevronRight,
  LogOutIcon,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { motion } from "framer-motion";
import Link from "next/link";
import SidebarContext from "@/app/context/SidebarContext";

export default function Sidebar() {
  const [collapsed] = useState(false);
  const pathName = usePathname();
  const { email, role, logout } = useAuth();
  const { open, setOpen } = useContext(SidebarContext);

  const menu = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    {
      name: "Blog Management",
      href: "/admin/dashboard/managment",
      icon: ClipboardList,
    },
    {
      name: "Guest Posts",
      href: "/admin/dashboard/posts",
      icon: Mail,
    },
    {
      name: "Categories",
      href: "/admin/dashboard/categories",
      icon: FolderOpen,
    },
    { name: "Authors", href: "/admin/dashboard/authors", icon: Users2 },
  ];

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          aria-hidden
        />
      )}

      <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 z-40 h-screen px-4 py-6 text-muted transition-transform duration-300 border border-gray-200 bg-background flex flex-col shadow-lg ${
        open ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static md:w-72 w-64`}
    >
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center gap-2 mb-5">
          <span className="bg-linear-to-br from-primary/20 to-purple-950 p-2 rounded-lg">
            <Shield className="w-9 h-9 text-white" />
          </span>
          <div>
            <h2 className="font-bold text-black/80 text-xl">BloifyPanel</h2>
            <p className="text-xs font-semibold">Admin Dashboard</p>
          </div>
        </div>

        <div className="bg-gray-200 rounded-xl py-4 px-2 border-none">
          <p className="text-gray-600">{email}</p>
          <p className="text-black/90 ml-2 text-sm">{role}</p>
        </div>

        <div className="border border-gray-200 w-full mt-3" />

        <nav className="space-y-2 mt-4 mb-8">
          {menu.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathName === item.href;

            return (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                    isActive ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="flex items-center gap-2 flex-1">
                    <Icon className="w-5 h-5" />
                    {!collapsed && <span>{item.name}</span>}
                  </span>

                  {isActive && (
                    <span className="text-white">
                      <ChevronRight className="w-5 h-5" />
                    </span>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>

      <button
        onClick={logout}
        className="mt-auto w-full flex items-center justify-center gap-2 rounded-xl border border-red-300 text-red-600 py-3 hover:bg-red-50 hover:border-red-400 transition-all duration-300"
      >
        <LogOutIcon className="w-5 h-5" />
        Logout
      </button>
    </motion.aside>
    </>
  );
}
 