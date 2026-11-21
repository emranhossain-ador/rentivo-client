"use client"
import RoleBadge from "@/components/RoleBadge";
import { updateRole } from "@/lib/actions/users";
import { formatDate } from "@/lib/formatDate";
import { UserRole, UserType } from "@/lib/type/userType";
import { CalendarDays, Mail, Shield, UserCog, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ManageUserButtton = ({ user }: { user: UserType }) => {

    const [openManage, setOpenManage] = useState(false);
    const [editingRole, setEditingRole] = useState(false);
    const [selectRole, setSelectRole] = useState<UserRole>(user?.role as UserRole);
    const router = useRouter();

    const handleRoleChange = async () => {
        try {
            const update = await updateRole(
                user._id as string,
                selectRole
            );

            if (update.success) {
                setOpenManage(false);
                toast.success("Role update successful");
                router.refresh();
            } else {
                toast.error(update.message || "Role update failed");
            }
        } catch (error) {
            toast.error("Something went wrong!");
            console.error(error);
        }
    };

    return (
        <>
            <button
                onClick={() => setOpenManage(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold transition hover:border-brand hover:bg-brand/5 hover:text-brand"
            >
                <UserCog className="h-3.5 w-3.5" />
                Manage User
            </button>

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

                        <div className="space-y-2">
                            <label className="text-xs font-semibold">
                                Account Role
                            </label>

                            {!editingRole ? (
                                <div className="flex items-center justify-between rounded-xl border border-border p-3">
                                    <RoleBadge role={user.role as UserRole} />

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
                                        value={selectRole}
                                        onChange={(e) => setSelectRole(e.target.value as UserRole)}
                                        className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-brand"
                                    >
                                        <option value="customer">Customer</option>
                                        <option value="owner">Owner</option>
                                        <option value="admin">Admin</option>
                                    </select>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleRoleChange}
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
                                    {user.email}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 text-xs">
                                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">
                                    {formatDate(user.createdAt)}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 text-xs">
                                <Shield className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">
                                    Current role: <RoleBadge role={user.role as UserRole} />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="border-t border-border p-4">
                        <button
                            onClick={() => setOpenManage(false)}
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

export default ManageUserButtton;