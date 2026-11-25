import { CalendarCheck, Package, Wallet } from "lucide-react";
import MyRentalTable from "./_components/MyRentalTable";
import PageHeading from "@/components/dashboard/PageHeading";
import { getBookingsByUserId } from "@/lib/api/booking";
import { getSession } from "@/lib/core/server";
import { BookingType } from "@/lib/type/booking";
import SummaryCard from "@/components/dashboard/SummaryCard";

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

const MyRentalsContent = async () => {
    const session = await getSession();
    const user = session?.user;

    const rentals: BookingType[] = await getBookingsByUserId(user!.id);
    const activeBookings = rentals.filter(
        (booking) => booking.status === "confirmed"
    ).length;

    const totalPaid = rentals
        .filter((booking) => booking.paymentStatus === "paid")
        .reduce((total, booking) => total + booking.totalAmount, 0);


    return (
        <>
            {/* Page heading */}
            <PageHeading
                Icon={Package}
                title="My Rentals"
                subTitle="Manage and track all your equipment rental bookings."
            />

            {/* Summary cards */}
            <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard
                    icon={Package}
                    title="Total Rentals"
                    value={rentals.length}
                    color="text-brand bg-brand/10"
                />
                <SummaryCard
                    icon={CalendarCheck}
                    title="Active Bookings"
                    value={activeBookings}
                    color="text-emerald-600 bg-emerald-500/10"
                />

                <SummaryCard
                    icon={Wallet}
                    title="Total Paid"
                    value={`৳ ${formatAmount(totalPaid)}`}
                    color="text-blue-600 bg-blue-500/10"
                />
            </section>

            {/* Main table card */}
            <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">

                {/* Table heading */}
                <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                    <div>
                        <h2 className="text-base font-bold">
                            All Rental Bookings
                        </h2>
                        <p className="mt-1 text-xs text-muted-foreground">
                            View and manage your rental transactions.
                        </p>
                    </div>

                </div>

                <MyRentalTable rentals={rentals} />

            </section>

            <p className="text-center text-[11px] text-muted-foreground">
                Showing rental history for your account.
            </p>
        </>
    )
}

export default MyRentalsContent;