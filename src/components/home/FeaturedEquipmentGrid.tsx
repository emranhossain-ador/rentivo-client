import { getFeaturedEquipment } from "@/lib/api/equipments";
import EquipmentCard from "../EquipmentCard";
import { EquipmentType } from "@/lib/type/equipmentType";

const FeaturedEquipmentGrid = async () => {

    const equipmentData = await getFeaturedEquipment();
    const equipment: EquipmentType[] = equipmentData.data;

    return (
        <div className="grid grid-cols-2 gap-2.5 md:gap-6 md:grid-cols-3 xl:grid-cols-4">

            {equipment.map((item) => {

                return (
                    <EquipmentCard key={item._id} equipment={item} />
                );
            })}

        </div>
    )
};

export default FeaturedEquipmentGrid;