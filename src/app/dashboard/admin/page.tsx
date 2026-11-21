
"use client";

import Link from "next/link";
import {
    CalendarDays,
    CheckCircle2,
    ArrowRight,
    MapPin,
} from "lucide-react";
import Image from "next/image";
import Header from "@/components/dashboard/Header";
import Statistics from "./_components/Statistics";


export default function AdminDashboard() {
    return (
        <main className="min-h-screen space-y-8 md:space-y-10">

            <Header />

            {/* Statistics */}
            <Statistics />

            {/* Main dashboard content */}
            <section className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">

                {/* Upcoming Bookings */}
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:col-span-7">

                    <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-4 sm:px-5">
                        <div className="flex min-w-0 items-center gap-2.5">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                                <CalendarDays className="h-5 w-5" />
                            </div>
                            <h2 className="truncate text-sm font-bold text-foreground sm:text-base">
                                Upcoming Bookings
                            </h2>
                        </div>

                        <Link
                            href={'/dashboard/bookings'}
                            className="flex shrink-0 items-center gap-1 text-xs font-semibold text-brand transition hover:text-brand/90"
                        >
                            View All
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="p-3 sm:p-4">
                        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-3 transition hover:border-brand hover:shadow-sm sm:flex-row sm:items-start sm:p-4">

                            {/* Equipment image */}
                            <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-xl bg-accent sm:h-32 sm:w-36">
                                <Image
                                    src="https://images.unsplash.com/photo-1580901369227-308f6f40bdeb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
                                    alt="Excavator Machine"
                                    height={100}
                                    width={100}
                                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                                />
                            </div>

                            {/* Booking details */}
                            <div className="flex min-w-0 flex-1 flex-col">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="text-sm font-bold text-foreground sm:text-base">
                                        Excavator Machine
                                    </h3>

                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                                        <CheckCircle2 className="h-3 w-3" />
                                        Confirmed
                                    </span>
                                </div>

                                <div className="mt-3 space-y-2.5 text-xs text-foreground sm:text-sm">
                                    <div className="flex items-center gap-2">
                                        <CalendarDays className="h-4 w-4 shrink-0 text-foreground" />
                                        Dec 05, 2026 – Dec 07, 2026
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 shrink-0 text-foreground" />
                                        Sylhet, Bangladesh
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-end sm:mt-auto sm:pt-3">
                                    <Link
                                        href="/dashboard/bookings"
                                        className="inline-flex items-center gap-2 rounded-lg border border-brand/30 px-3 py-2 text-xs font-semibold text-brand transition hover:bg-brand hover:text-white"
                                    >
                                        View Details
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </main>
    );
}
