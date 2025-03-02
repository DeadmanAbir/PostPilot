import { DocumentCard } from "@/components/cards/document-card";
import { NoteCard } from "@/components/cards/note-card";
import { TweetCard } from "@/components/cards/tweet-card";
import { WebpageCard } from "@/components/cards/webpage-card";
import { YoutubeCard } from "@/components/cards/youtube-card";
import { FilesTab } from "@/components/content-tabs/files-tab";
import { ImagesTab } from "@/components/content-tabs/images-tab";
import { TextNoteTab } from "@/components/content-tabs/text-node-tab";
import { TweetsTab } from "@/components/content-tabs/tweets-tab";
import { WebsitesTab } from "@/components/content-tabs/websites-tab";
import { YouTubeTab } from "@/components/content-tabs/youtube-tab";
import { Nav } from "@/components/nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileIcon,
  FileTextIcon,
  ImageIcon,
  LinkIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
const sources = () => {
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
      <Nav />
      <main className="container mx-auto p-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <WebpageCard
            title="Example Website"
            url="https://example.com/article"
          />
          <DocumentCard
            title="Project Proposal"
            type="PDF Document"
            preview="A comprehensive proposal for..."
          />
          <TweetCard
            username="John Doe"
            handle="johndoe"
            content="This is an example tweet with some interesting content..."
            avatar="/placeholder.svg"
          />
          <YoutubeCard
            title="How to Build a Second Brain"
            thumbnail="/placeholder.svg"
            videoId="xyz123"
          />
          <NoteCard
            title="Meeting Notes"
            content="Key points from today's meeting..."
            timestamp="2 hours ago"
          />
        </div>
      </main>
    </div>
  );
};

export default sources;
