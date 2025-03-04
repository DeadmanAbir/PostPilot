import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export function TweetsTab() {
  const [tweetUrl, setTweetUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);

  const validateTweetUrl = (url: string) => {
    // Basic validation for Twitter/X URLs
    const regex =
      /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/status\/[0-9]+/;
    return regex.test(url);
  };

  const handlePreviewTweet = () => {
    if (validateTweetUrl(tweetUrl)) {
      setIsValidUrl(true);
      // TODO: Implement tweet preview logic
      console.log("Preview tweet:", tweetUrl);
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
              <Button onClick={handlePreviewTweet}>Preview Tweet</Button>
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
