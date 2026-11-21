"use client"

import { Home, Menu, } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { ChevronDown, LogOut, User } from "lucide-react";
import { UserType } from "@/lib/type/userType"; import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { toast } from "react-toastify";

import { useSession } from "@/lib/auth-client";


interface TopHeaderProps {
    onOpenMobileMenu?: () => void;
}

export default function TopHeader({ onOpenMobileMenu }: TopHeaderProps) {

    const session = useSession();
    const user = session?.data?.user as UserType;

    const router = useRouter();

    const handleSignout = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/");
                    toast.success('You have been logout successfully');
                },
            },
        })
    }


    return (
        <header className="fixed w-full top-0 left-0 lg:pl-72 z-30 border-b border-border bg-sidebar backdrop-blur-md">

            {/* Main Header Row */}
            <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                {/* Left Area: Mobile Menu Toggle + Search Bar */}
                <div className="flex items-center gap-3">
                    {/* Mobile Menu Toggle Button */}
                    <button
                        type="button"
                        onClick={onOpenMobileMenu}
                        aria-label="Open sidebar menu"
                        className="flex size-9 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:text-brand lg:hidden"
                    >
                        <Menu className="size-4.5" />
                    </button>
                </div>

                {/* Right Area: Notifications, Upload Resume & Profile Avatar */}
                <div>

                    <DropdownMenu>
                        <DropdownMenuTrigger render={
                            <button className="group flex items-center gap-2 rounded-full border border-border bg-card py-1.25 pl-1.5 pr-3 transition-all duration-300 hover:border-brand/40 hover:bg-muted cursor-pointer">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={user?.image || undefined} alt={user?.name} />
                                    <AvatarFallback className="bg-primary/10 font-semibold text-brand">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>

                                <span className="max-w-28 truncate text-sm font-semibold ml-2">
                                    {user?.name?.split(' ')[0]}
                                </span>

                                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-data-popup-open:rotate-180" />
                            </button>
                        } />

                        <DropdownMenuContent
                            align="end"
                            side="bottom"
                            sideOffset={10}
                            className="w-64 rounded-xl border border-border bg-card p-2 shadow-xl"
                        >
                            {/* User Information */}
                            <DropdownMenuGroup>
                                <DropdownMenuLabel className="px-2 py-3">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-11 w-11">
                                            <AvatarImage src={user?.image || undefined} alt={user?.name} />
                                            <AvatarFallback className="bg-primary/10 text-primary">
                                                {user?.name?.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-foreground">
                                                {user?.name}
                                            </p>
                                            <p className="truncate text-xs font-normal text-muted-foreground">
                                                {user?.email}
                                            </p>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                            </DropdownMenuGroup>

                            <DropdownMenuSeparator />

                            {/* Navigation Links */}
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    className="cursor-pointer gap-3 rounded-lg py-2.5 focus:text-brand"
                                    onClick={() => router.push(`/`)}
                                >
                                    <Home className="h-4 w-4 text-primary" />
                                    Home
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    className="cursor-pointer gap-3 rounded-lg py-2.5 focus:text-brand"
                                    onClick={() => router.push(`/dashboard/${user?.role}/profile`)}
                                >
                                    <User className="h-4 w-4" />
                                    My Profile
                                </DropdownMenuItem>
                            </DropdownMenuGroup>

                            <DropdownMenuSeparator />

                            {/* Logout */}
                            <DropdownMenuItem
                                variant="destructive"
                                onClick={handleSignout}
                                className="cursor-pointer gap-3 rounded-lg py-2.5"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
        </header>
    );
}