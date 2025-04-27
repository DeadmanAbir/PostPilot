import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchTweetFn } from "@/lib/tanstack-query/mutation";
import { useAuth } from "@/providers/supabaseAuthProvider";
import { Tweet } from "react-tweet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export function TweetsTab() {
  const [tweetUrl, setTweetUrl] = useState("");
  const [tweetName, setTweetName] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { mutate: fetchTweet, isPending: isFetching } = fetchTweetFn(
    user?.accessToken!,
    {
      onSuccess: () => {
        toast.success("Tweet fetched successfully");
        setTweetUrl("");
        setTweetName("");
        setIsValidUrl(true);
        queryClient.invalidateQueries({ queryKey: ["sources"] });
      },
      onError: (error: unknown) => {
        console.log(error);
        toast.error("Error in fetching tweet");
      },
    }
  );

  const validateTweetUrl = (url: string) => {
    if (!url) return false;
    try {
      const twitterUrlRegex =
        /^(?:https?:\/\/)?(?:www\.|mobile\.)?(?:twitter\.com|x\.com)\/[^\/]+\/(?:status|statuses)\/(\d+)(?:\/(?:photo|video|analytics|retweets|likes|quotes|[\d]+)?)?(?:\?.*)?$/i;

      return twitterUrlRegex.test(url);
    } catch {
      return false;
    }
  };
  const extractTweetId = (url: string): string | null => {
    const match = url.match(/status\/(\d+)/);
    return match?.[1] ?? null;
  };
  const handlePreviewTweet = () => {
    if (validateTweetUrl(tweetUrl)) {
      fetchTweet({ tweetUrl, title: tweetName });
    } else {
      setIsValidUrl(false);
    }
  };

  return (
    <div className="w-full h-full ">
      <Card>
        <CardHeader>
          <CardTitle>Tweet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePreviewTweet();
                }}
                className="flex space-x-2"
              >
                <Input
                  id="tweet-name"
                  placeholder="Enter a name for this tweet"
                  value={tweetName}
                  onChange={(e) => setTweetName(e.target.value)}
                  required
                       className="h-10 focus:outline-none focus:ring-2 focus:ring-offset-[3px] focus:ring-blue-500 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900"
                />
                <Input
                  id="tweet-url"
                  placeholder="https://twitter.com/user/status/123456789"
                  value={tweetUrl}
                  onChange={(e) => {
                    setTweetUrl(e.target.value);
                    setIsValidUrl(true);
                  }}
                  className={`h-10 focus:outline-none focus:ring-2 focus:ring-offset-[3px] focus:ring-blue-500 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900 ${!isValidUrl ? "border-red-500" : ""}`}                  required
                />
                <Button type="submit" disabled={isFetching} className="h-10">
                  Add Tweet
                </Button>
              </form>

              {!isValidUrl && (
                <p className="text-sm text-red-500">
                  Please enter a valid Twitter/X URL
                </p>
              )}
            </div>
            {isValidUrl && tweetUrl && (
              <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Preview Tweet</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Tweet Preview</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <Tweet id={extractTweetId(tweetUrl)!} />
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
