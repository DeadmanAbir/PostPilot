import { FilesTab } from "@/pages/sources/sourcesComponents/content-tabs/files-tab";
import { ImagesTab } from "@/pages/sources/sourcesComponents/content-tabs/images-tab";
import { TextNoteTab } from "@/pages/sources/sourcesComponents/content-tabs/text-node-tab";
import { TweetsTab } from "@/pages/sources/sourcesComponents/content-tabs/tweets-tab";
import { WebsitesTab } from "@/pages/sources/sourcesComponents/content-tabs/websites-tab";
import { YouTubeTab } from "@/pages/sources/sourcesComponents/content-tabs/youtube-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileIcon,
  FileTextIcon,
  ImageIcon,
  LinkIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
const LinkSection = () => {
  return (
    <div className="h-full w-full p-5">
      <Tabs defaultValue="youtube" className="w-full ">
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
    </div>
  );
};

export default LinkSection;
