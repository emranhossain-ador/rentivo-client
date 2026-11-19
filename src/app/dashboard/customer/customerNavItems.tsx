import {
    LayoutGrid,
    ShoppingBag,
    Heart,
    User,
} from "lucide-react";

export const customerNavItems = [
    {
        name: "Dashboard",
        href: "/dashboard/customer",
        icon: LayoutGrid,
    },
    {
        name: "My Rentals",
        href: "/my-rentals",
        icon: ShoppingBag,
    },
    {
        name: "Favorites",
        href: "/dashboard/customer/favorites",
        icon: Heart,
    },
    {
        name: "Profile",
        href: "/dashboard/customer/profile",
        icon: User,
    }
];