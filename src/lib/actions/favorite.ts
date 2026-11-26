import { API_BASE_URL } from "../api/apiBaseUrl";
import { authHeaders } from "../core/client";

export const addFavorite = async (equipmentId: string, userId: string) => {
    const res = await fetch(
        `${API_BASE_URL}/favorites`,
        {
            method: "POST",
            headers: {
                "content-type": "application/json",
                ...(await authHeaders()),
            },
            body: JSON.stringify({ equipmentId, userId }),
        }
    );

    const result = await res.json();

    return result;
};


export const checkFavorite = async (equipmentId: string, userId: string) => {
    const res = await fetch(
        `${API_BASE_URL}/favorites/${equipmentId}/${userId}`,
        {
            headers: await authHeaders(),
        }
    );

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Failed to check favorite");
    }

    return result.isFavorite;
};



export const removeFavorite = async (
    favoriteId: string,
    userId: string
) => {
    const res = await fetch(
        `${API_BASE_URL}/favorites/${favoriteId}/${userId}`,
        {
            method: "DELETE",
            headers: await authHeaders(),
        }
    );

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Failed to remove favorite");
    }

    return result;
};
