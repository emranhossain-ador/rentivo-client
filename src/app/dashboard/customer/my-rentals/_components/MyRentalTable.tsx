import StatusBadge from "@/components/shared/StatusBadge";
import { formatDate } from "@/lib/formatDate";
import { formatPrice } from "@/lib/formatPrice";
import { BookingType } from "@/lib/type/booking";
import { CalendarDays, CheckCircle2, Clock, Package } from "lucide-react";
import Image from "next/image";


const MyRentalTable = ({ rentals }: { rentals: BookingType[] }) => {
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
                        {rentals.map((rental) => (
                            <tr
                                key={rental._id}
                                className="transition-colors hover:bg-muted/40"
                            >
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                                            <Image src={rental.equipment?.images[0] as string}
                                                alt={rental.equipment?.equipmentName as string}
                                                width={100} height={100} className="w-full h-full object-cover" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold">
                                                {rental.equipment?.equipmentName}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-4 py-4 text-xs text-muted-foreground">
                                    {formatDate(rental.startDate)}
                                </td>

                                <td className="px-4 py-4 text-xs text-muted-foreground">
                                    {formatDate(rental.endDate)}
                                </td>

                                <td className="px-4 py-4 text-xs text-muted-foreground">
                                    {formatDate(rental.createdAt)}
                                </td>

                                <td className="px-4 py-4 text-sm font-bold">
                                    ৳ {formatPrice(rental.totalAmount)}
                                </td>

                                <td className="px-4 py-4">
                                    <PaymentStatusBadge status={rental.paymentStatus as "pending" | "paid"} />
                                </td>

                                <td className="px-4 py-4">
                                    <StatusBadge status={rental.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile cards */}
            <div className="space-y-3 p-3 md:hidden">
                {rentals.map((rental) => (
                    <div
                        key={rental._id}
                        className="rounded-xl border border-border bg-background p-3.5 transition hover:border-brand/30"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-2.5">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                                    <Image src={rental.equipment?.images[0] as string}
                                        alt={rental.equipment?.equipmentName as string}
                                        width={100} height={100} className="w-full h-full object-cover" />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="truncate text-sm font-bold">
                                        {rental.equipment?.equipmentName}
                                    </h3>
                                </div>
                            </div>

                            <p className="shrink-0 text-sm font-bold text-brand">
                                ৳ {formatPrice(rental.totalAmount)}
                            </p>
                        </div>

                        <div className="my-3 grid grid-cols-2 gap-3 border-y border-border py-3">
                            <DateInfo
                                label="Rental Start"
                                date={formatDate(rental.startDate)}
                            />
                            <DateInfo
                                label="Rental End"
                                date={formatDate(rental.endDate)}
                            />
                            <DateInfo
                                label="Booking Date"
                                date={formatDate(rental.createdAt)}
                            />
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <PaymentStatusBadge status={rental.paymentStatus as "pending" | "paid"} />
                            <StatusBadge status={rental.status} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty state */}
            {rentals.length === 0 && (
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
                </div>
            )}
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


const PaymentStatusBadge = ({ status }: { status: "pending" | "paid" }) => {
    const isPaid = status === "paid";

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${isPaid
                ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
                : "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400"
                }`}
        >
            {isPaid ? (
                <CheckCircle2 className="size-3.5" />
            ) : (
                <Clock className="size-3.5" />
            )}

            {status}
        </span>
    );
};
