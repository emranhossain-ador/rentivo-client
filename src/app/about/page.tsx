
import Link from "next/link";
import {
    ArrowRight,
    BadgeCheck,
    CheckCircle2,
    Clock3,
    HeartHandshake,
    Lightbulb,
    Package,
    ShieldCheck,
    Target,
    TrendingUp,
    Users,
    Wallet,
    Wrench,
} from "lucide-react";

const stats = [
    { value: "Easy", label: "Equipment Discovery", icon: Package },
    { value: "Secure", label: "Booking Experience", icon: ShieldCheck },
    { value: "Flexible", label: "Rental Options", icon: Clock3 },
    { value: "Reliable", label: "Community Support", icon: Users },
];

const values = [
    {
        icon: ShieldCheck,
        title: "Trust & Safety",
        description:
            "We aim to create a reliable rental environment where equipment owners and renters can connect with confidence.",
    },
    {
        icon: HeartHandshake,
        title: "Customer First",
        description:
            "Every feature is designed to make renting and listing equipment simple, convenient, and accessible.",
    },
    {
        icon: Lightbulb,
        title: "Smart Solutions",
        description:
            "We use technology to make equipment rental easier, reduce unnecessary costs, and improve accessibility.",
    },
    {
        icon: TrendingUp,
        title: "Grow Together",
        description:
            "We help equipment owners reach more customers while giving renters more choices for their needs.",
    },
];

