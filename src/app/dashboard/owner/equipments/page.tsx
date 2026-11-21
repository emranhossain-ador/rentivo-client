
import {
    Package,
} from "lucide-react";
import PageHeading from "@/components/dashboard/PageHeading";
import { Suspense } from "react";
import MyEquipmentContent from "./MyEquipmentContent";
import DashboardLoader from "@/components/dashboard/DashboardLoader";

export default async function MyEquipmentPage() {



    return (
        <main className=" bg-background space-y-6">

            {/* Header */}
            <PageHeading
                Icon={Package}
                title="My Equipment"
                subTitle="Manage all equipment listed by you on Rentivo."
            />

            <Suspense fallback={<DashboardLoader />} >

                <MyEquipmentContent />

            </Suspense>

        </main>
    );
}
