import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/supabaseAuthProvider";
import { fetchWebsiteFn } from "@/lib/tanstack-query/mutation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export function WebsitesTab() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { mutate: fetchWebsite, isPending: isFetching } = fetchWebsiteFn(
    user?.accessToken!,
    {
      onSuccess: () => {
        toast.success("website fetched  successfully");
        setWebsiteUrl("");
        queryClient.invalidateQueries({ queryKey: ["sources"] });
      },
      onError: (error: unknown) => {
        console.log(error);
        toast.error("error in fetching");
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
    <div className="w-full h-full ">
    <Card>
      <CardHeader>
        <CardTitle>Website/Article</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-3">
            <Label htmlFor="website-url">Website URL</Label>
            <div className="flex space-x-2">
              <Input
                id="website-url"
                placeholder="https://example.com"
                value={websiteUrl}
                
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className={`h-10 focus:outline-none focus:ring-2 focus:ring-offset-[3px] focus:ring-blue-500 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900 ${!isValidUrl ? "border-red-500" : ""}`}

              />
              <Button disabled={isFetching} onClick={handlePreviewWebsite} className="h-10">
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
