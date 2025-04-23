import { Globe } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface WebpageCardProps {
  title?: string;
  url: string;
}

const DEFAULT_IMAGE = "/og-image.png"; // Place a default image in your public folder

export function WebpageCard({ title, url }: WebpageCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow ">
      <CardHeader className="flex flex-row items-center gap-2 p-4">
        <Globe className="h-4 w-4 text-blue-500" />
        <h3 className="font-medium">{title}</h3>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex flex-col items-center">
        <img src={DEFAULT_IMAGE} alt="Website preview" className="w-full h-32 object-cover rounded mb-2 bg-muted" />
        <p className="text-sm text-muted-foreground truncate w-full">{url}</p>
      </CardContent>
    </Card>
  );
}
