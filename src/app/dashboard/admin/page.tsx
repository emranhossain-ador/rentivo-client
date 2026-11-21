import { Suspense } from "react";
import AdminContent from "./AdminContent";
import DashboardLoader from "@/components/dashboard/DashboardLoader";



export default function AdminDashboard() {
    return (
        <main className="min-h-screen space-y-8 md:space-y-10">

            <Suspense fallback={<DashboardLoader />}>
                <AdminContent />
            </Suspense>

        </main>
    );
}
