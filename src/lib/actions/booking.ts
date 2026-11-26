
import { API_BASE_URL } from "../api/apiBaseUrl"
import { authHeaders } from "../core/client"


export type BookingData = {
    equipmentId: string;
    userId: string;
    startDate: string;
    endDate: string;
    quantity: number;
    contactNumber: string;
    deliveryAddress: string;
    notes: string;
};

export const createBooking = async (data: BookingData) => {
    const response = await fetch(
        `${API_BASE_URL}/create-checkout-session`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(await authHeaders()),
            },
            body: JSON.stringify(data),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Payment failed");
    }

    if (!result.paymentUrl) {
        throw new Error("Payment URL not found");
    }

    window.location.assign(result.paymentUrl);

    return result;
};

export const checkAvailableDate = async (equipmentId: string) => {
    const res = await fetch(`${API_BASE_URL}/equipment/${equipmentId}/booked-dates`);
    return res.json();
}

export type VerifyPaymentResult = {
    success: boolean;
    message?: string;
    status?: string;
    booking?: {
        _id: string;
        status: string;
        paymentStatus: string;
    };
};

export const verifyPayment = async (sessionId: string): Promise<VerifyPaymentResult> => {
    const res = await fetch(
        `${API_BASE_URL}/verify-payment?session_id=${encodeURIComponent(sessionId)}`
    );

    return res.json();
};


export const updateBookingByAdmin = async (bookingId: string, data: { status: string; paymentStatus: string }) => {
    const response = await fetch(
        `${API_BASE_URL}/admin/bookings/${bookingId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...(await authHeaders()),
            },
            body: JSON.stringify(data),
        }
    );

    return response.json();
}
