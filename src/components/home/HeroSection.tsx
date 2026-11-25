import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Search, } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";



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
            <div className="absolute inset-y-0 right-0 hidden w-[52%] lg:block">
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
                <div className="grid gap-10 pt-12 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:pt-16 lg:pb-24">
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

                        <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg">
                            Find and rent high-quality equipment for your projects, events, and
                            more — quickly and easily.
                        </p>

                        <div className="mt-9 flex flex-wrap items-center gap-4">
                            <Link
                                href="/equipment"
                                className={cn(
                                    buttonVariants({
                                        className:
                                            "h-12 gap-2.5 rounded-full px-6 text-base font-semibold shadow-lg shadow-brand/25 focus-visible:ring-brand/40",
                                    }),
                                    "bg-brand text-white hover:bg-brand/90 dark:text-white"
                                )}
                            >
                                <Search className="size-4.5" />
                                Browse All Equipment
                                <ArrowRight className="size-4.5" />
                            </Link>
                            <Link
                                href="#how-it-works"
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
                            className="aspect-4/3 w-full object-cover"
                        />
                        <div
                            aria-hidden="true"
                            className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-background/60 to-transparent"
                        />
                        <HeroRibbon id="hero-ribbon-mobile" className="-left-6 w-24" />
                    </div>
                </div>
            </div>
        </section>
    );
}
