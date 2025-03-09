import { DocumentCard } from "@/pages/sources/sourcesComponents/cards/document-card";
import { NoteCard } from "@/pages/sources/sourcesComponents/cards/note-card";
import { TweetCard } from "@/pages/sources/sourcesComponents/cards/tweet-card";
import { WebpageCard } from "@/pages/sources/sourcesComponents/cards/webpage-card";
import { YoutubeCard } from "@/pages/sources/sourcesComponents/cards/youtube-card";

import { Nav } from "@/components/nav";
const PreviewSection = () => {
    return ( <div className="w-full">
         <Nav />
      <main className="container mx-auto p-4  w-full ">
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
}
 
export default PreviewSection;