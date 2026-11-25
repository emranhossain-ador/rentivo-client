
const RentalCTASkeleton = () => {
    return (
        <section className="section-container w-full py-5">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

                {/* Ready to Rent Skeleton */}
                <div className="relative flex min-h-35 animate-pulse items-center justify-between overflow-hidden rounded-2xl border border-border bg-muted px-6 py-6 sm:px-8">
                    <div className="w-[65%] space-y-3">
                        <div className="h-6 w-40 rounded-md bg-muted-foreground/20" />
                        <div className="h-3 w-full rounded bg-muted-foreground/15" />
                        <div className="h-3 w-3/4 rounded bg-muted-foreground/15" />
                        <div className="h-9 w-28 rounded-lg bg-muted-foreground/20" />
                    </div>

                    <div className="size-24 rounded-full bg-muted-foreground/15 sm:size-32" />
                </div>

                {/* Trusted Users Skeleton */}
                <div className="flex min-h-35 animate-pulse items-center justify-between gap-3 rounded-2xl border border-border bg-muted px-5 py-6 sm:px-8">
                    <div className="min-w-0 flex-1 space-y-3">
                        <div className="h-6 w-44 rounded-md bg-muted-foreground/20" />
                        <div className="h-3 w-full rounded bg-muted-foreground/15" />
                        <div className="h-3 w-3/4 rounded bg-muted-foreground/15" />
                    </div>

                    <div className="flex -space-x-3 sm:-space-x-4">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div
                                key={index}
                                className="size-9 rounded-full border-2 border-background bg-muted-foreground/20 sm:size-12"
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}

export default RentalCTASkeleton;