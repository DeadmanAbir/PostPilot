import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  YoutubeIcon,
  FileIcon,
  ImageIcon,
  TwitterIcon,
  FileTextIcon,
  LinkIcon,
} from "lucide-react";

import { YouTubeTab } from "./content-tabs/youtube-tab";
import { FilesTab } from "./content-tabs/files-tab";
import { ImagesTab } from "./content-tabs/images-tab";
import { TweetsTab } from "./content-tabs/tweets-tab";
import { WebsitesTab } from "./content-tabs/websites-tab";
import { RegenerateModal } from "./regenerate-modal";
import { TextNoteTab } from "./content-tabs/text-node-tab";

export function PostGenerator() {
  const [generatedPost, setGeneratedPost] = useState("");
  const [isRegenerateModalOpen, setIsRegenerateModalOpen] = useState(false);

  const handleGenerate = async () => {
    // TODO: Implement actual AI generation logic
    setGeneratedPost(
      "This is a sample generated post. Replace with actual AI-generated content."
    );
  };

  const handleRegenerate = async (additionalContext: string) => {
    // TODO: Implement actual AI regeneration logic
    setGeneratedPost(`Regenerated post with context: ${additionalContext}`);
    setIsRegenerateModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="youtube" className="w-full">
        <TabsList>
          <TabsTrigger value="youtube">
            <YoutubeIcon className="mr-2 h-4 w-4" />
            YouTube Video
          </TabsTrigger>
          <TabsTrigger value="files">
            <FileIcon className="mr-2 h-4 w-4" />
            Files
          </TabsTrigger>
          <TabsTrigger value="images">
            <ImageIcon className="mr-2 h-4 w-4" />
            Images
          </TabsTrigger>
          <TabsTrigger value="tweets">
            <TwitterIcon className="mr-2 h-4 w-4" />
            Tweets
          </TabsTrigger>
          <TabsTrigger value="notes">
            <FileTextIcon className="mr-2 h-4 w-4" />
            Text Note
          </TabsTrigger>
          <TabsTrigger value="websites">
            <LinkIcon className="mr-2 h-4 w-4" />
            Websites/Articles
          </TabsTrigger>
        </TabsList>
        <TabsContent value="youtube">
          <YouTubeTab />
        </TabsContent>
        <TabsContent value="files">
          <FilesTab />
        </TabsContent>
        <TabsContent value="images">
          <ImagesTab />
        </TabsContent>
        <TabsContent value="tweets">
          <TweetsTab />
        </TabsContent>
        <TabsContent value="notes">
          <TextNoteTab />
        </TabsContent>
        <TabsContent value="websites">
          <WebsitesTab />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Generate Post</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter your prompt for AI generation..."
            className="min-h-[100px]"
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerate}>Generate Post</Button>
        </CardFooter>
      </Card>

      {generatedPost && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Post</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{generatedPost}</p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              onClick={() => setIsRegenerateModalOpen(true)}
            >
              Regenerate
            </Button>
            <Button className="ml-2">Use This Post</Button>
          </CardFooter>
        </Card>
      )}

      <RegenerateModal
        isOpen={isRegenerateModalOpen}
        onClose={() => setIsRegenerateModalOpen(false)}
        onRegenerate={handleRegenerate}
        currentPost={generatedPost}
      />
    </div>
  );
}
