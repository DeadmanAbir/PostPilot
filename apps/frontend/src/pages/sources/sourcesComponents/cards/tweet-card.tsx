
import { Tweet } from 'react-tweet'

interface TweetCardProps {
  id: string;

}

export function TweetCard({
id
}: TweetCardProps) {
  return (
    <div className=''>
     <Tweet id={id} />
    </div>
  );
}
