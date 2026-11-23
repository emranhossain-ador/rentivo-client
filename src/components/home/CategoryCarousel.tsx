"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CategoryType } from "@/lib/type/categoryType";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

interface CategoryCarouselProps {
    categories: CategoryType[];
}

export default function CategoryCarousel({ categories }: CategoryCarouselProps) {
    if (!categories || categories.length === 0) {
        return null;
    }

    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            className="relative w-full"
        >
            <CarouselContent className="-ml-3 md:-ml-4 py-2">
                {categories.map((category) => (
                    <CarouselItem
                        key={category._id}
                        className="pl-3 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/5"
                    >
                        <Link
                            href={`/equipment?category=${category.slug || category.name}`}
                            className="group relative flex flex-col h-full overflow-hidden rounded-2xl md:rounded-3xl border border-border/80 bg-card p-2 sm:p-2.5 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-xl hover:shadow-brand/5"
                        >
                            {/* Image Container with overlay effects */}
                            <div className="relative h-36 sm:h-44 md:h-48 w-full overflow-hidden rounded-xl md:rounded-2xl bg-muted">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                />

                                {/* Subtle gradient overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

                                {/* Arrow Icon button overlay */}
                                <div className="absolute right-2.5 top-2.5 flex size-7 sm:size-8 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-md transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:rotate-45">
                                    <ArrowUpRight size={15} />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-1 items-center justify-between px-1.5 py-2.5">
                                <h3 className="text-sm sm:text-base font-bold tracking-tight text-foreground line-clamp-1 transition-colors group-hover:text-brand">
                                    {category.name}
                                </h3>
                            </div>
                        </Link>
                    </CarouselItem>
                ))}
            </CarouselContent>

            {/* Navigation buttons */}
            <div className="hidden sm:flex items-center justify-end gap-2 mt-4">
                <CarouselPrevious className="static translate-y-0 size-9 border-border bg-card hover:bg-brand hover:text-white hover:border-brand transition-colors cursor-pointer" />
                <CarouselNext className="static translate-y-0 size-9 border-border bg-card hover:bg-brand hover:text-white hover:border-brand transition-colors cursor-pointer" />
            </div>
        </Carousel>
    );
}
