
"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import { HeartHandshake, Package, ShieldCheck, Sparkles } from "lucide-react";
import TopNavbar from "./TopNavbar";
import Image from "next/image";

const LoadingScreen = () => {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-10">

            {/* Background Glow */}
            <div className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-brand/10 blur-[110px]" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 size-96 rounded-full bg-sky-400/10 blur-[110px]" />

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-brand)_0.5px,transparent_0.5px)] bg-size-[24px_24px] opacity-[0.06]" />

            <div className="relative flex w-full max-w-md flex-col items-center text-center">

                {/* Animated Logo */}
                <div className="relative mb-8">

                    <div className="absolute -inset-5 animate-pulse rounded-[36px] bg-brand/10 blur-xl" />

                    <div className="absolute inset-0 animate-ping rounded-[28px] bg-brand/15 [animation-duration:3s]" />

                    <div className="relative flex w-full h-12 items-center justify-center ">
                        <Image src={'/image/logo.png'} alt="logo" width={100} height={100} className="w-full h-full object-contain" />
                    </div>

                    {/* Floating Badge */}
                    <div className="absolute -right-3 -top-3 flex size-9 items-center justify-center rounded-full border-4 border-background bg-sky-500 text-white shadow-lg">
                        <Sparkles size={15} />
                    </div>

                    <div className="absolute -bottom-2 -left-3 flex size-8 items-center justify-center rounded-full border-4 border-background bg-emerald-500 text-white shadow-lg">
                        <ShieldCheck size={14} />
                    </div>
                </div>

                {/* Brand */}
                <div className="space-y-2">
                    <h1 className="font-heading-grotesk text-4xl font-extrabold tracking-tight sm:text-5xl">
                        Rentivo<span className="text-brand">.</span>
                    </h1>

                    <p className="text-sm font-medium text-muted-foreground sm:text-base">
                        Rent smarter. Grow together.
                    </p>
                </div>

                {/* Loading Card */}
                <div className="mt-10 w-full rounded-3xl border border-border bg-card/80 p-6 shadow-xl shadow-black/[0.03] backdrop-blur-xl sm:p-8">

                    <div className="flex items-center justify-center gap-2">
                        <Package size={17} className="text-brand" />
                        <span className="text-sm font-semibold">
                            Preparing your experience
                        </span>
                    </div>

                    {/* Animated Dots */}
                    <div className="mt-6 flex items-center justify-center gap-2">
                        <span className="size-2 animate-bounce rounded-full bg-brand [animation-delay:-0.3s]" />
                        <span className="size-2 animate-bounce rounded-full bg-brand [animation-delay:-0.15s]" />
                        <span className="size-2 animate-bounce rounded-full bg-brand" />
                    </div>

                    {/* Progress Animation */}
                    <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div className="h-full w-1/3 animate-[loading_1.8s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-brand/60 via-brand to-brand/60" />
                    </div>

                    <p className="mt-4 text-xs leading-5 text-muted-foreground">
                        Getting everything ready for you. Please wait a moment...
                    </p>
                </div>

                {/* Footer */}
                <div className="mt-10 flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2.5 text-xs font-medium text-muted-foreground shadow-sm">
                    <Sparkles size={14} className="text-brand" />
                    Making a difference, together.
                </div>

            </div>

            {/* Animation */}
            <style jsx global>{` 
            @keyframes loading {
                0% {
                    transform: translateX(-120%);
                }
                100% {
                    transform: translateX(350%);
                }
            }
        `}</style>
        </div>
    );
};

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const hideLayout = ["/sign-in", "/sign-up"].includes(pathname);

    return (
        <>
            <TopNavbar />

            <main className="flex-1">
                {children}
            </main>

            {!hideLayout && <Footer />}
        </>
    );
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <LayoutContent>{children}</LayoutContent>
        </Suspense>
    );
};

export default MainLayout;