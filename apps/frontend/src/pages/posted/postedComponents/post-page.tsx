"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Filter, FileText, PlusCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/providers/supabaseAuthProvider";
import { getPostQuery } from "@/lib/tanstack-query/query";

export function PostsPage() {
  const { user } = useAuth();
  const [sortOrder, setSortOrder] = useState<string>("newest");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [timeFilter, setTimeFilter] = useState<string>("all");

  const { data, isPending } = getPostQuery(user?.accessToken!);

  const formatDate = (date: string) => {
    const dateObject: Date = new Date(date);

    const day = String(dateObject.getDate()).padStart(2, "0");
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const year = String(dateObject.getFullYear()).slice(-2);

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };
  return (
    <div className="container mx-auto py-8 px-8 space-y-8 min-h-screen dark:bg-gray-900">
      {/* Create New Post Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600 rounded-xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-lg">
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
          className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 shadow-md transition-all duration-200 px-6 py-6 h-auto font-medium text-base"
        >
          <Link to="/dashboard">
            <PlusCircle className="mr-2 h-5 w-5" />
            Create New Post
          </Link>
        </Button>
      </div>

      {/* Header with filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          Successfully Posted
        </h1>

        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <div className="flex items-center bg-slate-50 dark:bg-gray-700 rounded-lg px-3 py-2 border border-slate-100 dark:border-gray-600 shadow-sm">
            <Filter className="h-4 w-4 text-blue-500 dark:text-blue-400 mr-2" />
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="border-0 bg-transparent shadow-none h-8 w-[130px] focus:ring-0 text-slate-700 dark:text-gray-200 font-medium">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center bg-slate-50 dark:bg-gray-700 rounded-lg px-3 py-2 border border-slate-100 dark:border-gray-600 shadow-sm">
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="border-0 bg-transparent shadow-none h-8 w-[130px] focus:ring-0 text-slate-700 dark:text-gray-200 font-medium">
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

          <div className="flex items-center bg-slate-50 dark:bg-gray-700 rounded-lg px-3 py-2 border border-slate-100 dark:border-gray-600 shadow-sm">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="border-0 bg-transparent shadow-none h-8 w-[130px] focus:ring-0 text-slate-700 dark:text-gray-200 font-medium">
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
      {isPending ? (
        <h1 className="text-slate-800 dark:text-white">Loading...</h1>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map(
            (
              post: {
                post_content: string;
                post_url: string;
                media: string[];
                created_at: string;
              },
              index: number
            ) => {
              return (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 border border-slate-100 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-sm font-medium text-slate-600 dark:text-gray-400">
                        {formatDate(post.created_at)}
                        <span className="text-slate-300 dark:text-gray-600 mx-1">•</span>{" "}
                      </div>
                      <div className="flex items-center">
                        {post.media[0] && (
                          <div className="flex items-center text-blue-600 dark:text-blue-400 text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                            <FileText className="h-3 w-3 mr-1" />
                            <span>media</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="min-h-[80px] mb-4">
                      <p className="text-slate-800 dark:text-gray-200 line-clamp-3 leading-relaxed text-base">
                        {post.post_content}
                      </p>
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0 flex justify-between items-center border-t border-slate-100 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 shadow-sm px-3 py-1 font-medium">
                        posted
                      </Badge>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 hover:border-blue-300 dark:hover:border-blue-800 font-medium px-4 shadow-sm transition-all duration-200"
                      onClick={() => window.open(post.post_url, "_blank")}
                    >
                      View Post
                    </Button>
                  </CardFooter>
                </Card>
              );
            }
          )}
        </div>
      )}

      {!isPending && data?.length === 0 && <h1 className="text-slate-800 dark:text-white h-[30vh] flex items-center justify-center">No posts yet</h1>}
    </div>
  );
}
