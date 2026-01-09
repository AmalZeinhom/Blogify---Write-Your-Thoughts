"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Send,
  User,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useAuth } from "@/app/context/AuthContext";
import { mockBlogs } from "@/app/constants/mockBlogs";

export default function Posts() {
  const { role, email } = useAuth(); 
  const [guestPosts, setGuestPosts] = useState(mockBlogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewNote, setReviewNote] = useState("");
  const [assignedAuthor, setAssignedAuthor] = useState("");

  const authors = ["Jane Smith", "John Doe", "Sarah Wilson", "Mike Johnson"];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "approved":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "published":
        return "bg-green-100 text-green-700 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return Clock;
      case "approved":
        return CheckCircle;
      case "published":
        return Send;
      case "rejected":
        return XCircle;
      default:
        return Clock;
    }
  };

  const handleReview = (post) => {
    setSelectedPost(post);
    setReviewNote(post.reviewNote || "");
    setAssignedAuthor(post.assignedAuthor || "");
    setIsReviewDialogOpen(true);
  };

  const handleUpdateStatus = (newStatus) => {
    if (!selectedPost) return;

    setGuestPosts((posts) =>
      posts.map((post) =>
        post.id === selectedPost.id
          ? {
              ...post,
              postStatus: newStatus,
              reviewedBy: email,
              reviewNote: newStatus === "rejected" ? reviewNote : undefined,
              assignedAuthor:
                newStatus === "published" ? assignedAuthor : undefined,
            }
          : post,
      ),
    );
    setIsReviewDialogOpen(false);
  };

  const filteredPosts = guestPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || post.postStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      label: "Pending",
      count: guestPosts.filter((p) => p.postStatus === "pending").length,
      color: "from-yellow-600 to-yellow-400",
    },
    {
      label: "Approved",
      count: guestPosts.filter((p) => p.postStatus === "approved").length,
      color: "from-blue-600 to-blue-400",
    },
    {
      label: "Published",
      count: guestPosts.filter((p) => p.postStatus === "published").length,
      color: "from-green-600 to-green-400",
    },
    {
      label: "Rejected",
      count: guestPosts.filter((p) => p.postStatus === "rejected").length,
      color: "from-red-600 to-red-400",
    },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Guest Post Management
            </h1>
            <p className="text-gray-600">
              Review and manage submitted guest posts
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div
                  className={`h-2 w-full rounded-full mb-3 bg-linear-to-r ${stat.color}`}
                />
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.count}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search guest posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Tabs
                value={statusFilter}
                onValueChange={(v) => setStatusFilter(v)}
                className="w-full md:w-auto"
              >
                <TabsList className="grid grid-cols-5 w-full md:w-auto">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                  <TabsTrigger value="published">Published</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post, index) => {
            const StatusIcon = getStatusIcon(post.postStatus);
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <Card className="border-none shadow-lg hover:shadow-2xl transition-all bg-white/80 backdrop-blur-sm group">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex lg:flex-col items-center lg:items-start gap-3">
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className={`p-3 rounded-xl ${getStatusColor(
                            post.postStatus,
                          )} border`}
                        >
                          <StatusIcon className="h-6 w-6" />
                        </motion.div>
                        <Badge
                          className={`${getStatusColor(
                            post.postStatus,
                          )} border`}
                        >
                          {post.postStatus}
                        </Badge>
                      </div>

                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 line-clamp-2">
                            {post.content}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {post.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {post.date}
                          </span>
                          <Badge variant="outline">{post.category}</Badge>
                        </div>

                        {post.reviewedBy && (
                          <div className="text-sm text-gray-600 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Reviewed by {post.reviewedBy}</span>
                          </div>
                        )}

                        {post.assignedAuthor && (
                          <div className="text-sm text-gray-600 flex items-center gap-2">
                            <User className="h-4 w-4 text-blue-600" />
                            <span>Published as {post.assignedAuthor}</span>
                          </div>
                        )}

                        {post.reviewNote && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 flex items-start gap-2">
                            <MessageSquare className="h-4 w-4 mt-0.5" />
                            <span>{post.reviewNote}</span>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 pt-2">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReview(post)}
                              className="hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Review
                            </Button>
                          </motion.div>

                          {post.postStatus === "pending" && (
                            <>
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedPost(post);
                                    handleUpdateStatus("approved");
                                  }}
                                  className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Approve
                                </Button>
                              </motion.div>
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleReview(post)}
                                  className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                                >
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Reject
                                </Button>
                              </motion.div>
                            </>
                          )}

                          {post.postStatus === "approved" &&
                            role === "Admin" && (
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button
                                  size="sm"
                                  onClick={() => handleReview(post)}
                                  className="bg-linear-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white"
                                >
                                  <Send className="h-4 w-4 mr-2" />
                                  Publish to Blog
                                </Button>
                              </motion.div>
                            )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Mail className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No guest posts found</p>
          </motion.div>
        )}
      </div>

      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Review Guest Post
            </DialogTitle>
            <DialogDescription>
              Review the content and decide the action
            </DialogDescription>
          </DialogHeader>

          {selectedPost && (
            <div className="space-y-6 py-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-600">Title</Label>
                  <p className="text-lg font-semibold mt-1">
                    {selectedPost.title}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600">Author</Label>
                    <p className="font-medium mt-1">{selectedPost.author}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Email</Label>
                    <p className="font-medium mt-1">{selectedPost.email}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-600">Category</Label>
                  <Badge className="mt-1">{selectedPost.category}</Badge>
                </div>

                <div>
                  <Label className="text-gray-600">Content</Label>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {selectedPost.content}
                    </p>
                  </div>
                </div>
              </div>

              {selectedPost.postStatus === "approved" && (
                <div>
                  <Label htmlFor="assignAuthor">
                    Assign Author for Publication
                  </Label>
                  <Select
                    value={assignedAuthor}
                    onValueChange={setAssignedAuthor}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select author" />
                    </SelectTrigger>
                    <SelectContent>
                      {authors.map((author) => (
                        <SelectItem key={author} value={author}>
                          {author}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {(selectedPost.postStatus === "pending" ||
                selectedPost.postStatus === "approved") && (
                <div>
                  <Label htmlFor="reviewNote">
                    Review Note (Optional for rejection)
                  </Label>
                  <Textarea
                    id="reviewNote"
                    value={reviewNote}
                    onChange={(e) => setReviewNote(e.target.value)}
                    placeholder="Add feedback or reason for rejection..."
                    rows={4}
                    className="mt-2"
                  />
                </div>
              )}

              <div className="flex gap-3 justify-end border-t pt-6">
                {selectedPost.postStatus === "pending" && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => handleUpdateStatus("rejected")}
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      onClick={() => handleUpdateStatus("approved")}
                      className="bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  </>
                )}

                {selectedPost.postStatus === "approved" && role === "Admin" && (
                  <Button
                    onClick={() => handleUpdateStatus("published")}
                    disabled={!assignedAuthor}
                    className="bg-linear-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Publish
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

