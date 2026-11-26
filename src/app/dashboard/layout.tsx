"use client";

import { Suspense, useState } from "react";
import DashboardSidebar from "./layouts/DashboardSidebar";
import TopHeader from "./layouts/TopHeader";
import DashboardLoader from "@/components/dashboard/DashboardLoader";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <Suspense fallback={<DashboardLoader />}>

            <div className="flex min-h-screen bg-background text-foreground relative">
                {/* Sidebar Component */}
                <DashboardSidebar
                    mobileOpen={mobileOpen}
                    onCloseMobile={() => setMobileOpen(false)}
                />

                {/* Main Content Area */}
                <div className="flex flex-1 lg:ml-72 flex-col overflow-x-hidden relative">
                    {/* Top Header Component */}
                    <TopHeader onOpenMobileMenu={() => setMobileOpen(true)} />

                    {/* Dashboard Page View */}
                    <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-24!">
                        {children}
                    </main>
                </div>
            </div>
        </Suspense>
    );
}