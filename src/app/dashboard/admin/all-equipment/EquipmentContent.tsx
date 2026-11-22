
import EquipmentTable from "./_components/EquipmentTable";
import SearchFilter from "./_components/SearchFilter";
import { getAllEquipments } from "@/lib/api/equipments";
import Statistics from "./_components/Statistics";
import { EquipmentType } from "@/lib/type/equipmentType";
import { Package } from "lucide-react";


interface EquipmentPageParams {
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
}


const EquipmentContent = async ({ searchParams }: EquipmentPageParams) => {
    //Search Parameter Get 
    const search = await searchParams;
    const query = new URLSearchParams(search as Record<string, string>).toString();

    const allEquipments = await getAllEquipments(query);
    const equipments: EquipmentType[] = allEquipments?.data;

    return (
        <>
            {/* Statistics */}
            <Statistics />

            {/* Equipment Table */}
            <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">

                {/* Header */}
                <div className="flex flex-col justify-between gap-2 border-b border-border p-4 sm:flex-row sm:items-center sm:px-5">
                    <div>
                        <h2 className="text-base font-bold">Equipment Listings {equipments.length}</h2>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Review and manage equipment submitted by owners.
                        </p>
                    </div>
                </div>

                {/* Search and Filters */}
                <SearchFilter />

                <EquipmentTable equipments={equipments} />

            </section >
        </>
    )
}

export default EquipmentContent