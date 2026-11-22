export interface UserType {
    _id?: string;
    id?: string;
    name: string;
    email: string;
    role: "admin" | "owner" | "customer";
    image: string;
    phoneNumber?: string;
    address?: string;
    createdAt: Date;
    updatedAt: Date;
}


export type UserRole = "admin" | "customer" | "owner";