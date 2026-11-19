import { useState } from "react";
import Image from "next/image";
import {
    ArrowRight,
    BadgeCheck,
    CalendarDays,
    Heart,
    MapPin,
    Package,
    Star,
    Tag,
    Sparkles,
    ClipboardList,
    CheckCircle2,
} from "lucide-react";

const rentalTerms = [
    "Equipment must be returned in the same condition.",
    "Late return may incur additional charges.",
    "Damage caused during rental will be the renter's responsibility.",
    "Cancellation is allowed up to 24 hours before the rental start date.",
];

const MainDetails = () => {
    const [favorite, setFavorite] = useState(false);
    const [rentalType, setRentalType] = useState("Daily");
    return (
        <>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.25fr]">

                {/* Image Gallery */}
                <div className="space-y-3">
                    <div className="group relative aspect-4/3 overflow-hidden rounded-2xl border border-border bg-card">
                        <Image
                            src={'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=85'}
                            alt="Excavator machine"
                            width={500}
                            height={500}
                            className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />

                        {/* Availability */}
                        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                            <span className="size-2 animate-pulse rounded-full bg-white" />
                            Available
                        </div>

                        {/* Favorite */}
                        <button
                            onClick={() => setFavorite(!favorite)}
                            aria-label="Toggle favorite"
                            className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-background/90 shadow-md backdrop-blur transition-all duration-300 hover:scale-110"
                        >
                            <Heart
                                size={19}
                                className={`transition-all duration-300 ${favorite
                                    ? "fill-rose-500 text-rose-500 scale-110"
                                    : "text-rose-500"
                                    }`}
                            />
                        </button>
                    </div>


                </div>

                {/* Equipment Information */}
                <div className="min-w-0 space-y-4">

                    {/* Title + Rating */}
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Excavator Machine
                        </h1>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                            <div className="flex items-center gap-0.5 text-amber-500">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} size={15} className="fill-amber-400" />
                                ))}
                            </div>

                            <span className="text-xs font-semibold text-foreground">
                                4.8
                            </span>

                            <span className="text-xs text-foreground/80">
                                (120 Reviews)
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="max-w-2xl text-sm leading-6 text-foreground/80">
                        Powerful and reliable excavator machine for construction and
                        heavy-duty work. Ideal for digging, demolition and large-scale
                        projects.
                    </p>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        <button
                            onClick={() => setFavorite(!favorite)}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary/10 hover:-translate-y-0.5 cursor-pointer"
                        >
                            <Heart
                                size={17}
                                className={favorite ? "fill-primary" : ""}
                            />
                            {favorite ? "Added to Favorites" : "Add to Favorites"}
                        </button>

                        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-brand/30 cursor-pointer">
                            <CalendarDays size={17} />
                            Book Now
                        </button>
                    </div>

                    {/* Equipment Info */}
                    <div className="divide-y divide-border border-y border-border py-1">
                        <InfoRow icon={<Sparkles size={16} />} label="Category">
                            Construction Equipment
                        </InfoRow>

                        <InfoRow icon={<Tag size={16} />} label="Rental Price">
                            <span className="font-bold">$120</span>
                            <span className="text-xs text-muted-foreground">/ day</span>
                        </InfoRow>

                        {/* Rental Type */}
                        <div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center">
                            <div className="flex w-40 shrink-0 items-center gap-2 text-xs font-medium text-muted-foreground">
                                <CalendarDays size={16} className="text-primary" />
                                Rental Type
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                                {["Daily", "Weekly", "Monthly"].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setRentalType(type)}
                                        className={`rounded-full border px-3 py-1 text-[11px] font-semibold transition-all duration-200 ${rentalType === type
                                            ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                            : "border-border bg-card hover:border-primary/40 hover:bg-primary/5"
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <InfoRow icon={<MapPin size={16} />} label="Location">
                            Dhaka, Bangladesh
                        </InfoRow>

                        <InfoRow icon={<Package size={16} />} label="Available Quantity">
                            <span className="font-bold">5 Units</span>
                        </InfoRow>
                    </div>

                    {/* Owner Card */}
                    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-3.5 sm:flex-row sm:items-center">
                        <div className="flex min-w-0 flex-1 items-center gap-3">
                            <Image
                                src="https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
                                alt="Equipment owner"
                                width={100}
                                height={100}
                                className="size-11 shrink-0 rounded-full object-cover ring-2 ring-primary/10"
                            />

                            <div className="min-w-0">
                                <p className="text-[10px] text-muted-foreground">
                                    Owner
                                </p>

                                <p className="flex flex-wrap items-center gap-1 text-sm font-bold">
                                    Rakib Hasan
                                    <BadgeCheck size={14} className="fill-primary text-primary-foreground" />
                                </p>

                                <p className="text-[10px] text-muted-foreground">
                                    Member Since: 2023
                                </p>
                            </div>
                        </div>

                        <button className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-primary/40 px-4 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground">
                            View Profile
                            <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Rental Terms */}
            <section className="mt-7 rounded-2xl border border-border bg-card p-4 sm:p-5">
                <div className="mb-4 flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-brand/10 text-brand">
                        <ClipboardList size={17} />
                    </div>

                    <h2 className="text-base font-bold">
                        Rental Terms and Conditions
                    </h2>
                </div>

                <ul className="space-y-2.5">
                    {rentalTerms.map((term) => (
                        <li
                            key={term}
                            className="flex items-start gap-2.5 text-[14px] font-medium leading-5 text-foreground/80"
                        >
                            <CheckCircle2
                                size={15}
                                className="mt-0.5 shrink-0 fill-brand text-white"
                            />
                            {term}
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
};

export default MainDetails;

function InfoRow({
    icon,
    label,
    children,
}: {
    icon: React.ReactNode;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1.5 py-3 sm:flex-row sm:items-center">
            <div className="flex w-40 shrink-0 items-center gap-2 text-xs font-medium text-muted-foreground">
                <span className="text-primary">{icon}</span>
                {label}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-sm text-foreground">
                {children}
            </div>
        </div>
    );
}
