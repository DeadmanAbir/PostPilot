import { DocumentCard } from "@/pages/sources/sourcesComponents/cards/document-card";
import { NoteCard } from "@/pages/sources/sourcesComponents/cards/note-card";
import { TweetCard } from "@/pages/sources/sourcesComponents/cards/tweet-card";
import { WebpageCard } from "@/pages/sources/sourcesComponents/cards/webpage-card";
import { YoutubeCard } from "@/pages/sources/sourcesComponents/cards/youtube-card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchSourcesQuery } from "@/lib/tanstack-query/query";
import { useAuth } from "@/providers/supabaseAuthProvider";
import { ImageCard } from "./cards/image-card";
import { CreateSourceCard } from "./cards/create-source-card";
type SourceData = {
  websites: { title: string; url: string }[];
  files: { name: string }[];
  text_node: { name: string; description: string }[];
  images: { name: string; url: string }[];
  tweets: { id: string; url: string }[];
  youtube: { name: string; url: string }[];
};
const PreviewSection = () => {
  const { user } = useAuth();
  const queryResult = user?.accessToken ? fetchSourcesQuery(user.accessToken) : { data: null, isPending: false };
  const data: SourceData | null = queryResult.data ?? null;
  const isPending: boolean = queryResult.isPending ?? false;

  if (isPending) {
    return <h1>fetching.....</h1>;
  }
  return (
    <div className="w-full h-full p-4">
      <Tabs defaultValue="all" className="w-full ">
        <TabsList className="w-full items-center justify-start bg-transparent">
          <TabsTrigger
            value="all"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            All Memories
          </TabsTrigger>
          <TabsTrigger
            value="websites"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Websites
          </TabsTrigger>

          <TabsTrigger
            value="tweets"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Tweets
          </TabsTrigger>

          <TabsTrigger
            value="images"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Images
          </TabsTrigger>
          <TabsTrigger
            value="files"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Files
          </TabsTrigger>
          <TabsTrigger
            value="text_node"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Notes
          </TabsTrigger>
          <TabsTrigger
            value="youtube"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            YouTube
          </TabsTrigger>
        </TabsList>
        <div id="imageLoad" className="min-h-[500px] max-h-[70vh] overflow-y-auto transition-all duration-300">
          <TabsContent value="all">
            <div className="grid grid-cols-3 gap-4">
              {data?.websites?.map((item) => (
                <WebpageCard key={item.url} title={item.title} url={item.url} />
              ))}
              {data?.files?.map((item) => (
                <DocumentCard
                  key={item.name}
                  title={item.name}
                  type="PDF Document"
                  preview="A comprehensive proposal for..."
                />
              ))}
              {data?.text_node?.map((item) => (
                <NoteCard
                  key={item.name}
                  title={item.name}
                  content={item.description}
                  timestamp="2 hours ago"
                />
              ))}
              {data?.images?.map((item) => (
                <ImageCard key={item.url} title={item.name} avatarSrc={item.url} />
              ))}
              <div className="w-full">
                <YoutubeCard videoId="https://www.youtube.com/embed/pNlq-EVld70?si=37liFmxxC7U_D14y" />
              </div>
              {data?.tweets?.map((item) => (
                <TweetCard key={item.id} url={item.url} />
              ))}
              {(!data || Object.values(data).every((arr) => arr.length === 0)) && (
                <CreateSourceCard value="sources" path="/sources" />
              )}
            </div>
          </TabsContent>
          <TabsContent value="websites">
            <div className="grid grid-cols-3 gap-4">
              {data?.websites?.map((item) => (
                <WebpageCard key={item.url} title={item.title} url={item.url} />
              ))}
              {!data ||
                !data.websites ||
                (data.websites.length === 0 && (
                  <CreateSourceCard value="websites" path="/sources" />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="tweets">
            <div className="grid grid-cols-3 gap-4">
              {data?.tweets?.map((item) => (
                <TweetCard key={item.id} url={item.url} />
              ))}
              {!data ||
                !data.tweets ||
                (data.tweets.length === 0 && (
                  <CreateSourceCard value="tweets" path="/sources" />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="files">
            <div className="grid grid-cols-3 gap-4">
              {data?.files?.map((item) => (
                <DocumentCard
                  key={item.name}
                  title={item.name}
                  type="PDF Document"
                  preview="A comprehensive proposal for..."
                />
              ))}
              {!data ||
                !data.files ||
                (data.files.length === 0 && (
                  <CreateSourceCard value="files" path="/sources" />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="text_node">
            <div className="grid grid-cols-3 gap-4">
              {data?.text_node?.map((item) => (
                <NoteCard
                  key={item.name}
                  title={item.name}
                  content={item.description}
                  timestamp="2 hours ago"
                />
              ))}
              {!data ||
                !data.text_node ||
                (data.text_node.length === 0 && (
                  <CreateSourceCard value="Notes" path="/sources" />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="images">
            <div className="grid grid-cols-3 gap-4">
              {data?.images?.map((item) => (
                <ImageCard key={item.url} title={item.name} avatarSrc={item.url} />
              ))}
              {!data ||
                !data.images ||
                (data.images.length === 0 && (
                  <CreateSourceCard value="images" path="/sources" />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="youtube">
            <div className="grid grid-cols-3 gap-4">
              {data?.images?.map((item) => (
                <ImageCard key={item.url} title={item.name} avatarSrc={item.url} />
              ))}
              {!data ||
                !data.youtube ||
                (data.youtube.length === 0 && (
                  <CreateSourceCard value="youtube video" path="/sources" />
                ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default PreviewSection;
