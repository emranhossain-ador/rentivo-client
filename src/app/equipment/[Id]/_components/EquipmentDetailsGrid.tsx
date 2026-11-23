import { getEquipmentById } from "@/lib/api/equipments";
import { EquipmentType } from "@/lib/type/equipmentType";
import EquipmentCard from "@/components/EquipmentCard";

const EquipmentDetailsGrid = async ({ itemId }: { itemId: string }) => {

    const equipmentData = await getEquipmentById(itemId);
    const equipment: EquipmentType[] = equipmentData?.data || [];

    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {equipment.map((item) => <EquipmentCard key={item._id} equipment={item} />)}
        </div>
    );
};

export default EquipmentDetailsGrid;