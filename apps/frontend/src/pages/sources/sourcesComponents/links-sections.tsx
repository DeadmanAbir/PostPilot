import {
  FileIcon,
  FileTextIcon,
  ImageIcon,
  LinkIcon,
  TwitterIcon,
  YoutubeIcon,
} from 'lucide-react';

import { CardStack } from './cards/stacking-cards';

import { FilesTab } from '@/pages/sources/sourcesComponents/content-tabs/files-tab';
import { ImagesTab } from '@/pages/sources/sourcesComponents/content-tabs/images-tab';
import { TextNoteTab } from '@/pages/sources/sourcesComponents/content-tabs/text-node-tab';
import { TweetsTab } from '@/pages/sources/sourcesComponents/content-tabs/tweets-tab';
import { WebsitesTab } from '@/pages/sources/sourcesComponents/content-tabs/websites-tab';
import { YouTubeTab } from '@/pages/sources/sourcesComponents/content-tabs/youtube-tab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Highlight } from '@/utils/highlight';
const LinkSection = () => {
  return (
    <div className="h-full w-full p-5 grid grid-cols-6 gap-5 ">
      <Tabs defaultValue="youtube" className="col-span-4  ">
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
        <TabsContent value="youtube" className="h-full">
          <YouTubeTab />
        </TabsContent>
        <TabsContent value="files" className="h-full">
          <FilesTab />
        </TabsContent>
        <TabsContent value="images" className="h-full">
          <ImagesTab />
        </TabsContent>
        <TabsContent value="tweets" className="h-full">
          <TweetsTab />
        </TabsContent>
        <TabsContent value="notes" className="h-full">
          <TextNoteTab />
        </TabsContent>
        <TabsContent value="websites" className="h-full">
          <WebsitesTab />
        </TabsContent>
      </Tabs>
      <div className="flex items-center justify-center col-span-2 h-[400px] ">
        <CardStack items={CARDS} />
      </div>
    </div>
  );
};

export default LinkSection;

const CARDS = [
  {
    id: 0,
    name: 'Manu Arora',
    designation: 'Senior Software Engineer',
    content: (
      <p>
        These cards are amazing, <Highlight>I want to use them</Highlight> in my
        project. Framer motion is a godsend ngl tbh fam 🙏
      </p>
    ),
  },
  {
    id: 1,
    name: 'Elon Musk',
    designation: 'Senior Shitposter',
    content: (
      <p>
        I dont like this Twitter thing,{' '}
        <Highlight>deleting it right away</Highlight> because yolo. Instead, I
        would like to call it <Highlight>X.com</Highlight> so that it can easily
        be confused with adult sites.
      </p>
    ),
  },
  {
    id: 2,
    name: 'Tyler Durden',
    designation: 'Manager Project Mayhem',
    content: (
      <p>
        The first rule of
        <Highlight>Fight Club</Highlight> is that you do not talk about fight
        club. The second rule of
        <Highlight>Fight club</Highlight> is that you DO NOT TALK about fight
        club.
      </p>
    ),
  },
];
