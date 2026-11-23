import { getApprovedEquipments } from "@/lib/api/equipments";
import { EquipmentType } from "@/lib/type/equipmentType";
import EquipmentCard from "@/components/EquipmentCard";
import { PackageX } from "lucide-react";

interface EquipmentGridProps {
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
}

export default async function EquipmentGrid({ searchParams }: EquipmentGridProps) {
    const search = await searchParams;
    const query = new URLSearchParams(search as Record<string, string>).toString();

    const response = await getApprovedEquipments(query);
    const equipments: EquipmentType[] = response?.data || [];

    if (equipments.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <PackageX size={28} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">No equipment found</h3>
                <p className="mt-1 text-sm text-muted-foreground max-w-sm">
                    We couldn&apos;t find any approved equipment matching your search or filters. Try adjusting your criteria.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-4 lg:grid-cols-3">
            {equipments.map((item) => (
                <EquipmentCard key={item._id} equipment={item} />
            ))}
        </div>
    );
}
