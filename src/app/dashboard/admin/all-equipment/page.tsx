

import PageHeading from "@/components/dashboard/PageHeading";
import { Package } from "lucide-react";
import { Suspense } from "react";
import EquipmentContent from "./EquipmentContent";
import DashboardLoader from "@/components/dashboard/DashboardLoader";


interface EquipmentPageParams {
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
}


export default function AllEquipment({ searchParams }: EquipmentPageParams) {

    return (
        <main className="bg-background space-y-6">

            {/* Heading */}
            <PageHeading
                Icon={Package}
                title="All Equipment"
                subTitle="Manage, review and monitor all listed equipment."
            />

            <Suspense fallback={<DashboardLoader />}>
                <EquipmentContent searchParams={searchParams} />
            </Suspense>

        </main>
    );
}
