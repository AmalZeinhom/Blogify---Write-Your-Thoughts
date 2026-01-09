  "use client";

  import React, { useState } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import {
    Calendar,
    Edit,
    Eye,
    FileText,
    Globe,
    ImageIcon,
    Plus,
    Save,
    Search,
    Tag,
    Trash2,
    X,
  } from "lucide-react";
  import { Card, CardContent } from "../ui/card";
  import { Button } from "../ui/button";
  import { Input } from "../ui/input";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../ui/select";
  import { Badge } from "../ui/badge";
  import { useAuth } from "@/app/context/AuthContext";
  import { mockBlogs } from "@/app/constants/mockBlogs";
  import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
  import { Label } from "../ui/label";
  import { Switch } from "../ui/switch";
  import { Textarea } from "../ui/textarea";
  import Image from "next/image";

  export default function Management() {
    const { role, email } = useAuth();
    const [blogs, setBlogs] = useState(mockBlogs);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);

    const [formData, setFormData] = useState({
      title: "",
      slug: "",
      content: "",
      metaTitle: "",
      metaDescription: "",
      category: "",
      status: "draft",
      featuredImage: "",
    });

    const categories = [
      "Technology",
      "Design",
      "Business",
      "Marketing",
      "Lifestyle",
    ];

    const handleCreateBlog = () => {
      setFormData({
        title: "",
        slug: "",
        content: "",
        metaTitle: "",
        metaDescription: "",
        category: "",
        status: "draft",
        featuredImage: "",
      });
      setEditingBlog(null);
      setIsCreateDialogOpen(true);
    };

    const handleEditBlog = (blog) => {
      setFormData(blog);
      setEditingBlog(blog);
      setIsCreateDialogOpen(blog);
    };

    const handleDeleteBlog = (id) => {
      setBlogs(blogs.filter((b) => b.id !== id));
    };

    const filteredBlogs = blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || blog.status === filterStatus;
      return matchesSearch && matchesStatus;
    });

    const handleSaveBlog = () => {
      if (editingBlog) {
        setBlogs(
          blogs.map((b) =>
            b.id === editingBlog.id ? { ...editingBlog, ...formData } : b,
          ),
        );
      } else {
        const newBlog = {
          id: Date.now().toString(),
          ...formData,
          author: email || "Unknown",
          createdAt: new Date().toISOString().split("T")[0],
          views: 0,
        };
        setBlogs([newBlog, ...blogs]);
      }
      setIsCreateDialogOpen(false);
    };

    const generateSlug = (title) => {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    };

    const handleTitleChange = (title) => {
      setFormData({
        ...formData,
        title,
        slug: generateSlug(title),
        metaTitle: title,
      });
    };


    return (
      <section className="min-h-screen p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Blog Management
              </h1>
              <p className="text-gray-600">
                Create, edit, and manage your blog posts
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleCreateBlog}
                className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create New Blog
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search blogs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select
                  value={filterStatus}
                  onValueChange={(value) => setFilterStatus(value)}
                >
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
        >
          {[
            {
              label: "Total Blogs",
              value: blogs.length,
              color: "from-blue-600 to-blue-400",
            },
            {
              label: "Published",
              value: blogs.filter((b) => b.status === "published").length,
              color: "from-green-600 to-green-400",
            },
            {
              label: "Drafts",
              value: blogs.filter((b) => b.status === "draft").length,
              color: "from-orange-600 to-orange-400",
            },
            {
              label: "Total Views",
              value: blogs.reduce((sum, b) => sum + b.views, 0),
              color: "from-purple-600 to-purple-400",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div
                    className={`h-2 w-full bg-linear-to-r ${stat.color} rounded-full mb-3`}
                  />
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <Card className="border-none shadow-lg hover:shadow-2xl transition-all bg-white/80 backdrop-blur-sm overflow-hidden group">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <motion.div
                        className="relative w-full md:w-48 h-32 bg-linear-to-br from-purple-200 to-blue-200 rounded-lg flex items-center justify-center overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Image
                          src={blog.featuredImage}
                          alt={blog.title}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </motion.div>

                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                {blog.title}
                              </h3>
                              <Badge
                                variant={
                                  blog.status === "published"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {blog.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              /{blog.slug}
                            </p>
                            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Tag className="h-4 w-4" />
                                {blog.category}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {blog.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {blog.views} views
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditBlog(blog)}
                              className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover:bg-green-50 hover:text-green-600 hover:border-green-300"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Preview
                            </Button>
                          </motion.div>
                          {role === "Admin" && (
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteBlog(blog.id)}
                                className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </Button>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredBlogs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No blogs found</p>
            </motion.div>
          )}
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {editingBlog ? "Edit Blog" : "Create New Blog"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div>
                <Label htmlFor="title">Blog Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter blog title..."
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="slug">URL Slug *</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    placeholder="url-slug"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <Label htmlFor="status">Publish Immediately</Label>
                  <Switch
                    id="status"
                    checked={formData.status === "published"}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        status: checked ? "published" : "draft",
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="Write your blog content..."
                  rows={8}
                  className="mt-2"
                />
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-purple-600" />
                  SEO Settings
                </h3>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <Input
                      id="metaTitle"
                      value={formData.metaTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, metaTitle: e.target.value })
                      }
                      placeholder="SEO optimized title..."
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.metaTitle?.length || 0}/60 characters
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea
                      id="metaDescription"
                      value={formData.metaDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          metaDescription: e.target.value,
                        })
                      }
                      placeholder="Brief description for search engines..."
                      rows={3}
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.metaDescription?.length || 0}/160 characters
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <Label>Featured Image</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>

              <div className="flex gap-3 justify-end border-t pt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveBlog}
                  className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingBlog ? "Update Blog" : "Create Blog"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </section>
    );
  }
