import {
  FileText,
  FolderOpen,
  CheckCircle,
  Clock,
} from "lucide-react";

export const stats = [
  {
    title: "Total Published Blogs",
    value: "847",
    change: "+12%",
    icon: FileText,
    color: "from-blue-600 to-blue-400",
    description: "All published posts",
  },
  {
    title: "Pending Guest Posts",
    value: "23",
    change: "+5",
    icon: Clock,
    color: "from-orange-600 to-orange-400",
    description: "Awaiting review",
  },
  {
    title: "Published Guest Posts",
    value: "156",
    change: "+8%",
    icon: CheckCircle,
    color: "from-green-600 to-green-400",
    description: "Approved & live",
  },
  {
    title: "Total Categories",
    value: "32",
    change: "+3",
    icon: FolderOpen,
    color: "from-purple-600 to-purple-400",
    description: "Active categories",
  },
];

export const recentActivity = [
  {
    action: "New guest post submitted",
    author: "John Doe",
    time: "2 hours ago",
    type: "pending",
    category: "Technology",
  },
  {
    action: "Blog post published",
    author: "Jane Smith",
    time: "3 hours ago",
    type: "success",
    category: "Design",
  },
  {
    action: "Guest post approved",
    author: "Mike Johnson",
    time: "5 hours ago",
    type: "success",
    category: "Business",
  },
  {
    action: "New category created",
    author: "Admin",
    time: "6 hours ago",
    type: "info",
    category: "Marketing",
  },
  {
    action: "Guest post rejected",
    author: "Sarah Wilson",
    time: "1 day ago",
    type: "warning",
    category: "Lifestyle",
  },
];

export const quickStats = [
  { label: "Draft Posts", value: 45, total: 100, color: "bg-blue-500" },
  { label: "Scheduled", value: 12, total: 20, color: "bg-purple-500" },
  { label: "Authors", value: 28, total: 50, color: "bg-green-500" },
];

export const topCategories = [
  { name: "Technology", posts: 234, color: "bg-blue-500" },
  { name: "Design", posts: 189, color: "bg-purple-500" },
  { name: "Business", posts: 145, color: "bg-green-500" },
  { name: "Marketing", posts: 98, color: "bg-orange-500" },
  { name: "Lifestyle", posts: 76, color: "bg-pink-500" },
];
