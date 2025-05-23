import { ImageCard } from './cards/image-card';
import { CreateSourceCard } from './cards/create-source-card';

import { DocumentCard } from '@/pages/sources/sourcesComponents/cards/document-card';
import { NoteCard } from '@/pages/sources/sourcesComponents/cards/note-card';
import { TweetCard } from '@/pages/sources/sourcesComponents/cards/tweet-card';
import { WebpageCard } from '@/pages/sources/sourcesComponents/cards/webpage-card';
// import { YoutubeCard } from "@/pages/sources/sourcesComponents/cards/youtube-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchSourcesQuery } from '@/lib/tanstack-query/query';
import { useAuth } from '@/providers/supabaseAuthProvider';
import { SourcesSkeleton } from '@/components/skeletons/sources-skeleton';
import { formatDate } from '@/utils/functions/formatDate';

// Badge component for count
const CountBadge: React.FC<{ count: number }> = ({ count }) => (
  <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 min-w-[1.5em]">
    {count}
  </span>
);

type SourceData = {
  websites: {
    title: string;
    url: string;
    created_at: string;
    screenshot: string;
  }[];
  files: { name: string; created_at: string }[];
  text_node: { name: string; description: string; created_at: string }[];
  images: { name: string; url: string; created_at: string }[];
  tweets: { id: string; url: string }[];
  youtube: { name: string; url: string }[];
};
const PreviewSection = () => {
  const { user } = useAuth();
  const queryResult = user?.accessToken
    ? fetchSourcesQuery(user.accessToken)
    : { data: null, isPending: false };
  const data: SourceData | null = queryResult.data ?? null;
  const isPending: boolean = queryResult.isPending ?? false;

  // Counts for each tab
  const counts = {
    all: Object.values(data ?? {}).reduce(
      (acc, arr) => acc + (Array.isArray(arr) ? arr.length : 0),
      0,
    ),
    websites: data?.websites?.length ?? 0,
    tweets: data?.tweets?.length ?? 0,
    images: data?.images?.length ?? 0,
    files: data?.files?.length ?? 0,
    text_node: data?.text_node?.length ?? 0,
    youtube: data?.youtube?.length ?? 0,
  };

  if (isPending) {
    return <SourcesSkeleton />;
  }

  return (
    <div className="w-full h-full p-4">
      <Tabs defaultValue="all" className="w-full ">
        <TabsList className="w-full flex flex-wrap mb-10 md:mb-2 items-center justify-start bg-transparent">
          <TabsTrigger
            value="all"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            All Memories
            <CountBadge count={counts.all} />
          </TabsTrigger>
          <TabsTrigger
            value="websites"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Websites
            <CountBadge count={counts.websites} />
          </TabsTrigger>

          <TabsTrigger
            value="tweets"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Tweets
            <CountBadge count={counts.tweets} />
          </TabsTrigger>

          <TabsTrigger
            value="images"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Images
            <CountBadge count={counts.images} />
          </TabsTrigger>
          <TabsTrigger
            value="files"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Files
            <CountBadge count={counts.files} />
          </TabsTrigger>
          <TabsTrigger
            value="text_node"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Notes
            <CountBadge count={counts.text_node} />
          </TabsTrigger>
          {/* <TabsTrigger
            value="youtube"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            YouTube
            <CountBadge count={counts.youtube} />
          </TabsTrigger> */}
        </TabsList>
        <div
          id="imageLoad"
          className="min-h-[600px] max-h-[70vh] overflow-y-auto transition-all duration-300"
        >
          <TabsContent value="all">
            {data &&
            Object.values(data).some(
              (arr) => Array.isArray(arr) && arr.length > 0,
            ) ? (
              <div className="md:columns-3 columns-1 space-y-4">
                {(() => {
                  // Flatten all arrays into a single array with type info
                  const allItems = [
                    ...(data?.websites?.map((item: any) => ({
                      ...item,
                      _type: 'website',
                    })) || []),
                    ...(data?.files?.map((item: any) => ({
                      ...item,
                      _type: 'file',
                    })) || []),
                    ...(data?.text_node?.map((item: any) => ({
                      ...item,
                      _type: 'text_node',
                    })) || []),
                    ...(data?.images?.map((item: any) => ({
                      ...item,
                      _type: 'image',
                    })) || []),
                    ...(data?.tweets?.map((item: any) => ({
                      ...item,
                      _type: 'tweet',
                    })) || []),
                  ];
                  // Sort all items by created_at descending
                  allItems.sort(
                    (a, b) =>
                      new Date(b.created_at || b.createdAt).getTime() -
                      new Date(a.created_at || a.createdAt).getTime(),
                  );
                  return allItems.map((item: any) => {
                    switch (item._type) {
                      case 'website':
                        return (
                          <WebpageCard
                            key={item.url}
                            title={item.title}
                            url={item.url}
                            createdAt={item.created_at}
                            screenShot={item.screenshot}
                          />
                        );
                      case 'file':
                        return (
                          <DocumentCard
                            key={item.name}
                            title={item.name}
                            type="PDF Document"
                            preview="A comprehensive proposal for..."
                            createdAt={formatDate(item.created_at)}
                          />
                        );
                      case 'text_node':
                        return (
                          <NoteCard
                            key={item.name}
                            title={item.name}
                            content={item.description}
                            timestamp={formatDate(item.created_at)}
                          />
                        );
                      case 'image':
                        return (
                          <ImageCard
                            key={item.url}
                            title={item.name}
                            avatarSrc={item.url}
                            createdAt={item.created_at}
                          />
                        );
                      case 'tweet':
                        return <TweetCard key={item.id} url={item.url} />;
                      default:
                        return null;
                    }
                  });
                })()}
              </div>
            ) : (
              <div className="flex flex-col items-start justify-start min-h-[400px]">
                <CreateSourceCard value="sources" />
              </div>
            )}
          </TabsContent>
          <TabsContent value="websites">
            {data && data.websites && data.websites.length > 0 ? (
              <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                {data?.websites?.map((item) => (
                  <WebpageCard
                    key={item.url}
                    title={item.title}
                    url={item.url}
                    createdAt={item.created_at}
                    screenShot={item.screenshot}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-start justify-start min-h-[400px]">
                <CreateSourceCard value="websites" />
              </div>
            )}
          </TabsContent>
          <TabsContent value="tweets">
            {data && data.tweets && data.tweets.length > 0 ? (
              <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                {data?.tweets?.map((item) => (
                  <TweetCard key={item.id} url={item.url} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-start justify-start min-h-[400px]">
                <CreateSourceCard value="tweets" />
              </div>
            )}
          </TabsContent>
          <TabsContent value="files">
            {data && data.files && data.files.length > 0 ? (
              <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                {data?.files?.map((item) => (
                  <DocumentCard
                    key={item.name}
                    title={item.name}
                    type="PDF Document"
                    preview="A comprehensive proposal for..."
                    createdAt={formatDate(item.created_at)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-start justify-start min-h-[400px]">
                <CreateSourceCard value="files" />
              </div>
            )}
          </TabsContent>
          <TabsContent value="text_node">
            {data && data.text_node && data.text_node.length > 0 ? (
              <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                {data?.text_node?.map((item) => (
                  <NoteCard
                    key={item.name}
                    title={item.name}
                    content={item.description}
                    timestamp={formatDate(item.created_at)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-start justify-start min-h-[400px]">
                <CreateSourceCard value="Notes" />
              </div>
            )}
          </TabsContent>
          <TabsContent value="images">
            {data && data.images && data.images.length > 0 ? (
              <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                {data?.images?.map((item) => (
                  <ImageCard
                    key={item.url}
                    title={item.name}
                    avatarSrc={item.url}
                    createdAt={item.created_at}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-start justify-start min-h-[400px]">
                <CreateSourceCard value="images" />
              </div>
            )}
          </TabsContent>
          {/* <TabsContent value="youtube">
            {data && data.youtube && data.youtube.length > 0 ? (
              <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                {data?.youtube?.map((item) => (
                  <YoutubeCard key={item.url} videoId={item.url} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-start justify-start min-h-[400px]">
                <CreateSourceCard value="youtube video" />
              </div>
            )}
          </TabsContent> */}
        </div>
      </Tabs>
    </div>
  );
};

export default PreviewSection;
