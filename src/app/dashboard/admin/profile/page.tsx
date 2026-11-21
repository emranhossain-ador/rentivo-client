"use client";

import {
    UserRound,
    ShieldCheck,
} from "lucide-react";
import PageHeading from "@/components/dashboard/PageHeading";
import ProfileForm from "@/components/dashboard/ProfileForm";
import { useSession } from "@/lib/auth-client";
import { Suspense } from "react";
import { UserType } from "@/lib/type/userType";



export default function ProfileSettings() {

    const session = useSession();
    const user = session?.data?.user as UserType;

    return (
        <main className="bg-background space-y-8 md:space-y-10">

            {/* Page Heading */}
            <PageHeading
                Icon={UserRound}
                title="Profile Settings"
                subTitle="Manage your personal information and profile picture."
            />

            {/* Main Profile Card */}
            <div
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

                {/* Form */}
                <Suspense fallback={<p>Loading...</p>}>
                    <ProfileForm user={user} />
                </Suspense>

            </div>

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
