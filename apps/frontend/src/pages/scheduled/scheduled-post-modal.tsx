"use client";

import { Clock, Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { ScheduledPost } from "./scheduled-posts-page";

interface ScheduledPostModalProps {
  post: ScheduledPost | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ScheduledPostModal({
  post,
  isOpen,
  onClose,
}: ScheduledPostModalProps) {
  if (!post) {
    return null;
  }

  // Format the date for display
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(post.scheduledDate);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Scheduled Post Preview</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Account info */}
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={post.accountAvatar} alt={post.accountName} />
              <AvatarFallback>
                {post.accountName.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{post.accountName}</div>
              <div className="flex items-center text-muted-foreground text-sm">
                <Clock className="h-3 w-3 mr-1" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>

          {/* Post content */}
          <div className="whitespace-pre-line">{post.content}</div>

          {/* Post images */}
          {post.images.length > 0 && (
            <div className="grid gap-4 mt-4">
              {post.images.map((image, index) => (
                <div
                  key={index}
                  className="relative w-full rounded-md overflow-hidden"
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Post image ${index + 1}`}
                    className="w-full object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter className="flex items-center justify-end">
          <Button variant="destructive" size="sm" className="gap-1">
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
