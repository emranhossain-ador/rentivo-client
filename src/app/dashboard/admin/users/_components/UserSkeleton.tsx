
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays } from "lucide-react";

const UserCardSkeleton = () => (
    <div className="rounded-xl border border-border bg-background p-3.5">
        {/* User Information */}
        <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 shrink-0 rounded-full" />

            <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-3.5 w-32 max-w-full" />
                <Skeleton className="h-3 w-44 max-w-full" />
            </div>
        </div>

        {/* Role & Registration */}
        <div className="mb-4 mt-4 flex items-center justify-between gap-3 border-t border-border pt-3">
            <Skeleton className="h-6 w-20 rounded-full" />

            <div className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-muted-foreground/50" />
                <Skeleton className="h-3 w-24" />
            </div>
        </div>

        {/* Action Button */}
        <Skeleton className="h-9 w-full rounded-lg" />
    </div>
);

export default function UserSkeleton() {
    return (
        <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            {/* Heading */}
            <div className="flex flex-col justify-between gap-3 border-b border-border p-4 sm:px-5">
                <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-3.5 w-64 max-w-full" />
                </div>
            </div>

            {/* Search & Filters */}
            <div className="grid grid-cols-1 gap-3 border-b border-border p-4 sm:grid-cols-2 lg:grid-cols-[1fr_200px_190px]">
                <Skeleton className="h-10 w-full rounded-xl" />
                <Skeleton className="h-10 w-full rounded-xl" />
            </div>

            {/* Desktop Table Skeleton */}
            <div className="hidden overflow-hidden md:block">
                <table className="w-full text-left">
                    <thead className="bg-muted/50">
                        <tr>
                            {["User Information", "Role", "Registration Date", "Actions"].map(
                                (item) => (
                                    <th
                                        key={item}
                                        className="px-5 py-4"
                                    >
                                        <Skeleton className="h-3 w-24" />
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-border">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <tr key={i}>
                                {/* User Information */}
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="h-10 w-10 shrink-0 rounded-full" />

                                        <div className="space-y-2">
                                            <Skeleton className="h-3.5 w-32" />
                                            <Skeleton className="h-3 w-44" />
                                        </div>
                                    </div>
                                </td>

                                {/* Role */}
                                <td className="px-4 py-4">
                                    <Skeleton className="h-6 w-20 rounded-full" />
                                </td>

                                {/* Date */}
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-2">
                                        <CalendarDays className="h-3.5 w-3.5 text-muted-foreground/50" />
                                        <Skeleton className="h-3 w-24" />
                                    </div>
                                </td>

                                {/* Actions */}
                                <td className="px-4 py-4">
                                    <div className="flex justify-end">
                                        <Skeleton className="h-9 w-9 rounded-lg" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card Skeleton */}
            <div className="grid grid-cols-1 gap-3 p-3 md:hidden">
                {Array.from({ length: 4 }).map((_, i) => (
                    <UserCardSkeleton key={i} />
                ))}
            </div>
        </section>
    );
}
