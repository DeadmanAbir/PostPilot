import { Skeleton } from '@/components/ui/skeleton';

export default function IntegrationLoading() {
  return (
    <div className="w-full space-y-6 ">
      {/* Connected Accounts section skeleton */}
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-5 w-64" />
        </div>

        {/* Account card skeleton */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between rounded-md border p-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>

      {/* Add another account section skeleton */}
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex flex-col items-center justify-center space-y-4 py-8">
          <Skeleton className="h-16 w-16 rounded-full" />
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-5 w-64" />
          <Skeleton className="mt-4 h-10 w-32 rounded-md" />
        </div>
      </div>
    </div>
  );
}
