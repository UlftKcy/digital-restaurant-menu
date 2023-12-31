import { Skeleton } from "@/components/ui/skeleton";

export default function RootLoading() {
    return (
      <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
    )
  }