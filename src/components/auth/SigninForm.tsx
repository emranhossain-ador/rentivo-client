
"use client";

import { useState } from "react";
import {
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    LogIn,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Label from "../ui/Label";
import { ValidationErrors } from "../ValidationError";
import Link from "next/link";

interface FormError {
    email?: string;
    password?: string;
}

const SigninForm = () => {

    const [error, setErrors] = useState<FormError>({});
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirectTo') ?? "/";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const email = String(formData.get('email') ?? "").trim();
        const password = String(formData.get('password') ?? "").trim();

        const newErrors: FormError = {};

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email.";
        }

        if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters!";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                setIsLoading(true);

                const { error } = await signIn.email({
                    email: email as string,
                    password: password as string,
                    rememberMe: rememberMe
                })

                if (error) {
                    toast.error(error.message);
                } else {
                    form.reset();
                    toast.success("Login successfull");
                    router.push(redirectTo);
                }


            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

    };





    const handleGoogleLogin = async () => {
        const googleLogin = await signIn.social({
            provider: 'google',
            callbackURL: '/',
            errorCallbackURL: '/login'
        });

        if (googleLogin.error) {
            toast.error(googleLogin.error.message)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="mt-7 space-y-4">

                {/* Email */}
                <div>
                    <Label htmlFor="email" title="Email Address" />

                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-brand" />
                        <input type="email" placeholder="Enter your email address" name="email" autoComplete="email" className="icon-input" />
                    </div>
                    {error.email && <ValidationErrors msg={error.email} />}
                </div>

                {/* Password */}
                <div>
                    <Label htmlFor="password" title="Password" />

                    <div className="relative">
                        <LockKeyhole className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-brand" />

                        <input type={showPassword ? "text" : "password"}
                            placeholder={'Create a password'}
                            autoComplete="new-password"
                            className="icon-input"
                            name="password"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground transition-colors hover:text-brand"
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                    </div>
                    {error.password && <ValidationErrors msg={error.password} />}
                </div>

                {/* Remember me / forgot password */}
                <div className="flex items-center justify-between gap-2 pt-1">
                    <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-600">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="size-4 rounded border-gray-300 dark:border-gray-600 accent-brand"
                        />
                        Remember me
                    </label>

                    <Link
                        href="/forgot-password"
                        className="text-xs font-semibold text-brand transition-colors hover:text-brand/80"
                    >
                        Forgot Password?
                    </Link>
                </div>

                {/* Submit */}
                <div className="mt-8">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="group flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-brand text-sm cursor-pointer font-bold text-white shadow-lg shadow-brand/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {isLoading ? (
                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        ) : (
                            <>
                                <LogIn size={18} />
                                Login
                            </>
                        )}

                    </button>
                </div>
            </form>


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
                    onClick={handleGoogleLogin}
                    className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-border bg-background text-sm font-semibold text-foreground transition-all duration-300 hover:border-brand/50 hover:bg-brand/10 hover:shadow-sm active:scale-[0.98] cursor-pointer"
                >
                    <GoogleIcon />
                    Continue with Google
                </button>
            </div>

        </>
    )
};


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


export default SigninForm;