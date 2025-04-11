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
    <Card className="w-64 h-64 flex flex-col items-center text-center text-muted-foreground">
      <CardHeader className="pb-0">
        <CardTitle>No Resource Found</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center flex-grow -mt-[30px]">
        <div className="rounded-full bg-gray-200 text-gray-600 w-12 h-12 flex items-center justify-center">
          <Plus
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              navigate({
                to: path,
              });
            }}
          />
        </div>
        <p className="mt-2 text-sm">Add {value}</p>
      </CardContent>
    </Card>
  );
}
