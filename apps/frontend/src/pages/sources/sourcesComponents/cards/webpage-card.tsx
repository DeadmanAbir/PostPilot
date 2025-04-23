import { Globe } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface WebpageCardProps {
  title?: string;
  url: string;
}

export function WebpageCard({ title, url }: WebpageCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow ">
      <CardHeader className="flex flex-row items-center gap-2 p-4">
        <Globe className="h-4 w-4 text-blue-500" />
        <h3 className="font-medium">{title}</h3>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground truncate">{url}</p>
      </CardContent>
    </Card>
  );
}
