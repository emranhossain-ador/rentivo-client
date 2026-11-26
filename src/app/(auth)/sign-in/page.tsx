
import { Suspense } from "react";
import Link from "next/link";
import SigninForm from "@/components/auth/SigninForm";

export default function AuthPage() {
    return (
        <section className="section-container min-h-screen flex justify-center items-center my-5">
            <div className="bg-card max-w-lg w-full mx-auto shadow-md border border-border rounded-[30px] overflow-hidden p-4 md:p-8">

                {/* Form Header */}
                <div className="text-center">
                    <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-brand/20 text-4xl transition-all duration-300">
                        <span className="animate-in zoom-in duration-300">
                            👋
                        </span>
                    </div>

                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-[34px]">
                        Welcome Back!
                    </h2>

                    <p className="mt-2 text-sm text-foreground/80">
                        Login to your Rentivo account
                    </p>
                </div>

                {/* Form */}
                <Suspense
                    fallback={
                        <div className="mt-7 h-72 animate-pulse rounded-xl bg-muted" />
                    }
                >
                    <SigninForm />
                </Suspense>

                {/* Footer */}
                <div className="mt-7 text-center text-sm text-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/sign-up"
                        className="font-bold text-brand hover:text-brand/80"
                    >
                        Register here
                    </Link>
                </div>

            </div>
        </section>
    );
}
