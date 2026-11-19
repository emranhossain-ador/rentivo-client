"use client";

import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, User, UserRoundPlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <section className="section-container min-h-screen flex justify-center items-center my-5">

            <div className="bg-card max-w-lg w-full mx-auto shadow-md border border-border rounded-[30px] overflow-hidden p-4 md:p-8">
                {/* Form Header */}
                <div className="text-center mb-5">

                    <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl shadow-sm shadow-brand/30 bg-brand/5 border border-brand/30 text-4xl">
                        <UserRoundPlus className="size-8 animate-in zoom-in text-brand duration-300" />
                    </div>

                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-[34px]">Create Account</h2>

                    <p className="mt-2 text-sm text-foreground/80">Join Rentivo and start renting today! </p>
                </div>

                <form action="" className="space-y-4">

                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <label className="mb-2 block text-sm font-semibold text-foreground">
                            Full Name
                        </label>

                        <div className="relative">
                            <User className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-brand" />

                            <input
                                type="text"
                                placeholder="Enter your full name"
                                autoComplete="name"
                                required
                                className="icon-input"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-foreground">
                            Email Address
                        </label>

                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-brand" />
                            <input type="email" placeholder="Enter your email address" autoComplete="email" className="icon-input" />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold">
                            Password
                        </label>

                        <div className="relative">
                            <LockKeyhole className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-brand" />

                            <input type={showPassword ? "text" : "password"}
                                placeholder={'Create a password'}
                                autoComplete="new-password"
                                className="icon-input"
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
                    </div>

                    {/* Confirm Password */}
                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <label className="mb-2 block text-sm font-semibold">
                            Confirm Password
                        </label>

                        <div className="relative">
                            <LockKeyhole className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-brand" />

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                autoComplete="new-password"
                                required
                                className="icon-input"
                            />

                            <button type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground transition-colors hover:text-brand">
                                {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="mt-8">
                        <button
                            type="submit"
                            className="group flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-brand text-sm cursor-pointer font-bold text-white shadow-lg shadow-brand/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/30 active:scale-[0.98]"
                        >
                            <UserRoundPlus size={18} />
                            Register Account
                            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </div>

                    <div className="mt-7 text-center text-sm text-foreground">
                        Already have an account?{" "}
                        <Link href={'/sign-in'}
                            className="font-bold text-brand hover:text-brand/80"
                        >
                            Login here
                        </Link>
                    </div>

                </form>
            </div>

        </section>
    )
};

export default SignupPage;