import { ArrowUpRight, Grid2X2 } from "lucide-react";
import CategoryCarousel from "./home/CategoryCarousel";
import CategoriesContent from "./CategoriesContent";
import { Skeleton } from "./ui/skeleton";
import { Suspense } from "react";

export default async function PopularCategories() {

    return (
        <section className="relative isolate overflow-hidden bg-background py-16 sm:py-20 lg:py-24 pt-36!">

            {/* Decorative Background */}
            <div className="pointer-events-none absolute -left-40 -top-44 -z-10 size-95 rounded-full border-65 border-brand/5" />

            <div className="pointer-events-none absolute -right-40 -top-20 -z-10 size-105 rounded-full border-75 border-brand/5" />

            <div className="pointer-events-none absolute -bottom-64 -right-20 -z-10 size-112.5 rounded-full bg-brand/5 blur-3xl" />

            {/* Main Container */}
            <div className="section-container">

                {/* Section Header */}
                <div className="mb-10 text-center sm:mb-12">

                    <div className="mb-3 md:mb-4 inline-flex items-center gap-1.5 rounded-full border border-brand bg-brand/5 px-3 py-2 text-[13px] font-bold text-brand sm:text-sm">
                        <Grid2X2 size={18} />
                        Browse by Category
                    </div>

                    <div className="flex items-center justify-center gap-3 sm:gap-6">

                        <span className="hidden h-0.5 w-16 bg-brand sm:block lg:w-28" />

                        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                            Popular{" "}
                            <span className="text-brand">Categories</span>
                        </h2>

                        <span className="hidden h-0.5 w-16 bg-brand sm:block lg:w-28" />

                    </div>

                    <p className="mx-auto mt-1 md:mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                        Explore our most requested categories from our rental inventory
                    </p>
                </div>

                <Suspense fallback={<CategorySkeleton />}>
                    <CategoriesContent />
                </Suspense>

            </div>
        </section>
    );
}


const CategorySkeleton = () => {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5 lg:gap-5">
            {Array.from({ length: 5 }).map((_, index) => (
                <article
                    key={index}
                    className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card p-2 sm:rounded-3xl sm:p-2.5"
                >
                    {/* Image Skeleton */}
                    <div className="relative h-44 w-full overflow-hidden rounded-xl bg-muted sm:h-44 md:h-48 md:rounded-2xl">
                        <Skeleton className="size-full rounded-xl md:rounded-2xl" />

                        {/* Arrow Icon Skeleton */}
                        <div className="absolute right-2.5 top-2.5 flex size-7 items-center justify-center rounded-full bg-background/80 sm:size-8">
                            <ArrowUpRight
                                size={15}
                                className="text-muted-foreground/40"
                            />
                        </div>
                    </div>

                    {/* Category Name Skeleton */}
                    <div className="flex flex-1 items-center justify-between px-1.5 py-3">
                        <Skeleton className="h-4 w-3/4 rounded-md sm:h-5" />
                    </div>
                </article>
            ))}
        </div>
    );
};