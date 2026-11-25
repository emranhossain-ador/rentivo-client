import { EquipmentType } from "./equipmentType";
import { UserType } from "./userType";

export type BookingType = {
    _id: string;
    userId: string;
    equipmentId: string;
    equipmentName: string;
    rentalPrice: number;
    rentalType: "daily" | "weekly" | "monthly";

    startDate: string;
    endDate: string;
    rentalDays: number;
    quantity: number;

    contactNumber: string;
    deliveryAddress: string;
    notes?: string;

    totalAmount: number;

    status: "pending" | "confirmed" | "cancelled" | "completed";
    paymentStatus: "pending" | "paid" | "failed" | "refunded";

    stripeSessionId?: string;

    createdAt: string;
    updatedAt: string;

    equipment?: EquipmentType;
    customer?: UserType;
};