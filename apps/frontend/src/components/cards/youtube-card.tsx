import { Youtube } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface YoutubeCardProps {
  title: string;
  thumbnail: string;
  videoId: string;
}

export function YoutubeCard({ title, thumbnail, videoId }: YoutubeCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-2 p-4">
        <Youtube className="h-4 w-4 text-red-500" />
        <h3 className="font-medium truncate">{title}</h3>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative aspect-video">
          <img
            src={thumbnail || "/placeholder.svg"}
            alt={title}
            className="object-cover rounded-b-lg"
          />
        </div>
      </CardContent>
    </Card>
  );
}
