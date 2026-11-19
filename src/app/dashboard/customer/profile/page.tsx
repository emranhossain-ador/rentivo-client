
"use client";

import { useEffect, useRef, useState } from "react";
import {
    UserRound,
    Mail,
    Phone,
    MapPin,
    Camera,
    ShieldCheck,
    Save,
    CheckCircle2,
    Trash2,
    Loader2,
} from "lucide-react";
import PageHeading from "@/components/dashboard/PageHeading";
import Image from "next/image";


// Profile Type
type ProfileType = {
    name: string;
    email: string;
    phone: string;
    address: string;
    avatar: string;
};

const initialProfile: ProfileType = {
    name: "Demo Owner",
    email: "owner@gmail.com",
    phone: "+880 1711 000000",
    address: "",
    avatar: "",
};

export default function ProfileSettings() {
    // States
    const [profile, setProfile] = useState<ProfileType>(initialProfile);
    const [preview, setPreview] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string>("");
    const [saving, setSaving] = useState<boolean>(false);

    // Ref
    const fileRef = useRef<HTMLInputElement | null>(null);

    // Cleanup preview URL
    useEffect(() => {
        if (!selectedFile) return;

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);



    // Avatar upload and validation
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0];

        if (!file) return;

        setError("");

        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image file.");
            e.target.value = "";
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setError("Image size must be less than 2MB.");
            e.target.value = "";
            return;
        }

        setSelectedFile(file);
    };

    // Remove avatar
    const removeAvatar = (): void => {
        setSelectedFile(null);
        setPreview("");

        setProfile((prev: ProfileType) => ({
            ...prev,
            avatar: "",
        }));

        if (fileRef.current) {
            fileRef.current.value = "";
        }
    };


    const labelClass =
        "mb-2 block text-sm font-semibold text-foreground";

    return (
        <main className="bg-background space-y-8 md:space-y-10">


            {/* Page Heading */}
            <PageHeading
                Icon={UserRound}
                title="Profile Settings"
                subTitle="Manage your personal information and profile picture."
            />

            {/* Main Profile Card */}
            <form
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >

                {/* Card Header */}
                <div className="flex flex-col justify-between gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:px-7 sm:py-6">

                    <div>
                        <h2 className="text-lg font-bold">
                            Personal Information
                        </h2>
                        <p className="text-xs text-muted-foreground">
                            Update your account details
                        </p>
                    </div>

                    <span className="flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-600">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                        Active Account
                    </span>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 gap-7 p-5 sm:p-7 lg:grid-cols-[280px_1fr] lg:gap-9">

                    {/* LEFT: Avatar Upload */}
                    <div className="space-y-5">

                        <div className="rounded-2xl border border-border bg-muted/30 p-5">

                            <div className="mb-5 text-center">
                                <h3 className="text-sm font-bold">
                                    Profile Picture
                                </h3>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Personalize your account
                                </p>
                            </div>

                            {/* Avatar Preview */}
                            <div className="relative mx-auto mb-5 h-32 w-32">

                                <div className="h-full w-full overflow-hidden rounded-full border-4 border-background bg-brand/10 shadow-md ring-2 ring-brand/30">

                                    {preview || profile.avatar ? (
                                        <Image
                                            src={preview || profile.avatar}
                                            alt="Profile preview"
                                            width={100}
                                            height={100}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-brand">
                                            <UserRound className="h-16 w-16" />
                                        </div>
                                    )}

                                </div>

                                {/* Camera Button */}
                                <button
                                    type="button"
                                    onClick={() => fileRef.current?.click()}
                                    className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-card bg-brand text-brand-foreground shadow-lg transition hover:scale-110"
                                    aria-label="Change profile picture"
                                >
                                    <Camera className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Upload Area */}
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                onChange={handleAvatarChange}
                                className="hidden"
                            />

                            <div className="mt-2 text-xs text-foreground/80 font-medium text-center">
                                JPG, PNG or WEBP · Max 2MB
                            </div>

                            {/* Selected Image */}
                            {selectedFile && (
                                <div className="mt-3 flex items-center justify-between gap-2 rounded-lg border border-border bg-card p-2.5">
                                    <div className="flex min-w-0 items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                                        <span className="truncate text-xs font-medium">
                                            {selectedFile.name}
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={removeAvatar}
                                        className="shrink-0 rounded-md p-1.5 text-destructive hover:bg-destructive/10 cursor-pointer"
                                        aria-label="Remove avatar"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            )}

                            {error && (
                                <p className="mt-3 text-center text-xs font-medium text-destructive">
                                    {error}
                                </p>
                            )}

                        </div>
                    </div>

                    {/* RIGHT: Profile Form */}
                    <div className="min-w-0">

                        <div className="mb-5">
                            <h3 className="text-base font-bold">
                                Account Details
                            </h3>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Keep your contact information up to date.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">

                            {/* Full Name */}
                            <div>
                                <label className={labelClass}>
                                    Full Name <span className="text-destructive">*</span>
                                </label>

                                <div className="relative">
                                    <UserRound className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand" />

                                    <input
                                        name="name"
                                        placeholder="Enter your full name"
                                        className="icon-input"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className={labelClass}>
                                    Email Address
                                </label>

                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand" />

                                    <input
                                        type="email"
                                        name="email"
                                        disabled
                                        className="icon-input"
                                    />
                                </div>

                                <p className="mt-1.5 text-[11px] text-muted-foreground">
                                    Email address cannot be changed here.
                                </p>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className={labelClass}>
                                    Phone Number <span className="text-destructive">*</span>
                                </label>

                                <div className="relative">
                                    <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand" />

                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="+880 1XXXXXXXXX"
                                        className='icon-input'
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div className="sm:col-span-2">
                                <label className={labelClass}>
                                    Delivery / Physical Address
                                </label>

                                <div className="relative">
                                    <MapPin className="absolute left-3.5 top-4 h-4 w-4 text-brand" />

                                    <textarea
                                        name="address"
                                        placeholder="Enter your road, area, district..."
                                        rows={3}
                                        className="w-full resize-none rounded-xl border border-border bg-background py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-foreground/80 focus:border-brand focus:ring-4 focus:ring-brand/10 hover:border-brand/50"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="mt-7 flex flex-col-reverse justify-end gap-3 border-t border-border pt-5 sm:flex-row">

                            <button
                                type="button"
                                onClick={() => {
                                    setProfile(initialProfile);
                                    setSelectedFile(null);
                                    setPreview("");
                                    setError("");
                                    if (fileRef.current) fileRef.current.value = "";
                                }}
                                className="rounded-xl border border-border px-5 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-muted"
                            >
                                Reset
                            </button>

                            <button
                                type="submit"
                                disabled={saving}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-brand-foreground shadow-md shadow-brand/20 transition hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {saving ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Save className="h-4 w-4" />
                                )}

                                {saving ? "Saving..." : "Save Profile Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {/* Bottom Information */}
            <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    Your personal information is securely managed by Rentivo.
                </div>

                <span className="text-[11px] text-muted-foreground">
                    Profile Settings · Rentivo
                </span>
            </div>

        </main>
    );
}
