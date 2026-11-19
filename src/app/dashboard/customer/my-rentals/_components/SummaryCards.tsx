import { CalendarCheck, LucideIcon, Package, Wallet } from "lucide-react"

const SummaryCards = () => {
    return (
        <div className="grid grid-cols-1 gap-3 min-[450px]:grid-cols-3">
            <Summary
                Icon={Package}
                label="Total Rentals"
                value={7}
                color="text-brand bg-brand/10"
            />

            <Summary
                Icon={CalendarCheck}
                label="Active Bookings"
                value={5}
                color="text-emerald-600 bg-emerald-500/10"
            />

            <Summary
                Icon={Wallet}
                label="Total Paid"
                value={1000}
                color="text-blue-600 bg-blue-500/10"
            />

        </div>
    )
}

export default SummaryCards;


function Summary({ label, value, color, Icon }: { label: string, value: string | number, color: string, Icon: LucideIcon }) {
    return (
        <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:shadow-md sm:p-5">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`}>
                <Icon className="h-5 w-5" />
            </div>

            <div className="min-w-0">
                <p className="truncate text-lg font-bold sm:text-xl">
                    {value}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                    {label}
                </p>
            </div>
        </div>
    )
}