
interface YoutubeCardProps {

  videoId: string;
}

export function YoutubeCard({ videoId }: YoutubeCardProps) {
  return (
    <div className="h-full w-full ">

      <iframe width="100%" height="600px" src={videoId} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    </div>
  );
}
