import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { lazy, Suspense } from "react";
const Editor = lazy(() => import("../../../../components/tiptap-editor"));
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
        <p className="mt-2 text-xs text-muted-foreground">{timestamp}</p>
        <Suspense fallback={<div className="h-20 flex items-center justify-center gap-4">
          Loading..
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />

        </div>}>

          <Editor
            value={content}
            onChange={() => { }}
            placeholder="Write your note..."
          />
        </Suspense>


      </CardContent>
    </Card>
  );
}
