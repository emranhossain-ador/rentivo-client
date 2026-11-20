import {
    LayoutGrid,
    User,
    ClipboardList,
    Package,
    PackagePlus,
} from "lucide-react";

export const ownerNavItems = [
    {
        name: "Dashboard",
        href: "/dashboard/owner",
        icon: LayoutGrid,
    },
    {
        name: "Add Equipment",
        href: "/dashboard/owner/equipments/add",
        icon: PackagePlus,
    },
    {
        name: "My Equipment",
        href: "/dashboard/owner/equipments",
        icon: Package,
    },
    {
        name: "My Equipment Rental",
        href: "/dashboard/owner/equipment-rental",
        icon: ClipboardList,
    },
    {
        name: "Profile",
        href: "/dashboard/owner/profile",
        icon: User,
    }
];