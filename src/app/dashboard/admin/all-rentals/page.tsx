
import {
    CalendarDays
} from "lucide-react";
import PageHeading from "@/components/dashboard/PageHeading";
import { Suspense } from "react";
import AllRentalsContent from "./AllRentalsContent";
import DashboardLoader from "@/components/dashboard/DashboardLoader";


const AllRentalsPage = () => {

    return (
        <main className="bg-background space-y-6">

            {/* Header */}
            <PageHeading
                Icon={CalendarDays}
                title="All Rentals"
                subTitle="Monitor and manage all rental booking records."
            />

            <Suspense fallback={<DashboardLoader />}>
                <AllRentalsContent />
            </Suspense>

        </main>
    );
}

export default AllRentalsPage;