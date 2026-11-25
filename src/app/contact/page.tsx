
import Link from "next/link";
import {
    ArrowRight,
    Clock3,
    Headphones,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Send,
    ShieldCheck,
} from "lucide-react";

const contactInfo = [
    {
        icon: Mail,
        title: "Email Us",
        description: "Send us an email anytime.",
        value: "support@rentivo.com",
        href: "mailto:support@rentivo.com",
    },
    {
        icon: Phone,
        title: "Call Us",
        description: "Talk with our support team.",
        value: "+880 1700-000000",
        href: "tel:+8801700000000",
    },
    {
        icon: MapPin,
        title: "Our Location",
        description: "Serving customers across Bangladesh.",
        value: "Dhaka, Bangladesh",
        href: "https://maps.google.com/?q=Dhaka+Bangladesh",
    },
    {
        icon: Clock3,
        title: "Working Hours",
        description: "We're here to help.",
        value: "Sat – Thu, 9 AM – 6 PM",
        href: undefined,
    },
];

const faqs = [
    {
        question: "How can I rent equipment on Rentivo?",
        answer:
            "Browse available equipment, select your preferred rental dates and quantity, provide your booking details, and continue to checkout.",
    },
    {
        question: "How can I list my equipment?",
        answer:
            "Create an account, register as an equipment owner, and submit your equipment details through your owner dashboard.",
    },
    {
        question: "How can I get help with a booking?",
        answer:
            "Contact our support team with your booking information. We'll help you understand the next steps.",
    },
    {
        question: "Is online payment available?",
        answer:
            "Rentivo provides an online checkout experience for supported payment methods. Available options are shown during checkout.",
    },
];

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Hero */}
            <section className="relative isolate overflow-hidden border-b border-border">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand/10 via-background to-violet-500/5" />
                <div className="absolute -right-20 -top-20 -z-10 size-72 rounded-full bg-brand/10 blur-3xl" />

                <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24">
                    <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-4 py-2 text-sm font-semibold text-brand">
                        <MessageCircle className="size-4" />
                        Contact Rentivo
                    </span>

                    <h1 className="mx-auto mt-6 max-w-3xl font-heading-grotesk text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                        Let's Start a
                        <span className="block text-brand">Conversation.</span>
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                        Have a question about renting equipment, managing your listings, or
                        using Rentivo? Our team is ready to help you.
                    </p>
                </div>
            </section>

            {/* Contact Info */}
            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {contactInfo.map((item) => {
                        const Icon = item.icon;

                        const content = (
                            <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg sm:p-6">
                                <div className="flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                                    <Icon className="size-6" />
                                </div>

                                <h3 className="mt-5 font-semibold">{item.title}</h3>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {item.description}
                                </p>
                                <p className="mt-3 break-words text-sm font-semibold text-brand">
                                    {item.value}
                                </p>
                            </div>
                        );

                        return item.href ? (
                            <a
                                key={item.title}
                                href={item.href}
                                target={item.href.startsWith("http") ? "_blank" : undefined}
                                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                            >
                                {content}
                            </a>
                        ) : (
                            <div key={item.title}>{content}</div>
                        );
                    })}
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
                <div className="grid overflow-hidden rounded-3xl border border-border bg-card shadow-sm lg:grid-cols-[0.85fr_1.15fr]">
                    {/* Left Information */}
                    <div className="relative isolate overflow-hidden bg-brand p-7 text-white sm:p-10 lg:p-12">
                        <div className="absolute -right-16 -top-16 -z-10 size-64 rounded-full border-[35px] border-white/10" />
                        <div className="absolute -bottom-20 -left-16 -z-10 size-64 rounded-full border-[35px] border-white/10" />

                        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                            Get In Touch
                        </span>

                        <h2 className="mt-5 font-heading-grotesk text-3xl font-bold sm:text-4xl">
                            We're Here to Help You.
                        </h2>

                        <p className="mt-5 text-sm leading-7 text-white/80 sm:text-base">
                            Whether you're a renter looking for equipment or an owner growing
                            your rental business, we'd love to hear from you.
                        </p>

                        <div className="mt-10 space-y-6">
                            <div className="flex gap-4">
                                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                                    <Headphones className="size-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Customer Support</h3>
                                    <p className="mt-1 text-sm leading-6 text-white/70">
                                        Get assistance with your account, bookings, and equipment.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                                    <ShieldCheck className="size-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Reliable Assistance</h3>
                                    <p className="mt-1 text-sm leading-6 text-white/70">
                                        We're committed to making your rental experience smoother.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 border-t border-white/20 pt-6">
                            <p className="text-sm font-medium text-white/80">
                                Prefer exploring first?
                            </p>
                            <Link
                                href="/equipments"
                                className="mt-3 inline-flex items-center gap-2 text-sm font-bold transition hover:gap-3"
                            >
                                Browse Equipment
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="p-6 sm:p-10 lg:p-12">
                        <div>
                            <h2 className="font-heading-grotesk text-2xl font-bold sm:text-3xl">
                                Send Us a Message
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                Fill out the form below and tell us how we can help.
                            </p>
                        </div>

                        <form
                            action="#"
                            method="POST"
                            className="mt-8 space-y-5"
                        >
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-semibold">
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Enter your name"
                                        required
                                        className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/10"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-semibold">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        required
                                        className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/10"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-semibold">
                                        Phone Number
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="+880 1XXX-XXXXXX"
                                        className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/10"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-semibold">
                                        Subject
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        required
                                        defaultValue=""
                                        className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
                                    >
                                        <option value="" disabled>
                                            Select a subject
                                        </option>
                                        <option value="general">General Inquiry</option>
                                        <option value="booking">Booking Support</option>
                                        <option value="equipment">Equipment Listing</option>
                                        <option value="payment">Payment Issue</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-semibold">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    placeholder="Tell us how we can help you..."
                                    required
                                    className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/10"
                                />
                            </div>

                            <button
                                type="submit"
                                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm font-bold text-white shadow-lg shadow-brand/20 transition hover:-translate-y-0.5 hover:opacity-90 sm:w-auto"
                            >
                                Send Message
                                <Send className="size-4" />
                            </button>

                            <p className="text-xs leading-5 text-muted-foreground">
                                Please don't include passwords or sensitive payment information
                                in your message.
                            </p>
                        </form>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-muted/40 py-20 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
                            FAQ
                        </span>
                        <h2 className="mt-4 font-heading-grotesk text-3xl font-bold sm:text-4xl">
                            Frequently Asked Questions
                        </h2>
                        <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                            Find quick answers to some common questions about Rentivo.
                        </p>
                    </div>

                    <div className="mx-auto mt-10 grid max-w-4xl gap-4">
                        {faqs.map((faq) => (
                            <details
                                key={faq.question}
                                className="group rounded-2xl border border-border bg-card p-5 sm:p-6"
                            >
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                                    <span>{faq.question}</span>
                                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand transition group-open:rotate-45">
                                        <span className="text-xl leading-none">+</span>
                                    </span>
                                </summary>
                                <p className="mt-4 border-t border-border pt-4 text-sm leading-7 text-muted-foreground">
                                    {faq.answer}
                                </p>
                            </details>
                        ))}
                    </div>

                    <div className="mt-10 text-center">
                        <p className="text-sm text-muted-foreground">
                            Still have questions?
                        </p>
                        <a
                            href="mailto:support@rentivo.com"
                            className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline"
                        >
                            Email our support team
                            <ArrowRight className="size-4" />
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
