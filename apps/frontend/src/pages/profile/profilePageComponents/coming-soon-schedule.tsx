import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export function ComingSoonCard() {
  return (
    <Card className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
      <CardHeader className="pb-2"></CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col items-center py-6 text-center">
          <div className="p-3 mb-4 rounded-full bg-purple-50 dark:bg-slate-700">
            <Calendar
              size={24}
              className="text-purple-500 dark:text-purple-400"
            />
          </div>

          <p className="text-slate-700 dark:text-slate-300 mb-1 font-medium">
            Coming soon
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            This feature is currently under development and will be available
            soon.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
