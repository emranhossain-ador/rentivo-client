export interface FavoritesType {
    _id: string;
    equipment: {
        _id: string;
        equipmentName: string;
        categoryName: string;
        location: string;
        rentalPrice: number;
        quantity: number;
        images: string[]
    }
}


import { API_BASE_URL } from "./apiBaseUrl"
import { authFetch } from "../core/server";

export const getMyFavoriteItemsByUserId = async (userId: string) => {
    const res = await authFetch(`${API_BASE_URL}/favorites/${userId}`);
    return res.json();

}