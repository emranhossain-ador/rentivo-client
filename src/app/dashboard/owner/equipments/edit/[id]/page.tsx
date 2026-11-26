
import { Suspense } from "react";
import { getEquipmentById } from "@/lib/api/equipments";
import { notFound } from "next/navigation";
import AddEquipmentForm from "../../add/addEquipmentForm";

export const instant = false;

interface EditEquipmentPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditEquipmentPage({
    params,
}: EditEquipmentPageProps) {
    const { id } = await params;

    return (
        <Suspense
            fallback={
                <div className="section-container space-y-6 py-8">
                    <div className="h-10 w-64 animate-pulse rounded-lg bg-muted" />
                    <div className="h-96 animate-pulse rounded-2xl bg-muted" />
                </div>
            }
        >
            <EditEquipmentContent id={id} />
        </Suspense>
    );
}

async function EditEquipmentContent({ id }: { id: string }) {
    let equipment;

    try {
        equipment = await getEquipmentById(id);
    } catch (error) {
        console.error("Failed to fetch equipment:", error);
        throw error;
    }

    if (!equipment) {
        notFound();
    }

    return <AddEquipmentForm equipment={equipment} />;
}
