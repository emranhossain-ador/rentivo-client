import { Search } from "lucide-react";

const AllRentalsFilter = () => {
    return (
        <section className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm xl:flex-row xl:items-center">
            <div className="relative min-w-0 flex-1">
                <Search
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                    placeholder="Search customer, owner or equipment..."
                    className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/10"
                />
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:flex">
                <select
                    className="h-12 min-w-0 rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-brand"
                >
                    <option>All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Rejected">Rejected</option>
                </select>

                <select
                    className="h-12 min-w-0 rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-brand"
                >
                    <option>All Payment</option>
                    <option>Paid</option>
                    <option>Unpaid</option>
                </select>

                <select
                    className="h-12 min-w-0 rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-brand"
                >
                    <option>All Duration</option>
                    <option>1-3 Days</option>
                    <option>4-7 Days</option>
                    <option>7+ Days</option>
                </select>
            </div>
        </section>
    )
};

export default AllRentalsFilter;