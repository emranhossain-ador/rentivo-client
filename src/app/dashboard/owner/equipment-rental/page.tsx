
import { Suspense } from "react";
import {
    ClipboardList,
} from "lucide-react";
import PageHeading from "@/components/dashboard/PageHeading";
import EquipmentRentalContent from "./EquipmentRentalContent";
import DashboardLoader from "@/components/dashboard/DashboardLoader";


export default function MyEquipmentRentalPage() {

    return (
        <main className=" bg-background space-y-6">

            {/* Header */}
            <PageHeading
                Icon={ClipboardList}
                title="My Equipment Rental"
                subTitle="Manage rental bookings for your equipment."
            />


            {/* Rental Cards */}

            <Suspense fallback={<DashboardLoader />}>
                <EquipmentRentalContent />
            </Suspense>

        </main>
    );
}
