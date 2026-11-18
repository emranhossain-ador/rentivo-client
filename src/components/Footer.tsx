
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";

const quickLinks = [
    { name: "Home", href: "/" },
    { name: "All Equipment", href: "/equipment" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
];

const services = [
    "Equipment Rental",
    "Flexible Booking",
    "Secure Payment",
    "24/7 Support",
];

const socials = [
    { name: "Facebook", icon: <FaFacebook className="text-xl" />, href: "#" },
    { name: "YouTube", icon: <IoLogoYoutube className="text-xl" />, href: "#" },
    { name: "Instagram", icon: <FaInstagram className="text-xl" />, href: "#" },
];

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-accent text-foreground border-t border-border mt-10 md:mt-15">
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-500/5 blur-[100px]" />

            <div className="relative section-container">

                {/* Main footer */}
                <div className="grid grid-cols-1 gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:py-20">

                    {/* Brand */}
                    <div className="lg:pr-8">
                        <Link href="/" className="group inline-flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-600 text-foreground shadow-lg shadow-orange-600/20 transition duration-300 group-hover:rotate-[-8deg] group-hover:bg-orange-500">
                                <svg
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m14.7 6.3 3-3a2.1 2.1 0 0 1 3 3l-3 3" />
                                    <path d="m16.5 7.5-10 10" />
                                    <path d="m5 19 3-3" />
                                    <path d="m3 21 2-2" />
                                    <path d="m8 16 3 3" />
                                    <path d="M7 17H4a2 2 0 0 0-2 2v2h2a2 2 0 0 0 2-2v-2Z" />
                                </svg>
                            </div>

                            <span className="text-2xl font-extrabold tracking-tight">
                                Rental<span className="text-orange-500">Hub</span>
                            </span>
                        </Link>

                        <p className="mt-4 text-sm font-medium text-brand">
                            Rent Smart. Work Better.
                        </p>

                        <p className="mt-4 max-w-sm text-sm font-medium leading-7 text-foreground/80">
                            Your trusted platform for renting high-quality construction,
                            photography, electronics, and event equipment effortlessly.
                        </p>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h3 className="mb-5 text-base font-bold text-foreground">
                            Quick Links
                        </h3>

                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="group inline-flex items-center gap-2 font-semibold text-sm text-foreground/80 transition-colors hover:text-brand"
                                    >
                                        <span className="h-1 w-1 rounded-full bg-brand opacity-0 transition-all group-hover:opacity-100" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="mb-5 text-base font-bold text-foreground">
                            Our Services
                        </h3>

                        <ul className="space-y-3">
                            {services.map((service) => (
                                <li
                                    key={service}
                                    className="flex items-center gap-2 text-sm font-semibold text-foreground/80 transition-colors hover:text-brand"
                                >
                                    <span className="text-orange-500">↗</span>
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="mb-5 text-base font-bold text-foreground">
                            Follow Us
                        </h3>

                        <p className="mb-5 text-sm leading-6 text-foreground/90">
                            Stay connected for updates, offers and more.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            {socials.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    aria-label={social.name}
                                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand/50 text-sm font-bold text-brand transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-orange-600 hover:text-white hover:shadow-lg hover:shadow-orange-600/20"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>

                        <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-brand/40 font-semibold px-3 py-2 text-xs text-brand">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-brand" />
                            Your rental partner
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col gap-4 border-t border-border py-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs leading-6 text-foreground">
                        © 2026 Rentivo. All rights reserved.
                    </p>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        <Link
                            href="/privacy-policy"
                            className="text-xs text-foreground/80 transition hover:text-brand font-medium"
                        >
                            Privacy Policy
                        </Link>

                        <span className="hidden h-4 w-px bg-[#493020] sm:block" />

                        <Link
                            href="/terms"
                            className="text-xs text-foreground/80 transition hover:text-brand font-medium"
                        >
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
