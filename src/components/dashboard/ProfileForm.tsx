"use client";

import { useEffect, useRef, useState } from "react";
import {
    UserRound,
    Mail,
    Phone,
    MapPin,
    Camera,
    Save,
    CheckCircle2,
    Trash2,
    Loader2,
} from "lucide-react";
import Image from "next/image";
import { UserType } from "@/lib/type/userType";
import Label from "../ui/Label";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { updateUser } from "@/lib/auth-client";


const ProfileForm = ({ user }: { user: UserType }) => {

    // States
    const [preview, setPreview] = useState<string>(user?.image);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string>("");
    const [saving, setSaving] = useState<boolean>(false);
    const [avatarUrl, setAvatarUrl] = useState<string>('');

    const router = useRouter();

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
    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    // Remove avatar
    const removeAvatar = (): void => {
        setSelectedFile(null);
        setPreview("");

        if (fileRef.current) {
            fileRef.current.value = "";
        }
    };

    // Handler
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = String(formData.get('name') ?? "").trim();
        const phoneNumber = String(formData.get('phoneNumber') ?? "").trim();
        const address = String(formData.get('address') ?? "").trim();

        //------ Validation check -------
        if (name.length <= 3) {
            toast.warning('Please enter your full name!');
        }

        setSaving(true);
        setError(' ');


        const result = await updateUser({
            name: name,
            phoneNumber: phoneNumber,
            address: address,
            image: avatarUrl || user?.image
        });


        if (result) {
            setSaving(false);
            toast.success("Profile update successful");
            router.push(`/dashboard/${user?.role}/profile`)
        } else {
            setSaving(false);
            toast.error('Profile update failed!');
        }
    };


    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-7 p-5 sm:p-7 lg:grid-cols-[280px_1fr] lg:gap-9">

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

                            {preview || user?.image ? (
                                <Image
                                    src={preview || user?.image}
                                    alt={user?.name}
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
                        <Label htmlFor="name" title="Full Name" isRequired={true} />

                        <div className="relative">
                            <UserRound className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand" />

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                className="icon-input"
                                defaultValue={user?.name}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <Label htmlFor="email" title="Email Address" />

                        <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <input
                                type="email"
                                name="email"
                                disabled
                                defaultValue={user?.email}
                                className="icon-input hover:border-border! cursor-not-allowed! text-muted-foreground!"
                            />
                        </div>

                        <p className="mt-1.5 text-[11px] text-muted-foreground">
                            Email address cannot be changed here.
                        </p>
                    </div>

                    {/* Phone */}
                    <div>
                        <Label htmlFor="phoneNumber" title="Phone Number" />

                        <div className="relative">
                            <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand" />

                            <input
                                type="tel"
                                name="phoneNumber"
                                placeholder="+880 1XXXXXXXXX"
                                defaultValue={user?.phoneNumber}
                                className='icon-input'
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div className="sm:col-span-2">
                        <Label htmlFor="address" title="Address" />

                        <div className="relative">
                            <MapPin className="absolute left-3.5 top-4 h-4 w-4 text-brand" />

                            <textarea
                                name="address"
                                placeholder="Enter your road, area, district..."
                                rows={3}
                                defaultValue={user?.address}
                                className="w-full resize-none rounded-xl border border-border bg-background py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-foreground/80 focus:border-brand focus:ring-4 focus:ring-brand/10 hover:border-brand/50"
                            />
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="mt-7 flex flex-col-reverse justify-end  border-t border-border pt-5">
                    <button
                        type="submit"
                        disabled={saving}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-brand-foreground shadow-md shadow-brand/20 transition hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
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
        </form>
    )
}

export default ProfileForm