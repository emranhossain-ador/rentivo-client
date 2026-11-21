import { Suspense } from "react";
import CustomerContent from "./CustomerContent";
import DashboardLoader from "@/components/dashboard/DashboardLoader";

export default function UserDashboard() {
    return (
        <main className="min-h-screen space-y-8 md:space-y-10">

            <Suspense fallback={<DashboardLoader />}>
                <CustomerContent />
            </Suspense>

        </main>
    );
}
