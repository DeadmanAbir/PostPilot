import { DocumentCard } from "@/pages/sources/sourcesComponents/cards/document-card";
import { NoteCard } from "@/pages/sources/sourcesComponents/cards/note-card";
import { TweetCard } from "@/pages/sources/sourcesComponents/cards/tweet-card";
import { WebpageCard } from "@/pages/sources/sourcesComponents/cards/webpage-card";
import { YoutubeCard } from "@/pages/sources/sourcesComponents/cards/youtube-card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchSourcesQuery } from "@/lib/tanstack-query/query";
import { useAuth } from "@/providers/supabaseAuthProvider";

const PreviewSection = () => {
  const { user } = useAuth();
  const {
    data,
    refetch: connectLinkedinRefetch,
    isPending,
  } = fetchSourcesQuery(user?.accessToken!);

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
            value="files"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Web pages
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
            Documents
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
            value="websites"
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
        <TabsContent value="all">
          <div className="grid grid-cols-3 gap-4">
            {data.websites.map((item: any) => (
              <WebpageCard title={item.title} url={item.url} />
            ))}
            {data.files.map((item: any) => (
              <DocumentCard
                title={item.name}
                type="PDF Document"
                preview="A comprehensive proposal for..."
              />
            ))}

            {data.text_node.map((item: any) => (
              <NoteCard
                title={item.name}
                content={item.description}
                timestamp="2 hours ago"
              />
            ))}

            <div className=" col-span-2 w-full  ">
              <YoutubeCard videoId="https://www.youtube.com/embed/pNlq-EVld70?si=37liFmxxC7U_D14y" />
            </div>
            {data.tweets.map((item: any) => (
              <TweetCard url={item.url} key={item.id} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PreviewSection;
