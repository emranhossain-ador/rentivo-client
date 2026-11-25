import { Suspense } from "react";
import MyRentalsContent from "./MyRentalsContent";
import DashboardLoader from "@/components/dashboard/DashboardLoader";


export default function MyRentals() {

    return (
        <main className="min-h-screen bg-background space-y-8 md:space-y-10">
            <Suspense fallback={<DashboardLoader />}>
                <MyRentalsContent />
            </Suspense>
        </main>
    );
}



