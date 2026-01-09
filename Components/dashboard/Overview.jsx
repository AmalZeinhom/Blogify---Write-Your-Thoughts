"use client";

import React from "react";
import { useAuth } from "@/app/context/AuthContext";
import {
  stats,
  recentActivity,
  quickStats,
  topCategories,
} from "@/app/constants/dashbordData.jsx";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  FolderOpen,
  AlertCircle,
  LogOutIcon,
} from "lucide-react";
import ProgressBar from "@/app/common/Progress";

export default function Dashboard() {
  const { email, role, logout } = useAuth();
  return (
    <section className="min-h-screen bg-blue-100/50 py-16 px-8 sm:p-6 lg:p-8 ">
      <div className="max-w-[80%] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Dashboard Overview
              </h1>
              <p className="text-gray-600">Welcome back, {email}</p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center border border-gray-300 space-x-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-xl">
                <Users className="h-4 w-4 text-purple-600" />
                <p className="font-medium">{role}</p>
              </div>

              <button
                type="button"
                onClick={logout}
                className="px-4 py-2 bg-primary/60 text-background font-bold rounded-xl border-gray-400 flex items-center gap-2 hover:bg-primary/80 transition-all duration-300"
              >
                <LogOutIcon className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="border-none shadow-lg rounded-3xl hover:shadow-2xl transition-all bg-white/80 backdrop-blur-sm overflow-hidden group">
                  <div className="p-6 relative">
                    <motion.div
                      className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    <div className="flex items-center justify-between mb-4 relative z-10">
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                        className={`bg-linear-to-r ${stat.color} p-3 rounded-xl shadow-lg`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </motion.div>

                      <div className="text-green-700 bg-green-100 font-semibold px-3 py-1 rounded-lg">
                        {stat.change}
                      </div>
                    </div>

                    <h3 className="text-sm text-muted-foreground font-bold mb-1">
                      {stat.title}
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500">{stat.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="border-none py-4 px-6 rounded-xl shadow-lg bg-white/80 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-10">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <h3>Recent Activity</h3>
              </div>

              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    key={index}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="flex items-start space-x-4 p-4 rounded-xl hover:bg-linear-to-r hover:from-purple-50 hover:to-blue-50 transition-all cursor-pointer border border-transparent hover:border-purple-200"
                  >
                    <div
                      className={`h-3 w-3 rounded-full mt-1.5 shrink-0 ${
                        activity.type === "success"
                          ? "bg-green-500 shadow-lg shadow-green-500/50"
                          : activity.type === "warning"
                          ? "bg-orange-500 shadow-lg shadow-orange-500/50"
                          : activity.type === "pending"
                          ? "bg-yellow-500 shadow-lg shadow-yellow-500/50"
                          : "bg-blue-500 shadow-lg shadow-blue-500/50"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <div className="flex items-center space-x-2 mt-1 mb-3">
                        <p className="text-sm text-gray-600">
                          by {activity.author}
                        </p>
                        <span className="text-gray-400">•</span>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                      <span className=" text-xs font-bold text-muted-foreground rounded-full border border-gray-300 bg-gray-100 py-1 px-2">
                        {activity.category}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="border-none shadow-lg bg-white/80 backdrop-blur-sm py-4 px-6 rounded-xl">
                <h3 className="text-lg mb-10">Quick Stats</h3>
                <div className="space-y-4">
                  {quickStats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="space-y-2"
                    >
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium text-gray-700">
                            {stat.label}
                          </span>
                          <span className="text-gray-600">
                            {stat.value}/{stat.total}
                          </span>
                        </div>
                        <ProgressBar value={stat.value} max={stat.total} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="border-none shadow-lg bg-white/80 backdrop-blur-sm py-4 px-6 rounded-2xl">
                <div>
                  <div className="text-lg flex items-center space-x-2 mb-3">
                    <FolderOpen className="h-5 w-5 text-purple-600" />
                    <span>Top Categories</span>
                  </div>
                </div>
                <div>
                  <div>
                    {topCategories.map((category, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + index * 0.05 }}
                        whileHover={{ scale: 1.05, x: 4 }}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`${category.color} h-2 w-2 rounded-full`}
                          />
                          <span className="font-medium text-gray-900">
                            {category.name}
                          </span>
                        </div>
                        <div className="bg-muted-foreground/10 py-1 px-2 rounded-lg text-xs font-semibold">
                          {category.posts}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {role === "Admin" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="border-none shadow-lg bg-linear-to-r from-purple-600 via-blue-600 to-purple-600 overflow-hidden rounded-2xl">
              <div className="p-6 text-white relative">
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />

                <div className="flex items-start space-x-4 relative z-10">
                  <AlertCircle className="h-8 w-8" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Admin Access Enabled
                    </h3>
                    <p className="text-white/90 mb-3">
                      You have full administrative privileges. You can manage
                      all content, users, and system settings.
                    </p>
                    <div className="flex gap-2">
                      <div className="bg-white/20 hover:bg-white/30 border-white/30 px-2 py-1 rounded-lg">
                        Full Access
                      </div>
                      <div className="bg-white/20 hover:bg-white/30 border-white/30 px-2 py-1 rounded-lg">
                        User Management
                      </div>
                      <div className="bg-white/20 hover:bg-white/30 border-white/30 px-2 py-1 rounded-lg">
                        System Config
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
