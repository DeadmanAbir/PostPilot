import { DocumentCard } from "@/pages/sources/sourcesComponents/cards/document-card";
import { NoteCard } from "@/pages/sources/sourcesComponents/cards/note-card";
import { TweetCard } from "@/pages/sources/sourcesComponents/cards/tweet-card";
import { WebpageCard } from "@/pages/sources/sourcesComponents/cards/webpage-card";
import { YoutubeCard } from "@/pages/sources/sourcesComponents/cards/youtube-card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PreviewSection = () => {
    return (<div className="w-full h-full p-4">
        <Tabs defaultValue="all" className="w-full ">
            <TabsList className="w-full items-center justify-start bg-transparent">
                <TabsTrigger value="all" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                    All Memories
                </TabsTrigger>
                <TabsTrigger value="files" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">
                    Web pages
                </TabsTrigger>

                <TabsTrigger value="tweets" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">
                    Tweets
                </TabsTrigger>
                <TabsTrigger value="images" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">
                    Documents
                </TabsTrigger>
                <TabsTrigger value="notes" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">
                    Spaces
                </TabsTrigger>
                <TabsTrigger value="websites" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">
                    Notes
                </TabsTrigger>
                <TabsTrigger value="youtube" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">
                    YouTube
                </TabsTrigger>
            </TabsList>
            <TabsContent value="all">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 justify-start">
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
                        id="1898052198762004978"
                    />
                    <div className="col-span-2 ">
                        <YoutubeCard

                            videoId="https://www.youtube.com/embed/pNlq-EVld70?si=37liFmxxC7U_D14y"
                        />
                    </div>

                    <NoteCard
                        title="Meeting Notes"
                        content="Key points from today's meeting..."
                        timestamp="2 hours ago"
                    />
                </div>
            </TabsContent>

        </Tabs>


    </div>
    );
}

export default PreviewSection;