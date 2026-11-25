"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    CheckCircle2,
    CalendarCheck,
    ShieldCheck,
    Clock3,
    ArrowRight,
    Home,
    PackageCheck,
    AlertCircle,
    Loader2,
} from "lucide-react";
import { verifyPayment } from "@/lib/actions/booking";

type Status = "verifying" | "confirmed" | "pending" | "failed";

const MAX_ATTEMPTS = 6;
const RETRY_DELAY = 2000; // ms

const PaymentSuccessContent = () => {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");

    const [status, setStatus] = useState<Status>("verifying");
    const [message, setMessage] = useState("");
    const mountedRef = useRef(true);

    const runVerification = useCallback(async () => {
        if (!sessionId) {
            setStatus("failed");
            setMessage("Missing payment session. Please contact support.");
            return;
        }

        setStatus("verifying");
        setMessage("");

        for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
            try {
                const result = await verifyPayment(sessionId);

                if (!mountedRef.current) return;

                if (result.success) {
                    setStatus("confirmed");
                    return;
                }

                // Session doesn't exist — retrying won't help
                if (result.message?.toLowerCase().includes("not found")) {
                    setStatus("failed");
                    setMessage(result.message);
                    return;
                }
            } catch {
                // Network error — keep retrying
            }

            if (!mountedRef.current) return;

            if (attempt < MAX_ATTEMPTS - 1) {
                await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
            }
        }

        if (!mountedRef.current) return;

        // Payment is still being processed by Stripe
        setStatus("pending");
        setMessage("Your payment is still being confirmed. Please check again.");
    }, [sessionId]);

    useEffect(() => {
        mountedRef.current = true;
        runVerification();

        return () => {
            mountedRef.current = false;
        };
    }, [runVerification]);

    const isConfirmed = status === "confirmed";
    const isFailed = status === "failed";

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-12 dark:bg-slate-950">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -left-32 -top-32 size-80 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 size-80 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative w-full max-w-lg">
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
                    {/* Success Header */}
                    <div
                        className={`px-6 py-10 text-center text-white ${
                            isFailed
                                ? "bg-gradient-to-br from-rose-500 to-orange-600"
                                : "bg-gradient-to-br from-emerald-500 to-teal-600"
                        }`}
                    >
                        <div className="mx-auto mb-5 flex size-24 items-center justify-center rounded-full border-4 border-white/30 bg-white/20 shadow-lg">
                            {status === "verifying" ? (
                                <Loader2 className="size-14 animate-spin" strokeWidth={2} />
                            ) : isFailed ? (
                                <AlertCircle className="size-14" strokeWidth={2} />
                            ) : (
                                <CheckCircle2 className="size-14" strokeWidth={2} />
                            )}
                        </div>

                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-50">
                            {status === "verifying"
                                ? "Verifying Payment"
                                : isFailed
                                  ? "Payment Not Verified"
                                  : "Payment Completed"}
                        </p>

                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            {status === "verifying"
                                ? "Please wait..."
                                : isFailed
                                  ? "Something went wrong"
                                  : "Thank You!"}
                        </h1>

                        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-emerald-50">
                            {status === "verifying"
                                ? "Securely confirming your payment with Stripe."
                                : isFailed
                                  ? message
                                  : "Your payment was completed successfully. Your booking is confirmed."}
                        </p>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8">
                        {isConfirmed ? (
                            <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/30">
                                <div className="flex items-start gap-3">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/60 dark:text-emerald-400">
                                        <CheckCircle2 className="size-5" />
                                    </div>

                                    <div>
                                        <h2 className="font-semibold text-emerald-900 dark:text-emerald-300">
                                            Booking confirmed
                                        </h2>
                                        <p className="mt-1 text-sm leading-6 text-emerald-800/80 dark:text-emerald-400/80">
                                            Payment received and your booking status is now
                                            confirmed. You can view it from your dashboard.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : status === "pending" ? (
                            <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/60 dark:bg-amber-950/30">
                                <div className="flex items-start gap-3">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/60 dark:text-amber-400">
                                        <Clock3 className="size-5" />
                                    </div>

                                    <div>
                                        <h2 className="font-semibold text-amber-900 dark:text-amber-300">
                                            Confirming your booking
                                        </h2>
                                        <p className="mt-1 text-sm leading-6 text-amber-800/80 dark:text-amber-400/80">
                                            {message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : isFailed ? (
                            <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/60 dark:bg-rose-950/30">
                                <div className="flex items-start gap-3">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-900/60 dark:text-rose-400">
                                        <AlertCircle className="size-5" />
                                    </div>

                                    <div>
                                        <h2 className="font-semibold text-rose-900 dark:text-rose-300">
                                            Verification failed
                                        </h2>
                                        <p className="mt-1 text-sm leading-6 text-rose-800/80 dark:text-rose-400/80">
                                            {message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/30">
                                <div className="flex items-start gap-3">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/60 dark:text-emerald-400">
                                        <Loader2 className="size-5 animate-spin" />
                                    </div>

                                    <div>
                                        <h2 className="font-semibold text-emerald-900 dark:text-emerald-300">
                                            Confirming your booking
                                        </h2>
                                        <p className="mt-1 text-sm leading-6 text-emerald-800/80 dark:text-emerald-400/80">
                                            We are securely updating your booking details. This
                                            usually takes a few seconds.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                                    <ShieldCheck className="size-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                        Secure Payment
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Your payment was processed through Stripe.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400">
                                    <CalendarCheck className="size-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                        Booking Confirmation
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {isConfirmed
                                            ? "Your booking has been confirmed."
                                            : "Your booking status will update automatically."}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400">
                                    <PackageCheck className="size-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                        Rental Ready
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Your equipment reservation is secured.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 grid gap-3 sm:grid-cols-2">
                            {(status === "pending" || isFailed) && (
                                <button
                                    type="button"
                                    onClick={() => runVerification()}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                                >
                                    <Clock3 className="size-4" />
                                    Check again
                                </button>
                            )}

                            <Link
                                href={`/dashboard/customer`}
                                className="group flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
                            >
                                My Dashboard
                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                            </Link>

                            <Link
                                href="/"
                                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800"
                            >
                                <Home className="size-4" />
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>

                <p className="mt-6 text-center text-xs text-slate-400">
                    Thank you for choosing Rentivo. Happy renting!
                </p>
            </div>
        </main>
    );
};

export default PaymentSuccessContent;
