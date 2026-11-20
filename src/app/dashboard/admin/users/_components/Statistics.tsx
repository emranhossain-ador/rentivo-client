import { Crown, LucideIcon, ShieldCheck, UserRound, Users } from "lucide-react";

const Statistics = () => {
    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

            <SummaryCard
                label="Total Users"
                value={100}
                icon={Users}
                color="bg-brand/10 text-brand"
            />

            <SummaryCard
                label="Administrators"
                value={4}
                icon={ShieldCheck}
                color="bg-violet-500/10 text-violet-600"
            />

            <SummaryCard
                label="Equipment Owners"
                value={10}
                icon={Crown}
                color="bg-orange-500/10 text-orange-600"
            />

            <SummaryCard
                label="Customers"
                value={50}
                icon={UserRound}
                color="bg-blue-500/10 text-blue-600"
            />
        </div>
    )
};

function SummaryCard({ label, value, icon: Icon, color }: { label: string, value: string | number, color: string, icon: LucideIcon }) {
    return (
        <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-border bg-card p-3.5 shadow-sm sm:p-4">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${color}`}>
                <Icon className="h-5 w-5" />
            </div>

            <div className="min-w-0">
                <p className="text-xl font-bold">{value}</p>
                <p className="truncate text-[11px] text-muted-foreground sm:text-xs">
                    {label}
                </p>
            </div>
        </div>
    );
}

export default Statistics;