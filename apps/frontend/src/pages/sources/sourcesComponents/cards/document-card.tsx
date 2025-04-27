import { Calendar, CalendarIcon, FileText } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface DocumentCardProps {
  title: string;
  type: string;
  preview?: string;
  createdAt: string;
}

export function DocumentCard({ title, type, preview , createdAt }: DocumentCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow border-2 border-blue-100 dark:border-blue-900 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-zinc-900 rounded-xl overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-3 p-4 bg-blue-50/70 dark:bg-blue-950/60 border-b border-blue-100 dark:border-blue-900">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full">
          <FileText className="h-6 w-6 text-blue-500" />
        </div>
        <h3 className="font-semibold text-base truncate flex-1" title={title}>{title}</h3>
      </CardHeader>
      <CardContent className="p-4 flex flex-col gap-2">
        <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 dark:text-blue-300 bg-blue-100 dark:bg-blue-900 rounded uppercase w-fit tracking-wide shadow-sm">
          {type}
        </span>
        {preview && (
          <div className="text-sm text-gray-700 dark:text-gray-300 mt-1 line-clamp-2">{preview}</div>
        )}
        {createdAt && (
          <div className="text-xs text-muted-foreground mt-1 flex items-center">
        <CalendarIcon className="h-4 w-4 mr-1" />  <span>{createdAt}  </span>   
          </div>
        )}
      </CardContent>
    </Card>
  );
}
