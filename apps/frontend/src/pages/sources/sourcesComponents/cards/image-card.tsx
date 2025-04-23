import { Card, CardHeader, CardContent } from "@/components/ui/card"; // Assuming shadcn/ui Card components are in this path
import { Image as ImageIcon } from "lucide-react";

interface ImageCardProps {
  title: string;
  avatarSrc: string;
}

export function ImageCard({ title, avatarSrc }: ImageCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow h-fit">
      <CardHeader className="flex flex-row items-center gap-2 p-4">
        <ImageIcon className="h-4 w-4 text-blue-500" />
        <h3 className="font-medium">{title}</h3>
      </CardHeader>
      <CardContent className="p-4 ">
  <img src={avatarSrc} alt={title} className="w-full h-48 object-cover rounded-b" />
</CardContent>
    </Card>
  );
}
