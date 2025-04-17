import type React from "react";

import { useState } from "react";
import { ScheduledPostCard } from "./scheduled-post-card";
import { ScheduledPostModal } from "./scheduled-post-modal";
import { EditScheduleModal } from "./edit-schedule-modal";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import ComingSoonCard from "./coming-soon";

// Define the ScheduledPost type
export interface ScheduledPost {
  id: string;
  accountName: string;
  accountAvatar: string;
  content: string;
  scheduledDate: Date;
  images: string[];
}

// Mock data for scheduled posts
const mockScheduledPosts: ScheduledPost[] = [
  {
    id: "1",
    accountName: "John Doe",
    accountAvatar: "/placeholder.svg?height=40&width=40",
    content:
      "Excited to announce our new product launch! After months of hard work, we're finally ready to share our latest innovation with the world. Join us for a live demo next week where we'll showcase all the amazing features.",
    scheduledDate: new Date(2024, 2, 15, 10, 0),
    images: [
      "https://images.unsplash.com/photo-1591779051696-1c3fa1469a79?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: "2",
    accountName: "Jane Smith",
    accountAvatar: "/placeholder.svg?height=40&width=40",
    content:
      "Just published a new article on LinkedIn strategies for 2024. Check out my top 10 tips for growing your professional network and establishing thought leadership in your industry.",
    scheduledDate: new Date(2024, 2, 16, 14, 30),
    images: [],
  },
  {
    id: "3",
    accountName: "Alex Johnson",
    accountAvatar: "/placeholder.svg?height=40&width=40",
    content:
      "Reflecting on my journey in tech over the past decade. From startup founder to corporate executive, I've learned valuable lessons about leadership, innovation, and resilience. Here are my key takeaways that might help you in your career path.",
    scheduledDate: new Date(2024, 2, 17, 9, 0),
    images: [
      "https://images.unsplash.com/photo-1505968409348-bd000797c92e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: "4",
    accountName: "Sarah Williams",
    accountAvatar: "/placeholder.svg?height=40&width=40",
    content:
      "Thrilled to be speaking at the upcoming Digital Marketing Summit in New York! I'll be discussing the latest trends in content strategy and how AI is transforming the way we create and distribute content. Hope to see some of you there!",
    scheduledDate: new Date(2024, 2, 18, 11, 0),
    images: [
      "https://images.unsplash.com/photo-1570051008600-b34baa49e751?q=80&w=2085&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: "5",
    accountName: "Michael Brown",
    accountAvatar: "/placeholder.svg?height=40&width=40",
    content:
      "Our team is hiring! We're looking for talented developers to join our growing engineering department. If you're passionate about building innovative solutions and working in a collaborative environment, check out the job posting on our website.",
    scheduledDate: new Date(2024, 2, 19, 16, 0),
    images: [],
  },
  {
    id: "6",
    accountName: "Emily Davis",
    accountAvatar: "/placeholder.svg?height=40&width=40",
    content:
      "Just completed our annual company retreat where we brainstormed ideas for the upcoming year. Feeling inspired and energized by the creativity and passion of our team. Looking forward to turning these ideas into reality!",
    scheduledDate: new Date(2024, 2, 20, 13, 0),
    images: [
      "https://images.unsplash.com/photo-1624670760266-0ddc7639b3a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1591280063444-d3c514eb6e13?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
];

export function ScheduledPostsPage() {
  // Get toast function for notifications

  // State for posts
  const [posts, setPosts] = useState<ScheduledPost[]>(mockScheduledPosts);

  // State for selected post (for content modal)
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null);

  // State for post being edited (for schedule modal)
  const [editingPost, setEditingPost] = useState<ScheduledPost | null>(null);

  // State for sorting
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // State for account filter (if multiple accounts exist)
  const [accountFilter, setAccountFilter] = useState<string>("all");

  // Get unique account names for filter dropdown
  const accountNames = Array.from(
    new Set(posts.map((post) => post.accountName))
  );

  // Sort and filter posts
  const sortedAndFilteredPosts = [...posts]
    .filter(
      (post) => accountFilter === "all" || post.accountName === accountFilter
    )
    .sort((a, b) => {
      const dateA = a.scheduledDate.getTime();
      const dateB = b.scheduledDate.getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  // Handle date click to open edit schedule modal
  const handleDateClick = (e: React.MouseEvent, post: ScheduledPost) => {
    e.preventDefault();
    setEditingPost(post);
  };

  // Handle save schedule changes
  const handleSaveSchedule = (post: ScheduledPost, newDate: Date) => {
    // Update the post with the new scheduled date
    const updatedPosts = posts.map((p) =>
      p.id === post.id ? { ...p, scheduledDate: newDate } : p
    );

    // Update state
    setPosts(updatedPosts);

    // Show success toast
  };

  return <ComingSoonCard />;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-5">
        <h1 className="text-3xl font-bold">Scheduled Posts</h1>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto ">
          {/* Sort toggle */}
          <Button
            variant="outline"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="flex items-center gap-2"
          >
            {sortOrder === "asc" ? (
              <>
                <ArrowUpAZ className="h-4 w-4" />
                <span>Date (Earliest First)</span>
              </>
            ) : (
              <>
                <ArrowDownAZ className="h-4 w-4" />
                <span>Date (Latest First)</span>
              </>
            )}
          </Button>

          {/* Account filter */}
          <Select value={accountFilter} onValueChange={setAccountFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Accounts</SelectItem>
              {accountNames.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid of scheduled post cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 px-5">
        {sortedAndFilteredPosts.map((post) => (
          <ScheduledPostCard
            key={post.id}
            post={post}
            onClick={() => setSelectedPost(post)}
            onDateClick={handleDateClick}
          />
        ))}
      </div>

      {/* Empty state */}
      {sortedAndFilteredPosts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No scheduled posts found</h3>
          <p className="text-muted-foreground">
            {accountFilter !== "all"
              ? "Try selecting a different account or clear the filter."
              : "Schedule your first post to see it here."}
          </p>
        </div>
      )}

      {/* Modal for post content preview */}
      <ScheduledPostModal
        post={selectedPost}
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
      />

      {/* Modal for editing schedule */}
      <EditScheduleModal
        post={editingPost}
        isOpen={!!editingPost}
        onClose={() => setEditingPost(null)}
        onSave={handleSaveSchedule}
      />
    </div>
  );
}
