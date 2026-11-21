
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    ShieldAlert,
    Home,
    ArrowLeft,
    LockKeyhole,
    Headset,
    ArrowRight,
} from "lucide-react";

export default function UnauthorizedPage() {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-5">
            {/* Background Decoration */}
            <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-xl text-center"
            >
                {/* Icon */}
                <motion.div
                    initial={{ scale: 0.7, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-[28px] bg-destructive/10 text-destructive shadow-sm sm:h-28 sm:w-28"
                >
                    <ShieldAlert className="h-12 w-12 sm:h-14 sm:w-14" />
                </motion.div>

                {/* Status */}
                <span className="inline-flex items-center gap-2 rounded-full border border-destructive/20 bg-destructive/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-destructive">
                    <LockKeyhole className="h-3.5 w-3.5" />
                    Access Restricted
                </span>

                <h1 className="mt-6 text-7xl font-extrabold tracking-tight text-foreground sm:text-8xl">
                    403
                </h1>

                <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    Access Denied!
                </h2>

                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-foreground/90 sm:text-base">
                    Sorry, you don't have permission to access this page.
                    Please contact the administrator or return to your dashboard.
                </p>

                {/* Info Card */}
                <div className="mx-auto mt-8 flex max-w-md items-center gap-4 rounded-2xl border border-border bg-card p-4 text-left shadow-sm">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Headset className="h-5 w-5" />
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-foreground">
                            Need access?
                        </h3>
                        <p className="mt-1 text-xs leading-5 text-foreground/90">
                            Contact support or ask your administrator for permission.
                        </p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:opacity-90 cursor-pointer"
                    >
                        <Home className="h-4 w-4" />
                        Back to Home
                        <ArrowRight className="h-4 w-4" />
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Go Back
                    </button>
                </div>

                <p className="mt-12 text-xs text-muted-foreground">
                    Error Code: 403 · Rentivo Security
                </p>
            </motion.div>
        </main>
    );
}
