"use client";

import { Search, SlidersHorizontal } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState } from "react";

const UserSearchFilter = () => {

    const [searchRole, setSearchRole] = useState<string>('all');

    const router = useRouter();

    const handleFilterRole = (role: string) => {
        setSearchRole(role);
        const params = new URLSearchParams(window.location.search);
        params.set('role', role as string);

        if (role === 'all') {
            router.push(`/dashboard/admin/users`);
            return;
        }
        router.push(`/dashboard/admin/users?${params.toString()}`);

    }

    return (
        <div className="border-b border-border p-4">

            <div className="relative max-w-50 cursor-pointer">
                <SlidersHorizontal className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <select
                    value={searchRole}
                    onChange={(e) => handleFilterRole(e.target.value)}
                    className="h-10 w-full appearance-none rounded-xl border border-input bg-background pl-9 pr-3 text-sm outline-none focus:border-brand "
                >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="owner">Owner</option>
                    <option value="customer">Customer</option>
                </select>
            </div>
        </div>
    )
};

export default UserSearchFilter;