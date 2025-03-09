import { DocumentCard } from "@/pages/sources/sourcesComponents/cards/document-card";
import { NoteCard } from "@/pages/sources/sourcesComponents/cards/note-card";
import { TweetCard } from "@/pages/sources/sourcesComponents/cards/tweet-card";
import { WebpageCard } from "@/pages/sources/sourcesComponents/cards/webpage-card";
import { YoutubeCard } from "@/pages/sources/sourcesComponents/cards/youtube-card";

import { Nav } from "@/components/nav";
const PreviewSection = () => {
    return ( <div className="w-full h-full p-4">
         <Nav />
      <main className="container mx-auto p-4  w-full ">
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
          <div className="col-span-2">
          <YoutubeCard
           
           videoId="https://youtu.be/HDdHKrHdd-o?si=J0Nq2GT1ZREWAMHo"
         />
          </div>
         
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