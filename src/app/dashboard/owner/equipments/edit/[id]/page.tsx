
import { getEquipmentById } from "@/lib/api/equipments";
import { notFound } from "next/navigation";
import AddEquipmentForm from "../../add/addEquipmentForm";

interface EditEquipmentPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditEquipmentPage({
    params,
}: EditEquipmentPageProps) {
    const { id } = await params;

    let equipment;

    try {
        equipment = await getEquipmentById(id);
    } catch (error) {
        console.error("Failed to fetch equipment:", error);
        notFound();
    }

    if (!equipment) {
        notFound();
    }

    return <AddEquipmentForm equipment={equipment} />;
}
