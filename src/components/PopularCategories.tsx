
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Grid2X2, Star } from "lucide-react";

const categories = [
    {
        id: 1,
        title: "Gardening Equipment",
        emoji: "🌿",
        description: "Keep your outdoor space perfectly maintained.",
        image: "/images/categories/gardening.jpg",
        href: "/browse-equipment?category=gardening",
    },
    {
        id: 2,
        title: "Cleaning Equipment",
        emoji: "🧹",
        description: "Clean smarter, work better.",
        image: "/images/categories/cleaning.jpg",
        href: "/browse-equipment?category=cleaning",
    },
    {
        id: 3,
        title: "Construction Equipment",
        emoji: "🦺",
        description: "Build more, with less effort.",
        image: "/images/categories/construction.jpg",
        href: "/browse-equipment?category=construction",
        popular: true,
    },
    {
        id: 4,
        title: "Generators",
        emoji: "⚡",
        description: "Reliable power for anywhere, anytime.",
        image: "/images/categories/generator.jpg",
        href: "/browse-equipment?category=generators",
    },
    {
        id: 5,
        title: "Event Equipment",
        emoji: "📅",
        description: "Make your event unforgettable.",
        image: "/images/categories/event.jpg",
        href: "/browse-equipment?category=event",
    },
];

export default function PopularCategories() {
    return (
        <section className="relative isolate overflow-hidden bg-background py-16 sm:py-20 lg:py-24">

            {/* Decorative Background */}
            <div className="pointer-events-none absolute -left-40 -top-44 -z-10 size-[380px] rounded-full border-[65px] border-brand/5" />

            <div className="pointer-events-none absolute -right-40 -top-20 -z-10 size-[420px] rounded-full border-[75px] border-brand/5" />

            <div className="pointer-events-none absolute -bottom-64 -right-20 -z-10 size-[450px] rounded-full bg-brand/5 blur-3xl" />

            {/* Main Container */}
            <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">

                {/* Section Header */}
                <div className="mb-12 text-center sm:mb-16">

                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand px-4 py-2 text-sm font-bold text-brand sm:text-base">
                        <Grid2X2 size={19} />
                        Browse by Category
                    </div>

                    <div className="flex items-center justify-center gap-3 sm:gap-6">

                        <span className="hidden h-0.5 w-16 bg-brand sm:block lg:w-28" />

                        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-6xl">
                            Popular{" "}
                            <span className="text-brand">Categories</span>
                        </h2>

                        <span className="hidden h-0.5 w-16 bg-brand sm:block lg:w-28" />

                    </div>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
                        Explore our most requested categories from our rental inventory
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className={`group relative flex flex-col rounded-[30px] border p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-5 ${category.popular
                                ? "border-2 border-brand bg-brand/[0.03] shadow-lg shadow-brand/10"
                                : "border-border bg-card hover:border-brand/50"
                                }`}
                        >

                            {/* Popular Badge */}
                            {category.popular && (
                                <div className="absolute -right-1 -top-3 z-20 flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm font-bold text-brand-foreground shadow-lg">
                                    <Star size={17} fill="currentColor" />
                                    Most Popular
                                </div>
                            )}

                            {/* Image */}
                            <Link
                                href={category.href}
                                className="relative mb-6 block h-52 w-full overflow-hidden rounded-[24px] sm:h-44 lg:h-44"
                            >
                                <Image
                                    src={category.image}
                                    alt={category.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </Link>

                            {/* Content */}
                            <div className="flex flex-1 flex-col items-center text-center">

                                <h3 className="mb-3 flex items-center justify-center gap-2 text-lg font-bold tracking-tight text-card-foreground">
                                    <span className="text-xl">{category.emoji}</span>
                                    {category.title}
                                </h3>

                                <p className="mb-6 max-w-[230px] text-sm leading-relaxed text-muted-foreground sm:text-base">
                                    {category.description}
                                </p>

                                {/* Button */}
                                <Link
                                    href={category.href}
                                    className={`mt-auto inline-flex min-w-[150px] items-center justify-center gap-3 rounded-full border border-brand px-5 py-3 text-sm font-bold transition-all duration-300 ${category.popular
                                        ? "bg-brand text-brand-foreground shadow-lg shadow-brand/20 hover:opacity-90"
                                        : "text-foreground hover:bg-brand hover:text-brand-foreground"
                                        }`}
                                >
                                    View All
                                    <ArrowRight
                                        size={18}
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                    />
                                </Link>

                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}
