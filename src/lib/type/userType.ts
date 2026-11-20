export interface UserType {
    _id?: string;
    name: string;
    email: string;
    role: string;
    image: string;
}


export type UserRole = "admin" | "customer" | "owner";