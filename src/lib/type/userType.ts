export interface UserType {
    _id?: string;
    id?: string;
    name: string;
    email: string;
    role: string;
    image: string;
    phoneNumber?: string;
    address?: string;
    createdAt: Date;
    updatedAt: Date;
}


export type UserRole = "admin" | "customer" | "owner";