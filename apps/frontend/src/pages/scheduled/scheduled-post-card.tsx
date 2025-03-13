"use client";

import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { Clock } from "lucide-react";
import { ScheduledPost } from "./scheduled-posts-page";

interface ScheduledPostCardProps {
  post: ScheduledPost;
  onClick: () => void;
  onDateClick: (e: React.MouseEvent, post: ScheduledPost) => void;
}

export function ScheduledPostCard({
  post,
  onClick,
  onDateClick,
}: ScheduledPostCardProps) {
  // Format the date for display
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(post.scheduledDate);

  // Truncate content for preview (around 150 characters)
  const truncatedContent =
    post.content.length > 150
      ? `${post.content.substring(0, 150)}...`
      : post.content;

  // Handle date click
  const handleDateClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    onDateClick(e, post);
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex-grow"      onClick={onClick}>
        {/* Account info */}
        <div className="flex items-center gap-2 mb-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.accountAvatar} alt={post.accountName} />
            <AvatarFallback>{post.accountName.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{post.accountName}</span>
        </div>

        {/* Post preview image (if available) */}
        {post.images.length > 0 && (
          <div className="relative w-full h-40 mb-3 rounded-md overflow-hidden">
            <img
              src={post.images[0] || "/placeholder.svg"}
              alt="Post preview"
              className="w-full h-full object-cover"
            />
            {post.images.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-background/80 text-foreground px-2 py-1 rounded-md text-xs">
                +{post.images.length - 1} more
              </div>
            )}
          </div>
        )}

        {/* Truncated content */}
        <p
          className="text-sm cursor-pointer hover:text-primary transition-colors"
     
        >
          {truncatedContent}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-3 border-t mt-auto">
        <div
          className="flex items-center text-muted-foreground text-sm cursor-pointer hover:text-primary transition-colors"
          onClick={handleDateClick}
        >
          <Clock className="h-4 w-4 mr-2" />
          <span>{formattedDate}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
