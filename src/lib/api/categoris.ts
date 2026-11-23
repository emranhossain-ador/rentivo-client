import { API_BASE_URL } from "./apiBaseUrl";
import { CategoryType } from "../type/categoryType";

export const getCategories = async (): Promise<CategoryType[]> => {
    try {
        const endpoints = [
            `${API_BASE_URL}/categoris`,
            `${API_BASE_URL}/categories`,
        ];

        for (const endpoint of endpoints) {
            try {
                const res = await fetch(endpoint, {
                    next: { revalidate: 60 },
                    signal: AbortSignal.timeout(10000),
                });

                if (res.ok) {
                    return await res.json();
                }
            } catch (error) {
                console.error(`Failed endpoint ${endpoint}:`, error);
            }
        }

        return [];
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        return [];
    }
};
