import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Headphones, Play, Search, ShieldCheck, Tag, Zap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

const FEATURES = [
    { icon: ShieldCheck, title: "Trusted & Secure", description: "Your safety is our priority" },
    { icon: Zap, title: "Fast & Easy Booking", description: "Rent in just a few clicks" },
    { icon: Headphones, title: "24/7 Support", description: "Always here to help" },
    { icon: Tag, title: "Affordable Pricing", description: "Get the best value" },
] as const;

/* Divider borders per breakpoint:
   1 column (mobile) → top border on every item but the first
   2 columns (sm)    → top border on row 2, left border on column 2
   4 columns (lg)    → left border on every item but the first */
const FEATURE_DIVIDERS = [
    "",
    "border-t border-border sm:border-t-0 sm:border-l",
    "border-t border-border lg:border-t-0 lg:border-l",
    "border-t border-border sm:border-l lg:border-t-0",
];

/** Decorative orange ribbon sweeping across the left edge of the photo. */
function HeroRibbon({ id, className }: { id: string; className?: string }) {
    return (
        <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 200 600"
            preserveAspectRatio="none"
            className={cn(
                "pointer-events-none absolute inset-y-0 drop-shadow-[0_6px_30px_rgba(249,115,22,0.45)]",
                className
            )}
        >
            <defs>
                <linearGradient id={id} x1="0" y1="0" x2="0.3" y2="1">
                    <stop offset="0%" stopColor="#fdba74" />
                    <stop offset="40%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>
            </defs>
            <path d="M127 0C166 220 136 420 25 600H0C104 420 134 220 95 0Z" fill={`url(#${id})`} />
        </svg>
    );
}

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-background">
            {/* Warm wash behind the copy (subtle in light mode, orange-tinted in dark). */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-linear-to-r from-orange-500/10 via-amber-500/5 to-transparent dark:from-orange-500/15 dark:via-orange-500/5"
            />

            {/* Full-bleed photo on large screens. */}
            <div className="absolute inset-y-0 right-0 hidden w-[54%] lg:block">
                <Image
                    src="/hero-equipment.jpg"
                    alt="Yellow excavator working on a construction site"
                    fill
                    priority
                    sizes="54vw"
                    className="object-cover"
                />
                {/* Blend the photo's left edge into the background. */}
                <div
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-44 bg-linear-to-r from-background to-transparent"
                />
                <HeroRibbon id="hero-ribbon-desktop" className="-left-10 w-56" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-10 pt-12 pb-10 lg:grid-cols-[1.05fr_0.95fr] lg:pt-16 lg:pb-16">
                    <div className="lg:pr-6">
                        <p className="flex items-center gap-3 text-sm font-bold tracking-[0.15em] text-brand uppercase">
                            <span aria-hidden="true" className="h-px w-9 bg-brand" />
                            Rent with confidence
                        </p>

                        <h1 className="mt-5 text-4xl leading-[1.08] font-extrabold tracking-tight text-foreground sm:text-5xl xl:text-[3.5rem]">
                            Rent the Right Equipment,{" "}
                            <span className="relative inline-block text-brand">
                                Anytime!
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    viewBox="0 0 200 14"
                                    fill="none"
                                    preserveAspectRatio="none"
                                    className="absolute -bottom-1.5 left-0 h-3.5 w-full text-brand/85"
                                >
                                    <path
                                        d="M4 9.5C50 3.5 148 2.5 196 7"
                                        stroke="currentColor"
                                        strokeWidth="5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>
                        </h1>

                        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                            Find and rent high-quality equipment for your projects, events, and
                            more — quickly and easily.
                        </p>

                        <div className="mt-9 flex flex-wrap items-center gap-4">
                            <Link
                                href="/equipment"
                                // cn() must wrap buttonVariants(): cva only concatenates, so
                                // without it `bg-primary` from the default variant would
                                // override `bg-brand` by CSS order.
                                className={cn(
                                    buttonVariants({
                                        className:
                                            "h-12 gap-2.5 rounded-full px-6 text-base font-semibold shadow-lg shadow-brand/25 focus-visible:ring-brand/40",
                                    }),
                                    "bg-brand text-white hover:bg-brand/90 dark:text-white"
                                )}
                            >
                                <Search className="size-[18px]" />
                                Browse All Equipment
                                <ArrowRight className="size-[18px]" />
                            </Link>
                            <Link
                                href="/how-it-works"
                                className={cn(
                                    buttonVariants({
                                        variant: "outline",
                                        className:
                                            "h-12 gap-3 rounded-full border-2 px-6 text-base font-semibold hover:border-brand/40 dark:border-input",
                                    })
                                )}
                            >
                                <span
                                    aria-hidden="true"
                                    className="flex size-7 items-center justify-center rounded-full bg-foreground text-background"
                                >
                                    <Play className="size-3.5 fill-current" />
                                </span>
                                How It Works
                            </Link>
                        </div>
                    </div>

                    {/* Stacked photo below the copy on small/medium screens. */}
                    <div className="relative overflow-hidden rounded-3xl shadow-xl shadow-black/5 lg:hidden">
                        <Image
                            src="/hero-equipment.jpg"
                            alt="Yellow excavator working on a construction site"
                            width={1600}
                            height={1067}
                            priority
                            sizes="(max-width: 1024px) 100vw"
                            className="aspect-[4/3] w-full object-cover"
                        />
                        <div
                            aria-hidden="true"
                            className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-background/60 to-transparent"
                        />
                        <HeroRibbon id="hero-ribbon-mobile" className="-left-6 w-24" />
                    </div>
                </div>

                {/* Trust card overlapping the bottom of the hero. */}
                <div className="relative z-10 mx-auto -mt-2 max-w-6xl rounded-3xl border border-border/70 bg-card p-2 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)] sm:p-3 lg:-mt-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        {FEATURES.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={feature.title}
                                    className={cn(
                                        "flex items-start gap-4 border-border p-5 sm:p-6",
                                        FEATURE_DIVIDERS[index]
                                    )}
                                >
                                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-md shadow-brand/30">
                                        <Icon className="size-5" strokeWidth={2.5} />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-base font-bold text-foreground">{feature.title}</p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
