import { LucideIcon } from "lucide-react";

interface SummaryCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    color: string;
}

const SummaryCard = ({ title, value, icon: Icon, color }: SummaryCardProps) => {
    return (
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`}>
                <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
                <p className="text-xl font-bold">{value}</p>
                <p className="truncate text-xs text-muted-foreground">{title}</p>
            </div>
        </div>
    );
};

export default SummaryCard;