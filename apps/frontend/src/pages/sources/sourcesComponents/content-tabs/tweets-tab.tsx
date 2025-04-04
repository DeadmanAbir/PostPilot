import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { fetchTweetFn } from "@/lib/tanstack-query/mutation";
import { useAuth } from "@/providers/supabaseAuthProvider";

export function TweetsTab() {
  const [tweetUrl, setTweetUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);

  const { user } = useAuth();

  const { mutate: fetchTweet, isPending: isFetching } = fetchTweetFn(
    user?.accessToken!,
    {
      onSuccess: () => {
        alert("tweet fetched  successfully");
        setTweetUrl("");
      },
      onError: (error: unknown) => {
        console.log(error);
        alert("error in fetching");
      },
    }
  );

  const validateTweetUrl = (url: string) => {
    if (!url) return false;
    try {
      const twitterUrlRegex =
        /^(?:https?:\/\/)?(?:www\.|mobile\.)?(?:twitter\.com|x\.com)\/[^\/]+\/(?:status|statuses)\/(\d+)(?:\/(?:photo|video|analytics|retweets|likes|quotes|[\d]+)?)?(?:\?.*)?$/i;

      return twitterUrlRegex.test(url);
    } catch (error) {
      return false;
    }
  };

  const handlePreviewTweet = () => {
    if (validateTweetUrl(tweetUrl)) {
      //mutation fn
      fetchTweet(tweetUrl);
    } else {
      setIsValidUrl(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tweet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="tweet-url">Tweet URL</Label>
            <div className="flex space-x-2">
              <Input
                id="tweet-url"
                placeholder="https://twitter.com/user/status/123456789"
                value={tweetUrl}
                onChange={(e) => setTweetUrl(e.target.value)}
                className={!isValidUrl ? "border-red-500" : ""}
              />
              <Button onClick={handlePreviewTweet} disabled={isFetching}>
                Preview Tweet
              </Button>
            </div>
            {!isValidUrl && (
              <p className="text-sm text-red-500">
                Please enter a valid Twitter/X URL
              </p>
            )}
          </div>
          {/* TODO: Add tweet preview component here */}
        </div>
      </CardContent>
    </Card>
  );
}
