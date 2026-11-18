
"use client";

import { ArrowRight, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AvailabilityBadge from "./ui/AvailabilityBadge";
import FavoriteButton from "./ui/FavoriteButton";

export default function EquipmentCard() {
    return (
        <article className="group w-full overflow-hidden rounded-[24px] border border-border bg-card shadow-[0_8px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.14)]">

            {/* Image section */}
            <div className="relative h-52.5 overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
                    alt="Toyota Corolla"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/10" />

                {/* Favorite button */}
                <FavoriteButton />

                {/* Availability */}
                <AvailabilityBadge />
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Title + rating */}
                <div className="flex items-start justify-between gap-3">
                    <Link href={'/'} className="text-lg line-clamp-1 font-bold tracking-tight text-foreground hover:text-brand">
                        Toyota Corolla
                    </Link>

                    <div>
                        <p className="text-xl font-extrabold tracking-tight text-orange-600">
                            ৳70
                            <span className="ml-1 text-sm font-semibold text-foreground/70">
                                / daily
                            </span>
                        </p>
                    </div>

                </div>

                {/* Category */}
                <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-brand/20 bg-brand/10 px-3 py-1.5 text-xs font-semibold text-foreground">
                    Vehicles & Transportation
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 mt-3">
                    <div className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-foreground/80">
                        <Star size={15} className="fill-amber-500 text-amber-500" />
                        4.7
                        <span className="font-normal text-foreground/80">(128)</span>
                    </div>
                    <span className="text-foreground/40">|</span>
                    <div className="flex items-center gap-2 text-sm text-foreground/90">
                        <MapPin size={16} className="text-brand" />
                        Sylhet, Bangladesh
                    </div>
                </div>

                {/* Divider */}
                <div className="my-4 border-t border-border" />

                {/* Price + Button */}
                <div >
                    <Link href={`/`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 min-h-12 w-full text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-orange-600 hover:shadow-md active:scale-95 cursor-pointer group">
                        View Details
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
