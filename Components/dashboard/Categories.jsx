  "use client";

  import { useState } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import {
    FolderOpen,
    Plus,
    Edit,
    Trash2,
    Search,
    Save,
    X,
    TrendingUp,
    Hash,
  } from "lucide-react";
  import { useAuth } from "@/app/context/AuthContext";
  import { Button } from "../ui/button";
  import { Card, CardContent } from "../ui/card";
  import { Input } from "../ui/input";
  import { Badge } from "../ui/badge";
  import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
  import { Label } from "../ui/label";
  import { Textarea } from "../ui/textarea";
  import { categories as Category } from "@/app/constants/mockBlogs";

  export default function Categories() {
    const { role } = useAuth();
    const [categories, setCategories] = useState(Category);

    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({
      name: "",
      slug: "",
      description: "",
      color: "bg-blue-500",
    });

    const colorOptions = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-green-500",
      "bg-orange-500",
      "bg-pink-500",
      "bg-red-500",
      "bg-yellow-500",
      "bg-indigo-500",
      "bg-teal-500",
      "bg-cyan-500",
    ];

    const generateSlug = (name) => {
      return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    };

    const handleCreateCategory = () => {
      setFormData({
        name: "",
        slug: "",
        description: "",
        color: "bg-blue-500",
      });
      setEditingCategory(null);
      setIsDialogOpen(true);
    };

    const handleEditCategory = (category) => {
      setFormData(category);
      setEditingCategory(category);
      setIsDialogOpen(true);
    };

    const handleSaveCategory = () => {
      if (editingCategory) {
        setCategories(
          categories.map((c) =>
            c.id === editingCategory.id ? { ...editingCategory, ...formData } : c,
          ),
        );
      } else {
        const newCategory = {
          id: Date.now().toString(),
          ...formData,
          postCount: 0,
          createdAt: new Date().toISOString().split("T")[0],
        };
        setCategories([newCategory, ...categories]);
      }
      setIsDialogOpen(false);
    };

    const handleDeleteCategory = (id) => {
      setCategories(categories.filter((c) => c.id !== id));
    };

    const handleNameChange = (name) => {
      setFormData({
        ...formData,
        name,
        slug: generateSlug(name),
      });
    };

    const filteredCategories = categories.filter(
      (category) =>
        category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.slug.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const totalPosts = categories.reduce((sum, cat) => sum + cat.postCount, 0);

    return (
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Category Management
              </h1>
              <p className="text-gray-600">
                Organize your blog content with categories
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleCreateCategory}
                className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Category
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
        >
          {[
            {
              label: "Total Categories",
              value: categories.length,
              icon: FolderOpen,
              color: "from-purple-600 to-purple-400",
            },
            {
              label: "Total Posts",
              value: totalPosts,
              icon: TrendingUp,
              color: "from-blue-600 to-blue-400",
            },
            {
              label: "Avg Posts/Category",
              value: Math.round(totalPosts / categories.length) || 0,
              icon: Hash,
              color: "from-green-600 to-green-400",
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-3 rounded-xl bg-linear-to-r ${stat.color}`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <Card className="border-none shadow-lg hover:shadow-2xl transition-all bg-white/80 backdrop-blur-sm overflow-hidden group">
                  <CardContent className="p-6">
                    <div
                      className={`h-2 w-full ${category.color} rounded-t-lg mb-4`}
                    />

                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                      className={`${category.color} p-4 rounded-xl inline-block mb-4`}
                    >
                      <FolderOpen className="h-8 w-8 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">/{category.slug}</p>
                    <p className="text-gray-700 mb-4 line-clamp-2">
                      {category.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="text-sm">
                        {category.postCount} posts
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {category.createdAt}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1"
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditCategory(category)}
                          className="w-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </motion.div>
                      {role === "Admin" && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteCategory(category.id)}
                            className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FolderOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No categories found</p>
          </motion.div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {editingCategory ? "Edit Category" : "Add New Category"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div>
                <Label htmlFor="name">Category Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Enter category name..."
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="slug">URL Slug *</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Hash className="h-5 w-5 text-gray-400" />
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    placeholder="url-slug"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Auto-generated from name (editable)
                </p>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Brief description of this category..."
                  rows={3}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Category Color</Label>
                <div className="grid grid-cols-5 gap-3 mt-2">
                  {colorOptions.map((color) => (
                    <motion.button
                      key={color}
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setFormData({ ...formData, color })}
                      className={`${color} h-12 rounded-lg border-4 transition-all ${
                        formData.color === color
                          ? "border-gray-900 shadow-lg"
                          : "border-transparent"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3 justify-end border-t pt-6">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveCategory}
                  className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingCategory ? "Update Category" : "Create Category"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
