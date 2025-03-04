import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function YouTubeTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>YouTube Video</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="youtube-url">YouTube URL</Label>
            <Input
              id="youtube-url"
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
