"use client";

import { ArrowRight, Check, Eye, EyeOff, Image as ImageIcon, LockKeyhole, Mail, User, UserRoundPlus, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Label from "../ui/Label";
import Image from "next/image";
import { ValidationErrors } from "../ValidationError";
import { signUp } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";



interface FormError {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}



const SignupForm = () => {

    // Handle error state
    const [error, setErrors] = useState<FormError>({});

    // Handle password show hide
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");

    // Handle image preview
    const [preview, setPreview] = useState<string | null>(null);
    const [imgError, setImgError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [avatarUrl, setAvatarUrl] = useState<string>('');

    const router = useRouter();


    // Handle change image
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        // Validate image type
        if (!file.type.startsWith("image/")) {
            setImgError("Please select a valid image.");
            return;
        }

        // Validate image size (2MB)
        if (file.size > 2 * 1024 * 1024) {
            setImgError("Image size must be less than 2MB.");
            return;
        }

        setImgError("");

        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);

        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        const imgApi = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`;
        const res = await fetch(imgApi, {
            method: 'POST',
            body: formData
        });

        const result = await res.json();
        setAvatarUrl(result.data.url);


    };

    const removeImage = () => {
        if (preview) {
            URL.revokeObjectURL(preview);
        }

        setPreview(null);
        setImgError("");
    };


    const checks = [
        { label: "At least 6 characters", ok: password.length >= 6 },
        { label: "One uppercase letter", ok: /[A-Z]/.test(password) },
        { label: "One lowercase letter", ok: /[a-z]/.test(password) },
    ];


    // Handle Form data
    const handleSubmit = async (s: React.FormEvent<HTMLFormElement>) => {
        s.preventDefault();
        const form = s.currentTarget;
        const formData = new FormData(form);

        const name = String(formData.get('name') ?? "").trim();
        const email = String(formData.get('email') ?? "").trim();
        const password = String(formData.get('password') ?? "").trim();
        const confirmPassword = String(formData.get('confirmPassword') ?? "").trim();

        //------ Validation check -------
        const newErrors: FormError = {};

        if (name.length <= 3) {
            newErrors.name = "Please enter your full name";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email.";
        }

        if (!/[A-Z]/.test(password)) {
            newErrors.password = "Password contain at least one uppercase letter";
        }

        if (!/[a-z]/.test(password)) {
            newErrors.password = "Password contain at least one lowercase letter";
        }

        if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long!";
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Password dosen't match!!"
        }


        setErrors(newErrors);


        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true);

            try {
                const { error } = await signUp.email({
                    name: name as string,
                    email: email,
                    role: 'customer',
                    password: password,
                    image: avatarUrl as string
                });

                if (error) {
                    toast.error(error.message);
                } else {
                    form.reset();
                    setPassword('');
                    toast.success("Registration Successful");
                    router.push('/sign-in');
                }
            } catch (err) {
                toast.error("Something went wrong!");
            } finally {
                setIsLoading(false);
            }

        }
    }




    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <Label title="Full Name" isRequired={true} className="mb-2!" />

                <div className="relative">
                    <User className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-brand" />

                    <input
                        type="text"
                        placeholder="Enter your full name"
                        autoComplete="name"
                        name="name"
                        className="icon-input"
                    />
                </div>
                {error.name && <ValidationErrors msg={error.name} />}
            </div>

            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <Label title="Profile Image" className="mb-2!" />

                <div className="flex items-center gap-3 w-full">

                    {/* Image Preview */}
                    <div className="size-12 flex items-center justify-center border border-border shrink-0 shadow overflow-hidden rounded-full bg-muted">
                        {preview ? (
                            <Image
                                src={preview}
                                alt="Profile preview"
                                width={100}
                                height={100}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User size={22} className="text-brand" />
                        )}
                    </div>

                    {/* Upload Button */}
                    <div className="relative w-full">
                        <label className="icon-input pl-4! flex items-center gap-2 cursor-pointer">
                            <ImageIcon className="size-4.5 text-brand shrink-0" />
                            <span className="truncate">
                                {preview ? "Change profile image" : "Choose profile picture"}
                            </span>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                    </div>

                    {/* Remove Button */}
                    {preview && (
                        <button
                            type="button"
                            onClick={removeImage}
                            className="size-10 shrink-0 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-red-500 hover:border-red-500 transition"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>

                {/* Error */}
                {imgError && (
                    <p className="text-xs text-red-500 mt-2">{imgError}</p>
                )}

                {!imgError && (
                    <p className="text-xs text-orange-500 mt-2">
                        PNG, JPG or WEBP · Max 2MB
                    </p>
                )}
            </div>

            {/* Email */}
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <Label htmlFor="email" title="Email Address" isRequired={true} className="mb-2!" />

                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-brand" />
                    <input type="email" placeholder="Enter your email address" name="email" autoComplete="email" className="icon-input" />
                </div>
                {error.email && <ValidationErrors msg={error.email} />}
            </div>

            {/* Password */}
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <Label htmlFor="password" title="Password" isRequired={true} className="mb-2!" />

                <div className="relative">
                    <LockKeyhole className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-brand" />

                    <input type={showPassword ? "text" : "password"}
                        placeholder={'Create a password'}
                        autoComplete="new-password"
                        className="icon-input"
                        name="password"
                        defaultValue={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={6}
                        maxLength={10}

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
                        name="confirmPassword"
                        className="icon-input"
                    />

                    <button type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground transition-colors hover:text-brand">
                        {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                </div>
                {error.confirmPassword && <ValidationErrors msg={error.confirmPassword} />}

                <ul className="space-y-1 pt-1">
                    {checks.map(({ label, ok }) => (
                        <li
                            key={label}
                            className={`flex items-center gap-1.5 font-medium text-xs ${ok ? "text-emerald-500" : "text-foreground/80"}`}
                        >
                            <Check className="h-3.5 w-3.5" />
                            {label}
                        </li>
                    ))}
                </ul>
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
                            <UserRoundPlus size={18} />
                            Register Account
                            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                    )}

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
    )
};

export default SignupForm;