import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Check, File, Globe2, Image, Twitter, X, Youtube } from "lucide-react";
import { RegenerateModal } from "@/components/regenerate-modal";
import { useAuth } from "@/providers/supabaseAuthProvider";
import {
  generatePostFn,
  regeneratePostFn,
} from "@/lib/tanstack-query/mutation";
import { LinkedinPostResponse } from "@repo/common/types";
import {
  setPostGenerated,
  useAppDispatch,
} from "../../../../store/index";
import { fetchSourcesQuery } from "@/lib/tanstack-query/query";


import { Calendar } from "../../../components/ui/calendar";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { selectPostGenerated, useAppSelector } from "../../../../store/index";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns"
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


export function PostGenerator() {
  const { user } = useAuth();
  const [generatedPost, setGeneratedPost] = useState("");
  const postGenerated = useAppSelector(selectPostGenerated);
  const dispatch = useAppDispatch();

  const [isRegenerateModalOpen, setIsRegenerateModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<{ id: string; label: string }[]>([]);

  const {
    data: optionData,
    refetch: connectLinkedinRefetch,
    isPending: isSourcesFetching,
  } = fetchSourcesQuery(user?.accessToken!);

  const { mutate, isPending } = generatePostFn(user?.accessToken!, {
    onSuccess: (data: LinkedinPostResponse) => {
      setGeneratedPost(data.post_content);
      alert("Post generated successfully");
      dispatch(setPostGenerated(true));
    },
    onError: (error: unknown) => {
      console.log(error);
      alert("error in posting");
    },
  });

  const { mutate: regeneratePost, isPending: isRegenerating } =
    regeneratePostFn(user?.accessToken!, {
      onSuccess: (data: LinkedinPostResponse) => {
        console.log(data);
        setGeneratedPost(data.post_content);
        alert("Post re-generated successfully");
      },
      onError: (error: unknown) => {
        console.log(error);
        alert("error in posting");
      },
      onSettled: () => {
        setIsRegenerateModalOpen(false);
      },
    });

  const toggleSelect = (item: { id: string; label: string }) => {
    setSelectedItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      return exists
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item];
    });
  };

  const removeItem = (item: string) => {
    setSelectedItems(selectedItems.filter((i) => i.id !== item));
  };
  const handleGenerate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({
      query: generatedPost,
    });
    // setGeneratedPost("demo post");
    // dispatch(setPostGenerated(true));
  };

  const handleRegenerate = async (additionalContext: string) => {
    // TODO: Implement actual AI regeneration logic
    // setGeneratedPost(`Regenerated post with context: ${additionalContext}`);
    regeneratePost({
      previousPost: generatedPost,
      query: additionalContext,
    });
  };
  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5); // Extracts "HH:MM"
  };

  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState(getCurrentTime());
  // const [open, setOpen] = useState(false);
  const [enabled, setEnabled] = useState(false)
  const [connectionOnly, setConnectionOnly] = useState(false);

  const [scheduledPosts, setScheduledPosts] =
    useState<ScheduledPost[]>(mockUpcomingPosts);
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null);

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
    // setOpen(false); // Close the collapsible after scheduling
  };


  console.log("optionData", optionData, selectedItems);
  return (
    <div className="flex w-full gap-5 h-full">
      <div className="w-2/3 flex flex-col items-center h-full  ">
        <div className="p-5 text-3xl font-bold tracking-wider text-left w-full">
          Welcome {user?.user?.user_metadata.displayName} 👋
        </div>
        <form onSubmit={handleGenerate}
          className="w-full"
        >
          <div className="space-y-4 ">
            <Card>
              <CardHeader>
                <CardTitle>Generate Post</CardTitle>
              </CardHeader>
              <CardContent className="h-full">
                <Textarea
                  placeholder="Enter your prompt for AI generation..."
                  className="max-h-60 h-full"
                  value={generatedPost}
                  disabled={isPending || isRegenerating}
                  required
                  rows={20}
                  onChange={(e) => setGeneratedPost(e.target.value)}
                />
              </CardContent>
              <CardFooter className="flex  flex-col items-start justify-start gap-2">
                <div className="flex items-center justify-between w-full">
                  <div className="flex gap-2">
                    {postGenerated ? (
                      <Button
                        type="button"
                        onClick={() => setIsRegenerateModalOpen(true)}
                        disabled={isPending || isRegenerating}
                        className="relative overflow-hidden"
                      >
                        <div
                          className={`transform transition-transform duration-300 ${isPending || isRegenerating ? "-translate-y-[250%]" : "translate-y-0"}`}
                        >
                          Regenerate Post
                        </div>
                        <div
                          className={`absolute transform transition-transform duration-300 ${isPending || isRegenerating ? "translate-y-0" : "translate-y-[250%]"}`}
                        >
                          <div className="flex items-center gap-2">
                            <span>Loading</span>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          </div>
                        </div>
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isPending}
                        className="relative overflow-hidden"
                      >
                        <div
                          className={`transform transition-transform duration-300 ${isPending || isRegenerating ? "-translate-y-[250%]" : "translate-y-0"}`}
                        >
                          {postGenerated ? "Regenerate Post" : "Generate Post"}
                        </div>
                        <div
                          className={`absolute transform transition-transform duration-300 ${isPending || isRegenerating ? "translate-y-0" : "translate-y-[250%]"}`}
                        >
                          <div className="flex items-center gap-2">
                            <span>Loading</span>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          </div>
                        </div>
                      </Button>
                    )}
                    {!postGenerated && optionData && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild disabled={isSourcesFetching}>
                          <Button variant={"outline"}>Select Options</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-64">


                          {[
                            { label: "Files", data: optionData.files, icon: File },
                            { label: "Images", data: optionData.images, icon: Image },
                            { label: "Tweets", data: optionData.tweets, icon: Twitter },
                            { label: "Websites", data: optionData.websites, icon: Globe2 },
                            { label: "YouTube", data: optionData.youtube, icon: Youtube },
                          ].map(({ label, icon: Icon, data }) => (
                            data?.length > 0 && (
                              <DropdownMenuSub key={label}>
                                <DropdownMenuSubTrigger className="gap-2">
                                  <Icon /> <span>{label}</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                  <DropdownMenuSubContent className="max-h-64 overflow-y-auto">
                                    {data.map((item: { id?: string; name?: string; url?: string; tweet?: string }, index: number) => (
                                      <DropdownMenuItem
                                        key={item.id || index}
                                        onSelect={(e: Event) => {
                                          e.preventDefault();
                                          toggleSelect({
                                            id: item.id || index.toString(),
                                            label: item.name || item.url || item.tweet || "Untitled",
                                          });
                                        }}
                                        className="flex justify-between gap-2"
                                      >
                                        <span className="truncate w-48">
                                          {item.name || item.url || item.tweet || "Untitled"}
                                        </span>
                                        {selectedItems.some((i) => i.id === (item.id || index.toString())) && (
                                          <Check size={16} />
                                        )}
                                      </DropdownMenuItem>

                                    ))}
                                  </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                              </DropdownMenuSub>
                            )
                          ))}

                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}

                  </div>
                </div>

                {selectedItems.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {selectedItems.map((item) => (
                      <Badge
                        key={item.id}
                        variant="outline"
                        className="flex items-center gap-1 w-40"
                      >
                        <span className="truncate overflow-hidden whitespace-nowrap flex-1">
                          {item.label}
                        </span>
                        <X
                          size={12}
                          className="cursor-pointer shrink-0"
                          onClick={() => removeItem(item.id)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}

              </CardFooter>
            </Card>

            <RegenerateModal
              isRegenerating={isRegenerating}
              isOpen={isRegenerateModalOpen}
              onClose={() => setIsRegenerateModalOpen(false)}
              onRegenerate={handleRegenerate}
              currentPost={generatedPost}
            />
          </div>
        </form>

      </div>
      <aside className="w-1/3 border-l bg-muted  h-full p-4 overflow-y-auto" id="imageLoad">
        {/* <Card className="mb-4">
        <CardHeader>
          <CardTitle>Upcoming Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <AvatarCircles numPeople={avatars.length} avatarUrls={avatars} />
        </CardContent>
      </Card> */}
        <div className="mb-2 flex items-center gap-2 bg-white w-full justify-between p-3 rounded-sm text-black border shadow-sm">
          <Label>Schedule Post</Label>
          <Switch checked={enabled} onCheckedChange={setEnabled} />
        </div>
        <AnimatePresence>
          {enabled && (
            <motion.div
              key="schedule"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>

                <CardContent className="p-4">
                  <Label className="">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          " justify-start text-left font-normal w-full mt-1",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(newDate) => newDate && setDate(newDate)}
                        className="rounded-md border"
                      />
                    </PopoverContent>
                  </Popover>
                  <div className="space-y-4">
                    {/* <div>
                    <Label>Date</Label>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => newDate && setDate(newDate)}
                      className="rounded-md border"
                    />
                  </div> */}
                    <div className="mt-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={time}
                        min={date.toDateString() === new Date().toDateString() ? getCurrentTime() : undefined}
                        onChange={(e) => setTime(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <Button onClick={handleSchedule} className="w-full" disabled={!postGenerated}>
                      Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
        {/* <Collapsible open={open} onOpenChange={setOpen}>
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
      </Collapsible> */}

        {postGenerated && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col my-4 items-center w-full"
          >
            <Button className="w-full text-lg tracking-wider">
              Post
            </Button>
            <div className="flex my-2 items-center gap-2">
              <span>Connection Only</span>
              <Switch
                checked={connectionOnly}
                onCheckedChange={setConnectionOnly}
              />
            </div>

          </motion.div>
        )}
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

    </div>

  );
}
