import { CalendarDays, Package } from "lucide-react";

const rentalData = [
    {
        id: "RNT-1001",
        equipment: "Excavator Machine",
        startDate: "2026-12-05",
        endDate: "2026-12-07",
        bookingDate: "2026-11-15",
        amount: 15000,
        paymentStatus: "Paid",
        bookingStatus: "Confirmed",
    },
    {
        id: "RNT-1002",
        equipment: "Canon EOS 90D",
        startDate: "2026-11-25",
        endDate: "2026-11-27",
        bookingDate: "2026-11-14",
        amount: 4500,
        paymentStatus: "Pending",
        bookingStatus: "Pending",
    },
    {
        id: "RNT-1003",
        equipment: "Industrial Generator",
        startDate: "2026-11-10",
        endDate: "2026-11-12",
        bookingDate: "2026-11-05",
        amount: 8500,
        paymentStatus: "Paid",
        bookingStatus: "Completed",
    },
    {
        id: "RNT-1004",
        equipment: "DJ Sound System",
        startDate: "2026-12-10",
        endDate: "2026-12-12",
        bookingDate: "2026-11-16",
        amount: 6000,
        paymentStatus: "Unpaid",
        bookingStatus: "Confirmed",
    },
    {
        id: "RNT-1005",
        equipment: "Professional Camera",
        startDate: "2026-10-20",
        endDate: "2026-10-22",
        bookingDate: "2026-10-15",
        amount: 3500,
        paymentStatus: "Refunded",
        bookingStatus: "Cancelled",
    },
    {
        id: "RNT-1006",
        equipment: "Bulldozer Machine",
        startDate: "2026-12-15",
        endDate: "2026-12-18",
        bookingDate: "2026-11-18",
        amount: 22000,
        paymentStatus: "Paid",
        bookingStatus: "Confirmed",
    },
    {
        id: "RNT-1007",
        equipment: "Power Drill Set",
        startDate: "2026-11-20",
        endDate: "2026-11-21",
        bookingDate: "2026-11-17",
        amount: 1200,
        paymentStatus: "Pending",
        bookingStatus: "Pending",
    },
    {
        id: "RNT-1008",
        equipment: "Concrete Mixer",
        startDate: "2026-10-01",
        endDate: "2026-10-04",
        bookingDate: "2026-09-25",
        amount: 7000,
        paymentStatus: "Paid",
        bookingStatus: "Completed",
    },
];


// function formatDate({ date }: { date: string }) {
//     return new Date(date + "T00:00:00").toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//     });
// }

const MyRentalTable = () => {
    return (
        <>
            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left">

                    <thead className="bg-muted/50">
                        <tr className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            <th className="px-5 py-4">Equipment Name</th>
                            <th className="px-4 py-4">Rental Start</th>
                            <th className="px-4 py-4">Rental End</th>
                            <th className="px-4 py-4">Booking Date</th>
                            <th className="px-4 py-4">Total Amount</th>
                            <th className="px-4 py-4">Payment Status</th>
                            <th className="px-4 py-4">Booking Status</th>
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
                                    18 Dec 2026
                                </td>

                                <td className="px-4 py-4 text-xs text-muted-foreground">
                                    18 Dec 2026
                                </td>

                                <td className="px-4 py-4 text-xs text-muted-foreground">
                                    18 Dec 2026
                                </td>

                                <td className="px-4 py-4 text-sm font-bold">
                                    ৳ {rental.amount}.00
                                </td>

                                <td className="px-4 py-4">
                                    {rental.paymentStatus}
                                </td>

                                <td className="px-4 py-4">
                                    {rental.bookingStatus}
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
                                ৳ {rental.amount}.00
                            </p>
                        </div>

                        <div className="my-3 grid grid-cols-2 gap-3 border-y border-border py-3">
                            <DateInfo
                                label="Rental Start"
                                date={rental.startDate}
                            />
                            <DateInfo
                                label="Rental End"
                                date={rental.endDate}
                            />
                            <DateInfo
                                label="Booking Date"
                                date={rental.bookingDate}
                            />
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2">
                            {rental.paymentStatus}

                            {rental.bookingStatus}
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

export default MyRentalTable;


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