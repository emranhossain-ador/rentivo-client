
import {
    Search,
    Package,
    CheckCircle2,
    Clock,
    XCircle
} from "lucide-react";
import PageHeading from "@/components/dashboard/PageHeading";
import SummaryCard from "@/components/dashboard/SummaryCard";
import EquipmentTable from "./_components/EquipmentTable";





export default function AllEquipment() {

    return (
        <main className="bg-background space-y-6">

            {/* Heading */}
            <PageHeading
                Icon={Package}
                title="All Equipment"
                subTitle="Manage, review and monitor all listed equipment."
            />

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                <SummaryCard
                    title="Total Equipment"
                    value={5}
                    icon={Package}
                    color="bg-brand/10 text-brand"
                />
                <SummaryCard
                    title="Pending Approval"
                    value={5}
                    icon={Clock}
                    color="bg-amber-500/10 text-amber-600"
                />
                <SummaryCard
                    title="Approved"
                    value={10}
                    icon={CheckCircle2}
                    color="bg-emerald-500/10 text-emerald-600"
                />
                <SummaryCard
                    title="Rejected"
                    value={3}
                    icon={XCircle}
                    color="bg-red-500/10 text-red-600"
                />
            </div>

            {/* Equipment Table */}
            <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">

                {/* Header */}
                <div className="flex flex-col justify-between gap-2 border-b border-border p-4 sm:flex-row sm:items-center sm:px-5">
                    <div>
                        <h2 className="text-base font-bold">Equipment Listings</h2>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Review and manage equipment submitted by owners.
                        </p>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="grid grid-cols-1 gap-3 border-b border-border p-4 sm:grid-cols-2 xl:grid-cols-[1fr_170px_180px_170px]">

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Search equipment or owner..."
                            className="h-11 w-full rounded-xl border border-input bg-background pl-9 pr-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
                        />
                    </div>

                    <select
                        className="h-11 rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-brand"
                    >
                        <option value="All">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>

                    <select
                        className="h-11 rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-brand"
                    >
                        <option value="All">All Categories</option>
                        <option value="Construction">Construction</option>
                        <option value="Photography">Photography</option>
                        <option value="Electronics">Electronics</option>
                    </select>

                    <select
                        className="h-11 rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-brand"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="price-high">Price: High-Low</option>
                        <option value="price-low">Price: Low-High</option>
                        <option value="name">Name A-Z</option>
                    </select>
                </div>

                <EquipmentTable />

            </section>

        </main>
    );
}
