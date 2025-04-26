import { CalendarIcon, Globe } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDate } from "@/utils/functions/formatDate";

interface WebpageCardProps {
  title?: string;
  url: string;
  createdAt: string;
  screenShot:string;
}



export function WebpageCard({ title, url, createdAt,screenShot }: WebpageCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow border-2 border-blue-100 dark:border-blue-900 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-zinc-900 rounded-xl overflow-hidden group">
      <CardHeader className="flex flex-row items-center gap-3 p-4 bg-blue-50/70 dark:bg-blue-950/60 border-b border-blue-100 dark:border-blue-900">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full group-hover:filter group-hover:brightness-110 group-hover:saturate-150 transition duration-150">
          <Globe className="h-6 w-6 text-blue-500" />
        </div>
        <h3 className="font-semibold text-base truncate flex-1" title={title}>{title}</h3>
      </CardHeader>
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="w-full h-32 rounded-lg overflow-hidden bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
          <img src={screenShot} alt="Website preview" className="w-full h-full object-cover" />
        </div>
        <p className="text-sm text-muted-foreground truncate w-full mt-2">{url}</p>
        <div className="flex items-center text-xs text-muted-foreground truncate w-full mt-2">
          <CalendarIcon className="h-4 w-4 mr-1" />
          <span>{formatDate(createdAt)}</span>
        </div>

      </CardContent>
    </Card>
  );
}
