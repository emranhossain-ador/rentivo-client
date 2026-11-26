"use server";

import { redirect } from "next/navigation";
import { API_BASE_URL } from "../api/apiBaseUrl";
import { EquipmentType } from "../type/equipmentType";
import { authFetch } from "../core/server";

export const getEquipmentByOwnerId = async (ownerId: string): Promise<EquipmentType[]> => {
    const res = await authFetch(
        `${API_BASE_URL}/equipment/owner/${ownerId}`
    );

    const result = await res.json();

    if (!res.ok) {
        redirect('/not-found')
    }

    return result.data;
};


export const getEquipmentById = async (id: string) => {
    const api = `${API_BASE_URL}/equipment/${id}`;
    const res = await authFetch(api);

    const result = await res.json();
    return result.data;
};


export const getAllEquipments = async (query = '') => {
    const res = await fetch(`${API_BASE_URL}/equipments?${query}`);
    return res.json();
}


export const getFeaturedEquipment = async () => {
    const res = await fetch(`${API_BASE_URL}/equipments/latest-approved`);
    return res.json();
}


export const getApprovedEquipments = async (query = '') => {
    const res = await fetch(`${API_BASE_URL}/approved-equipments?${query}`);
    return res.json();
}
