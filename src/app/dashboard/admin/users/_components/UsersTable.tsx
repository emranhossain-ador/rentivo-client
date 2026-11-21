
import { CalendarDays, Users } from "lucide-react";

import ManageUserButtton from "./ManageUserButtton";
import Image from "next/image";
import RoleBadge from "@/components/RoleBadge";
import { UserRole, UserType } from "@/lib/type/userType";
import { formatDate } from "@/lib/formatDate";
import { getUsers } from "@/lib/api/users";
import UserSearchFilter from "./UserSearchFilter";

interface UsersTableProps {
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
}

const UsersTable = async ({ searchParams }: UsersTableProps) => {

    const search = await searchParams;

    const query = new URLSearchParams(search as Record<string, string>).toString();

    const users: UserType[] = await getUsers(query);


    return (
        <>
            <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">

                {/* Table Heading */}
                <div className="flex flex-col justify-between gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:px-5">
                    <div>
                        <h2 className="text-base font-bold">All Registered Users</h2>
                        <p className="mt-1 text-xs text-muted-foreground">
                            View, search and manage all platform accounts.
                        </p>
                    </div>
                </div>

                {
                    users.length === 0 ?

                        <div className="flex flex-col items-center px-4 py-14 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                <Users className="h-7 w-7" />
                            </div>
                            <h3 className="mt-4 text-sm font-bold">No users found</h3>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Try changing your search or selected role.
                            </p>

                        </div>

                        :

                        <>
                            {/* Search & Filters */}
                            <UserSearchFilter />

                            {/* Desktop Table */}
                            <div className="hidden overflow-x-auto md:block">
                                <table className="w-full text-left">

                                    <thead className="bg-muted/50">
                                        <tr className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                            <th className="px-5 py-4">User Information</th>
                                            <th className="px-4 py-4">Role</th>
                                            <th className="px-4 py-4">Registration Date</th>
                                            <th className="px-4 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-border">
                                        {
                                            users.map((user, i) =>

                                                <tr key={i}
                                                    className="transition-colors hover:bg-muted/40"
                                                >
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-3">
                                                            {
                                                                user.image ?
                                                                    <Image src={user.image} alt={user.name} height={40} width={40} className="h-10 w-10 shrink-0 object-cover rounded-full" />
                                                                    :
                                                                    <div
                                                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold bg-emerald-500/10 text-emerald-600`}
                                                                    >
                                                                        {user.name.charAt(0).toUpperCase()}
                                                                    </div>
                                                            }

                                                            <div className="min-w-0">
                                                                <p className="text-sm font-semibold">
                                                                    {user.name}
                                                                </p>
                                                                <p className="mt-0.5 text-xs text-muted-foreground">
                                                                    {user.email}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-4">
                                                        <RoleBadge role={user.role as UserRole} />
                                                    </td>

                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                            <CalendarDays className="h-3.5 w-3.5" />
                                                            {formatDate(user.createdAt)}
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-4">
                                                        <div className="flex justify-end">
                                                            <ManageUserButtton user={user} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile User Cards */}
                            <div className="space-y-3 p-3 md:hidden">
                                {
                                    users.map((user, i) =>

                                        <div key={i}
                                            className="rounded-xl border border-border bg-background p-3.5"
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <div className="flex min-w-0 items-center gap-3">
                                                    {
                                                        user.image ?
                                                            <Image src={user.image} alt={user.name} height={40} width={40} className="h-10 w-10 shrink-0 object-cover rounded-full" />
                                                            :
                                                            <div
                                                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold bg-emerald-500/10 text-emerald-600`}
                                                            >
                                                                {user.name.charAt(0).toUpperCase()}
                                                            </div>
                                                    }

                                                    <div className="min-w-0">
                                                        <h3 className="truncate text-sm font-bold">
                                                            {user.name}
                                                        </h3>
                                                        <p className="truncate text-xs text-muted-foreground">
                                                            {user.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4 mb-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
                                                <RoleBadge role={user.role as UserRole} />

                                                <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                                    <CalendarDays className="h-3.5 w-3.5" />
                                                    {formatDate(user.createdAt)}
                                                </span>
                                            </div>

                                            <ManageUserButtton user={user} />
                                        </div>

                                    )
                                }


                            </div>

                        </>
                }

            </section>

        </>
    )
};

export default UsersTable;