import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface YoutubeCardProps {
  videoId: string;
}

export function YoutubeCard({ videoId }: YoutubeCardProps) {
  return (
       <Card className="hover:shadow-md transition-shadow ">
      <CardHeader className=" flex-row items-center gap-2 p-4 hidden">
  
      </CardHeader>
      <CardContent className="p-4 ">
      <iframe
        width="100%"
        height="100%"
        src={videoId}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="rounded-lg w-full h-full"
      ></iframe>
      </CardContent>
    </Card>

  );
}