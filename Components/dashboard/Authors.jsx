"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Search,
  Save,
  X,
  Mail,
  FileText,
  Award,
} from "lucide-react";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {  authorsData } from "@/app/constants/authorsData";

export default function Authors() {
  const [authors, setAuthors] = useState(authorsData);

  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    specialty: "",
    status: "active",
    social: {},
  });

  const specialties = [
    "Technology",
    "Design",
    "Business",
    "Marketing",
    "Lifestyle",
  ];

  const handleCreateAuthor = () => {
    setFormData({
      name: "",
      email: "",
      bio: "",
      specialty: "",
      status: "active",
      social: {},
    });
    setEditingAuthor(null);
    setIsDialogOpen(true);
  };

  const handleEditAuthor = (author) => {
    setFormData(author);
    setEditingAuthor(author);
    setIsDialogOpen(true);
  };

  const handleSaveAuthor = () => {
    if (editingAuthor) {
      setAuthors(
        authors.map((a) =>
          a.id === editingAuthor.id ? { ...editingAuthor, ...formData } : a,
        ),
      );
    } else {
      const newAuthor = {
        id: Date.now().toString(),
        ...formData,
        avatar: "",
        postCount: 0,
        joinedDate: new Date().toISOString().split("T")[0],
      };
      setAuthors([newAuthor, ...authors]);
    }
    setIsDialogOpen(false);
  };

  const handleDeleteAuthor = (id) => {
    setAuthors(authors.filter((a) => a.id !== id));
  };

  const filteredAuthors = authors.filter(
    (author) =>
      author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author.specialty.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPosts = authors.reduce((sum, author) => sum + author.postCount, 0);
  const activeAuthors = authors.filter((a) => a.status === "active").length;

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getAvatarColor = (index) => {
    const colors = [
      "from-blue-600 to-blue-400",
      "from-purple-600 to-purple-400",
      "from-green-600 to-green-400",
      "from-orange-600 to-orange-400",
      "from-pink-600 to-pink-400",
      "from-red-600 to-red-400",
    ];
    return colors[index % colors.length];
  };

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
              Author Management
            </h1>
            <p className="text-gray-600">
              Manage blog authors and contributors
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleCreateAuthor}
              className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Author
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
            label: "Total Authors",
            value: authors.length,
            icon: Users,
            color: "from-purple-600 to-purple-400",
          },
          {
            label: "Active Authors",
            value: activeAuthors,
            icon: Award,
            color: "from-green-600 to-green-400",
          },
          {
            label: "Total Posts",
            value: totalPosts,
            icon: FileText,
            color: "from-blue-600 to-blue-400",
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
                placeholder="Search authors..."
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
          {filteredAuthors.map((author, index) => (
            <motion.div
              key={author.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.05 }}
              layout
            >
              <Card className="border-none shadow-lg hover:shadow-2xl transition-all bg-white/80 backdrop-blur-sm overflow-hidden group h-140">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex flex-col items-center text-center mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div
                        className={`w-24 h-24 rounded-full bg-linear-to-br ${getAvatarColor(
                          index,
                        )} flex items-center justify-center text-white text-2xl font-bold mb-3 shadow-lg`}
                      >
                        {getInitials(author.name)}
                      </div>
                    </motion.div>

                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                      {author.name}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1 mb-2">
                      <Mail className="h-3 w-3" />
                      {author.email}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{author.specialty}</Badge>
                      <Badge
                        variant={
                          author.status === "active" ? "default" : "secondary"
                        }
                      >
                        {author.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3 text-center h-18">
                    {author.bio}
                  </p>
                  <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">
                        {author.postCount}
                      </p>
                      <p className="text-xs text-gray-600">Posts</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Joined</p>
                      <p className="text-xs text-gray-500">
                        {author.joinedDate}
                      </p>
                    </div>
                  </div>
                  {Object.keys(author.social).length > 0 && (
                    <div className="flex justify-center gap-2 mb-4">
                      {author.social.twitter && (
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <div className="p-2 bg-blue-100 rounded-lg text-blue-600 hover:bg-blue-200 transition-colors">
                            <FaTwitter className="h-4 w-4" />
                          </div>
                        </motion.div>
                      )}
                      {author.social.linkedin && (
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <div className="p-2 bg-blue-100 rounded-lg text-blue-600 hover:bg-blue-200 transition-colors">
                            <FaLinkedinIn className="h-4 w-4" />
                          </div>
                        </motion.div>
                      )}
                      {author.social.github && (
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <div className="p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors">
                            <FaGithub className="h-4 w-4" />
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}
                  <div className="mt-auto flex gap-2">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1"
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditAuthor(author)}
                        className="w-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteAuthor(author.id)}
                        className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredAuthors.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No authors found</p>
        </motion.div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {editingAuthor ? "Edit Author" : "Add New Author"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="John Doe"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="john@example.com"
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Specialty</Label>
                <select
                  value={formData.specialty}
                  onChange={(e) =>
                    setFormData({ ...formData, specialty: e.target.value })
                  }
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select specialty</option>
                  {specialties.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Status</Label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Biography</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Tell us about this author..."
                rows={4}
                className="mt-2"
              />
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-lg mb-4">Social Media</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FaTwitter className="h-5 w-5 text-blue-500" />
                  <Input
                    placeholder="@username"
                    value={formData.social?.twitter || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        social: { ...formData.social, twitter: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="flex items-center gap-3">
                  <FaLinkedinIn className="h-5 w-5 text-blue-600" />
                  <Input
                    placeholder="username"
                    value={formData.social?.linkedin || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        social: {
                          ...formData.social,
                          linkedin: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex items-center gap-3">
                  <FaGithub className="h-5 w-5 text-gray-700" />
                  <Input
                    placeholder="username"
                    value={formData.social?.github || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        social: { ...formData.social, github: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end border-t pt-6">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSaveAuthor}
                className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                {editingAuthor ? "Update Author" : "Add Author"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
