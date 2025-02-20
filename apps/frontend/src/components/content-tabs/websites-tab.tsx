import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export function WebsitesTab() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [metadata, setMetadata] = useState<{
    title?: string;
    description?: string;
  } | null>(null);

  const validateWebsiteUrl = (url: string) => {
    const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return regex.test(url);
  };

  const handlePreviewWebsite = async () => {
    if (validateWebsiteUrl(websiteUrl)) {
      setIsValidUrl(true);
      try {
        // TODO: Implement actual metadata fetching logic
        // This is a mock implementation
        const response = await fetch(
          `/api/fetch-metadata?url=${encodeURIComponent(websiteUrl)}`
        );
        const data = await response.json();
        setMetadata(data);
      } catch (error) {
        console.error("Error fetching metadata:", error);
        setMetadata(null);
      }
    } else {
      setIsValidUrl(false);
      setMetadata(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Website/Article</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="website-url">Website URL</Label>
            <div className="flex space-x-2">
              <Input
                id="website-url"
                placeholder="https://example.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className={!isValidUrl ? "border-red-500" : ""}
              />
              <Button onClick={handlePreviewWebsite}>Preview</Button>
            </div>
            {!isValidUrl && (
              <p className="text-sm text-red-500">
                Please enter a valid website URL
              </p>
            )}
          </div>
          {metadata && (
            <div className="mt-4">
              <h4 className="mb-2 font-semibold">Website Metadata:</h4>
              <p>
                <strong>Title:</strong> {metadata.title}
              </p>
              <p>
                <strong>Description:</strong> {metadata.description}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
