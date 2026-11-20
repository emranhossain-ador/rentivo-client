"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
    LucideIcon,
    X,
} from "lucide-react";
import { customerNavItems } from "../customer/customerNavItems";
import { adminNavItems } from "../admin/adminNavItems";

interface SidebarProps {
    mobileOpen?: boolean;
    onCloseMobile?: () => void;
}

interface NavItem {
    name: string;
    href: string;
    icon: LucideIcon;
}

export default function DashboardSidebar({
    mobileOpen = false,
    onCloseMobile,
}: SidebarProps) {
    const pathname = usePathname();

    const role = 'admin';


    const navItems: NavItem[] = [];

    if (role === 'admin') {
        navItems.push(...adminNavItems);
    } else {
        navItems.push(...customerNavItems);
    }




    // user info 

    const sidebarContent = (
        <div className="flex h-full flex-col justify-between p-5">
            {/* Top Area: Logo + Profile + Navigation */}
            <div>
                {/* Logo and close button on mobile */}
                <div className="flex items-center justify-between">
                    <div>
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/image/logo.png"
                                width={34}
                                height={34}
                                alt="HireLoop"
                                className="h-12 w-auto object-contain"
                            />
                            <span className="font-serif font-extrabold text-foreground text-3xl">Ren<span className="text-brand">tivo</span></span>
                        </Link>
                    </div>

                    {onCloseMobile && (
                        <button
                            type="button"
                            onClick={onCloseMobile}
                            className="rounded-lg p-1.5 text-foreground hover:bg-red-500 hover:text-white lg:hidden"
                        >
                            <X className="size-5" />
                        </button>
                    )}
                </div>

                {/* Navigation Menu */}
                <nav className="mt-6 space-y-1.5">
                    {navItems.map((item, i) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={i}
                                href={item.href}
                                onClick={onCloseMobile}
                                className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all duration-200 sm:text-sm ${isActive
                                    ? "bg-brand/5 text-brand"
                                    : "text-foreground hover:text-brand hover:bg-brand/5"
                                    }`}
                            >
                                {/* Left Active Bar Indicator */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-brand" />
                                )}

                                <Icon
                                    className={`size-5 shrink-0 transition-colors ${isActive
                                        ? "text-brand"
                                        : "text-foreground/90 group-hover:text-brand"
                                        }`}
                                />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom User Profile */}
            <div className="pt-4">
                <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-2.5 shadow-sm">
                    <div className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border">
                        <Image
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                            alt="Alex Rivera"
                            width={32}
                            height={32}
                            unoptimized
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="truncate text-xs font-bold text-foreground">
                            Emran
                        </div>
                        <div className="truncate text-[11px] text-foreground/80">
                            emran@gmail.com
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Static Sidebar */}
            <aside className="fixed top-0 left-0 z-40 hidden h-screen w-72 shrink-0 flex-col border-r border-border bg-sidebar lg:flex">
                {sidebarContent}
            </aside>

            {/* Mobile Sidebar Overlay Drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 flex lg:hidden">
                    <div
                        onClick={onCloseMobile}
                        className="fixed inset-0 bg-border backdrop-blur-xs"
                    />
                    <div className="relative z-10 h-full w-72 border-r border-border bg-background shadow-2xl">
                        {sidebarContent}
                    </div>
                </div>
            )}
        </>
    );
}