import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export function NoPostsCard() {
  return (
    <Card className="w-full bg-gradient-to-br from-slate-100 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-black text-white border border-slate-200 dark:border-slate-700 rounded-lg">
      <CardHeader className="pb-2"></CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col items-center py-6 text-center">
          <div className="p-3 mb-4 rounded-full bg-blue-50 dark:bg-slate-700">
            <FileText size={24} className="text-blue-500 dark:text-blue-400" />
          </div>

          <p className="text-slate-700 dark:text-slate-300 mb-1 font-medium">
            No posts available
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Create your first post to start building your content library
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
