import { CalendarDays, Eye, Package, Trash } from "lucide-react";
import Link from "next/link";

const rentalData = [
    {
        id: "RNT-1001",
        equipment: "Excavator Machine",
        category: "Machine",
        rentPrice: "1000.00",
        location: 'Dhaka',
        status: "available",
    },
    {
        id: "RNT-1002",
        equipment: "Excavator Machine",
        category: "Machine",
        rentPrice: "1000.00",
        location: 'Dhaka',
        status: "available",
    },

];


// function formatDate({ date }: { date: string }) {
//     return new Date(date + "T00:00:00").toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//     });
// }

const EquimentTable = () => {
    return (
        <>
            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left">

                    <thead className="bg-muted/50">
                        <tr className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            <th className="px-5 py-4">Equipment</th>
                            <th className="px-4 py-4">Category</th>
                            <th className="px-4 py-4">Rental Price</th>
                            <th className="px-4 py-4">Location</th>
                            <th className="px-4 py-4">Status</th>
                            <th className="px-4 py-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-border">
                        {rentalData.map((rental) => (
                            <tr
                                key={rental.id}
                                className="transition-colors hover:bg-muted/40"
                            >
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                                            <Package className="h-4 w-4" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold">
                                                {rental.equipment}
                                            </p>
                                            <p className="mt-0.5 text-[10px] text-muted-foreground">
                                                {rental.id}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-4 py-4 text-xs text-muted-foreground">
                                    {rental.category}
                                </td>

                                <td className="px-4 py-4 text-xs text-muted-foreground">
                                    ৳ {rental.rentPrice}
                                </td>

                                <td className="px-4 py-4 text-xs text-muted-foreground">
                                    {rental.location}
                                </td>

                                <td className="px-4 py-4">
                                    {rental.status}
                                </td>

                                <td className="px-4 py-4">
                                    <div className="flex flex-wrap gap-2">
                                        <Link
                                            href="/alksjl"
                                            className="inline-flex items-center gap-0.5 rounded-md bg-brand px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                                        >
                                            <Eye size={15} />
                                            View Details
                                        </Link>

                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-0.5 rounded-md border border-red-500 px-3 py-2 text-xs cursor-pointer font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
                                        >
                                            <Trash size={15} />
                                            Remove
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile cards */}
            <div className="space-y-3 p-3 md:hidden">
                {rentalData.map((rental) => (
                    <div
                        key={rental.id}
                        className="rounded-xl border border-border bg-background p-3.5 transition hover:border-brand/30"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-2.5">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                                    <Package className="h-5 w-5" />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="truncate text-sm font-bold">
                                        {rental.equipment}
                                    </h3>
                                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                                        {rental.id}
                                    </p>
                                </div>
                            </div>

                            <p className="shrink-0 text-sm font-bold text-brand">
                                {rental.category}
                            </p>
                        </div>

                        <div className="my-3 grid grid-cols-2 gap-3 border-y border-border py-3">
                            {<DateInfo
                                label="Rental Price"
                                date={rental.rentPrice}
                            />}
                            <DateInfo
                                label="Rental End"
                                date={rental.location}
                            />
                            <DateInfo
                                label="Booking Date"
                                date={rental.status}
                            />
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <Link
                                href="/alksjl"
                                className="inline-flex items-center gap-0.5 rounded-md bg-brand px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                            >
                                <Eye size={15} />
                                View Details
                            </Link>

                            <button
                                type="button"
                                className="inline-flex items-center gap-0.5 rounded-md border border-red-500 px-3 py-2 text-xs cursor-pointer font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
                            >
                                <Trash size={15} />
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty state */}
            {/* {filteredRentals.length === 0 && (
                <div className="flex flex-col items-center justify-center px-4 py-14 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <Package className="h-7 w-7" />
                    </div>

                    <h3 className="mt-4 text-sm font-bold">
                        No rentals found
                    </h3>

                    <p className="mt-1 max-w-xs text-xs text-muted-foreground">
                        We couldn't find any bookings matching your search or filters.
                    </p>

                    <button
                        onClick={resetFilters}
                        className="mt-4 rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-brand-foreground transition hover:opacity-90"
                    >
                        Clear Filters
                    </button>
                </div>
            )} */}
        </>
    )

};

export default EquimentTable;


function DateInfo({ label, date }: { label: string, date: string }) {
    return (
        <div className="min-w-0">
            <p className="text-[10px] text-muted-foreground">
                {label}
            </p>
            <p className="mt-1 flex items-center gap-1 text-xs font-medium">
                <CalendarDays className="h-3 w-3 shrink-0 text-brand" />
                {date}
            </p>
        </div>
    );
};