
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



export const updateEquipment = async (
    id: string,
    data: Partial<EquipmentType>
) => {
    const res = await fetch(`${API_BASE_URL}/equipment/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Failed to update equipment");
    }

    return result;
};



export const deleteEquipment = async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/equipment/${id}`, {
        method: "DELETE",
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Failed to delete equipment");
    }

    return result;
};




export type EquipmentStatus =
    | "pending"
    | "approved"
    | "rejected";

export const updateEquipmentStatus = async (id: string, status: EquipmentStatus) => {
    const res = await fetch(
        `${API_BASE_URL}/equipment/${id}/status`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        }
    );

    const result = await res.json();

    if (!res.ok) {
        throw new Error(
            result.message || "Failed to update equipment status"
        );
    }

    return result;
};