const steps = [
    {
        number: "01",
        icon: Package,
        title: "Explore Equipment",
        description:
            "Discover equipment across different categories and find the right option for your project.",
    },
    {
        number: "02",
        icon: BadgeCheck,
        title: "Book Your Rental",
        description:
            "Choose your rental dates, quantity, and provide the required booking information.",
    },
    {
        number: "03",
        icon: Wallet,
        title: "Complete Payment",
        description:
            "Continue to the secure checkout process and complete your rental payment.",
    },
    {
        number: "04",
        icon: Wrench,
        title: "Get to Work",
        description:
            "Coordinate with the equipment owner and get ready to complete your project.",
    },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative isolate overflow-hidden border-b border-border">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand/10 via-background to-violet-500/5" />
                <div className="absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-brand/10 blur-3xl" />
                <div className="absolute -bottom-32 -left-24 -z-10 size-80 rounded-full bg-violet-500/10 blur-3xl" />

                <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:px-8 lg:py-28">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-4 py-2 text-sm font-semibold text-brand">
                            <span className="size-2 rounded-full bg-brand" />
                            About Rentivo
                        </span>

                        <h1 className="mt-6 max-w-2xl font-heading-grotesk text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                            Making Equipment Rental
                            <span className="block text-brand">Simple & Accessible.</span>
                        </h1>

                        <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                            Rentivo is an equipment rental marketplace designed to connect
                            equipment owners with people who need the right tools for their
                            projects. We make finding, renting, and managing equipment easier.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/equipment"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:-translate-y-0.5 hover:opacity-90"
                            >
                                Explore Equipment
                                <ArrowRight className="size-4" />
                            </Link>

                            <Link
                                href="/sign-up"
                                className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-6 py-3.5 text-sm font-semibold transition hover:bg-muted"
                            >
                                Join Rentivo
                            </Link>
                        </div>
                    </div>

                    {/* Hero Visual */}
                    <div className="relative mx-auto w-full max-w-xl">
                        <div className="absolute -inset-4 rounded-[2rem] bg-brand/10 blur-2xl" />

                        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-2xl sm:p-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Welcome to
                                    </p>
                                    <h2 className="mt-1 font-heading-grotesk text-3xl font-bold">
                                        Rentivo<span className="text-brand">.</span>
                                    </h2>
                                </div>
                                <div className="flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                                    <Wrench className="size-6" />
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
                                <div className="rounded-2xl bg-muted p-4 sm:p-5">
                                    <div className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                                        <Package className="size-5" />
                                    </div>
                                    <h3 className="mt-4 font-semibold">Find Equipment</h3>
                                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                        Explore equipment for every project.
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-muted p-4 sm:p-5">
                                    <div className="flex size-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                                        <Users className="size-5" />
                                    </div>
                                    <h3 className="mt-4 font-semibold">Connect People</h3>
                                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                        Bring owners and renters together.
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-muted p-4 sm:p-5">
                                    <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                                        <ShieldCheck className="size-5" />
                                    </div>
                                    <h3 className="mt-4 font-semibold">Book Securely</h3>
                                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                        Enjoy a convenient booking journey.
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-muted p-4 sm:p-5">
                                    <div className="flex size-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                                        <TrendingUp className="size-5" />
                                    </div>
                                    <h3 className="mt-4 font-semibold">Grow Together</h3>
                                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                        Create more opportunities.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-brand/20 bg-brand/5 p-4">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                                    <CheckCircle2 className="size-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">
                                        Everything you need, in one place
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Discover a smarter way to rent equipment.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.label}
                                className="rounded-2xl border border-border bg-card p-5 text-center transition hover:-translate-y-1 hover:shadow-lg sm:p-7"
                            >
                                <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                                    <Icon className="size-6" />
                                </div>
                                <h3 className="mt-4 font-heading-grotesk text-xl font-bold sm:text-2xl">
                                    {stat.value}
                                </h3>
                                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                                    {stat.label}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Our Story / Mission */}
            <section className="bg-muted/40 py-20 sm:py-24">
                <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                    <div>
                        <span className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
                            Our Story
                        </span>
                        <h2 className="mt-4 font-heading-grotesk text-3xl font-bold sm:text-4xl">
                            A Better Way to Access the Equipment You Need
                        </h2>
                        <p className="mt-5 leading-8 text-muted-foreground">
                            Finding the right equipment for a short-term project can be
                            expensive and time-consuming. At the same time, many equipment
                            owners have resources that are not being used regularly.
                        </p>
                        <p className="mt-4 leading-8 text-muted-foreground">
                            Rentivo aims to bridge this gap through a simple online
                            marketplace. We bring equipment owners and renters together,
                            making it easier to discover available equipment and manage
                            rental bookings in one place.
                        </p>
                    </div>

                    <div className="relative">
                        <div className="rounded-3xl border border-border bg-card p-7 shadow-xl sm:p-10">
                            <div className="flex size-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                                <Target className="size-7" />
                            </div>
                            <h3 className="mt-6 font-heading-grotesk text-2xl font-bold">
                                Our Mission
                            </h3>
                            <p className="mt-3 leading-7 text-muted-foreground">
                                To make equipment rental more accessible, affordable, and
                                convenient by connecting people with the resources they need
                                without requiring them to purchase everything themselves.
                            </p>

                            <div className="my-8 h-px bg-border" />

                            <h3 className="font-heading-grotesk text-2xl font-bold">
                                Our Vision
                            </h3>
                            <p className="mt-3 leading-7 text-muted-foreground">
                                To build a trusted rental community where sharing resources
                                creates opportunities for individuals, businesses, and
                                equipment owners.
                            </p>
                        </div>
                        <div className="absolute -bottom-5 -right-3 -z-10 size-28 rounded-3xl bg-brand/20 blur-xl" />
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
                        What We Believe
                    </span>
                    <h2 className="mt-4 font-heading-grotesk text-3xl font-bold sm:text-4xl">
                        The Values Behind Rentivo
                    </h2>
                    <p className="mt-4 leading-7 text-muted-foreground">
                        Our values guide how we build the platform and how we serve our
                        growing rental community.
                    </p>
                </div>

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {values.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="group rounded-2xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-2 hover:border-brand/40 hover:shadow-xl"
                            >
                                <div className="flex size-13 items-center justify-center rounded-2xl bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white">
                                    <Icon className="size-6" />
                                </div>
                                <h3 className="mt-6 text-lg font-bold">{item.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* How It Works */}
            <section className="bg-muted/40 py-20 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
                            Simple Process
                        </span>
                        <h2 className="mt-4 font-heading-grotesk text-3xl font-bold sm:text-4xl">
                            How Rentivo Works
                        </h2>
                        <p className="mt-4 leading-7 text-muted-foreground">
                            Getting the equipment you need is simple. Just follow these four
                            easy steps.
                        </p>
                    </div>

                    <div className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {steps.map((step) => {
                            const Icon = step.icon;

                            return (
                                <div
                                    key={step.number}
                                    className="relative rounded-2xl border border-border bg-card p-6"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                                            <Icon className="size-6" />
                                        </div>
                                        <span className="font-heading-grotesk text-3xl font-bold text-brand/20">
                                            {step.number}
                                        </span>
                                    </div>
                                    <h3 className="mt-6 text-lg font-bold">{step.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                        {step.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl bg-brand px-6 py-14 text-center text-white sm:px-12 sm:py-16">
                    <div className="absolute -right-16 -top-24 size-64 rounded-full border-[40px] border-white/10" />
                    <div className="absolute -bottom-28 -left-16 size-64 rounded-full border-[40px] border-white/10" />

                    <div className="relative mx-auto max-w-2xl">
                        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white/15">
                            <Wrench className="size-7" />
                        </div>
                        <h2 className="mt-6 font-heading-grotesk text-3xl font-bold sm:text-4xl">
                            Ready to Be Part of Rentivo?
                        </h2>
                        <p className="mt-4 leading-7 text-white/80">
                            Whether you need equipment for your next project or want to list
                            your own equipment, Rentivo is here to help you get started.
                        </p>

                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <Link
                                href="/equipment"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-brand transition hover:bg-white/90"
                            >
                                Browse Equipment
                                <ArrowRight className="size-4" />
                            </Link>
                            <Link
                                href="/sign-up"
                                className="inline-flex items-center justify-center rounded-xl border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                            >
                                Create an Account
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
