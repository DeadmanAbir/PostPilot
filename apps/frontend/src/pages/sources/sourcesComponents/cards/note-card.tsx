import { CalendarIcon, FileText } from "lucide-react";
import { Suspense } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
interface NoteCardProps {
  title: string;
  content: string;
  timestamp: string;
}

export function NoteCard({ title, content, timestamp }: NoteCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow border-2 border-blue-100 dark:border-blue-900 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-zinc-900 rounded-xl overflow-hidden group">
      <CardHeader className="flex flex-row items-center gap-3 p-4 bg-blue-50/70 dark:bg-blue-950/60 border-b border-blue-100 dark:border-blue-900">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full group-hover:filter group-hover:brightness-110 group-hover:saturate-150 transition duration-150">
          <FileText className="h-6 w-6 text-blue-500" />
        </div>
        <h3 className="font-semibold text-base truncate flex-1" title={title}>
          {title}
        </h3>
      </CardHeader>
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
          <CalendarIcon className="h-4 w-4" />
          <span>{timestamp}</span>
        </div>
        <div className="rounded-lg border border-blue-100 dark:border-blue-900 bg-white dark:bg-zinc-900 p-2 min-h-[72px]">
          <Suspense
            fallback={
              <div className="h-20 flex items-center justify-center gap-4">
                Loading..
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              </div>
            }
          >
            <Textarea
              value={content}
              className="outline-none dark:bg-background resize-none"
              disabled={true}
            />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
}
