
import { formatAmount } from "@/components/PriceFormatAmount";
import { getBookingsByUserId } from "@/lib/api/booking";
import { getSession } from "@/lib/core/server";
import { BookingType } from "@/lib/type/booking";
import {
    ArrowUpRight,
    Wallet,
    CircleCheckBig,
    PackageCheck,
    CalendarCheck,
} from "lucide-react";



const Statistics = async () => {

    const session = await getSession();
    const user = session?.user;

    const bookings: BookingType[] = await getBookingsByUserId(user!.id);

    const today = new Date().toISOString().slice(0, 10);
    const activeRentals = bookings.filter(
        (booking) =>
            booking.status === "confirmed" &&
            booking.paymentStatus === "paid" &&
            booking.startDate <= today &&
            booking.endDate > today
    ).length;

    const completedRentals = bookings.filter(
        (booking) => booking.status === "completed"
    ).length;

    const totalSpent = bookings
        .filter(
            (booking) =>
                booking.paymentStatus === "paid"
        )
        .reduce(
            (total, booking) => total + booking.totalAmount,
            0
        );

    return (
        <section className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-4 lg:gap-4">

            <div className="group relative min-w-0 overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5">

                <div className="relative z-10 flex items-center gap-3 sm:gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:h-14 sm:w-14 bg-violet-600/10 text-violet-600`}>
                        <CalendarCheck className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.5} />
                    </div>

                    <div className="min-w-0">
                        <h3 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                            {bookings.length}
                        </h3>
                        <p className="truncate text-xs font-medium text-foreground/90 sm:text-sm">
                            Total Bookings
                        </p>
                    </div>
                </div>

                <div className="relative z-10 mt-4 flex items-center gap-1 text-[10px] sm:text-xs">
                    <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="font-bold text-emerald-600">
                        10%
                    </span>
                    <span className="text-foreground">from last month</span>
                </div>

                {/* Decorative chart */}
                <svg
                    className={`pointer-events-none absolute -bottom-1 -right-1 h-14 w-28 opacity-25 text-violet-400`}
                    viewBox="0 0 120 50"
                    fill="none"
                >
                    <path
                        d="M0 45 C15 45 18 35 30 38 S45 22 58 29 S75 8 90 16 S105 0 120 4"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <path
                        d="M0 45 C15 45 18 35 30 38 S45 22 58 29 S75 8 90 16 S105 0 120 4 V50 H0 Z"
                        fill="currentColor"
                        opacity=".2"
                    />
                </svg>
            </div>

            <div className="group relative min-w-0 overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5">

                <div className="relative z-10 flex items-center gap-3 sm:gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:h-14 sm:w-14 bg-sky-600/10 text-sky-600`}>
                        <PackageCheck className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.5} />
                    </div>

                    <div className="min-w-0">
                        <h3 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                            {activeRentals}
                        </h3>
                        <p className="truncate text-xs font-medium text-foreground/90 sm:text-sm">
                            Active Rentals
                        </p>
                    </div>
                </div>

                <div className="relative z-10 mt-4 flex items-center gap-1 text-[10px] sm:text-xs">
                    <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="font-bold text-emerald-600">
                        10%
                    </span>
                    <span className="text-foreground">from last month</span>
                </div>

                {/* Decorative chart */}
                <svg
                    className={`pointer-events-none absolute -bottom-1 -right-1 h-14 w-28 opacity-25 text-violet-400`}
                    viewBox="0 0 120 50"
                    fill="none"
                >
                    <path
                        d="M0 45 C15 45 18 35 30 38 S45 22 58 29 S75 8 90 16 S105 0 120 4"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <path
                        d="M0 45 C15 45 18 35 30 38 S45 22 58 29 S75 8 90 16 S105 0 120 4 V50 H0 Z"
                        fill="currentColor"
                        opacity=".2"
                    />
                </svg>
            </div>

            <div className="group relative min-w-0 overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5">

                <div className="relative z-10 flex items-center gap-3 sm:gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:h-14 sm:w-14 bg-emerald-600/10 text-emerald-600`}>
                        <CircleCheckBig className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.5} />
                    </div>

                    <div className="min-w-0">
                        <h3 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                            {completedRentals}
                        </h3>
                        <p className="truncate text-xs font-medium text-foreground/90 sm:text-sm">
                            Completed Rentals
                        </p>
                    </div>
                </div>

                <div className="relative z-10 mt-4 flex items-center gap-1 text-[10px] sm:text-xs">
                    <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="font-bold text-emerald-600">
                        10%
                    </span>
                    <span className="text-foreground">from last month</span>
                </div>

                {/* Decorative chart */}
                <svg
                    className={`pointer-events-none absolute -bottom-1 -right-1 h-14 w-28 opacity-25 text-violet-400`}
                    viewBox="0 0 120 50"
                    fill="none"
                >
                    <path
                        d="M0 45 C15 45 18 35 30 38 S45 22 58 29 S75 8 90 16 S105 0 120 4"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <path
                        d="M0 45 C15 45 18 35 30 38 S45 22 58 29 S75 8 90 16 S105 0 120 4 V50 H0 Z"
                        fill="currentColor"
                        opacity=".2"
                    />
                </svg>
            </div>

            <div className="group relative min-w-0 overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5">

                <div className="relative z-10 flex items-center gap-3 sm:gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:h-14 sm:w-14 bg-orange-600/10 text-orange-600`}>
                        <Wallet className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.5} />
                    </div>

                    <div className="min-w-0">
                        <h3 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                            ৳ {formatAmount(totalSpent)}
                        </h3>
                        <p className="truncate text-xs font-medium text-foreground/90 sm:text-sm">
                            Total Spent
                        </p>
                    </div>
                </div>

                <div className="relative z-10 mt-4 flex items-center gap-1 text-[10px] sm:text-xs">
                    <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="font-bold text-emerald-600">
                        10%
                    </span>
                    <span className="text-foreground">from last month</span>
                </div>

                {/* Decorative chart */}
                <svg
                    className={`pointer-events-none absolute -bottom-1 -right-1 h-14 w-28 opacity-25 text-violet-400`}
                    viewBox="0 0 120 50"
                    fill="none"
                >
                    <path
                        d="M0 45 C15 45 18 35 30 38 S45 22 58 29 S75 8 90 16 S105 0 120 4"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <path
                        d="M0 45 C15 45 18 35 30 38 S45 22 58 29 S75 8 90 16 S105 0 120 4 V50 H0 Z"
                        fill="currentColor"
                        opacity=".2"
                    />
                </svg>
            </div>

        </section>
    );
}

export default Statistics;