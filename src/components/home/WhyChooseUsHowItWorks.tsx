
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    BadgeCheck,
    CalendarDays,
    CheckCircle2,
    CircleCheck,
    CreditCard,
    Headphones,
    Rocket,
    Search,
    ShieldCheck,
    Tag,
    Star,
    Play,
} from "lucide-react";

const advantages = [
    {
        id: 1,
        title: "Affordable Prices",
        description: "Get the best price for your rental needs.",
        icon: Tag,
        color: "text-orange-500",
        bg: "bg-orange-500/10",
    },
    {
        id: 2,
        title: "Verified Owners",
        description: "Rent with confidence from verified owners.",
        icon: ShieldCheck,
        color: "text-green-500",
        bg: "bg-green-500/10",
    },
    {
        id: 3,
        title: "Flexible Rental Period",
        description: "Choose your rental duration easily.",
        icon: CalendarDays,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        id: 4,
        title: "24/7 Support",
        description: "We're always here to help you.",
        icon: Headphones,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
];

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

export default function WhyChooseUsHowItWorks() {
    return (
        <div className="relative overflow-hidden bg-background">

            {/* ======================================
          WHY CHOOSE US SECTION
      ====================================== */}

            <section className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24">

                {/* Background Decorations */}
                <div className="pointer-events-none absolute -right-32 -top-60 -z-10 size-[550px] rounded-full border-[75px] border-brand/10" />

                <div className="pointer-events-none absolute -right-24 -top-44 -z-10 size-[420px] rounded-full border-[65px] border-brand/15" />

                <div className="pointer-events-none absolute -left-48 top-0 -z-10 size-[500px] rounded-full bg-brand/5 blur-3xl" />

                <div className="pointer-events-none absolute right-10 top-5 -z-10 size-40 opacity-40 [background-image:radial-gradient(var(--brand)_2px,transparent_2px)] [background-size:20px_20px]" />

                <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-10">

                    {/* Left Content */}
                    <div className="lg:col-span-4">

                        {/* Badge */}
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-3 py-2 text-sm font-bold text-brand">
                            <span className="flex size-6 items-center justify-center rounded-full bg-brand text-brand-foreground">
                                <Star size={14} fill="currentColor" />
                            </span>

                            Our Advantages

                            <Star size={15} fill="currentColor" />
                        </div>

                        {/* Heading */}
                        <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[54px] lg:leading-[1.15]">
                            Why Choose{" "}
                            <span className="text-brand">Us?</span>
                        </h2>

                        {/* Description */}
                        <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                            We provide reliable, affordable and hassle-free rental services
                            for everyone.
                        </p>

                        {/* Learn More */}
                        <Link
                            href="/about"
                            className="mt-7 inline-flex items-center gap-3 rounded-full bg-brand px-7 py-3.5 font-bold text-brand-foreground shadow-lg shadow-brand/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            Learn More
                            <ArrowRight size={20} />
                        </Link>

                    </div>

                    {/* Right Advantage Cards */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">

                        {advantages.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.id}
                                    className="group flex min-h-[235px] flex-col items-center justify-center rounded-[28px] border border-border/50 bg-card/90 px-5 py-7 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10"
                                >

                                    {/* Icon */}
                                    <div
                                        className={`mb-4 flex size-[88px] items-center justify-center rounded-full ${item.bg} transition-transform duration-300 group-hover:scale-110`}
                                    >
                                        <Icon
                                            size={47}
                                            strokeWidth={2.5}
                                            className={item.color}
                                        />
                                    </div>

                                    {/* Title */}
                                    <h3 className="mb-3 font-heading text-lg font-bold tracking-tight text-card-foreground">
                                        {item.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="max-w-[190px] text-sm leading-relaxed text-muted-foreground">
                                        {item.description}
                                    </p>

                                </div>
                            );
                        })}

                    </div>

                </div>
            </section>


            {/* ======================================
          HOW IT WORKS SECTION
      ====================================== */}

            <section className="relative isolate overflow-hidden border-t border-border/30 py-16 sm:py-20 lg:py-24">

                {/* Background Decorations */}
                <div className="pointer-events-none absolute -right-32 top-0 -z-10 size-[420px] rounded-full bg-brand/5 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-60 left-10 -z-10 size-[450px] rounded-full bg-brand/5 blur-3xl" />

                <div className="pointer-events-none absolute right-8 top-8 -z-10 size-40 opacity-40 [background-image:radial-gradient(var(--brand)_2px,transparent_2px)] [background-size:20px_20px]" />

                <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">

                    {/* Left Side - Steps */}
                    <div className="lg:col-span-7">

                        {/* Section Heading */}
                        <div className="mb-8 text-center">

                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-2 text-sm font-bold text-brand">
                                Get Started Easily
                                <Rocket size={16} />
                            </div>

                            <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                                How It{" "}
                                <span className="text-brand">Works</span>
                            </h2>

                            <p className="mt-3 text-base text-muted-foreground sm:text-xl">
                                Renting equipment is just a few simple steps
                            </p>

                        </div>

                        {/* Steps Grid */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                            {steps.map((step, index) => {
                                const Icon = step.icon;

                                return (
                                    <div
                                        key={step.id}
                                        className="group relative flex min-h-[220px] flex-col items-center justify-center overflow-visible rounded-[28px] border border-border/40 bg-card px-4 py-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10"
                                    >

                                        {/* Step Icon */}
                                        <div className="mb-1 flex size-[78px] items-center justify-center rounded-full bg-brand/10 text-brand transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-brand-foreground">
                                            <Icon size={39} strokeWidth={2.3} />
                                        </div>

                                        {/* Number */}
                                        <span className="relative z-10 -mt-1 rounded-full bg-brand px-3 py-1 text-sm font-bold text-brand-foreground shadow-sm">
                                            {step.id}
                                        </span>

                                        {/* Title */}
                                        <h3 className="mt-3 font-heading text-xl font-bold text-card-foreground">
                                            {step.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="mt-2 max-w-[180px] text-sm leading-relaxed text-muted-foreground">
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

        </div>
    );
}
