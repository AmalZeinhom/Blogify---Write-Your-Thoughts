"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.subject.trim() &&
    formData.message.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error("Please fill in all fields before submitting!");
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Contact form submitted:", formData);

    toast.success("Message sent successfully!", {
      description: "We'll get back to you as soon as possible.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="text-gray-600 font-semibold">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-white w-full block mt-3 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-gray-600 font-semibold">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-white w-full block mt-3 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-gray-600 font-semibold">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            placeholder="How can we help you?"
            value={formData.subject}
            onChange={handleChange}
            required
            className="bg-white w-full block mt-3 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-gray-600 font-semibold">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell us more about your inquiry..."
            rows={6}
            value={formData.message}
            onChange={handleChange}
            required
            className="bg-white w-full block mt-3 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className={`w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg rounded-xl ${
              !isFormValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              "Sending..."
            ) : (
              <span className="flex items-center justify-center space-x-2">
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </span>
            )}
          </button>
        </motion.div>
      </form>
    </div>
  );
}
