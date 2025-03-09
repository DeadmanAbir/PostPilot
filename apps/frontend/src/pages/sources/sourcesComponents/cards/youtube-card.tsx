import ReactPlayer from 'react-player/youtube'

interface YoutubeCardProps {

  videoId: string;
}

export function YoutubeCard({ videoId }: YoutubeCardProps) {
  return (
    <div className="w-full flex items-center justify-center aspect-video ">

      <ReactPlayer url={videoId} />
    </div>
  );
}
