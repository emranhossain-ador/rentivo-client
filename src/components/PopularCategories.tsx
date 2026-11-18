
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Grid2X2, Star } from "lucide-react";

const categories = [
    {
        id: 1,
        title: "Gardening Equipment",
        image: "https://images.unsplash.com/photo-1555955207-b96159c16808?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        href: "/browse-equipment?category=gardening",
    },
    {
        id: 2,
        title: "Cleaning Equipment",
        image: "https://images.unsplash.com/photo-1781637590564-01c65dbf2039?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        href: "/browse-equipment?category=cleaning",
    },
    {
        id: 3,
        title: "Construction Equipment",
        image: "https://images.unsplash.com/photo-1779285756094-85ddc78ead65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        href: "/browse-equipment?category=construction",
        popular: true,
    },
    {
        id: 4,
        title: "Generators",
        image: "https://plus.unsplash.com/premium_photo-1663011223783-e3686f74b948?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        href: "/browse-equipment?category=generators",
    },
    {
        id: 5,
        title: "Event Equipment",
        image: "https://images.unsplash.com/photo-1510511233900-1982d92bd835?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        href: "/browse-equipment?category=event",
    },
];

export default function PopularCategories() {
    return (
        <section className="relative isolate overflow-hidden bg-background py-16 sm:py-20 lg:py-24 pt-36!">

            {/* Decorative Background */}
            <div className="pointer-events-none absolute -left-40 -top-44 -z-10 size-95 rounded-full border-65 border-brand/5" />

            <div className="pointer-events-none absolute -right-40 -top-20 -z-10 size-105 rounded-full border-75 border-brand/5" />

            <div className="pointer-events-none absolute -bottom-64 -right-20 -z-10 size-112.5 rounded-full bg-brand/5 blur-3xl" />

            {/* Main Container */}
            <div className="section-container ">

                {/* Section Header */}
                <div className="mb-12 text-center sm:mb-16">

                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand bg-brand/5 px-4 py-2 text-sm font-bold text-brand sm:text-base">
                        <Grid2X2 size={19} />
                        Browse by Category
                    </div>

                    <div className="flex items-center justify-center gap-3 sm:gap-6">

                        <span className="hidden h-0.5 w-16 bg-brand sm:block lg:w-28" />

                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-6xl">
                            Popular{" "}
                            <span className="text-brand">Categories</span>
                        </h2>

                        <span className="hidden h-0.5 w-16 bg-brand sm:block lg:w-28" />

                    </div>

                    <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                        Explore our most requested categories from our rental inventory
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

                    {categories.map((category) => (
                        <Link
                            href={category.href}
                            key={category.id}
                            className={`group relative flex flex-col rounded-[30px] border p-3 transition-all duration-300 hover:-translate-y-2 shadow-md hover:shadow-xl sm:p-4 border-border bg-card hover:border-brand`}
                        >


                            {/* Image */}
                            <div
                                className="relative mb-4 block h-52 w-full shrink-0 overflow-hidden rounded-[18px] sm:h-44 lg:h-44"
                            >
                                <Image
                                    src={category.image}
                                    alt={category.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 text-center">
                                <h3 className="text-base font-bold tracking-tight text-card-foreground line-clamp-1 group-hover:text-brand">
                                    {category.title}
                                </h3>
                            </div>
                        </Link>
                    ))}

                </div>
            </div>
        </section>
    );
}
