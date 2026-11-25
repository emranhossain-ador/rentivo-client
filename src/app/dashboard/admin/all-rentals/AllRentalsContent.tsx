import SummaryCard from "@/components/dashboard/SummaryCard"
import { CalendarDays, CheckCircle2, Clock3, DiagramFlowVertical, Package, Users } from "lucide-react"
import RentalCard from "./_components/rentalCard"
import { BookingType } from "@/lib/type/booking"
import { getAllBookingsForAdmin } from "@/lib/api/booking"

const AllRentalsContent = async () => {

    const bookingData: BookingType[] = await getAllBookingsForAdmin();

    const today = new Date().toISOString().slice(0, 10);

    const totalRentals = bookingData.length;

    const activeRentals = bookingData.filter(
        (booking) =>
            booking.status === "confirmed" &&
            booking.startDate <= today &&
            booking.endDate > today
    ).length;

    const completedRentals = bookingData.filter(
        (booking) => booking.status === "completed"
    ).length;

    const pendingRentals = bookingData.filter(
        (booking) => booking.status === "pending"
    ).length;

    return (
        <>

            {/* SummaryCard */}
            <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard
                    title="Total Rentals"
                    value={totalRentals}
                    icon={CalendarDays}
                    color="bg-violet-500/10 text-violet-600"
                />
                <SummaryCard
                    title="Active Rentals"
                    value={activeRentals}
                    icon={DiagramFlowVertical}
                    color="bg-blue-500/10 text-blue-600"
                />
                <SummaryCard
                    title="Completed"
                    value={completedRentals}
                    icon={CheckCircle2}
                    color="bg-emerald-500/10 text-emerald-600"
                />
                <SummaryCard
                    title={"Pending"}
                    value={pendingRentals}
                    icon={Clock3}
                    color="bg-orange-500/10 text-orange-600"
                />
            </section>

            {/* Search and Filters */}
            {/* <AllRentalsFilter /> */}

            {/* Cards + Details */}
            <section >
                {
                    bookingData.length === 0 ?
                        <div className="rounded-2xl border border-dashed border-border bg-card px-5 py-16 text-center">
                            <Package className="mx-auto mb-3 text-muted-foreground" size={36} />
                            <h3 className="font-semibold text-foreground">No rentals found</h3>
                        </div>
                        :
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 2xl:grid-cols-3">
                            {
                                bookingData.map(rental => <RentalCard key={rental._id} rental={rental} />)
                            }

                        </div>
                }

            </section>

        </>
    )
}

export default AllRentalsContent