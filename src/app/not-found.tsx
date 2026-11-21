
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    SearchX,
    Home,
    ArrowLeft,
    Compass,
    ArrowRight,
} from "lucide-react";

export default function NotFound() {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-5">
            {/* Background Decoration */}
            <div className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-xl text-center"
            >
                {/* Illustration */}
                <div className="relative mx-auto mb-8 flex h-48 w-48 items-center justify-center sm:h-56 sm:w-56">
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="flex h-36 w-36 items-center justify-center rounded-[36px] border border-red-500/50 bg-red-500/10 shadow-xl shadow-red-500/5 sm:h-44 sm:w-44"
                    >
                        <SearchX className="h-20 w-20 text-red-600 sm:h-24 sm:w-24" />
                    </motion.div>

                    <span className="absolute right-2 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                        Oops!
                    </span>

                    <span className="absolute bottom-5 left-1 text-2xl">?</span>
                </div>

                {/* Status */}
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                    <Compass className="h-3.5 w-3.5" />
                    Page Not Found
                </span>

                <h1 className="mt-6 text-7xl font-extrabold tracking-tight text-foreground sm:text-8xl">
                    404
                </h1>

                <h2 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
                    Lost Your Way?
                </h2>

                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
                    The page you're looking for doesn't exist or may have been moved.
                    Let's get you back to where you belong.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:-translate-y-0.5 hover:opacity-90"
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
                    Error Code: 404 · Rentivo
                </p>
            </motion.div>
        </main>
    );
}
