import SummaryCard from "@/components/dashboard/SummaryCard";
import { getAllEquipments } from "@/lib/api/equipments";
import { EquipmentType } from "@/lib/type/equipmentType";
import { CheckCircle2, Clock, Package, XCircle } from "lucide-react";

const Statistics = async () => {
    // get All Equipments
    const data = await getAllEquipments();
    const equipments: EquipmentType[] = data?.data;

    const pending = equipments.filter(equipment => equipment.status === "pending");
    const approved = equipments.filter(equipment => equipment.status === "approved");
    const rejected = equipments.filter(equipment => equipment.status === "rejected");


    return (
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            <SummaryCard
                title="Total Equipment"
                value={equipments.length}
                icon={Package}
                color="bg-brand/10 text-brand"
            />
            <SummaryCard
                title="Pending"
                value={pending.length}
                icon={Clock}
                color="bg-amber-500/10 text-amber-600"
            />
            <SummaryCard
                title="Approved"
                value={approved.length}
                icon={CheckCircle2}
                color="bg-emerald-500/10 text-emerald-600"
            />
            <SummaryCard
                title="Rejected"
                value={rejected.length}
                icon={XCircle}
                color="bg-red-500/10 text-red-600"
            />
        </div>
    )
};

export default Statistics;