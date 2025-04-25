import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export function CreateSourceCard({
  value,
  path,
}: {
  value: string;
  path: string;
}) {
  const navigate = useNavigate();
  return (
    <Card
      className="w-64 h-64 flex flex-col items-center text-center text-muted-foreground 
        bg-gradient-to-br from-white via-blue-50 to-blue-100 
        dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-slate-900
        shadow-xl border border-blue-200 dark:border-slate-700 rounded-3xl 
        transition-transform duration-200 cursor-pointer"
    >
      <CardHeader className="pb-0 hidden">
        <CardTitle className="text-lg font-semibold text-blue-700 dark:text-blue-200 drop-shadow-sm">
          No Resource Found
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center flex-grow -mt-[30px]">
        {/* <div
          className="rounded-full bg-gradient-to-tr from-blue-400 via-blue-300 to-blue-200 
            dark:from-blue-800 dark:via-blue-700 dark:to-blue-600
            text-white w-16 h-16 flex items-center justify-center shadow-lg 
            transition-all duration-200 hover:scale-110 hover:bg-blue-500 dark:hover:bg-blue-700"
          onClick={() => {
            navigate({
              to: path,
            });
          }}
          style={{ boxShadow: "0 6px 30px 0 rgba(0, 80, 220, 0.10)" }}
        >
          <Plus className="w-8 h-8" />
        </div> */}
        <CardTitle className="text-lg font-semibold text-blue-700 dark:text-blue-200 drop-shadow-sm">
          No Resource Found
        </CardTitle>
        <p className="mt-4 text-base font-medium text-blue-600 dark:text-blue-300">Add {value}</p>
      </CardContent>
    </Card>
  );
}
