import { Twitter } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TweetCardProps {
  username: string;
  handle: string;
  content: string;
  avatar: string;
}

export function TweetCard({
  username,
  handle,
  content,
  avatar,
}: TweetCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-2 p-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatar} alt={username} />
          <AvatarFallback>{username[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="font-medium">{username}</h3>
          <p className="text-sm text-muted-foreground">@{handle}</p>
        </div>
        <Twitter className="ml-auto h-4 w-4 text-blue-400" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm">{content}</p>
      </CardContent>
    </Card>
  );
}
