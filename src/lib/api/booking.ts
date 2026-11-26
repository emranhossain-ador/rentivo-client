import { API_BASE_URL } from "./apiBaseUrl";
import { authFetch } from "../core/server";

export const getBookingsByUserId = async (userId: string) => {
    const response = await authFetch(
        `${API_BASE_URL}/bookings/user/${userId}`
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to fetch bookings");
    }

    return result.data;
};


export const getOwnerBookings = async (ownerId: string) => {
    const response = await authFetch(
        `${API_BASE_URL}/owner/bookings/${ownerId}`
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to fetch bookings");
    }

    return result.data;
};


export const getAllBookingsForAdmin = async () => {
    const response = await authFetch(`${API_BASE_URL}/admin/bookings`);

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to fetch bookings");
    }

    return result.data;
};