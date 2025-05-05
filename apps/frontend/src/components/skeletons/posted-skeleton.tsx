import { Skeleton } from '@/components/ui/skeleton';

export default function PostedLoading() {
  return (
    <div className="w-full h-full">
      {/* Successfully Posted section with filters */}
      <div className="w-full p-4 mb-6 rounded-lg border border-border dark:border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-7 w-48 bg-slate-200 dark:bg-slate-700" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-28 bg-slate-200 dark:bg-slate-700" />
            <Skeleton className="h-9 w-32 bg-slate-200 dark:bg-slate-700" />
            <Skeleton className="h-9 w-28 bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      </div>

      {/* Post cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

function PostCardSkeleton() {
  return (
    <div className="border border-border dark:border-slate-700 rounded-lg p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-5 w-20 bg-slate-200 dark:bg-slate-700" />
        <div className="ml-auto">
          <Skeleton className="h-6 w-16 rounded-full bg-green-200 dark:bg-green-900/30" />
        </div>
      </div>

      <div className="space-y-2 mb-6 flex-1">
        <Skeleton className="h-4 w-full bg-slate-200 dark:bg-slate-700" />
        <Skeleton className="h-4 w-full bg-slate-200 dark:bg-slate-700" />
        <Skeleton className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700" />
        <Skeleton className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700" />
      </div>

      <div className="mt-auto">
        <Skeleton className="h-9 w-24 bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  );
}
