import { API_BASE_URL } from "../api/apiBaseUrl";
import { EquipmentType } from "../type/equipmentType";

export const getEquipmentByOwnerId = async (ownerId: string): Promise<EquipmentType[]> => {
    const res = await fetch(
        `${API_BASE_URL}/equipment/owner/${ownerId}`
    );

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Failed to fetch equipment");
    }

    return result.data;
};


export const getEquipmentById = async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/equipment/${id}`);

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Failed to fetch equipment");
    }

    return result.data;
};