
"use client";

import Link from "next/link";
import {
    ArrowRight,
    CarFront,
    Camera,
    Star,
    Tractor,
} from "lucide-react";

import EquipmentCard from "../EquipmentCard";

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
    {
        id: 4,
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
    {
        id: 5,
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

    return (
        <section className="relative isolate overflow-hidden bg-background py-16 sm:py-20 lg:py-24">

            {/* Decorative Background */}
            <div className="pointer-events-none absolute -top-48 right-1/4 -z-10 size-105 rounded-full bg-brand/5 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-60 left-1/4 -z-10 size-112.5 rounded-full bg-brand/5 blur-3xl" />

            <div className="pointer-events-none absolute right-8 top-12 -z-10 size-28 opacity-30 bg-[radial-gradient(var(--brand)_2px,transparent_2px)] bg-size-[18px_18px]" />

            <div className="pointer-events-none absolute bottom-8 left-4 -z-10 size-24 opacity-30 bg-[radial-gradient(var(--brand)_2px,transparent_2px)] bg-size-[18px_18px]" />

            {/* Main Container */}
            <div className="section-container">

                {/* Header */}
                <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-12 lg:flex-row lg:items-center">

                    <div>
                        {/* Top Rated Badge */}
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/5 px-4 py-2 text-sm font-bold text-brand">
                            <span className="flex size-6 items-center justify-center rounded-full bg-brand text-brand-foreground">
                                <Star size={14} fill="currentColor" />
                            </span>
                            Top Rated Equipment
                        </div>

                        {/* Heading */}
                        <div className="flex flex-wrap items-center gap-4">
                            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                                Featured{" "}
                                <span className="text-brand">Equipment</span>
                            </h2>

                            <span className="hidden h-0.5 w-32 bg-linear-to-r from-brand to-transparent xl:block" />
                        </div>

                        <p className="mt-3 text-base text-muted-foreground sm:text-lg">
                            Top-rated and most rented equipment
                        </p>
                    </div>

                    {/* View All */}
                    <Link
                        href="/browse-equipment"
                        className="inline-flex w-fit items-center justify-center gap-4 text-sm rounded-full bg-brand px-8 py-3 font-semibold text-brand-foreground shadow-lg shadow-brand/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        View All
                        <ArrowRight size={20} />
                    </Link>

                </div>

                {/* Equipment Grid */}
                <div className="grid grid-cols-2 gap-2.5 md:gap-6 md:grid-cols-3 xl:grid-cols-4">

                    {equipment.map((item) => {

                        return (
                            <EquipmentCard key={item.id} />
                        );
                    })}

                </div>
            </div>
        </section>
    );
}
