import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/supabaseAuthProvider";
import { fetchWebsiteFn } from "@/lib/tanstack-query/mutation";

export function WebsitesTab() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);
  const { user } = useAuth();

  const { mutate: fetchWebsite, isPending: isFetching } = fetchWebsiteFn(
    user?.accessToken!,
    {
      onSuccess: () => {
        alert("website fetched  successfully");
        setWebsiteUrl("");
      },
      onError: (error: unknown) => {
        console.log(error);
        alert("error in fetching");
      },
    }
  );

  const validateWebsiteUrl = (url: string) => {
    if (!url) return false;

    try {
      const websiteUrlRegex =
        /^(?:(?:https?:)?\/\/)?(?:www\.)?([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?::\d{1,5})?(?:\/[^\s]*)?$/;

      return websiteUrlRegex.test(url);
    } catch (error) {
      return false;
    }
  };

  const handlePreviewWebsite = async () => {
    if (validateWebsiteUrl(websiteUrl)) {
      setIsValidUrl(true);
      fetchWebsite(websiteUrl);
    } else {
      setIsValidUrl(false);
    }
  };

  return (
    <div className="w-full h-full py-20">
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
              <Button disabled={isFetching} onClick={handlePreviewWebsite}>
                Add Link
              </Button>
            </div>
            {!isValidUrl && (
              <p className="text-sm text-red-500">
                Please enter a valid website URL
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  );
}
