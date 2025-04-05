import { Tweet } from "react-tweet";

interface TweetCardProps {
  url: string;
}

export function TweetCard({ url }: TweetCardProps) {
  const extractTweetId = (url: string): string | null => {
    const match = url.match(/status\/(\d+)/);
    return match?.[1] ?? null;
  };
  return (
    <div className="">
      <Tweet id={extractTweetId(url)!} />
    </div>
  );
}
