
import { Star, Quote, BadgeCheck } from "lucide-react";
import Image from "next/image";

interface Review {
    id: number;
    name: string;
    avatar: string;
    rating: number;
    comment: string;
    date: string;
    verified?: boolean;
}

const reviews: Review[] = [
    {
        id: 1,
        name: "Sarah Johnson",
        avatar: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        rating: 5,
        comment:
            "Excellent service! The equipment was in perfect condition and the rental process was incredibly smooth. Highly recommended!",
        date: "November 12, 2026",
        verified: true,
    },
    {
        id: 2,
        name: "Michael Anderson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        rating: 4,
        comment:
            "Great experience overall. The equipment quality was impressive and delivery was right on time. Will definitely rent again.",
        date: "November 10, 2026",
        verified: true,
    },
    {
        id: 3,
        name: "Emily Carter",
        avatar: "https://images.unsplash.com/photo-1758335068076-7564a9ada09f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        rating: 5,
        comment:
            "Amazing platform! Easy booking, affordable pricing, and very helpful customer support. Everything was exactly as expected.",
        date: "November 08, 2026",
        verified: true,
    },
];

export default function CustomerReviews() {
    return (
        <section className="bg-background section-container w-full space-y-5 my-10">
            {/* Section Header */}

            <div className="mb-10 text-center sm:mb-16">

                {/* Top Rated Badge */}
                <div className="mb-3 md:mb-4 inline-flex items-center gap-1.5 rounded-full border border-brand bg-brand/5 px-3 py-2 text-[13px] font-bold text-brand sm:text-sm">
                    Customer Reviews
                </div>

                <div className="flex items-center justify-center gap-3 sm:gap-6">

                    <span className="hidden h-0.5 w-16 bg-brand sm:block lg:w-28" />

                    <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                        What Our{" "}
                        <span className="text-brand">Customers Say</span>
                    </h2>

                    <span className="hidden h-0.5 w-16 bg-brand sm:block lg:w-28" />

                </div>

                <p className="mt-1 md:mt-3 text-sm text-foreground/80 sm:text-base">
                    What customers say about their experience
                </p>
            </div>

            {/* Review Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {reviews.map((review, index) => (
                    <article
                        key={review.id}
                        style={{ animationDelay: `${index * 100}ms` }}
                        className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg animate-in fade-in slide-in-from-bottom-3"
                    >
                        {/* Quote Icon */}
                        <div className="absolute right-5 top-5 text-brand/40 transition-transform duration-300 group-hover:scale-110">
                            <Quote size={35} />
                        </div>

                        {/* Rating */}
                        <div className="mb-4 flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    size={16}
                                    className={
                                        i < review.rating
                                            ? "fill-amber-500 text-amber-500"
                                            : "fill-muted text-muted"
                                    }
                                />
                            ))}

                            <span className="ml-2 text-xs font-semibold text-foreground">
                                {review.rating}.0
                            </span>
                        </div>

                        {/* Comment */}
                        <p className="min-h-24 text-sm leading-7 text-muted-foreground">
                            &quot;{review.comment}&quot;
                        </p>

                        {/* Customer Info */}
                        <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                            <Image
                                src={review.avatar}
                                alt={review.name}
                                width={50}
                                height={50}
                                className="size-11 rounded-full border-2 border-background object-cover"
                            />

                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-1.5">
                                    <h3 className="truncate text-sm font-bold text-foreground">
                                        {review.name}
                                    </h3>

                                    {review.verified && (
                                        <BadgeCheck
                                            size={15}
                                            className="shrink-0 text-brand"
                                        />
                                    )}
                                </div>

                                <p className="mt-0.5 text-xs text-muted-foreground">
                                    {review.date}
                                </p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
