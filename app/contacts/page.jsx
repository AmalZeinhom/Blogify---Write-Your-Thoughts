"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare } from "lucide-react";
import ContactForm from "../forms/ContactForm";

const cards = [
  {
    id: 1,
    title: "Email Us",
    icon: Mail,
    lines: ["contact@blogpanel.com", "support@blogpanel.com"],
    animation: { scale: 0.8 },
  },
  {
    id: 2,
    title: "Live Chat",
    icon: MessageSquare,
    lines: ["Available Mon-Fri", "9:00 AM - 5:00 PM EST"],
    animation: { y: 30 },
  },
];

export default function Page() {
  return (
    <div className=" min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Get In Touch
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have questions? We&apos;d love to hear from you.
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row justify-between items-start mx-auto px-4 py-16 max-w-6xl gap-8">
        <div className="w-full lg:w-1/2">
          <div className="grid grid-cols-1 gap-8 max-w-md w-full">
            {cards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, ...card.animation }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.3 }}
                  whileInView={{ y: -8, scale: 1.02 }}
                  className="border-none rounded-xl bg-muted/10 shadow-xl backdrop-blur-md"
                >
                  <div className="p-6">
                    <div className="bg-linear-to-r from-blue-600 to-purple-600 p-3 rounded-lg w-fit">
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    <h3 className="text-xl font-semibold mb-2">{card.title}</h3>

                    {card.lines.map((line, i) => (
                      <p key={i} className="text-gray-600">
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="border-none shadow-lg bg-linear-to-r from-blue-600 to-purple-600 rounded-xl"
            >
              <div className="p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Quick Response</h3>
                <p className="text-white/90">
                  We typically respond within 24 hours during business days
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full lg:w-1/2"
        >
          <div className="border-none rounded-2xl shadow-2xl bg-white/70 backdrop-blur-sm">
            <div className="px-8 py-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Send us a Message
              </h2>

              <ContactForm />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
