import { Card, CardHeader, CardContent } from "@/components/ui/card"; // Assuming shadcn/ui Card components are in this path
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Assuming shadcn/ui Avatar components are in this path
import { Image } from "lucide-react";

interface ImageCardProps {
  title: string;
  avatarSrc: string;
}

export function ImageCard({ title, avatarSrc }: ImageCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-2 p-4">
        <Image className="h-4 w-4 text-blue-500" />
        <h3 className="font-medium">{title}</h3>
      </CardHeader>
      <CardContent className="p-0">
        <Avatar className="w-full h-auto aspect-square">
          <AvatarImage src={avatarSrc} alt={title} className="object-cover" />
          <AvatarFallback>{title}</AvatarFallback>
        </Avatar>
      </CardContent>
    </Card>
  );
}
