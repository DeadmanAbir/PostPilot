import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Calendar } from "../../../components/ui/calendar";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AvatarCircles } from "@/components/avatar-circle";
import { selectPostGenerated,setPostGenerated,useAppDispatch,useAppSelector } from "../../../../store/index";

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
];

const avatars = Array(10).fill({
  imageUrl: "https://github.com/faisal004.png",
  profileUrl: "https://github.com/faisal004",
});

export function SchedulingSidebar() {
  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5); // Extracts "HH:MM"
  };

  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState(getCurrentTime());
  const [open, setOpen] = useState(false);
  const [scheduledPosts, setScheduledPosts] =
    useState<ScheduledPost[]>(mockUpcomingPosts);
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null);
  const postGenerated = useAppSelector(selectPostGenerated);

  const handleSchedule = () => {
    const today = new Date();
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    // Prevent scheduling past dates
    if (selectedDate < today) {
      alert("Cannot schedule a post in the past.");
      return;
    }

    // Prevent scheduling past times for today
    if (
      selectedDate.getTime() === today.getTime() &&
      time < getCurrentTime()
    ) {
      alert("Cannot schedule a post in the past time.");
      return;
    }

    const newPost: ScheduledPost = {
      id: (scheduledPosts.length + 1).toString(),
      date,
      time,
      content: "New scheduled post",
      image: "/placeholder.svg?height=40&width=40",
    };

    setScheduledPosts([...scheduledPosts, newPost]);
    setOpen(false); // Close the collapsible after scheduling
  };

  return (
    <aside className="w-96 border-l bg-muted p-4 overflow-y-auto" id="imageLoad">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Upcoming Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <AvatarCircles numPeople={avatars.length} avatarUrls={avatars} />
        </CardContent>
      </Card>

      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <Button className="w-full mb-3 flex justify-between items-center">
            <span>Schedule Post</span>
            {open ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <Label>Date</Label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    className="rounded-md border"
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    min={date.toDateString() === new Date().toDateString() ? getCurrentTime() : undefined}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
                <Button onClick={handleSchedule} className="w-full">
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
{ postGenerated &&<div>
  asdjkhfjakszdf
</div>}
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
