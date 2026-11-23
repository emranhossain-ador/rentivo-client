

import {
    Star,
} from "lucide-react";

import ViewAll from "../ViewAll";
import FeaturedEquipmentGrid from "./FeaturedEquipmentGrid";
import { Suspense } from "react";
import EquipmentCardSkeleton from "./EquipmentCardSkeleton";


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
                        <div className="mb-3 md:mb-4 inline-flex items-center gap-1.5 rounded-full border border-brand bg-brand/5 px-3 py-2 text-[13px] font-bold text-brand sm:text-sm">
                            <span className="flex size-5 items-center justify-center rounded-full bg-brand text-brand-foreground">
                                <Star size={14} fill="currentColor" />
                            </span>
                            Top Rated Equipment
                        </div>

                        {/* Heading */}
                        <div className="flex flex-wrap items-center gap-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                                Featured{" "}
                                <span className="text-brand">Equipment</span>
                            </h2>

                            <span className="hidden h-0.5 w-32 bg-linear-to-r from-brand to-transparent xl:block" />
                        </div>

                        <p className="mt-1 md:mt-3 text-sm text-foreground/80 sm:text-base">
                            Top-rated and most rented equipment
                        </p>
                    </div>

                    {/* View All */}
                    <ViewAll url="/equipment" />

                </div>

                {/* Equipment Grid */}
                <Suspense fallback={<EquipmentCardSkeleton />}>
                    <FeaturedEquipmentGrid />
                </Suspense>
            </div>
        </section>
    );
}
