import { InboxIcon } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function EmptyStateCard() {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="text-xl font-medium text-slate-900 dark:text-white text-center">
          No posts in your account
        </CardTitle>
        <CardDescription className="text-slate-500 dark:text-slate-300 text-center ">
          Your post history is currently empty
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col items-center text-center py-6">
        <div className="p-3 mb-4 rounded-full bg-slate-100 dark:bg-slate-700">
          <InboxIcon size={28} className="text-slate-400 dark:text-slate-300" />
        </div>

        <p className="mb-2 text-slate-600 dark:text-slate-300">
          You haven't created any posts yet
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          When you publish content, it will appear here in your post history
        </p>
      </CardContent>

      <CardFooter className="flex justify-center pb-6"></CardFooter>
    </Card>
  );
}
