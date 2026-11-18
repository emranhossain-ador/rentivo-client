
"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    CalendarDays,
    CarFront,
    Camera,
    CheckCircle2,
    Heart,
    MapPin,
    Star,
    Tractor,
    BadgeCheck,
} from "lucide-react";

import { useState } from "react";

const equipment = [
    {
        id: 1,
        name: "Toyota Corolla",
        category: "Vehicles & Transportation",
        categoryIcon: CarFront,
        image: "/images/equipment/toyota.jpg",
        rating: 4.7,
        reviews: 120,
        location: "Dhaka, Bangladesh",
        price: 70,
        available: true,
        href: "/equipment/toyota-corolla",
    },
    {
        id: 2,
        name: "Canon DSLR Camera",
        category: "Photography Equipment",
        categoryIcon: Camera,
        image: "/images/equipment/camera.jpg",
        rating: 4.9,
        reviews: 85,
        location: "Chittagong, Bangladesh",
        price: 50,
        available: true,
        href: "/equipment/canon-camera",
    },
    {
        id: 3,
        name: "Excavator Machine",
        category: "Construction Equipment",
        categoryIcon: Tractor,
        image: "/images/equipment/excavator.jpg",
        rating: 4.8,
        reviews: 72,
        location: "Dhaka, Bangladesh",
        price: 150,
        available: true,
        href: "/equipment/excavator",
    },
];

export default function FeaturedEquipment() {
    const [favorites, setFavorites] = useState<number[]>([]);

    const toggleFavorite = (id: number) => {
        setFavorites((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    return (
        <section className="relative isolate overflow-hidden bg-background py-16 sm:py-20 lg:py-24">

            {/* Decorative Background */}
            <div className="pointer-events-none absolute -top-48 right-1/4 -z-10 size-[420px] rounded-full bg-brand/5 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-60 left-1/4 -z-10 size-[450px] rounded-full bg-brand/5 blur-3xl" />

            <div className="pointer-events-none absolute right-8 top-12 -z-10 size-28 opacity-30 [background-image:radial-gradient(var(--brand)_2px,transparent_2px)] [background-size:18px_18px]" />

            <div className="pointer-events-none absolute bottom-8 left-4 -z-10 size-24 opacity-30 [background-image:radial-gradient(var(--brand)_2px,transparent_2px)] [background-size:18px_18px]" />

            {/* Main Container */}
            <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">

                {/* Header */}
                <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-12 lg:flex-row lg:items-center">

                    <div>
                        {/* Top Rated Badge */}
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-2 text-sm font-bold text-brand">
                            <span className="flex size-6 items-center justify-center rounded-full bg-brand text-brand-foreground">
                                <Star size={14} fill="currentColor" />
                            </span>
                            Top Rated Equipment
                        </div>

                        {/* Heading */}
                        <div className="flex flex-wrap items-center gap-4">
                            <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                                Featured{" "}
                                <span className="text-brand">Equipment</span>
                            </h2>

                            <span className="hidden h-0.5 w-32 bg-gradient-to-r from-brand to-transparent xl:block" />
                        </div>

                        <p className="mt-3 text-base text-muted-foreground sm:text-xl">
                            Top-rated and most rented equipment
                        </p>
                    </div>

                    {/* View All */}
                    <Link
                        href="/browse-equipment"
                        className="inline-flex w-fit items-center justify-center gap-4 rounded-full bg-brand px-8 py-4 font-semibold text-brand-foreground shadow-lg shadow-brand/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        View All
                        <ArrowRight size={20} />
                    </Link>

                </div>

                {/* Equipment Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

                    {equipment.map((item) => {
                        const CategoryIcon = item.categoryIcon;
                        const isFavorite = favorites.includes(item.id);

                        return (
                            <article
                                key={item.id}
                                className="group overflow-hidden rounded-[28px] border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10"
                            >

                                {/* Image Section */}
                                <div className="relative h-64 overflow-hidden sm:h-72">

                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Image Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                                    {/* Favorite Button */}
                                    <button
                                        type="button"
                                        onClick={() => toggleFavorite(item.id)}
                                        aria-label={
                                            isFavorite
                                                ? "Remove from favorites"
                                                : "Add to favorites"
                                        }
                                        aria-pressed={isFavorite}
                                        className={`absolute left-4 top-4 flex size-11 items-center justify-center rounded-full border border-white/50 bg-white/95 shadow-md transition-all hover:scale-110 ${isFavorite ? "text-red-500" : "text-foreground"
                                            }`}
                                    >
                                        <Heart
                                            size={21}
                                            fill={isFavorite ? "currentColor" : "none"}
                                        />
                                    </button>

                                    {/* Available Badge */}
                                    {item.available && (
                                        <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
                                            <CheckCircle2 size={17} fill="white" className="text-green-500" />
                                            Available
                                        </div>
                                    )}

                                </div>

                                {/* Card Content */}
                                <div className="p-5 sm:p-6">

                                    {/* Equipment Name */}
                                    <Link href={item.href}>
                                        <h3 className="mb-4 font-heading text-xl font-bold text-card-foreground transition-colors group-hover:text-brand sm:text-2xl">
                                            {item.name}
                                        </h3>
                                    </Link>

                                    {/* Category */}
                                    <div className="mb-4 inline-flex max-w-full items-center gap-3 rounded-xl bg-brand/10 px-3 py-2.5 text-sm font-medium text-foreground sm:px-4 sm:text-base">
                                        <CategoryIcon
                                            size={21}
                                            className="shrink-0 text-brand"
                                        />
                                        <span>{item.category}</span>
                                    </div>

                                    {/* Rating & Location */}
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-3 text-sm">

                                        {/* Rating */}
                                        <div className="flex items-center gap-2">
                                            <Star
                                                size={22}
                                                fill="currentColor"
                                                className="shrink-0 text-brand"
                                            />

                                            <span className="font-bold text-foreground">
                                                {item.rating}
                                            </span>

                                            <span className="text-muted-foreground">
                                                ({item.reviews} reviews)
                                            </span>
                                        </div>

                                        <span className="hidden h-6 w-px bg-border sm:block" />

                                        {/* Location */}
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <MapPin
                                                size={20}
                                                className="shrink-0 text-brand"
                                            />
                                            <span>{item.location}</span>
                                        </div>

                                    </div>

                                    {/* Divider */}
                                    <div className="my-6 border-t border-border" />

                                    {/* Price & Details */}
                                    <div className="flex flex-wrap items-center justify-between gap-4">

                                        {/* Price */}
                                        <div className="flex items-baseline gap-2">
                                            <span className="font-heading text-3xl font-bold text-brand sm:text-4xl">
                                                ৳{item.price}
                                            </span>

                                            <span className="text-base text-muted-foreground">
                                                / day
                                            </span>
                                        </div>

                                        {/* Details Button */}
                                        <Link
                                            href={item.href}
                                            className="inline-flex items-center justify-center gap-2 rounded-full border border-brand px-4 py-3 text-sm font-bold text-foreground transition-all duration-300 hover:bg-brand hover:text-brand-foreground sm:px-5"
                                        >
                                            <CalendarDays size={19} className="text-brand group-hover:text-brand-foreground" />
                                            View Details
                                            <ArrowRight size={17} />
                                        </Link>

                                    </div>

                                </div>
                            </article>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}
