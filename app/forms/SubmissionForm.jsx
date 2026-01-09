"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Globe,
  Link2Icon,
  ImageIcon,
  FileText,
  TagIcon,
} from "lucide-react";

import { categories } from "@/app/constants/mockBlogs.jsx"
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";

import toast from "react-hot-toast";

export default function SubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    websiteUrl: "",
    articleTitle: "",
    articleContent: "",
    category: "",
    backlinkUrl: "",
    anchorText: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleContentChange = (html) => {
    setFormData((prev) => ({ ...prev, articleContent: html }));
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
      TextStyle,
      FontFamily,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "<p></p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl p-4 border rounded focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => handleContentChange(editor.getHTML()),
    immediatelyRender: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.articleTitle ||
      !formData.articleContent
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Submitted Data:", formData);

      toast.success(
        "Guest post submitted successfully! We will review it and get back to you soon.",
      );

      setFormData({
        name: "",
        email: "",
        websiteUrl: "",
        articleTitle: "",
        articleContent: "",
        category: ["Technology", "Lifestyle", "Business", "Design", "Writing"],
        backlinkUrl: "",
        anchorText: "",
      });

      editor?.commands.clearContent();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-muted/10 rounded-xl shadow-lg p-8">
      <h2 className="text-2xl mb-6 text-gray-900">Submit Your Guest Post</h2>

      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <Input
          label="Name *"
          icon={<User className="w-4 h-4" />}
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Your full name"
        />

        <Input
          label="Email *"
          icon={<Mail className="w-4 h-4" />}
          id="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="your.email@example.com"
        />

        <Input
          label="Website URL *"
          icon={<Globe className="w-4 h-4" />}
          id="websiteUrl"
          value={formData.websiteUrl}
          onChange={handleInputChange}
          placeholder="https://yourwebsite.com"
        />

        <Input
          label="Article Title *"
          icon={<FileText className="w-4 h-4" />}
          id="articleTitle"
          value={formData.articleTitle}
          onChange={handleInputChange}
          placeholder="Your compelling article title"
        />

        <div>
          <label className="flex items-center gap-2 mb-2 text-gray-700">
            <TagIcon className="w-4 h-4" />
            Category *
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg"
          >
            <option value="">Select a category</option>
            {categories.map((cat, item) => (
              <option key={item}>{cat.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 mb-2 text-gray-700">
            <FileText className="w-4 h-4" />
            Article Content *
          </label>

          <div className="border rounded-lg p-4">
            <div className="flex flex-wrap gap-3 mb-3 border-b pb-2">
              <EditorButton
                onClick={() => editor?.chain().focus().toggleBold().run()}
              >
                B
              </EditorButton>

              <EditorButton
                onClick={() => editor?.chain().focus().toggleItalic().run()}
              >
                I
              </EditorButton>

              <EditorButton
                onClick={() => {
                  if (!linkUrl) return;
                  editor?.chain().focus().setLink({ href: linkUrl }).run();
                  setLinkUrl("");
                }}
              >
                <Link2Icon className="w-4 h-4" />
              </EditorButton>

              <EditorButton
                onClick={() => {
                  if (!imageUrl) return;
                  editor?.chain().focus().setImage({ src: imageUrl }).run();
                  setImageUrl("");
                }}
              >
                <ImageIcon className="w-4 h-4" />
              </EditorButton>
            </div>

            <EditorContent editor={editor} className="min-h-50" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isSubmitting ? "Submitting..." : "Submit Guest Post"}
        </button>
      </form>
    </div>
  );
}

function Input({ label, icon, ...props }) {
  return (
    <div>
      <label className="flex items-center gap-2 mb-2 text-gray-700">
        {icon}
        {label}
      </label>
      <input
        {...props}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function EditorButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-2 py-1 border rounded"
    >
      {children}
    </button>
  );
}
