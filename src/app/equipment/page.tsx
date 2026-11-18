
"use client";

import { useState } from "react";
import {
    Search,
    MapPin,
} from "lucide-react";
import SortBySelect from "./_components/SortBySelect";
import Herobanner from "./_components/Herobanner";
import { Button } from "@/components/ui/button";
import EquipmentFilter from "./_components/EquipmentSideFilter";
import EquipmentCard from "@/components/EquipmentCard";

export default function EquipmentSearchHero() {

    return (
        <section className="min-h-screen bg-background ">

            {/* Hero banner */}
            <Herobanner />

            {/* Search panel */}
            <div className="section-container space-y-12">
                <div className="relative z-20 w-full -mt-8 rounded-2xl border border-border bg-card/90 p-3 shadow-[0_8px_30px_rgba(91,66,180,0.08)] backdrop-blur-xl">

                    <div className="flex flex-col lg:flex-row items-center gap-3">
                        {/* Search row */}
                        <div className="flex flex-col md:flex-row gap-2.5 w-full lg:w-[60%]">

                            {/* Equipment search */}
                            <div className="flex h-12 w-full items-center gap-3 rounded-xl border border-border bg-background px-4 transition focus-within:border-brand/30 focus-within:ring-3 focus-within:ring-brand/10">
                                <Search className="h-5 w-5 shrink-0 text-brand" />

                                <input
                                    type="search"
                                    placeholder="Search equipment name..."
                                    className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/80"
                                />
                            </div>

                            {/* Location */}
                            <div className="flex h-12 w-full items-center gap-3 rounded-xl border border-border bg-background px-4 transition focus-within:border-brand/30 focus-within:ring-3 focus-within:ring-brand/10">
                                <MapPin className="h-5 w-5 shrink-0 text-brand" />

                                <input
                                    type="search"
                                    placeholder="Search location..."
                                    className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/80"
                                />
                            </div>

                            {/* Search button */}
                            <Button
                                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-brand to-brand px-7 text-sm font-semibold text-white shadow-md shadow-brand/20 transition border-brand hover:from-brand/90 hover:to-brand/90 active:scale-[0.98] cursor-pointer"
                            >
                                <Search className="h-4 w-4" />
                                Search
                            </Button>
                        </div>

                        <SortBySelect />
                    </div>

                </div>

                {/* Main content */}
                <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">

                    <EquipmentFilter />

                    <div className="min-w-0">
                        {/* Search & Sort */}

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <EquipmentCard />
                            <EquipmentCard />
                            <EquipmentCard />
                            <EquipmentCard />
                        </div>
                    </div>

                </div>

            </div>


        </section>
    );
}


