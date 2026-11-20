import { CalendarDays, Check, Eye, MapPin, Pencil, Trash2, X } from "lucide-react";
import Image from "next/image";
import ActionsBtn from "./ActionsBtn";

const EquipmentTable = () => {
    return (
        <>
            {/* Desktop Table */}
            <div className="hidden overflow-x-auto lg:block">
                <table className="w-full text-left">
                    <thead className="bg-muted/50">
                        <tr className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            <th className="px-5 py-4">Equipment</th>
                            <th className="px-4 py-4">Owner</th>
                            <th className="px-4 py-4">Price / Day</th>
                            <th className="px-4 py-4">Submitted</th>
                            <th className="px-4 py-4">Status</th>
                            <th className="px-5 py-4 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-border">
                        <tr className="transition hover:bg-muted/40">

                            <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={'https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=300'}
                                        alt={'image'}
                                        width={100}
                                        height={100}
                                        className="h-14 w-16 rounded-lg border border-border object-cover"
                                    />
                                    <div className="min-w-0">
                                        <p className="text-sm font-bold">{'bolExcavator Machineme'}</p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            Construction
                                        </p>
                                        <p className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                                            <MapPin className="h-3 w-3" />
                                            Rajibpur
                                        </p>
                                    </div>
                                </div>
                            </td>

                            <td className="px-4 py-4">
                                <span className="text-sm font-medium">Emran</span>
                            </td>

                            <td className="px-4 py-4">
                                <span className="text-sm font-bold text-brand">
                                    ৳5000.00
                                </span>
                                <span className="text-xs text-muted-foreground"> / day</span>
                            </td>

                            <td className="px-4 py-4">
                                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <CalendarDays className="h-3.5 w-3.5" />
                                    15 Nov 2026
                                </span>
                            </td>

                            <td className="px-4 py-4">
                                Pending
                            </td>

                            <td className="px-5 py-4">
                                <ActionsBtn />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Mobile and Tablet Cards */}
            <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 lg:hidden">

                <div
                    className="overflow-hidden rounded-xl border border-border bg-background"
                >
                    <div className="relative h-40">
                        <Image
                            src={'https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=300'}
                            alt={'image'}
                            width={100}
                            height={100}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute right-3 top-3">
                            Pending
                        </div>
                    </div>

                    <div className="space-y-3 p-3.5">
                        <div>
                            <h3 className="text-sm font-bold">Excavator Machine</h3>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Construction · Rahim Uddin
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
                            <span className="text-sm font-bold text-brand">
                                ৳500.00
                                <span className="text-xs font-normal text-muted-foreground"> / day</span>
                            </span>

                            <span className="text-[11px] text-muted-foreground">
                                15 Nov 2026
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2 border-t border-border pt-3">
                            <button
                                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-xs font-semibold hover:bg-muted"
                            >
                                <Eye className="h-3.5 w-3.5" />
                                View
                            </button>

                            <button
                                className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-emerald-500/10 py-2 text-xs font-bold text-emerald-600"
                            >
                                <Check className="h-3.5 w-3.5" />
                                Approve
                            </button>
                            <button
                                className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-red-500/10 py-2 text-xs font-bold text-red-600"
                            >
                                <X className="h-3.5 w-3.5" />
                                Reject
                            </button>
                            <button
                                className="flex h-9 w-10 items-center justify-center rounded-lg border border-border text-blue-500 hover:bg-blue-500/10"
                                title="Update"
                            >
                                <Pencil className="h-4 w-4" />
                            </button>

                            <button
                                className="flex h-9 w-10 items-center justify-center rounded-lg border border-border text-red-500 hover:bg-red-500/10"
                                title="Delete"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Empty State */}
            {/* {filteredEquipment.length === 0 && (
                <div className="flex flex-col items-center px-4 py-14 text-center">
                    <Package className="h-12 w-12 text-muted-foreground/40" />
                    <h3 className="mt-3 text-sm font-bold">No equipment found</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Try changing your search or filters.
                    </p>
                    <button
                        onClick={() => {
                            setSearch("");
                            setStatusFilter("All");
                            setCategoryFilter("All");
                            setPage(1);
                        }}
                        className="mt-3 text-xs font-bold text-brand"
                    >
                        Clear Filters
                    </button>
                </div>
            )} */}

        </>
    )
};
export default EquipmentTable;