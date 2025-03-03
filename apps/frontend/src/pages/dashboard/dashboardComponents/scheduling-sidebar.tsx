import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Calendar } from "../../../components/ui/calendar";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

interface ScheduledPost {
  id: string;
  date: Date;
  time: string;
  content: string;
  image: string;
}

// Mock data for upcoming posts
const mockUpcomingPosts: ScheduledPost[] = [
  {
    id: "1",
    date: new Date(2024, 2, 15),
    time: "10:00",
    content: "Exciting news coming soon!",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    date: new Date(2024, 2, 16),
    time: "14:30",
    content: "Check out our latest product launch",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    date: new Date(2024, 2, 17),
    time: "09:00",
    content: "Join us for a live webinar",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    date: new Date(2024, 2, 18),
    time: "11:00",
    content: "Industry insights: New trends for 2024",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    date: new Date(2024, 2, 19),
    time: "16:00",
    content: "Customer success story: How Company X increased productivity",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    date: new Date(2024, 2, 20),
    time: "13:00",
    content: "Tips for effective networking on LinkedIn",
    image: "/placeholder.svg?height=40&width=40",
  },
];

export function SchedulingSidebar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("12:00");
  const [scheduledPosts, setScheduledPosts] =
    useState<ScheduledPost[]>(mockUpcomingPosts);
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null);

  const handleSchedule = () => {
    if (date) {
      const newPost: ScheduledPost = {
        id: (scheduledPosts.length + 1).toString(),
        date,
        time,
        content: "New scheduled post",
        image: "/placeholder.svg?height=40&width=40",
      };
      setScheduledPosts([...scheduledPosts, newPost]);
    }
  };

  return (
    <aside className="w-80 border-l bg-muted p-4 overflow-y-auto">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Upcoming Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {scheduledPosts.slice(0, 5).map((post) => (
              <TooltipProvider key={post.id}>
                <Tooltip>
                  <TooltipTrigger asChild></TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {post.date.toDateString()} at {post.time}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
            {scheduledPosts.length > 5 && (
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted-foreground text-muted text-sm">
                +{scheduledPosts.length - 5}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Schedule Post</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Date</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <Button onClick={handleSchedule} className="w-full">
              Schedule
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scheduled Post Preview</DialogTitle>
          </DialogHeader>
          {selectedPost && (
            <div className="mt-2">
              <p>
                <strong>Date:</strong> {selectedPost.date.toDateString()}
              </p>
              <p>
                <strong>Time:</strong> {selectedPost.time}
              </p>
              <p>
                <strong>Content:</strong> {selectedPost.content}
              </p>
              <img
                src={selectedPost.image || "/placeholder.svg"}
                alt="Post preview"
                className="mt-2 rounded-md"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </aside>
  );
}
