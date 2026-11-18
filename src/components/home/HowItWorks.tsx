
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    CalendarDays,
    CircleCheck,
    CreditCard,
    Rocket,
    Search,
    Play,
} from "lucide-react";



const steps = [
    {
        id: "01",
        title: "Search",
        description: "Find your desired equipment.",
        icon: Search,
    },
    {
        id: "02",
        title: "Book",
        description: "Choose dates & confirm booking.",
        icon: CalendarDays,
    },
    {
        id: "03",
        title: "Pay",
        description: "Complete payment securely.",
        icon: CreditCard,
    },
    {
        id: "04",
        title: "Enjoy",
        description: "Get your equipment and get started!",
        icon: CircleCheck,
    },
];

export default function HowItWorks() {
    return (
        <section className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24">

            {/* Background Decorations */}
            <div className="pointer-events-none absolute -right-32 top-0 -z-10 size-105 rounded-full bg-brand/5 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-60 left-10 -z-10 size-112.5 rounded-full bg-brand/5 blur-3xl" />

            <div className="pointer-events-none absolute right-8 top-8 -z-10 size-40 opacity-40 bg-[radial-gradient(var(--brand)_2px,transparent_2px)] bg-size-[20px_20px]" />

            <div className="section-container grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">

                {/* Left Side - Steps */}
                <div className="lg:col-span-7">

                    {/* Section Heading */}
                    <div className="mb-8 text-center">

                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/5 px-4 py-2 text-sm font-bold text-brand">
                            Get Started Easily
                            <Rocket size={16} />
                        </div>

                        <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                            How It{" "}
                            <span className="text-brand">Works</span>
                        </h2>

                        <p className="mt-3 text-base text-muted-foreground sm:text-lg">
                            Renting equipment is just a few simple steps
                        </p>

                    </div>

                    {/* Steps Grid */}
                    <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                        {steps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <div
                                    key={step.id}
                                    className="group relative flex flex-col items-center justify-center overflow-visible rounded-2xl border border-border/40 bg-card px-3 py-3 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10"
                                >

                                    {/* Step Icon */}
                                    <div className="mb-1 flex size-12 items-center justify-center rounded-full bg-brand/10 text-brand transition-all duration-300 group-hover:scale-105 group-hover:bg-brand group-hover:text-brand-foreground">
                                        <Icon size={20} strokeWidth={2.3} />
                                    </div>

                                    {/* Number */}
                                    <span className="relative z-10 -mt-3 rounded-full bg-brand px-2 py-1 text-xs font-semibold text-brand-foreground shadow-sm">
                                        {step.id}
                                    </span>

                                    {/* Title */}
                                    <h3 className="mt-1.5 font-heading text-base font-bold text-card-foreground">
                                        {step.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                        {step.description}
                                    </p>

                                    {/* Arrow Between Steps */}
                                    {index !== steps.length - 1 && (
                                        <ArrowRight
                                            size={27}
                                            className="absolute -right-4 top-1/2 z-20 hidden -translate-y-1/2 text-brand/70 xl:block"
                                        />
                                    )}

                                </div>
                            );
                        })}

                    </div>

                </div>


                {/* Right Side - Promotional Image */}
                <div className="lg:col-span-5">

                    <div className="group relative mx-auto w-full max-w-[650px]">

                        {/* Outer Decorative Border */}
                        <div className="absolute -inset-2 -z-10 rounded-[45px] border border-brand/70" />

                        {/* Bottom Orange Decoration */}
                        <div className="absolute -bottom-4 right-0 -z-10 h-20 w-3/4 rounded-br-[45px] rounded-bl-[30px] bg-brand" />

                        {/* Image Container */}
                        <div className="relative aspect-[4/3] overflow-hidden rounded-[35px] border-[5px] border-card shadow-2xl">

                            <Image
                                src="/images/equipment/how-it-works.jpg"
                                alt="Rent construction equipment easily"
                                fill
                                sizes="(max-width: 1024px) 100vw, 42vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Image Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

                            {/* Promotional Text */}
                            <div className="absolute left-5 top-1/2 max-w-[65%] -translate-y-1/2 sm:left-8">

                                <p className="font-heading text-3xl font-bold italic leading-tight text-white sm:text-4xl lg:text-5xl">
                                    Rent Smart,
                                </p>

                                <p className="mt-1 font-heading text-3xl font-bold italic leading-tight text-brand sm:text-4xl lg:text-5xl">
                                    Work Better!
                                </p>

                                <div className="mt-4 h-1 w-32 rotate-[-12deg] rounded-full bg-brand sm:w-40" />

                                {/* Play Button */}
                                <Link
                                    href="/how-it-works"
                                    aria-label="Learn how equipment rental works"
                                    className="mt-7 flex size-14 items-center justify-center rounded-full border-2 border-brand bg-white text-brand shadow-lg transition-all duration-300 hover:scale-110 hover:bg-brand hover:text-white sm:size-16"
                                >
                                    <Play size={25} fill="currentColor" />
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}
