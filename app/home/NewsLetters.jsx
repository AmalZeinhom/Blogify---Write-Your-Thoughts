"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, CheckCircle } from "lucide-react";

export default function NewsLetters() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setEmail("");
    }, 1500);
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => setIsSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <section className="bg-background py-20 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative mx-auto max-w-xl rounded-2xl bg-white px-6 py-10 text-center shadow-lg"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-7 w-7 text-primary" />
        </div>

        <h3 className="mb-3 text-2xl font-serif font-bold text-secondary">
          Stay in the Loop
        </h3>

        <p className="mb-8 text-gray-600">
          Get the latest articles delivered straight to your inbox.
        </p>

        <form onSubmit={handleSubmit} noValidate className="relative">
          <div className="flex flex-col gap-3 relative sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />

            <motion.button
              whileHover={isLoading ? {} : { scale: 1.05 }}
              whileTap={isLoading ? {} : { scale: 0.95 }}
              disabled={isLoading}
              className="flex justify-center items-center gap-2 rounded-md bg-primary py-3 px-6 text-sm font-medium text-white transition hover:bg-secondary disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Subscribing...
                </>
              ) : (
                "Subscribe"
              )}
            </motion.button>
          </div>
        </form>

        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: -5 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              className="mt-6 flex items-center justify-center gap-2 text-green-600"
            >
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-medium">
                You’re successfully subscribed!
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
