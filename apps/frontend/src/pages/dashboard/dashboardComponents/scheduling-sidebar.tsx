import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Calendar } from "../../../components/ui/calendar";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AvatarCircles } from "@/components/avatar-circle";

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
const avatars = [
  {
    imageUrl: "https://github.com/faisal004.png",
    profileUrl: "https://github.com/faisal004",
  },
  {
    imageUrl: "https://github.com/faisal004.png",
    profileUrl: "https://github.com/faisal004",
  },  {
    profileUrl: "https://github.com/faisal004",
    imageUrl: "https://github.com/faisal004.png",
  },  {
    imageUrl: "https://github.com/faisal004.png",
    profileUrl: "https://github.com/faisal004",
  },  {
    imageUrl: "https://github.com/faisal004.png",
    profileUrl: "https://github.com/faisal004",
  },  {
    imageUrl: "https://github.com/faisal004.png",
    profileUrl: "https://github.com/faisal004",
  },  {
    imageUrl: "https://github.com/faisal004.png",
    profileUrl: "https://github.com/faisal004",
  },  {
    imageUrl: "https://github.com/faisal004.png",
    profileUrl: "https://github.com/faisal004",
  },
];
export function SchedulingSidebar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("12:00");
  const [open,setOpen]=useState(false)
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
        <AvatarCircles numPeople={10} avatarUrls={avatars} />;
        </CardContent>
      </Card>
      <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
  <Button className="w-full mb-3 flex justify-between items-center">
    <span> Schedule Post</span> 
    {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
  </Button>
</CollapsibleTrigger>
        <CollapsibleContent>
          <Card >

            <CardContent className="p-4">
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
        </CollapsibleContent>
      </Collapsible>



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
