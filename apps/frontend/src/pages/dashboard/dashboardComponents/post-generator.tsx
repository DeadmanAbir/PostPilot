import { useRef, useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
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
  ArrowRight,
  CalendarClock,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  File,
  Filter,
  Globe2,
  Image,
  ImageIcon,
  LinkedinIcon,
  Lock,
  PencilRuler,
  Plus,
  Repeat,
  Send,
  Twitter,
  Video,
  WandSparkles,
  X,
  Youtube,
} from "lucide-react";
import { RegenerateModal } from "@/components/regenerate-modal";
import { useAuth } from "@/providers/supabaseAuthProvider";
import {
  generatePostFn,
  improvePostFn,
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { format} from "date-fns";
import { nanoid } from "nanoid";
import { supabase } from "@/lib/supabaseClient";
import { groupItemsByType } from "@/utils/functions/groupItem";
import removeMd from "remove-markdown";

import Editor, { processHTMLContent } from "./tiptap";
import { getTextFromHTML } from "@/utils/functions/getText";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import {
  Drawer,
  DrawerContent,

  DrawerTrigger,
} from "@/components/ui/drawer";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";

interface ScheduledPost {
  id: string;
  date: Date;
  time: string;
  content: string;
  image: string;
}
interface Media {
  file: File;
  preview: string;
  type: "image" | "video";
  id: string;
}

// Mock data for upcoming posts
// const mockUpcomingPosts: ScheduledPost[] = [
//   {
//     id: "1",
//     date: new Date(2024, 2, 15),
//     time: "10:00",
//     content: "Exciting news coming soon!",
//     image: "/placeholder.svg?height=40&width=40",
//   },
//   {
//     id: "2",
//     date: new Date(2024, 2, 16),
//     time: "14:30",
//     content: "Check out our latest product launch",
//     image: "/placeholder.svg?height=40&width=40",
//   },
//   {
//     id: "3",
//     date: new Date(2024, 2, 17),
//     time: "09:00",
//     content: "Join us for a live webinar",
//     image: "/placeholder.svg?height=40&width=40",
//   },
// ];

export function PostGenerator() {
  const { user } = useAuth();
  const [generatedPost, setGeneratedPost] = useState("");
  const postGenerated = useAppSelector(selectPostGenerated);
  const dispatch = useAppDispatch();
  const [images, setImages] = useState<Media[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openPost, setOpenPost] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [isRegenerateModalOpen, setIsRegenerateModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<
    { id: string; label: string; type: string }[]
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputImageRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };
  const handleImageButtonClick = () => {
    inputImageRef.current?.click();
  };
  const isPostTextEmpty = getTextFromHTML(generatedPost).trim().length === 0;
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
          toast.error("error in uploading file");
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

  const { data: optionData, isPending: isSourcesFetching } = fetchSourcesQuery(
    user?.accessToken ?? ""
  );

  const isExpired = optionData?.linkedin?.expires_at
    ? optionData.linkedin.expires_at &&
    new Date(optionData.linkedin.expires_at) < new Date()
    : true;
  const { mutate: generatePost, isPending } = generatePostFn(
    user?.accessToken ?? "",
    {
      onSuccess: (data: LinkedinPostResponse) => {
        const cleanData = removeMd(data.post_content);
        setGeneratedPost(cleanData);
        toast.success("Post generated successfully");
        dispatch(setPostGenerated(true));
      },
      onError: (error: unknown) => {
        console.log(error);
        toast.error("error in posting");
      },
    }
  );

  const { mutate: post } = postToLinkedinFn(
    user?.accessToken ?? "",
    {
      onSuccess: () => {
        setImages([]);
        setGeneratedPost("");
        setGeneratedPost("");
        setSelectedItems([]);
        setPublishing(false);
        setOpenPost(false)
        dispatch(setPostGenerated(false));

        toast.success("Posted to Linkedin successfully");
      },
      onError: (error: unknown) => {
        console.log(error);
        toast.error("error in posting");
      },
    }
  );

  const { mutate: regeneratePost, isPending: isRegenerating } =
    regeneratePostFn(user?.accessToken ?? "", {
      onSuccess: (data: LinkedinPostResponse) => {
        const cleanData = removeMd(data.post_content);
        setGeneratedPost(cleanData);
        toast.success("Post re-generated successfully");
      },
      onError: (error: unknown) => {
        console.log(error);
        toast.error("error in posting");
      },
    });

  const { mutate: refinePost, } = improvePostFn(
    user?.accessToken ?? "",
    {
      onSuccess: (data: LinkedinPostResponse) => {
        const cleanData = removeMd(data.post_content);
        setGeneratedPost(cleanData);
        toast.success("Post improved successfully");
      },
      onError: (error: unknown) => {
        console.log(error);
        toast.error("error inimproving");
      },
    }
  );

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
    const newText = getTextFromHTML(generatedPost);
    if (!newText.trim()) {
      // Optionally show an error message here
      toast.error("Text cannot be empty");
      return;
    }

    generatePost({
      query: newText,
      media: groupItemsByType({ selectedItems }),
    });
    // setGeneratedPost("demo post");
    // dispatch(setPostGenerated(true));
  };

  const handleRegenerate = async (additionalContext: string) => {
    // TODO: Implement actual AI regeneration logic
    // setGeneratedPost(`Regenerated post with context: ${additionalContext}`);
    const newText = getTextFromHTML(generatedPost);
    if (!newText.trim()) {
      // Optionally show an error message here
      toast.error("Text cannot be empty");
      return;
    }

    regeneratePost({
      previousPost: newText,
      query: additionalContext,
      media: groupItemsByType({ selectedItems }),
    });
    setIsRegenerateModalOpen(false);
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

  // const [scheduledPosts, setScheduledPosts] =useState<ScheduledPost[]>(mockUpcomingPosts);
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null);

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
    const processed = processHTMLContent(generatedPost);
    setPublishing(true)
    post({
      text: processed,
      visibility: connectionOnly ? "CONNECTIONS" : "PUBLIC",
      images: images[0]?.type == "image" ? media : undefined,
      video: images[0]?.type == "video" ? media[0] : undefined,
    });
  };

  const handleImproveQuery = async (e: React.MouseEvent) => {
    e.preventDefault();
    const processed = processHTMLContent(generatedPost);
    refinePost(processed);
  };

  return (
    <div className="flex w-full  h-full relative">
      <div className="lg:w-2/3 w-full flex flex-col items-center h-[1300px] md:h-full  ">
        <div className="px-5 py-5 text-3xl font-bold tracking-wider text-left w-full  text-transparent bg-clip-text bg-gradient-to-r from-blue-500 dark:from-blue-200 to-blue-600 dark:to-blue-400">
          Welcome, {user?.user?.user_metadata.displayName}
        </div>
        <Separator />
        <form onSubmit={handleGenerate} className="w-full ">
          <div className="space-y-4 ">
            <Card className="border-0 p-0 shadow-none bg-transparent">
              <CardHeader className="py-3 px-6">
                <CardTitle className="text-lg">Create Your Content</CardTitle>
              </CardHeader>
              <CardContent className="h-full space-y-3">
                <div className="flex flex-col md:flex-row items-center gap-3">
                  {/* Image Upload Section */}
                  <div className="w-full group border-[1px] rounded-lg border-gray-200 dark:border-blue-900 bg-blue-100/20 dark:bg-blue-900/20 bg-white shadow-sm hover:shadow-md h-56">
                    <div className="w-full">
                      <AnimatePresence>
                        <div
                          id="imageLoad"
                          className={`flex gap-3 overflow-x-auto h-56 flex-wrap items-center justify-center ${images.length > 0 && images.some((media) => media.type !== "video") ? "p-5" : "p-0"} `}
                        >
                          {images.map(
                            (media) =>
                              media.type !== "video" && (
                                <motion.div
                                  key={media.id}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                                  transition={{ duration: 0.3 }}
                                  className="relative aspect-square rounded-lg group/image size-20 "
                                >
                                  <img
                                    src={media.preview}
                                    alt="Preview"
                                    className="w-full h-full object-cover size-20 border-blue-400 border-4"
                                  />

                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => removeImage(media.id)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity"
                                  >
                                    <X size={16} />
                                  </motion.button>
                                </motion.div>
                              )
                          )}

                          {images.some((media) => media.type !== "video") && (
                            <div>
                              <label
                                htmlFor="image-upload"
                                className={`flex flex-col items-center justify-center size-20 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 transition ${images.some((media) => media.type === "video")
                                  ? "opacity-50 cursor-not-allowed"
                                  : "cursor-pointer hover:border-blue-500 hover:text-blue-500"
                                  }`}
                              >
                                <span className="text-4xl">＋</span>
                                <span className="text-xs mt-1 text-center">
                                  Add more
                                </span>
                              </label>
                              <input
                                id="image-upload"
                                type="file"
                                multiple
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                                disabled={
                                  images.length > 0 &&
                                  images.some((media) => media.type === "video")
                                }
                              />
                            </div>
                          )}
                          {!images.some((media) => media.type !== "video") && (
                            <label className={`${images.some((media) => media.type === "video")
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                              } -translate-y-2`}>
                              <motion.div
                                className="flex flex-col items-center justify-center p-2 transition-all"
                                whileHover="hover"
                              >
                                <div className="h-24 w-32 flex items-center justify-center">
                                  <motion.div
                                    className={`bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900 rounded-full md:size-14 size-12 flex items-center justify-center ${images.some((media) => media.type === "video")
                                      ? "opacity-50 cursor-not-allowed"
                                      : "cursor-pointer group-hover:from-blue-200 group-hover:to-blue-300 dark:group-hover:from-blue-800/40 dark:group-hover:to-blue-900/40"
                                      } transition-all duration-300`}
                                    whileHover={!images.some((media) => media.type === "video") ? { scale: 1.1 } : {}}
                                  >
                                    <ImageIcon className="md:size-8 size-6 text-blue-700 dark:text-blue-200" />
                                  </motion.div>
                                </div>
                                <div className="md:text-xl text-base">
                                  Upload Images
                                </div>
                                <p className="text-xs md:text-sm text-gray-500 text-center">
                                  Share photos, graphics or illustration
                                </p>
                                <Button
                                  className={`mt-2 rounded-lg ${images.some((media) => media.type === "video") ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                  variant="outline"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (!images.some((media) => media.type === "video")) {
                                      handleImageButtonClick();
                                    }
                                  }}
                                  disabled={images.some((media) => media.type === "video")}
                                >
                                  <Plus />
                                  Add Images
                                </Button>
                                <input
                                  type="file"
                                  multiple
                                  accept="image/*"
                                  className="hidden"
                                  onChange={handleFileChange}
                                  ref={inputImageRef}
                                  disabled={
                                    images.length > 0 &&
                                    images.some((media) => media.type === "video")
                                  }
                                />
                              </motion.div>
                            </label>
                          )}
                        </div>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Video Upload Section */}
                  <div className="w-full group border-[1px] rounded-lg border-gray-200 dark:border-blue-900 bg-blue-100/20 dark:bg-blue-900/20 bg-white shadow-sm hover:shadow-md h-56">
                    <div className="w-full">
                      <AnimatePresence>
                        <div
                          className={`flex gap-3 items-center justify-center ${images.length > 0 && images.some((media) => media.type === "video") ? "p-5" : "p-0"}`}
                        >
                          {images.map(
                            (media) =>
                              media.type === "video" && (
                                <motion.div
                                  key={media.id}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                                  transition={{ duration: 0.3 }}
                                  className="relative aspect-video rounded-lg group flex items-center justify-center"
                                >
                                  <video
                                    src={media.preview}
                                    className="w-full object-cover h-40 border-green-400 border-4"
                                  />
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => removeImage(media.id)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X size={16} />
                                  </motion.button>
                                </motion.div>
                              )
                          )}
                          {!images.some((media) => media.type === "video") && (
                            <label className={`${images.some((media) => media.type !== "video")
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                              }`}>
                              <motion.div
                                className="flex flex-col items-center justify-center p-2 transition-all"
                                whileHover="hover"
                              >
                                <div className="h-24 w-32 flex items-center justify-center">
                                  <motion.div
                                    className={`bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900 rounded-full md:size-14 size-12 flex items-center justify-center ${images.some((media) => media.type !== "video")
                                      ? "opacity-50 cursor-not-allowed"
                                      : "cursor-pointer group-hover:from-blue-200 group-hover:to-blue-300 dark:group-hover:from-blue-800/40 dark:group-hover:to-blue-900/40"
                                      } transition-all duration-300`}
                                    whileHover={!images.some((media) => media.type !== "video") ? { scale: 1.1 } : {}}
                                  >
                                    <Video className="md:size-8 size-6 text-blue-700 dark:text-blue-200" />
                                  </motion.div>
                                </div>
                                <div className="md:text-xl text-base">
                                  Upload Video
                                </div>
                                <p className="text-xs md:text-sm text-gray-500 text-center">
                                  Share clips, animation or reel
                                </p>
                                <Button
                                  className={`mt-2 rounded-lg ${images.some((media) => media.type !== "video") ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                  variant="outline"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (!images.some((media) => media.type !== "video")) {
                                      handleButtonClick();
                                    }
                                  }}
                                  disabled={images.some((media) => media.type !== "video")}
                                >
                                  <Plus />
                                  Add Video
                                </Button>
                                <input
                                  type="file"
                                  accept="video/*"
                                  className="hidden"
                                  ref={inputRef}
                                  onChange={handleFileChange}
                                  multiple={false}
                                  disabled={
                                    images.length > 0 &&
                                    images.some((media) => media.type !== "video")
                                  }
                                />
                              </motion.div>
                            </label>
                          )}
                        </div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <div
                  className="border shadow-md  dark:border-blue-900 transition-all
      focus-within:outline focus-within:outline-2 focus-within:outline-blue-500 rounded-lg"
                >
                  <Editor
                    value={generatedPost}
                    onChange={(val) => setGeneratedPost(val)}
                    disabled={isPending || isRegenerating}
                  />
                  <div className="flex  flex-col items-start justify-start gap-2 p-5 bg-background dark:bg-blue-600/20 border-t dark:border-blue-900">
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex items-center md:justify-between flex-wrap gap-2 w-full ">
                        <div className="flex gap-2">
                          {postGenerated ? (
                            <Button
                              type="button"
                              onClick={() => setIsRegenerateModalOpen(true)}
                              disabled={isPending || isRegenerating}
                              className="relative overflow-hidden text-white"
                            >
                              <div
                                className={`transform flex items-center gap-2 transition-transform duration-300 ${isPending || isRegenerating ? "-translate-y-[250%]" : "translate-y-0"}`}
                              >
                                <span>Regenerate Post </span> <Repeat />
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
                              className="relative overflow-hidden text-white"
                            >
                              <div
                                className={`transform flex items-center gap-2 transition-transform duration-300 ${isPending || isRegenerating ? "-translate-y-[250%]" : "translate-y-0"}`}
                              >
                                <span>
                                  {" "}
                                  {postGenerated
                                    ? "Regenerate Post"
                                    : "Generate Post"}{" "}
                                </span>{" "}
                                <ArrowRight />
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
                                <Button variant={"outline"} className="">
                                  {" "}
                                  <Filter /> Select Options
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="start"
                                className="w-64"
                              >
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
                                    label: "Text",
                                    data: optionData.text_node,
                                    icon: PencilRuler,
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
                                          <div className="px-2 py-1.5 sticky top-0 bg-white dark:bg-blue-950/10 z-10 border-b">
                                            <input
                                              type="text"
                                              placeholder={`Search ${label}...`}
                                              className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:ring-blue-700  dark:bg-blue-950/40"
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
                                                  ?.querySelectorAll(
                                                    ".dropdown-item"
                                                  )
                                                  .forEach((item) => {
                                                    const text =
                                                      item.textContent?.toLowerCase() ||
                                                      "";
                                                    if (
                                                      text.includes(searchTerm)
                                                    ) {
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
                                              onClick={(e) =>
                                                e.stopPropagation()
                                              }
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
                        <div className="flex items-center gap-2">
                          {!postGenerated && optionData && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  {" "}
                                  <Button
                                    size={"icon"}
                                    className="rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background hover:text-accent-foreground ml-2 shadow-sm hover:shadow border-primary/20 hover:border-primary/30 h-10 w-10 hover:bg-accent"
                                    onClick={handleImproveQuery}
                                  >
                                    <WandSparkles className="text-blue-600" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-white">
                                    Reform your writing with AI
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 10 }}
                                  transition={{ duration: 0.2 }}
                                  className="flex flex-col  items-end w-full"
                                >
                                  <Button
                                    className="tracking-wider w-20 text-white "
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setOpenPost(true);
                                    }}
                                    disabled={isExpired || isPostTextEmpty}
                                  >
                                    <Send /> Post
                                  </Button>
                                </motion.div>
                              </TooltipTrigger>
                              {isExpired && (
                                <TooltipContent className="bg-white dark:bg-gray-800 border-2">
                                  <div className="space-y-3 px-3 py-2">
                                    <p className="text-blue-800 dark:text-blue-300">
                                      Please connect LinkedIn to enable posting
                                    </p>
                                    <Link
                                      to="/integration"
                                      className="flex items-center justify-center text-sm font-medium bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white py-1 px-3 w-full rounded"
                                    >
                                      <LinkedinIcon className="h-4 w-4 mr-2" />
                                      Connect
                                    </Link>
                                  </div>
                                </TooltipContent>
                              )}
                            </Tooltip>
                          </TooltipProvider>
                        </div>

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
                  </div>
                </div>
              </CardContent>
            </Card>

            <RegenerateModal
              isRegenerating={isRegenerating}
              isOpen={isRegenerateModalOpen}
              onClose={() => setIsRegenerateModalOpen(false)}
              onRegenerate={handleRegenerate}
              currentPost={getTextFromHTML(generatedPost)}
            />
          </div>
        </form>
      </div>
      <aside
        className="w-1/3 border-l bg-white dark:bg-blue-950/10 hidden lg:block h-full p-4 overflow-y-auto"
        id="imageLoad"
      >
        {images.length > 0 && (
          <div className="mb-8 relative bg-white dark:bg-blue-950/10 rounded-xl dark:border-blue-900 shadow-xl border-2  p-3  ">
            <div className="p-2 text-xl font-bold dark:text-white text-black">
              Media Preview
            </div>
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
                    className="  bg-black dark:border-blue-400 border bg-opacity-50 text-white p-2 rounded-full shadow-md"
                  >
                    <ChevronLeft size={16} />
                  </motion.button>
                  <div className=" flex justify-center gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all ${index === currentSlide
                          ? " bg-black dark:bg-blue-700 w-4"
                          : " bg-black dark:bg-blue-700 bg-opacity-50 w-2"
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
                    className=" bg-black dark:border-blue-400 border bg-opacity-50 text-white p-2 rounded-full shadow-md"
                  >
                    <ChevronRight size={16} />
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mb-2 flex items-center gap-2 bg-white dark:bg-blue-900/40 w-full justify-between p-3 dark:border-blue-700 border-blue-100 rounded-lg text-black dark:text-white border shadow-md">
          <Label className="flex items-center gap-1">
            <CalendarClock className="size-5" />{" "}
            <span className="font-bold">Schedule Post </span>{" "}
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Switch
                  disabled={isExpired}
                  checked={enabled}
                  onCheckedChange={setEnabled}
                />
              </TooltipTrigger>
              <TooltipContent className="bg-white dark:bg-gray-800 border-2">
                {isExpired ? (
                  <div className="space-y-3 px-3 py-2">
                    <p className="text-blue-800 dark:text-blue-300">
                      Please connect LinkedIn to enable posting
                    </p>
                    <Link
                      to="/integration"
                      className="flex items-center justify-center text-sm font-medium bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white py-1 px-3 w-full rounded"
                    >
                      <LinkedinIcon className="h-4 w-4 mr-2" />
                      Connect
                    </Link>
                  </div>
                ) : (
                  <p className="text-gray-800 dark:text-gray-200">Schedule post</p>
                )}
              </TooltipContent>

            </Tooltip>
          </TooltipProvider>
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
                      className="w-full text-white rounded-lg"
                      disabled={true}
                    >
                      <Clock className="text-white" />
                      Coming Soon
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

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
      <Dialog open={openPost} onOpenChange={setOpenPost}  >
        <DialogTrigger className="hidden">Open</DialogTrigger>
        <DialogContent onInteractOutside={(e) => {
          e.preventDefault();
        }}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="[&>button]:hidden"   >
          <DialogHeader>
            <DialogTitle>Publish Your Post</DialogTitle>
            <p>Choose who can view this post before publishing.</p>
            <DialogDescription>
              <div className="flex my-5 items-center justify-between gap-2">
                <div className="flex flex-col items-start gap-1">
                  <div className="flex  items-center space-x-2 font-bold">
                    <Lock className="size-5" /> <span>Connection Only </span>

                  </div>
                  <span className="text-muted-foreground">
                    {connectionOnly ? "Only your connections will be able to view this post." : "Everyone will be able to view this post."}
                  </span>
                </div>

                <Switch
                  checked={connectionOnly}
                  onCheckedChange={setConnectionOnly}
                  disabled={isExpired}
                />
              </div>
            </DialogDescription>
            <div className="flex items-center justify-end gap-2">
              <Button className="flex items-center dark:text-white bg-white" variant={"outline"} onClick={() => setOpenPost(false)} disabled={publishing}>
                <span className="text-black ">Close </span>
              </Button>
              <Button className="flex items-center" onClick={handlePost} disabled={publishing}>
                <Send className="text-white" />{" "}
                <span className="text-white">Publish </span>
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Drawer>
        <DrawerTrigger>
          <Button className="fixed lg:hidden bottom-10 right-5 rounded-lg text-white">
            Schedule Post
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[600px]">
          <aside
            className=" bg-white dark:bg-blue-950/10  h-full p-4 overflow-y-auto"
            id="imageLoad"
          >
            {images.length > 0 && (
              <div className="mb-8 relative bg-white dark:bg-blue-950/20 dark:border-blue-700 border-blue-100 rounded-lg shadow-xl border-2  p-3  ">
                <div className="p-2 text-xl font-bold text-black dark:text-white ">
                  Media Preview
                </div>
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
                        className="  bg-black dark:border-blue-400 border bg-opacity-50 text-white p-2 rounded-full shadow-md"
                      >
                        <ChevronLeft size={16} />
                      </motion.button>
                      <div className=" flex justify-center gap-2">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-2 rounded-full transition-all ${index === currentSlide
                              ? " bg-black dark:bg-blue-700 w-4"
                              : " bg-black dark:bg-blue-700 bg-opacity-50 w-2"
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
                        className=" bg-black dark:border-blue-400 border bg-opacity-50 text-white p-2 rounded-full shadow-md"
                      >
                        <ChevronRight size={16} />
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mb-2 flex items-center gap-2 bg-white dark:bg-blue-900/40 w-full justify-between p-3 dark:border-blue-700 border-blue-100 rounded-lg text-black dark:text-white border shadow-md">
              <Label className="flex items-center gap-1">
                <CalendarClock className="size-5" />{" "}
                <span className="font-bold">Schedule Post </span>{" "}
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Switch
                      disabled={isExpired}
                      checked={enabled}
                      onCheckedChange={setEnabled}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {isExpired ? "Please connect LinkedIn" : "Schedule post"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
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
                          className="w-full text-white rounded-lg"
                          disabled={true}
                        >
                          <Clock className="text-white" /> Coming soon
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

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
        </DrawerContent>
      </Drawer>
    </div>
  );
}
