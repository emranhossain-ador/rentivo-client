
import { Skeleton } from "@/components/ui/skeleton";

const MainDetailsSkeleton = () => {
    return (
        <div className="space-y-7 animate-pulse">

            {/* Main Details */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.25fr]">

                {/* Image Gallery */}
                <div className="space-y-3">
                    <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-border bg-card">
                        <Skeleton className="size-full rounded-2xl" />
                        <Skeleton className="absolute left-4 top-4 h-7 w-24 rounded-full" />
                        <Skeleton className="absolute right-4 top-4 size-10 rounded-full" />
                    </div>

                    {/* Thumbnail Images */}
                    <div className="grid grid-cols-4 gap-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="aspect-video rounded-lg" />
                        ))}
                    </div>
                </div>

                {/* Equipment Information */}
                <div className="min-w-0 space-y-4">

                    {/* Title + Rating */}
                    <div>
                        <Skeleton className="h-8 w-3/4 sm:h-10" />

                        <div className="mt-3 flex items-center gap-2">
                            <div className="flex gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Skeleton key={i} className="size-4 rounded-sm" />
                                ))}
                            </div>
                            <Skeleton className="h-3 w-8" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Skeleton className="h-3.5 w-full" />
                        <Skeleton className="h-3.5 w-[95%]" />
                        <Skeleton className="h-3.5 w-2/3" />
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        <Skeleton className="h-12 rounded-xl" />
                        <Skeleton className="h-12 rounded-xl" />
                    </div>

                    {/* Equipment Info */}
                    <div className="divide-y divide-border border-y border-border py-1">

                        {/* Category */}
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="flex items-center justify-between gap-3 py-3">
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        ))}

                        {/* Rental Type */}
                        <div className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
                            <Skeleton className="h-4 w-32" />
                            <div className="flex flex-wrap gap-1.5">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <Skeleton key={i} className="h-7 w-16 rounded-full" />
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Owner Card */}
                    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-3.5 sm:flex-row sm:items-center">
                        <div className="flex min-w-0 flex-1 items-center gap-3">
                            <Skeleton className="size-11 shrink-0 rounded-full" />

                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-3 w-12" />
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>

                        <Skeleton className="h-9 w-full rounded-xl sm:w-28" />
                    </div>
                </div>
            </div>

            {/* Rental Terms */}
            <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
                <div className="mb-5 flex items-center gap-2.5">
                    <Skeleton className="size-8 rounded-lg" />
                    <Skeleton className="h-5 w-52" />
                </div>

                <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                            <Skeleton className="size-4 shrink-0 rounded-full" />
                            <Skeleton className={`h-4 ${i % 2 === 0 ? "w-3/4" : "w-1/2"}`} />
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default MainDetailsSkeleton;
