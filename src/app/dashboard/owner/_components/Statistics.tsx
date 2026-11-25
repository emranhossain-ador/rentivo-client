
import { getOwnerBookings } from "@/lib/api/booking";
import { getEquipmentByOwnerId } from "@/lib/api/equipments";
import { getSession } from "@/lib/core/server";
import { BookingType } from "@/lib/type/booking";
import {
    ArrowUpRight,
    Box,
    CalendarCheck,
    PackageCheck,
    Wallet,
} from "lucide-react";


const formatAmount = (amount: number) => {
    if (amount >= 10000000) {
        return `${(amount / 10000000).toFixed(1).replace(/\.0$/, "")} Cr`;
    }

    if (amount >= 100000) {
        return `${(amount / 100000).toFixed(1).replace(/\.0$/, "")} L`;
    }

    if (amount >= 1000) {
        return `${(amount / 1000).toFixed(1).replace(/\.0$/, "")} K`;
    }

    return amount.toString();
};

const Statistics = async () => {
    const session = await getSession();
    const user = session?.user;

    // quipment Get 
    const equipment = await getEquipmentByOwnerId(user?.id as string);

    // Total Bookings
    const totalBooking = await getOwnerBookings(user?.id as string);

    // Active Rentals
    const activeRentals = totalBooking.filter(
        (booking: BookingType) => booking.status === "confirmed"
    ).length;

    // Total Revenue (Only Paid)
    const totalRevenue = totalBooking
        .filter((booking: BookingType) => booking.paymentStatus === "paid")
        .reduce(
            (acc: number, booking: BookingType) => acc + booking.totalAmount,
            0
        );

    return (
        <section className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-4 lg:gap-4">

            <div className="group relative min-w-0 overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5">

                <div className="relative z-10 flex items-center gap-3 sm:gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:h-14 sm:w-14 bg-violet-600/10 text-violet-600`}>
                        <Box className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.5} />

                    </div>

                    <div className="min-w-0">
                        <h3 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                            {equipment.length}
                        </h3>
                        <p className="truncate text-xs font-medium text-foreground/90 sm:text-sm">
                            Total Equipments
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
                        <CalendarCheck className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.5} />
                    </div>

                    <div className="min-w-0">
                        <h3 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                            {totalBooking.length}
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
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:h-14 sm:w-14 bg-orange-600/10 text-orange-600`}>
                        <Wallet className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.5} />
                    </div>

                    <div className="min-w-0">
                        <h3 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                            ৳ {formatAmount(totalRevenue)}
                        </h3>
                        <p className="truncate text-xs font-medium text-foreground/90 sm:text-sm">
                            Total Earnings
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