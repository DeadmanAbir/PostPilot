"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Filter,
  ImageIcon,
  FileText,
  RefreshCw,
  PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

// Define the Post type
interface Post {
  id: string;
  date: string;
  time: string;
  content: string;
  contentType: "image" | "text";
  user: {
    name: string;
    avatar: string;
  };
  platform: string;
}

// Mock data for posts
const mockPosts: Post[] = [
  {
    id: "1",
    date: "4/6/2025",
    time: "10:45 AM",
    content: "okkr",
    contentType: "image",
    user: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    platform: "LinkedIn",
  },
  {
    id: "2",
    date: "4/5/2025",
    time: "1:15 PM",
    content: "89|89|89 7iopuj67mu:u:m.m.poyikm yumliymijopty mnrt,l; rj67",
    contentType: "text",
    user: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    platform: "Twitter",
  },
  {
    id: "3",
    date: "4/3/2025",
    time: "8:03 PM",
    content: "hiiiiii",
    contentType: "text",
    user: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    platform: "LinkedIn",
  },
  {
    id: "4",
    date: "4/2/2025",
    time: "3:30 PM",
    content:
      "Just published a new article on AI trends in 2025. Check it out and let me know your thoughts!",
    contentType: "text",
    user: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    platform: "LinkedIn",
  },
  {
    id: "5",
    date: "4/1/2025",
    time: "11:20 AM",
    content:
      "Excited to announce our new product launch next week! Stay tuned for more details.",
    contentType: "image",
    user: {
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    platform: "Facebook",
  },
  {
    id: "6",
    date: "3/30/2025",
    time: "2:45 PM",
    content:
      "Great team meeting today. Looking forward to implementing our new strategy!",
    contentType: "text",
    user: {
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    platform: "LinkedIn",
  },
];

export function PostsPage() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("newest");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [timeFilter, setTimeFilter] = useState<string>("all");

  // Filter and sort posts
  const filteredPosts = mockPosts
    .filter(
      (post) => platformFilter === "all" || post.platform === platformFilter
    )
    .sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`).getTime();
      const dateB = new Date(`${b.date} ${b.time}`).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="container mx-auto py-8 space-y-8 bg-slate-50/50 min-h-screen">
      {/* Create New Post Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-lg">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-white">
            Ready to share your next great idea?
          </h2>
          <p className="text-blue-100">
            Create and schedule your LinkedIn posts to engage with your network
            and grow your professional brand.
          </p>
        </div>
        <Button
          asChild
          className="bg-white text-blue-600 hover:bg-blue-50 shadow-md transition-all duration-200 px-6 py-6 h-auto font-medium text-base"
        >
          <Link to="/dashboard">
            <PlusCircle className="mr-2 h-5 w-5" />
            Create New Post
          </Link>
        </Button>
      </div>

      {/* Header with filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          Successfully Posted
          <span className="text-blue-500 hover:text-blue-600 cursor-pointer transition-colors">
            <RefreshCw className="h-4 w-4" />
          </span>
        </h1>

        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <div className="flex items-center bg-slate-50 rounded-lg px-3 py-2 border border-slate-100 shadow-sm">
            <Filter className="h-4 w-4 text-blue-500 mr-2" />
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="border-0 bg-transparent shadow-none h-8 w-[130px] focus:ring-0 text-slate-700 font-medium">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center bg-slate-50 rounded-lg px-3 py-2 border border-slate-100 shadow-sm">
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="border-0 bg-transparent shadow-none h-8 w-[130px] focus:ring-0 text-slate-700 font-medium">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                <SelectItem value="Twitter">Twitter</SelectItem>
                <SelectItem value="Facebook">Facebook</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center bg-slate-50 rounded-lg px-3 py-2 border border-slate-100 shadow-sm">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="border-0 bg-transparent shadow-none h-8 w-[130px] focus:ring-0 text-slate-700 font-medium">
                <SelectValue placeholder="Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Card
            key={post.id}
            className="overflow-hidden hover:shadow-lg transition-all duration-300 border border-slate-100 rounded-xl bg-white"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="text-sm font-medium text-slate-600">
                  {post.date} <span className="text-slate-300 mx-1">•</span>{" "}
                  {post.time}
                </div>
                <div className="flex items-center">
                  {post.contentType === "image" ? (
                    <div className="flex items-center text-blue-600 text-xs font-semibold bg-blue-50 px-2 py-1 rounded-full">
                      <ImageIcon className="h-3 w-3 mr-1" />
                      <span>image</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-blue-600 text-xs font-semibold bg-blue-50 px-2 py-1 rounded-full">
                      <FileText className="h-3 w-3 mr-1" />
                      <span>text</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="min-h-[80px] mb-4">
                <p
                  className={cn(
                    "text-slate-800 line-clamp-3 leading-relaxed",
                    post.contentType === "image"
                      ? "text-lg font-medium"
                      : "text-base"
                  )}
                >
                  {post.content}
                </p>
              </div>
            </CardContent>

            <CardFooter className="p-6 pt-0 flex justify-between items-center border-t border-slate-100">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                  <AvatarImage src={post.user.avatar} alt={post.user.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                    {post.user.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <Badge className="bg-emerald-500 hover:bg-emerald-600 shadow-sm px-3 py-1 font-medium">
                  posted
                </Badge>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 font-medium px-4 shadow-sm transition-all duration-200"
                    onClick={() => setSelectedPost(post)}
                  >
                    View Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden rounded-xl">
                  <DialogHeader className="p-6 bg-gradient-to-r from-blue-600 to-blue-500">
                    <DialogTitle className="text-white text-xl">
                      Post Details
                    </DialogTitle>
                  </DialogHeader>
                  {selectedPost && (
                    <div className="p-6 space-y-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                          <AvatarImage
                            src={selectedPost.user.avatar}
                            alt={selectedPost.user.name}
                          />
                          <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                            {selectedPost.user.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-slate-800 text-lg">
                            {selectedPost.user.name}
                          </div>
                          <div className="text-sm text-slate-500 flex items-center gap-1">
                            {selectedPost.date} at {selectedPost.time}{" "}
                            <span className="text-slate-300 mx-1">•</span>{" "}
                            {selectedPost.platform}
                          </div>
                        </div>
                      </div>

                      <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2 mb-3 text-sm text-blue-600 font-medium">
                          {selectedPost.contentType === "image" ? (
                            <>
                              <ImageIcon className="h-4 w-4" />
                              <span>Image Post</span>
                            </>
                          ) : (
                            <>
                              <FileText className="h-4 w-4" />
                              <span>Text Post</span>
                            </>
                          )}
                        </div>

                        <p className="text-slate-800 whitespace-pre-line text-base leading-relaxed">
                          {selectedPost.content}
                        </p>

                        {selectedPost.contentType === "image" && (
                          <div className="mt-5">
                            <img
                              src="/placeholder.svg?height=200&width=400"
                              alt="Post image"
                              className="w-full h-auto rounded-lg shadow-sm"
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <Badge className="bg-emerald-500 shadow-sm px-3 py-1 font-medium">
                          posted
                        </Badge>
                        <span className="text-sm text-slate-600">
                          Successfully posted to {selectedPost.platform}
                        </span>
                      </div>
                    </div>
                  )}
                  <DialogFooter className="p-6 pt-0">
                    <DialogClose asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700 shadow-md transition-all duration-200 px-6">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="text-blue-500 mb-6 bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
            <RefreshCw className="h-10 w-10" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            No posts found
          </h3>
          <p className="text-slate-500 max-w-md mx-auto">
            Try adjusting your filters or create a new post to share with your
            network.
          </p>
          <Button
            asChild
            className="mt-6 bg-blue-600 hover:bg-blue-700 shadow-md transition-all duration-200 px-6 py-6 h-auto font-medium text-base"
          >
            <Link to="/dashboard">Create New Post</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
