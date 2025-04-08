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
import {
  Check,
  ChevronLeft,
  ChevronRight,
  File,
  Globe2,
  Image,
  ImageIcon,
  Twitter,
  X,
  Youtube,
} from "lucide-react";
import { RegenerateModal } from "@/components/regenerate-modal";
import { useAuth } from "@/providers/supabaseAuthProvider";
import {
  generatePostFn,
  postToLinkedinFn,
  regeneratePostFn,
} from "@/lib/tanstack-query/mutation";
import { LinkedinPostResponse } from "@repo/common/types";
import { setPostGenerated, useAppDispatch } from "../../../../store/index";
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
} from "@/components/ui/popover";
import { selectPostGenerated, useAppSelector } from "../../../../store/index";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { nanoid } from "nanoid";
import { supabase } from "@/lib/supabaseClient";
import { groupItemsByType } from "@/utils/functions/groupItem";
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
  interface Media {
    file: File;
    preview: string;
    type: "image" | "video";
    id: string;
  }

  const [images, setImages] = useState<Media[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [isRegenerateModalOpen, setIsRegenerateModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<
    { id: string; label: string; type: string }[]
  >([]);

  const uploadToSupabase = async (bucket: string) => {
    const fileUrl: string[] = [];
    try {
      for (const image of images) {
        const fileExtension = image.file.name.split(".").pop();
        const fileName = `${nanoid()}.${fileExtension}`;

        const filePath = `${user?.user?.id}/${fileName}`;

        const { error } = await supabase.storage
          .from(bucket)
          .upload(filePath, image.file);

        if (error) {
          console.error("Error uploading file:", error.message);
          alert("error in uploading file");
          throw error;
        }

        // Get the public URL for the uploaded file
        const { data: urlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath);

        // Add the public URL to our array
        fileUrl.push(urlData.publicUrl);
      }

      return fileUrl;
    } catch (error) {
      console.error("Error in file upload process:", error);
      throw error;
    }
  };

  const {
    data: optionData,
    refetch: connectLinkedinRefetch,
    isPending: isSourcesFetching,
  } = fetchSourcesQuery(user?.accessToken!);

  const { mutate: generatePost, isPending } = generatePostFn(
    user?.accessToken!,
    {
      onSuccess: (data: LinkedinPostResponse) => {
        setGeneratedPost(data.post_content);
        alert("Post generated successfully");
        dispatch(setPostGenerated(true));
      },
      onError: (error: unknown) => {
        console.log(error);
        alert("error in posting");
      },
    }
  );

  const { mutate: post, isPending: isPosting } = postToLinkedinFn(
    user?.accessToken!,
    {
      onSuccess: (data: unknown) => {
        console.log(data);
        setImages([]);
        setGeneratedPost("");
        alert("Posted to Linkedin successfully");
      },
      onError: (error: unknown) => {
        console.log(error);
        alert("error in posting");
      },
    }
  );

  const { mutate: regeneratePost, isPending: isRegenerating } =
    regeneratePostFn(user?.accessToken!, {
      onSuccess: (data: LinkedinPostResponse) => {
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

  const toggleSelect = (item: { id: string; label: string; type: string }) => {
    setSelectedItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      return exists ? prev.filter((i) => i.id !== item.id) : [...prev, item];
    });
  };

  const removeItem = (item: string) => {
    setSelectedItems(selectedItems.filter((i) => i.id !== item));
  };
  const handleGenerate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    generatePost({
      query: generatedPost,
      media: groupItemsByType({ selectedItems }),
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
  const [enabled, setEnabled] = useState(false);
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
    if (selectedDate.getTime() === today.getTime() && time < getCurrentTime()) {
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
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files as FileList);

      // Check if a video already exists in the current images
      const hasVideo = images.some((item) => item.type === "video");

      const newFiles = filesArray.reduce<typeof images>((acc, file) => {
        const isVideo = file.type.startsWith("video/");
        const isImage = file.type.startsWith("image/");

        if (
          isImage ||
          (isVideo && !hasVideo && !acc.some((f) => f.type === "video"))
        ) {
          acc.push({
            file,
            preview: URL.createObjectURL(file),
            type: isVideo ? "video" : "image",
            id: `${file.name}-${Date.now()}`,
          });
        }

        return acc;
      }, []);

      setImages((prev) => [...prev, ...newFiles]);
    }
  };

  const removeImage = (id: string) => {
    setImages(images.filter((image) => image.id !== id));
    if (currentSlide >= images.length - 1) {
      setCurrentSlide(Math.max(0, images.length - 2));
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const handlePost = async () => {
    const media = await uploadToSupabase("post-pilot");
    post({
      text: generatedPost,
      visibility: connectionOnly ? "CONNECTIONS" : "PUBLIC",
      images: images[0]?.type == "image" ? media : undefined,
      video: images[0]?.type == "video" ? media[0] : undefined,
    });
  };
  return (
    <div className="flex w-full gap-5 h-full">
      <div className="w-2/3 flex flex-col items-center h-full  ">
        <div className="p-5 text-3xl font-bold tracking-wider text-left w-full">
          Welcome {user?.user?.user_metadata.displayName} 👋
        </div>
        <form onSubmit={handleGenerate} className="w-full">
          <div className="space-y-4 ">
            <Card>
              <CardHeader>
                <CardTitle>Generate Post</CardTitle>
              </CardHeader>
              <CardContent className="h-full space-y-3">
                <div className="w-full border-dotted border-4 rounded-md border-blue-400 bg-blue-50 p-5 ">
                  <div className="w-full ">
                    <AnimatePresence>
                      <div className="flex gap-3">
                        {images.map((media) => (
                          <motion.div
                            key={media.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="relative aspect-square rounded-lg group size-20 "
                          >
                            {media.type !== "video" ? (
                              <img
                                src={media.preview}
                                alt="Preview"
                                className="w-full h-full object-cover size-20 border-blue-400 border-4"
                              />
                            ) : (
                              <video
                                src={media.preview}
                                className="w-full h-full object-cover size-20 border-green-400 border-4"
                              />
                            )}

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeImage(media.id)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={16} />
                            </motion.button>
                          </motion.div>
                        ))}

                        {images.length > 0 && images[0].type === "image" && (
                          <div>
                            <label
                              htmlFor="media-upload"
                              className="flex flex-col items-center justify-center size-20 cursor-pointer border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition"
                            >
                              <span className="text-4xl">＋</span>
                              <span className="text-xs mt-1 text-center">
                                Add more
                              </span>
                            </label>
                            <input
                              id="media-upload"
                              type="file"
                              multiple
                              accept="image/*"
                              className="hidden"
                              onChange={handleFileChange}
                            />
                          </div>
                        )}
                      </div>

                      {images.length === 0 && (
                        <label className="cursor-pointer col-span-full md:col-span-1">
                          <motion.div
                            className=" flex flex-col items-center justify-center p-2 h-36 transition-all"
                            whileHover="hover"
                          >
                            <div className="relative h-24 w-32 mb-4">
                              <motion.div
                                className="absolute bg-blue-100 w-16 h-16 rounded border border-blue-400"
                                variants={{
                                  hover: {
                                    x: -20,
                                    y: -10,
                                    rotate: -5,
                                    transition: { duration: 0.3 },
                                  },
                                }}
                              >
                                <ImageIcon className="w-8 h-8 m-4 text-blue-500" />
                              </motion.div>
                              <motion.div
                                className="absolute bg-green-100 w-16 h-16 rounded border border-green-500 left-4 top-2"
                                variants={{
                                  hover: { transition: { duration: 0.3 } },
                                }}
                              >
                                <ImageIcon className="w-8 h-8 m-4 text-green-500" />
                              </motion.div>
                              <motion.div
                                className="absolute bg-purple-100 w-16 h-16 rounded border border-purple-500 left-8 top-4"
                                variants={{
                                  hover: {
                                    x: 20,
                                    y: -10,
                                    rotate: 5,
                                    transition: { duration: 0.3 },
                                  },
                                }}
                              >
                                <ImageIcon className="w-8 h-8 m-4 text-purple-500" />
                              </motion.div>
                            </div>
                            <p className="text-sm text-gray-500 text-center">
                              Drag & drop images here
                              <br />
                              or click to browse
                            </p>
                            <input
                              type="file"
                              multiple
                              accept="image/*,video/*"
                              className="hidden"
                              onChange={handleFileChange}
                            />
                          </motion.div>
                        </label>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <Textarea
                  placeholder="Enter your prompt for AI generation..."
                  className="max-h-[30vh] min-h-[20vh]  h-full "
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
                        <DropdownMenuTrigger
                          asChild
                          disabled={isSourcesFetching || isPending}
                        >
                          <Button variant={"outline"}>Select Options</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-64">
                          {[
                            {
                              label: "Files",
                              data: optionData.files,
                              icon: File,
                            },
                            {
                              label: "Images",
                              data: optionData.images,
                              icon: Image,
                            },
                            {
                              label: "Tweets",
                              data: optionData.tweets,
                              icon: Twitter,
                            },
                            {
                              label: "Websites",
                              data: optionData.websites,
                              icon: Globe2,
                            },
                            {
                              label: "YouTube",
                              data: optionData.youtube,
                              icon: Youtube,
                            },
                          ].map(({ label, icon: Icon, data }) => {
                            // Only render if there's data
                            if (!data?.length) return null;

                            // Create unique state for each submenu's search
                            const searchId = `search-${label.toLowerCase()}`;

                            return (
                              <DropdownMenuSub key={label}>
                                <DropdownMenuSubTrigger className="gap-2">
                                  <Icon /> <span>{label}</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                  <DropdownMenuSubContent className="max-h-80">
                                    {/* Search input */}
                                    <div className="px-2 py-1.5 sticky top-0 bg-white z-10 border-b">
                                      <input
                                        type="text"
                                        placeholder={`Search ${label}...`}
                                        className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onChange={(e) => {
                                          const searchContainer =
                                            e.currentTarget.closest(
                                              ".max-h-80"
                                            );
                                          const searchTerm =
                                            e.target.value.toLowerCase();

                                          // Store search term in a data attribute on the element
                                          searchContainer?.setAttribute(
                                            searchId,
                                            searchTerm
                                          );

                                          // Filter items
                                          let visibleCount = 0;
                                          searchContainer
                                            ?.querySelectorAll(".dropdown-item")
                                            .forEach((item) => {
                                              const text =
                                                item.textContent?.toLowerCase() ||
                                                "";
                                              if (text.includes(searchTerm)) {
                                                (
                                                  item as HTMLElement
                                                ).style.display = "";
                                                visibleCount++;
                                              } else {
                                                (
                                                  item as HTMLElement
                                                ).style.display = "none";
                                              }
                                            });

                                          // Handle empty state display
                                          const emptyMessage =
                                            searchContainer?.querySelector(
                                              ".empty-message"
                                            );
                                          if (emptyMessage) {
                                            if (
                                              visibleCount === 0 &&
                                              searchTerm
                                            ) {
                                              (
                                                emptyMessage as HTMLElement
                                              ).style.display = "flex";
                                            } else {
                                              (
                                                emptyMessage as HTMLElement
                                              ).style.display = "none";
                                            }
                                          }
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                      />
                                    </div>

                                    {/* Items container with overflow */}
                                    <div className="overflow-y-auto max-h-64">
                                      {/* No results message */}
                                      <div className="empty-message p-2 text-gray-500 justify-center items-center text-sm hidden">
                                        No items found
                                      </div>

                                      {data.map(
                                        (
                                          item: {
                                            id?: string;
                                            name?: string;
                                            url?: string;
                                            tweet?: string;
                                          },
                                          index: number
                                        ) => {
                                          const displayText =
                                            item.name ||
                                            item.url ||
                                            item.tweet ||
                                            "Untitled";
                                          const itemId =
                                            item.id || index.toString();

                                          return (
                                            <DropdownMenuItem
                                              key={itemId}
                                              onSelect={(e: Event) => {
                                                e.preventDefault();
                                                toggleSelect({
                                                  id: itemId,
                                                  label: displayText,
                                                  type: label,
                                                });
                                              }}
                                              className="flex justify-between gap-2 dropdown-item"
                                            >
                                              <span className="truncate w-48">
                                                {displayText}
                                              </span>
                                              {selectedItems.some(
                                                (i) => i.id === itemId
                                              ) && <Check size={16} />}
                                            </DropdownMenuItem>
                                          );
                                        }
                                      )}
                                    </div>
                                  </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                              </DropdownMenuSub>
                            );
                          })}
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
      <aside
        className="w-1/3 border-l bg-muted  h-full p-4 overflow-y-auto"
        id="imageLoad"
      >
        {/* <Card className="mb-4">
        <CardHeader>
          <CardTitle>Upcoming Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <AvatarCircles numPeople={avatars.length} avatarUrls={avatars} />
        </CardContent>
      </Card> */}

        {images.length > 0 && (
          <div className="mb-8 relative bg-white rounded-xl shadow-xl border-2 p-3  ">
            <div className="p-2 text-xl font-bold">Media Preview</div>
            <motion.div
              className="relative overflow-hidden w-full aspect-video bg-white h-60 rounded-xl border "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <AnimatePresence mode="wait">
                {images[currentSlide]?.type === "video" ? (
                  <motion.video
                    key={currentSlide}
                    src={images[currentSlide]?.preview}
                    controls
                    className="w-full h-full object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <motion.img
                    key={currentSlide}
                    src={images[currentSlide]?.preview}
                    alt="Selected preview"
                    className="w-full h-full object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
            <div>
              {images.length > 1 && (
                <div className="flex items-center justify-between w-full pt-2">
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgba(0,0,0,0.7)",
                    }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevSlide}
                    className="  bg-black bg-opacity-50 text-white p-2 rounded-full shadow-md"
                  >
                    <ChevronLeft size={16} />
                  </motion.button>
                  <div className=" flex justify-center gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentSlide
                            ? "dark:bg-white bg-black w-4"
                            : "dark:bg-white bg-black bg-opacity-50 w-2"
                        }`}
                      />
                    ))}
                  </div>
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgba(0,0,0,0.7)",
                    }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextSlide}
                    className=" bg-black bg-opacity-50 text-white p-2 rounded-full shadow-md"
                  >
                    <ChevronRight size={16} />
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        )}

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
                        min={
                          date.toDateString() === new Date().toDateString()
                            ? getCurrentTime()
                            : undefined
                        }
                        onChange={(e) => setTime(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <Button
                      onClick={handleSchedule}
                      className="w-full"
                      disabled={!postGenerated}
                    >
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
            <Button
              className="w-full text-lg tracking-wider"
              onClick={handlePost}
            >
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
        <Dialog
          open={!!selectedPost}
          onOpenChange={() => setSelectedPost(null)}
        >
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
