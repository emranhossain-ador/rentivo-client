
"use client";

import { ArrowRight, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AvailabilityBadge from "./ui/AvailabilityBadge";

export default function EquipmentCard() {
    return (
        <article
            className="group overflow-hidden rounded-xl border border-border shadow-lg shadow-black/5 dark:shadow-white/5 bg-card p-2 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5 sm:p-2.5"
        >
            {/* Image */}
            <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                <Image
                    src={'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=700&q=80'}
                    alt={'Bulldozer'}
                    width={100}
                    height={100}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <AvailabilityBadge />
            </div>

            {/* Details */}
            <div className="px-0.5 pt-2">
                <div className="flex items-center gap-1.5">
                    <h3 className="truncate line-clamp-1 text-sm font-bold text-foreground sm:text-base transition-colors group-hover:text-brand">
                        {'Bulldozer'}
                    </h3>
                    {/* Animated Dot */}
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    </span>
                </div>

                <div className="mt-1 flex items-center gap-1">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <span className="text-[12px] font-semibold">{4.6}</span>
                    <span className="truncate text-[11px] text-foreground/80">
                        ({12} Reviews)
                    </span>
                </div>

                <p className="mt-1 text-xs font-bold text-orange-500 sm:text-sm">
                    ৳{50}
                    <span className="font-normal text-muted-foreground"> / day</span>
                </p>

                <Link href={'/equipment/347850934'} className="mt-2.5 flex w-full items-center border border-brand/80 justify-center gap-1 rounded-lg bg-brand/10 py-2 md:py-2.5 text-[10px] font-semibold text-brand transition-colors hover:bg-brand hover:text-white sm:text-xs cursor-pointer">
                    View Details
                    <ArrowRight size={12} />
                </Link>
            </div>
        </article>
    );
}
