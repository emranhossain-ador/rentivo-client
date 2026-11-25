import Link from "next/link";
import {
    XCircle,
    CreditCard,
    RefreshCw,
    Home,
    ShieldCheck,
    Info,
    ArrowRight,
} from "lucide-react";

const PaymentCancelPage = () => {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-12 dark:bg-slate-950">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -left-32 -top-32 size-80 rounded-full bg-rose-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 size-80 rounded-full bg-orange-500/10 blur-3xl" />

            <div className="relative w-full max-w-lg">
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
                    {/* Cancel Header */}
                    <div className="bg-gradient-to-br from-rose-500 to-orange-500 px-6 py-10 text-center text-white">
                        <div className="mx-auto mb-5 flex size-24 items-center justify-center rounded-full border-4 border-white/30 bg-white/20 shadow-lg">
                            <XCircle className="size-14" strokeWidth={2} />
                        </div>

                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-rose-50">
                            Payment Cancelled
                        </p>

                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            No Payment Made
                        </h1>

                        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-rose-50">
                            Your checkout was cancelled before payment was completed.
                            Don&apos;t worry, you can try again.
                        </p>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8">
                        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/60 dark:bg-amber-950/30">
                            <div className="flex items-start gap-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/60 dark:text-amber-400">
                                    <Info className="size-5" />
                                </div>

                                <div>
                                    <h2 className="font-semibold text-amber-900 dark:text-amber-300">
                                        What happened?
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-amber-800/80 dark:text-amber-400/80">
                                        No successful payment was recorded for this checkout.
                                        Your booking may remain pending until it expires or is
                                        cancelled.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
                                    <CreditCard className="size-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                        No Completed Payment
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        You have not completed this checkout.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                                    <ShieldCheck className="size-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                        Secure Checkout
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        You can safely try the payment process again.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 grid gap-3 sm:grid-cols-2">
                            <Link
                                href="/"
                                className="group flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rose-600/20 transition hover:-translate-y-0.5 hover:bg-rose-700"
                            >
                                <RefreshCw className="size-4" />
                                Try Again
                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                            </Link>

                            <Link
                                href="/dashboard"
                                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                            >
                                <Home className="size-4" />
                                My Dashboard
                            </Link>
                        </div>
                    </div>
                </div>

                <p className="mt-6 text-center text-xs text-slate-400">
                    Need help? Contact the Rentivo support team.
                </p>
            </div>
        </main>
    );
};

export default PaymentCancelPage;