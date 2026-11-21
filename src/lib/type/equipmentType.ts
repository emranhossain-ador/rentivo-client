import { EquipmentCondition } from "@/data/equipmentCondition";

type RentalType = "daily" | "weekly" | "monthly";

type Status = "pending" | "approved" | "rejected";

export interface EquipmentType {
    _id?: string;
    ownerId: string
    equipmentName: string;
    description: string
    categoryName: string
    location: string
    rentalPrice: string;
    rentalType: RentalType;
    quantity: string;
    condition: EquipmentCondition
    brand: string
    model: string
    images: string[];
    terms: string;
    status?: Status;
    createdAt?: Date;
    updatedAt?: Date;
}