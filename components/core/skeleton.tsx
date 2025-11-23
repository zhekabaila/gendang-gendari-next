import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean
  children?: React.ReactNode
}

export function Skeleton({ className, isLoading = true, children, ...props }: SkeletonProps) {
  if (!isLoading) {
    return children
  }

  return <div className={cn('animate-pulse bg-gray-200 rounded-lg', className)} {...props} />
}

export function TicketCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg p-6 space-y-4">
      <Skeleton className="w-full h-48 rounded-xl" />
      <div className="space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
      <Skeleton className="h-10 w-full rounded-xl" />
    </div>
  )
}

export function BlogCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
      <Skeleton className="w-full h-48 rounded-t-2xl" />
      <div className="p-6 space-y-4">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex gap-4 pt-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </div>
  )
}

export function FilterSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 space-y-4">
      <Skeleton className="h-6 w-24" />
      <div className="flex gap-2">
        <Skeleton className="h-10 w-24 rounded-xl" />
        <Skeleton className="h-10 w-28 rounded-xl" />
        <Skeleton className="h-10 w-20 rounded-xl" />
        <Skeleton className="h-10 w-24 rounded-xl" />
      </div>
    </div>
  )
}

export function FeaturedArticleSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-2">
      <Skeleton className="h-96 rounded-l-3xl" />
      <div className="p-12 space-y-6">
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
        <Skeleton className="h-12 w-5/6" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </div>
  )
}
