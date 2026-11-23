
import { Skeleton } from "@/components/ui/skeleton";

const EquipmentCardSkeleton = () => {
    return (
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-6 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
                <article
                    key={index}
                    className="overflow-hidden rounded-xl border border-border bg-card p-2 shadow-lg shadow-black/5 dark:shadow-white/5 sm:p-2.5"
                >
                    {/* Image Skeleton */}
                    <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                        <Skeleton className="size-full rounded-lg" />
                        <Skeleton className="absolute right-2 top-2 h-6 w-20 rounded-full" />
                    </div>

                    {/* Details Skeleton */}
                    <div className="px-0.5 pt-2">
                        {/* Equipment Name + Status Dot */}
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-36 sm:h-5 sm:w-44" />
                            <Skeleton className="size-2 shrink-0 rounded-full" />
                        </div>

                        {/* Rating */}
                        <div className="mt-2 flex items-center gap-1.5">
                            <Skeleton className="size-3 rounded-full" />
                            <Skeleton className="h-3 w-7" />
                            <Skeleton className="h-3 w-20" />
                        </div>

                        {/* Price */}
                        <div className="mt-2 flex items-center gap-2">
                            <Skeleton className="h-4 w-20 sm:h-5 sm:w-24" />
                            <Skeleton className="h-3 w-12" />
                        </div>

                        {/* Button */}
                        <Skeleton className="mt-2.5 h-9 w-full rounded-lg md:h-10" />
                    </div>
                </article>
            ))}
        </div>
    );
};

export default EquipmentCardSkeleton;
