

import { getAllEquipments } from "@/lib/api/equipments";
import { getUsers } from "@/lib/api/users";
import {
    Users,
    UserRoundCheck,
    Package,
    CalendarCheck,
    Wallet,
    TrendingUp,
} from "lucide-react";

const AdminStatistics = async () => {

    const users = await getUsers();
    const totalOwner = users.filter(user => user.role === "owner");

    //Get All Equipments
    const equipments = await getAllEquipments();


    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

            {/* Total Users */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                        <Users className="h-6 w-6" />
                    </div>

                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                        <TrendingUp className="h-3.5 w-3.5" />
                        12.5%
                    </span>
                </div>

                <div className="mt-5">
                    <p className="text-sm font-medium text-muted-foreground">
                        Total Users
                    </p>
                    <h3 className="mt-1 text-2xl font-bold tracking-tight">
                        {users.length}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground">
                        Registered platform users
                    </p>
                </div>

                <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-blue-500/5 transition-transform duration-500 group-hover:scale-150" />
            </div>

            {/* Total Owners */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600">
                        <UserRoundCheck className="h-6 w-6" />
                    </div>

                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                        <TrendingUp className="h-3.5 w-3.5" />
                        8.2%
                    </span>
                </div>

                <div className="mt-5">
                    <p className="text-sm font-medium text-muted-foreground">
                        Total Owners
                    </p>
                    <h3 className="mt-1 text-2xl font-bold tracking-tight">
                        {totalOwner.length}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground">
                        Registered equipment owners
                    </p>
                </div>

                <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-violet-500/5 transition-transform duration-500 group-hover:scale-150" />
            </div>

            {/* Total Equipment */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                        <Package className="h-6 w-6" />
                    </div>

                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                        <TrendingUp className="h-3.5 w-3.5" />
                        15.3%
                    </span>
                </div>

                <div className="mt-5">
                    <p className="text-sm font-medium text-muted-foreground">
                        Total Equipment
                    </p>
                    <h3 className="mt-1 text-2xl font-bold tracking-tight">
                        {equipments.data.length}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground">
                        All listed equipment
                    </p>
                </div>

                <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-amber-500/5 transition-transform duration-500 group-hover:scale-150" />
            </div>

            {/* Total Bookings */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                        <CalendarCheck className="h-6 w-6" />
                    </div>

                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                        <TrendingUp className="h-3.5 w-3.5" />
                        10.8%
                    </span>
                </div>

                <div className="mt-5">
                    <p className="text-sm font-medium text-muted-foreground">
                        Total Bookings
                    </p>
                    <h3 className="mt-1 text-2xl font-bold tracking-tight">
                        640
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground">
                        All rental bookings
                    </p>
                </div>

                <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-emerald-500/5 transition-transform duration-500 group-hover:scale-150" />
            </div>

            {/* Total Revenue */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600">
                        <Wallet className="h-6 w-6" />
                    </div>

                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                        <TrendingUp className="h-3.5 w-3.5" />
                        18.6%
                    </span>
                </div>

                <div className="mt-5">
                    <p className="text-sm font-medium text-muted-foreground">
                        Total Revenue
                    </p>
                    <h3 className="mt-1 text-2xl font-bold tracking-tight">
                        ৳8,50,000
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground">
                        Total platform earnings
                    </p>
                </div>

                <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-rose-500/5 transition-transform duration-500 group-hover:scale-150" />
            </div>

        </div>
    );
};

export default AdminStatistics;
