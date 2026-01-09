"use client";

import React from "react";
import { DollarSign, Link2, FileText, TagIcon } from "lucide-react";
import { guidlines } from "@/app/constants/guidlines.jsx";
import { categories } from "@/app/constants/mockBlogs.jsx";
import  SubmitionForm  from "@/app/forms/SubmissionForm.jsx"


export default function WriteForUs() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-semibold mb-4 text-brand-primary">
          Write for Blogify
        </h1>
        <p className="text-gray-600 mb-10 max-w-3xl text-2xl text-center">
          Share your knowledge and insights with our growing community.
          We&apos;re always looking for quality guests posts!
        </p>
      </div>

      <div className="bg-muted/10 shadow-md p-8 rounded-xl mb-10">
        <h2 className="text-2xl font-semibold  text-gray-900 flex items-center gap-2 mb-6">
          <FileText className="w-6 h-6 text-blue-600" />
          Guest Posting Guidelines
        </h2>

        <ul>
          {guidlines.map((rule) => (
            <li
              key={rule.id}
              className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="shrink-0">{rule.icon}</span>
              <span>
                <h3 className="text-lg font-semibold text-gray-900">
                  {rule.title}
                </h3>
                <p className="text-gray-600 mt-1">{rule.desc}</p>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-muted/10 rounded-xl shadow-sm p-8 m-8">
        <h2 className="text-2xl mb-6 font-semibold text-gray-900 flex items-center gap-2">
          <TagIcon className="w-6 h-6 text-blue-600" />
          Allowed Categories
        </h2>

        <div className="flex flex-wrap gap-3">
          {categories
            .filter((cat) => cat !== "All")
            .map((item) => (
              <div
                key={item.id}
                className="bg-blue-400/30 text-blue-900 px-4 py-2 rounded-full"
              >
                {item.title}
              </div>
            ))}
        </div>
        <p className="mt-4 text-gray-600">
          Choose a category that best fits your article topic.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
        <h2 className="text-2xl mb-6 text-gray-900 flex items-center gap-2">
          <Link2 className="w-6 h-6 text-blue-600" />
          Do-Follow / No-Follow Policy
        </h2>
        <div className="space-y-4 text-gray-700">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-green-800 mb-2">✓ Do-Follow Links</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• One do-follow link in the author bio</li>
              <li>• Contextual links to high-quality, relevant resources</li>
              <li>• Links that genuinely add value to readers</li>
            </ul>
          </div>
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="text-red-800 mb-2">✗ No-Follow Links</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• Commercial or affiliate links</li>
              <li>• Links to low-quality or irrelevant sites</li>
              <li>• Excessive internal links to your own website</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-linear-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 mb-12 text-white">
        <h2 className="text-2xl mb-6 flex items-center gap-2">
          <DollarSign className="w-6 h-6" />
          Pricing (Optional)
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl mb-2">Standard Guest Post</h3>
            <p className="text-3xl mb-2">FREE</p>
            <p className="text-blue-100">
              Submit quality content for free with one do-follow link
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl mb-2">Sponsored Content</h3>
            <p className="text-3xl mb-2">$99</p>
            <p className="text-blue-100">
              Guaranteed publication within 48 hours + social media promotion
            </p>
          </div>
        </div>
      </div>

      <SubmitionForm/>
    </section>
  );
}
