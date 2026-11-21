
import { Suspense } from "react";
import OwnerAuth from "./_components/OwnerAuth";
import DashboardLoader from "@/components/dashboard/DashboardLoader";

export default async function OwnerLayout({ children }: { children: React.ReactNode }) {

    return (
        <Suspense fallback={<DashboardLoader />}>
            <OwnerAuth>{children}</OwnerAuth>
        </Suspense>
    )
}