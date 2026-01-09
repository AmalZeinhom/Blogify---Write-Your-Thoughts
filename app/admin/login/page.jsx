"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Mail, LogInIcon } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const isFormValid = !!email.trim() && !!password.trim();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error("Please fill in all fields before submitting!");
      return;
    }

    setIsLoading(true);

    const success = await login(email, password);

    setIsLoading(false);

    if (success) {
      sessionStorage.removeItem("admin");
      toast.success("Login Successful!", {
        description: "Redirecting to dashboard...",
      });

      setEmail("");
      setPassword("");

      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 500);
    } else {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <section className="min-h-screen p-8 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-12">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6 block"
      >
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Welcome to Blogify
          </h1>
          <p className="text-xl max-w-xl text-gray-500">
            Secure admin access for content management and team collaboration
          </p>
        </div>

        <div className="shadow-2xl rounded-bl-xl rounded-tr-4xl bg-muted-foreground/20 px-4 py-8">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/50 p-3 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-primary">
                  Secure Authentication
                </h3>
                <p className="text-muted-foreground font-semibold">
                  Enterprise-grade security with role-based access control
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 mt-4">
              <div className="bg-primary/50 p-3 rounded-lg">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-primary">
                  Protected Routes
                </h3>
                <p className="text-muted-foreground font-semibold">
                  Access restricted areas based on your role and permissions
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-10"
      >
        <div className="border-none rounded-4xl shadow-2xl bg-background backdrop-blur-lg p-10">
          <div className="space-y-1">
            <h2 className="text-3xl text-center">Login</h2>
            <p className="text-center text-gray-600">
              Enter your credentials to access the dashboard
            </p>
          </div>

          <div className="pt-6">
            <form
              onSubmit={handleLogin}
              noValidate
              className="space-y-5 mx-auto max-w-md"
            >
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="flex items-center gap-3 text-gray-700"
                >
                  <Mail className=" h-5 w-5 " />
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="admin@blogify.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white w-full block mt-3 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="flex items-center gap-3 text-gray-700"
                >
                  <Lock className=" h-5 w-5 " />
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white w-full block mt-3 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !isFormValid}
                className={`w-full mt-4 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 text-lg rounded-xl ${
                  !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  "Loading.."
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <LogInIcon className="h-5 w-5" />
                    <span>Login</span>
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
