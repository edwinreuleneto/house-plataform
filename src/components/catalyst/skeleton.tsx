import { cn } from '@/lib/utils'

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-300', className)}
      {...props}
    />
  )
}

export default Skeleton