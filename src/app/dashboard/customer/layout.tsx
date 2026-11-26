import DashboardLoader from "@/components/dashboard/DashboardLoader";
import { Suspense } from "react";
import CustomerAuth from "./_components/CustomerAuth";

export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<DashboardLoader />}>
            <CustomerAuth>{children}</CustomerAuth>
        </Suspense>
    )
}