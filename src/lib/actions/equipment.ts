
import { API_BASE_URL } from "../api/apiBaseUrl";
import { EquipmentType } from "../type/equipmentType";


export const addEquipment = async (data: EquipmentType) => {
    const res = await fetch(`${API_BASE_URL}/equipment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await res.json();

    console.log("API Status:", res.status);
    console.log("API Response:", result);

    if (!res.ok) {
        throw new Error(result.message || "Failed to add equipment");
    }

    return result;
};