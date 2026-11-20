import {
    LayoutGrid,
    ShoppingBag,
    Users,
    DiagramFlowVertical,
} from "lucide-react";

export const adminNavItems = [
    {
        name: "Dashboard",
        href: "/dashboard/admin",
        icon: LayoutGrid,
    },
    {
        name: "Users",
        href: "/dashboard/admin/users",
        icon: Users,
    },
    {
        name: "All Equipment",
        href: "/dashboard/admin/all-equipment",
        icon: ShoppingBag,
    },
    {
        name: "All Rentals",
        href: "/dashboard/admin/all-rentals",
        icon: DiagramFlowVertical,
    }
];