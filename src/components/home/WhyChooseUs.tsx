import { ArrowRight, CalendarDays, Headphones, ShieldCheck, Star, Tag } from "lucide-react";
import Link from "next/link";

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

const WhyChooseUs = () => {
    return (
        <section className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24">

            {/* Background Decorations */}
            <div className="pointer-events-none absolute -right-32 -top-60 -z-10 size-137.5 rounded-full border-75 border-brand/10" />

            <div className="pointer-events-none absolute -right-24 -top-44 -z-10 size-105 rounded-full border-65 border-brand/15" />

            <div className="pointer-events-none absolute -left-48 top-0 -z-10 size-125 rounded-full bg-brand/5 blur-3xl" />

            <div className="pointer-events-none absolute right-10 top-5 -z-10 size-40 opacity-40 bg-[radial-gradient(var(--brand)_2px,transparent_2px)] bg-size-[20px_20px]" />

            <div className="section-container grid  grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8 ">

                {/* Left Content */}
                <div className="lg:col-span-4">

                    {/* Badge */}
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/5 px-3 py-2 text-sm font-bold text-brand">
                        <span className="flex size-6 items-center justify-center rounded-full bg-brand text-brand-foreground">
                            <Star size={14} fill="currentColor" />
                        </span>

                        Our Advantages

                        <Star size={15} fill="currentColor" />
                    </div>

                    {/* Heading */}
                    <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[54px] lg:leading-[1.15]">
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
                                className="group flex flex-col items-center justify-center rounded-2xl border border-border/50 bg-card/90 px-3.5 py-5 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10"
                            >

                                {/* Icon */}
                                <div
                                    className={`mb-3 flex size-16 items-center justify-center rounded-full ${item.bg} transition-transform duration-300 group-hover:scale-110`}
                                >
                                    <Icon
                                        size={30}
                                        strokeWidth={2.5}
                                        className={item.color}
                                    />
                                </div>

                                {/* Title */}
                                <h3 className="mb-1.5 font-heading text-base font-bold tracking-tight text-card-foreground">
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p className="max-w-47.5 text-sm leading-relaxed text-muted-foreground">
                                    {item.description}
                                </p>

                            </div>
                        );
                    })}

                </div>

            </div>
        </section>
    );
};

export default WhyChooseUs;