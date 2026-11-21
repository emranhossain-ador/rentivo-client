import DashboardLoader from "@/components/dashboard/DashboardLoader";
import { Suspense } from "react";
import OwnerContent from "./OwnerContent";




const OwnerDashboardPage = async () => {

    return (
        <main className="min-h-screen space-y-8 md:space-y-10">

            <Suspense fallback={<DashboardLoader />}>
                <OwnerContent />
            </Suspense>

        </main>
    );
}

export default OwnerDashboardPage;