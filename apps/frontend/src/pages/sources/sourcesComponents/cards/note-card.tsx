import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface NoteCardProps {
  title: string;
  content: string;
  timestamp: string;
}

export function NoteCard({ title, content, timestamp }: NoteCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-2 p-4">
        <FileText className="h-4 w-4 text-green-500" />
        <h3 className="font-medium">{title}</h3>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3">{content}</p>
        <p className="mt-2 text-xs text-muted-foreground">{timestamp}</p>
      </CardContent>
    </Card>
  );
}
