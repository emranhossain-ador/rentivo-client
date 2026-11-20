
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


    return (
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
    )
};

export default SigninForm;