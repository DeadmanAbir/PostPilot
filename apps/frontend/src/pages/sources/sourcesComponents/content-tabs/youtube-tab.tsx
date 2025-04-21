import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function YouTubeTab() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const extractYouTubeVideoId = (url: string): string | null => {
    const regex =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match?.[1] || null;
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setYoutubeUrl(url);

    const id = extractYouTubeVideoId(url);
    if (id) {
      setVideoId(id);
    } else {
      setVideoId("");
    }
  };

  const handleUpload = async () => {
    if (!videoId || !videoTitle.trim()) {
      toast.error("Please enter a valid YouTube URL and title.");
      return;
    }

    try {
      setIsUploading(true);
      const res = await fetch("/api/upload-youtube", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: videoTitle, url: youtubeUrl, videoId }),
      });

      if (!res.ok) throw new Error("Failed to upload");

      toast.success("YouTube video uploaded successfully!");
      setYoutubeUrl("");
      setVideoTitle("");
      setVideoId("");
    } catch (error) {
      console.error(error);
      toast.error("Error uploading YouTube video.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full h-full ">
      <Card>
        <CardHeader className="">
          <CardTitle>YouTube Video</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex w-full items-center gap-2">
              <div className="flex flex-col  w-full">
                <Input
                  id="youtube-url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={handleUrlChange}
                               className="h-10 focus:outline-none focus:ring-2 focus:ring-offset-[3px] focus:ring-blue-500 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900"
                  required
                />
              </div>
              <Button
                onClick={handleUpload}
                className="w-fit h-10"
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload to API"}
              </Button>
            </div>



            {videoId && (
              <div className="aspect-video w-full mt-4">
                <iframe
                  className="w-full h-full rounded-xl"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video preview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}


          </div>
        </CardContent>
      </Card>
    </div>
  );
}
