import { EquipmentCondition } from "@/data/equipmentCondition";
import { UserType } from "./userType";

type RentalType = "daily" | "weekly" | "monthly";

type Status = "pending" | "approved" | "rejected";

export interface EquipmentType {
    _id?: string;
    ownerId: string;
    equipmentName: string;
    description: string;
    categoryName: string;
    location: string;
    rentalPrice: number;
    rentalType: RentalType;
    quantity: number;
    condition: EquipmentCondition;
    brand: string;
    model: string;
    images: string[];
    terms: string;
    status?: Status;
    createdAt?: string;
    updatedAt?: string;

    // Owner information
    owner?: UserType | null;
}