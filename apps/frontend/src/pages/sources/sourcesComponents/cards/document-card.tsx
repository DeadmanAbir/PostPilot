import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface DocumentCardProps {
  title: string;
  type: string;
  preview?: string;
}

export function DocumentCard({ title, type, preview }: DocumentCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-2 p-4">
        <FileText className="h-4 w-4 text-orange-500" />
        <h3 className="font-medium">{title}</h3>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-xs text-muted-foreground uppercase">{type}</p>
        {preview && (
          <div className="mt-2 text-sm text-muted-foreground">{preview}</div>
        )}
      </CardContent>
    </Card>
  );
}
