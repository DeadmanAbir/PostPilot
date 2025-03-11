"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ScheduledPost } from "./scheduled-posts-page";

interface EditScheduleModalProps {
  post: ScheduledPost | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: ScheduledPost, newDate: Date) => void;
}

export function EditScheduleModal({
  post,
  isOpen,
  onClose,
  onSave,
}: EditScheduleModalProps) {
  // If no post is provided, don't render anything
  if (!post) return null;

  // Initialize state with the current scheduled date
  const [date, setDate] = useState<Date | undefined>(post.scheduledDate);

  // Format the time string (HH:MM) from the date
  const formatTimeString = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [time, setTime] = useState(formatTimeString(post.scheduledDate));

  useEffect(() => {
    if (post) {
      setDate(post.scheduledDate);
      setTime(formatTimeString(post.scheduledDate));
    }
  }, [post]);

  // Handle time input change
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  // Handle save button click
  const handleSave = () => {
    if (!date) return;

    // Parse the time string
    const [hours, minutes] = time.split(":").map(Number);

    // Create a new date with the selected date and time
    const newDate = new Date(date);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);

    // Call the onSave callback with the updated date
    onSave(post, newDate);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Schedule</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="post-title">Post</Label>
            <p className="text-sm text-muted-foreground truncate">
              {post.content.substring(0, 100)}
              {post.content.length > 100 ? "..." : ""}
            </p>
          </div>

          <div className="grid gap-2">
            <Label>Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              initialFocus
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={handleTimeChange}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
