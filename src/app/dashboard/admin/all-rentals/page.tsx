
import {
    CalendarDays, Users, CheckCircle2,
    Clock3,
} from "lucide-react";
import PageHeading from "@/components/dashboard/PageHeading";
import SummaryCard from "@/components/dashboard/SummaryCard";
import AllRentalsFilter from "./_components/filter";
import RentalCard from "./_components/rentalCard";


const AllRentalsPage = () => {

    return (
        <main className="bg-background space-y-6">

            {/* Header */}
            <PageHeading
                Icon={CalendarDays}
                title="All Rentals"
                subTitle="Monitor and manage all rental booking records."
            />

            {/* SummaryCard */}
            <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard
                    title="Total Rentals"
                    value="124"
                    icon={CalendarDays}
                    color="bg-violet-100 text-violet-600"
                />
                <SummaryCard
                    title="Active Rentals"
                    value="87"
                    icon={Users}
                    color="bg-blue-100 text-blue-600"
                />
                <SummaryCard
                    title="Completed"
                    value="28"
                    icon={CheckCircle2}
                    color="bg-emerald-100 text-emerald-600"
                />
                <SummaryCard
                    title="Pending"
                    value="9"
                    icon={Clock3}
                    color="bg-orange-100 text-orange-600"
                />
            </section>

            {/* Search and Filters */}
            <AllRentalsFilter />

            {/* Cards + Details */}
            <section >

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 2xl:grid-cols-3">
                    <RentalCard />
                    <RentalCard />
                    <RentalCard />
                </div>


                {/* <div className="rounded-2xl border border-dashed border-border bg-card px-5 py-16 text-center">
                        <Package className="mx-auto mb-3 text-muted-foreground" size={36} />
                        <h3 className="font-semibold text-foreground">No rentals found</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Try changing your search or filters.
                        </p>
                        <button
                            onClick={resetFilters}
                            className="mt-4 text-sm font-semibold text-primary hover:underline"
                        >
                            Clear filters
                        </button>
                    </div> */}

            </section>

        </main>
    );
}

export default AllRentalsPage;