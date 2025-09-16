import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="w-64 border-r bg-card">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="border-b bg-card p-4">
          <Skeleton className="h-8 w-full" />
        </div>
        <main className="flex-1 p-6 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
          <Skeleton className="h-96 w-full" />
        </main>
      </div>
    </div>
  )
}
