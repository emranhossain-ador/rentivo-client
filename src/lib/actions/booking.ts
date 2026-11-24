import { API_BASE_URL } from "../api/apiBaseUrl"

export const createBooking = async (data: unknown) => {
    const res = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    return res.json();
}


export const checkAvailableDate = async (equipmentId: string) => {
    const res = await fetch(`${API_BASE_URL}/equipment/${equipmentId}/booked-dates`);
    return res.json();
}