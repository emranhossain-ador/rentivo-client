
import Link from "next/link";
import SigninForm from "@/components/auth/SigninForm";



export default function AuthPage() {


    return (
        <section className="section-container min-h-screen flex justify-center items-center my-5">

            <div className="bg-card max-w-lg w-full mx-auto shadow-md border border-border rounded-[30px] overflow-hidden p-4 md:p-8">

                {/* Form Header */}
                <div className="text-center">

                    <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-brand/20 text-4xl transition-all duration-300">
                        <span className="animate-in zoom-in duration-300">👋</span>
                    </div>

                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-[34px]">Welcome Back!</h2>

                    <p className="mt-2 text-sm text-foreground/80">Login to your Rentivo account</p>
                </div>


                {/* Form */}
                <SigninForm />

                {/* Divider */}
                <div className="my-5 flex items-center gap-4">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-xs font-medium text-foreground/70">or</span>
                    <div className="h-px flex-1 bg-border" />
                </div>

                {/* Social Login */}
                <div className="space-y-2.5">
                    <button
                        type="button"
                        className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-border bg-background text-sm font-semibold text-foreground transition-all duration-300 hover:border-brand/50 hover:bg-brand/10 hover:shadow-sm active:scale-[0.98] cursor-pointer"
                    >
                        <GoogleIcon />
                        Continue with Google
                    </button>
                </div>

                {/* Footer */}
                <div className="mt-7 text-center text-sm text-foreground">
                    Don&apos;t have an account?{" "}
                    <Link href={'/sign-up'}
                        className="font-bold text-brand hover:text-brand/80"
                    >
                        Register here
                    </Link>
                </div>

            </div>
        </section>

    );
}

function GoogleIcon() {
    return (
        <svg viewBox="0 0 48 48" className="size-5" aria-hidden="true">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8.1 3.2l5.7-5.7C34.2 6 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-9 20-20 0-1.2-.1-2.3-.4-3.5Z" />
            <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.3 19 12 24 12c3.1 0 5.9 1.2 8.1 3.2l5.7-5.7C34.2 6 29.4 4 24 4 16.3 4 9.6 8.4 6.3 14.7Z" />
            <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.5-5.3l-6.3-5.3C29 35.3 26.6 36 24 36c-5.2 0-9.7-3.6-11.3-8.5l-6.6 5C9.5 38.8 16.2 44 24 44Z" />
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.6-2.5 4.7-4.8 6.1l6.3 5.3C40.5 35.7 44 30.2 44 24c0-1.2-.1-2.3-.4-3.5Z" />
        </svg>
    );
}
