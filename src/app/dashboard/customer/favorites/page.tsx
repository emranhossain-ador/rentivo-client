
import {
    Search,
    ArrowUpDown,
    Heart,
} from "lucide-react";
import EquimentTable from "./SavedEquimentTable";
import PageHeading from "@/components/dashboard/PageHeading";


const FavoritesPage = () => {

    return (
        <main className="bg-background space-y-8 md:space-y-10">
            {/* Page heading */}
            <PageHeading
                Icon={Heart}
                title="Favorites"
                subTitle="View, manage and book your favorites equipment."
            />

            {/* Main table card */}
            <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">

                {/* Table heading */}
                <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                    <div>
                        <h2 className="text-base font-bold">
                            All favorites equipment
                        </h2>
                        <p className="mt-1 text-xs text-muted-foreground">
                            View and manage your favorites equipment.
                        </p>
                    </div>

                </div>

                {/* Filters */}
                <div className="space-y-3 border-b border-border p-4">

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

                        {/* Search */}
                        <div className="relative sm:col-span-2 lg:col-span-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <input
                                placeholder="Search equipment or ID..."
                                className="h-10 w-full rounded-xl border border-input bg-background pl-9 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/10"
                            />
                        </div>

                        {/* Sorting */}
                        <div className="relative">
                            <ArrowUpDown className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <select
                                className="h-10 w-full appearance-none rounded-xl border border-input bg-background pl-9 pr-3 text-sm outline-none focus:border-brand"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                </div>

                <EquimentTable />

            </section>

            <p className="text-center text-[11px] text-muted-foreground">
                Showing rental history for your account.
            </p>
        </main>
    );
}

export default FavoritesPage;

