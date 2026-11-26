import { API_BASE_URL } from "./apiBaseUrl";

export type PublicStats = {
    total: number;
    owners: number;
    customers: number;
    ownerAvatars: {
        _id: string;
        name?: string;
        image?: string;
    }[];
};

// Public endpoint — only counts and a few owner names/images, no private data
export const getPublicStats = async (): Promise<PublicStats> => {
    const res = await fetch(`${API_BASE_URL}/users/summary`);

    const result = await res.json();

    if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch stats");
    }

    return result.data;
};
