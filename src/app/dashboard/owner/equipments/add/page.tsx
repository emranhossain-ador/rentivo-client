
import {
    Package
} from "lucide-react";
import PageHeading from "@/components/dashboard/PageHeading";
import AddEquipmentForm from "./addEquipmentForm";




export default function AddEquipmentPage() {

    return (
        <main className="bg-background space-y-6">

            {/* Page Header */}
            <PageHeading
                Icon={Package}
                title="Add Equipment"
                subTitle="List your equipment and start earning with Rentivo."
            />

            <AddEquipmentForm />

        </main>
    );
}
