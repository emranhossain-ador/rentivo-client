
"use client";

import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Package,
    Loader2,
} from "lucide-react";

const DashboardLoader = () => {
    return (
        <div className="fixed inset-0 z-9999 flex min-h-screen items-center justify-center overflow-hidden bg-background">

            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
            </div>

            <div className="relative flex w-full max-w-md flex-col items-center px-6">

                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 flex items-center gap-3"
                >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/20">
                        <Package className="h-7 w-7" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-extrabold tracking-tight">
                            Rentivo
                        </h1>
                        <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground">
                            RENT SMARTER
                        </p>
                    </div>
                </motion.div>

                {/* Loader Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="w-full rounded-3xl border border-border bg-card p-6 shadow-2xl shadow-black/5 sm:p-8"
                >
                    {/* Dashboard Icon */}
                    <div className="mb-6 flex justify-center">
                        <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
                            <LayoutDashboard className="h-9 w-9 text-primary" />

                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground"
                            >
                                <Loader2 className="h-4 w-4" />
                            </motion.div>
                        </div>
                    </div>

                    {/* Loading Text */}
                    <div className="mb-7 text-center">
                        <h2 className="text-xl font-bold sm:text-2xl">
                            Preparing Dashboard
                        </h2>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Please wait while we get everything ready for you.
                        </p>
                    </div>

                    {/* Progress Animation */}
                    <div className="mb-7 h-2 overflow-hidden rounded-full bg-muted">
                        <motion.div
                            className="h-full w-1/3 rounded-full bg-primary"
                            animate={{ x: ["-100%", "300%"] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </div>

                    {/* Skeleton Cards */}
                    <div className="grid grid-cols-3 gap-3">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="rounded-xl border border-border bg-muted/40 p-3"
                            >
                                <div className="mb-3 h-8 w-8 animate-pulse rounded-lg bg-muted" />
                                <div className="mb-2 h-3 w-12 animate-pulse rounded bg-muted" />
                                <div className="h-2 w-full animate-pulse rounded bg-muted" />
                            </div>
                        ))}
                    </div>

                    {/* Bottom Status */}
                    <div className="mt-6 flex items-center justify-center gap-2">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                        <span className="text-xs font-medium text-muted-foreground">
                            Loading your workspace...
                        </span>
                    </div>
                </motion.div>

                {/* Footer */}
                <p className="mt-7 text-center text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Rentivo. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default DashboardLoader;
