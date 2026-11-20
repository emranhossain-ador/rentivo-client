'use client';

import { CalendarDays, Mail, MoreHorizontal, Search, Shield, SlidersHorizontal, User, UserCog, X } from "lucide-react";
import { useState } from "react";

const UsersTable = () => {

    const [openManage, setOpenManage] = useState(false);
    const [editingRole, setEditingRole] = useState(false);

    // const openManage = () => {
    //     // setSelectedUser();
    //     setEditingRole(false);
    // };


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

                {/* Search & Filters */}
                <div className="grid grid-cols-1 gap-3 border-b border-border p-4 sm:grid-cols-2 lg:grid-cols-[1fr_200px_190px]">

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                        <input
                            type="search"
                            placeholder="Search by name, email or ID..."
                            className="h-10 w-full rounded-xl border border-input bg-background pl-9 pr-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
                        />
                    </div>

                    <div className="relative">
                        <SlidersHorizontal className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                        <select
                            className="h-10 w-full appearance-none rounded-xl border border-input bg-background pl-9 pr-3 text-sm outline-none focus:border-brand"
                        >
                            <option value="All">All Roles</option>
                            <option value="Admin">Admin</option>
                            <option value="Owner">Owner</option>
                            <option value="Customer">Customer</option>
                        </select>
                    </div>
                </div>

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
                            <tr
                                className="transition-colors hover:bg-muted/40"
                            >
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold bg-emerald-500/10 text-emerald-600`}
                                        >
                                            E
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold">
                                                Emran
                                            </p>
                                            <p className="mt-0.5 text-xs text-muted-foreground">
                                                emran@gmail.com
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-4 py-4">
                                    <span
                                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold bg-orange-500/10 text-orange-600 border-orange-500/20`}
                                    >
                                        <User className="h-3.5 w-3.5" />
                                        Customer
                                    </span>
                                </td>

                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <CalendarDays className="h-3.5 w-3.5" />
                                        05 Nov 2026
                                    </div>
                                </td>

                                <td className="px-4 py-4">
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => setOpenManage(true)}
                                            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold transition hover:border-brand hover:bg-brand/5 hover:text-brand"
                                        >
                                            <UserCog className="h-3.5 w-3.5" />
                                            Manage User
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Mobile User Cards */}
                <div className="space-y-3 p-3 md:hidden">
                    <div
                        className="rounded-xl border border-border bg-background p-3.5"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-3">
                                <div
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold bg-emerald-500/10 text-emerald-600`}
                                >
                                    E
                                </div>

                                <div className="min-w-0">
                                    <h3 className="truncate text-sm font-bold">
                                        Emran
                                    </h3>
                                    <p className="truncate text-xs text-muted-foreground">
                                        emran@gmail.com
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => setOpenManage(true)}
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:bg-brand/10 hover:text-brand"
                                aria-label={`Manage Emran`}
                            >
                                <MoreHorizontal className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
                            <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold bg-orange-500/10 text-orange-600 border-orange-500/20`}
                            >
                                <User className="h-3.5 w-3.5" />
                                Customer
                            </span>

                            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                <CalendarDays className="h-3.5 w-3.5" />
                                05 Nov 2026
                            </span>
                        </div>

                        <button
                            onClick={() => setOpenManage(true)}
                            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-brand/10 py-2.5 text-xs font-bold text-brand transition hover:bg-brand/15"
                        >
                            <UserCog className="h-4 w-4" />
                            Manage User
                        </button>
                    </div>
                </div>

                {/* Empty State */}

                {/* <div className="flex flex-col items-center px-4 py-14 text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
                            <Users className="h-7 w-7" />
                        </div>
                        <h3 className="mt-4 text-sm font-bold">No users found</h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Try changing your search or selected role.
                        </p>
                        <button
                            onClick={() => {
                                setSearch("");
                                setRoleFilter("All");
                                setPage(1);
                            }}
                            className="mt-4 text-xs font-bold text-brand"
                        >
                            Clear Filters
                        </button>
                    </div> */}


            </section>

            {/* Manage User Modal */}

            {openManage && <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm"
            >
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="manage-user-title"
                    className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
                >

                    {/* Modal Header */}
                    <div className="flex items-center justify-between border-b border-border p-5">
                        <div>
                            <h2 id="manage-user-title" className="text-lg font-bold">
                                Manage User
                            </h2>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Manage account details and permissions.
                            </p>
                        </div>

                        <button

                            onClick={() => setOpenManage(false)}
                            className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
                            aria-label="Close modal"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* User Information */}
                    <div className="space-y-5 p-5">
                        <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-4">
                            <div
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold bg-emerald-500/10 text-emerald-600`}
                            >
                                E
                            </div>

                            <div className="min-w-0">
                                <h3 className="truncate text-sm font-bold">
                                    Emran
                                </h3>
                                <p className="truncate text-xs text-muted-foreground">
                                    emran@gmail.com
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold">
                                Account Role
                            </label>

                            {!editingRole ? (
                                <div className="flex items-center justify-between rounded-xl border border-border p-3">
                                    <span
                                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold bg-orange-500/10 text-orange-600 border-orange-500/20`}
                                    >
                                        <User className="h-3.5 w-3.5" />
                                        Customer
                                    </span>

                                    <button
                                        onClick={() => setEditingRole(true)}
                                        className="text-xs font-bold text-brand hover:underline"
                                    >
                                        Change Role
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <select
                                        className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-brand"
                                    >
                                        <option value="Customer">Customer</option>
                                        <option value="Owner">Owner</option>
                                        <option value="Admin">Admin</option>
                                    </select>

                                    <div className="flex gap-2">
                                        <button
                                            className="flex-1 rounded-lg bg-brand px-3 py-2.5 text-xs font-bold text-brand-foreground disabled:opacity-40"
                                        >
                                            Save Role
                                        </button>

                                        <button
                                            onClick={() => {
                                                setEditingRole(false);
                                            }}
                                            className="rounded-lg border border-border px-4 py-2.5 text-xs font-semibold"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-3 rounded-xl border border-border p-4">
                            <div className="flex items-center gap-3 text-xs">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="break-all text-muted-foreground">
                                    {'emran@gmail.com'}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 text-xs">
                                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">
                                    05 Nov 2026
                                </span>
                            </div>

                            <div className="flex items-center gap-3 text-xs">
                                <Shield className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">
                                    Current role: {'customer'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="border-t border-border p-4">
                        <button
                            className="w-full rounded-xl bg-brand py-3 text-sm font-bold text-brand-foreground transition hover:opacity-90"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
            }
        </>
    )
};

export default UsersTable;