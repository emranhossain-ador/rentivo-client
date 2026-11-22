
import { cn } from "@/lib/utils";
import {
    CheckCircle2,
    Clock3,
    XCircle,
    PlayCircle,
    CheckCheck,
    Ban,
    PackageCheck,
    PackageX,
    CircleDot,
    AlertCircle,
} from "lucide-react";

export type StatusType =
    | "approved"
    | "pending"
    | "rejected"
    | "active"
    | "completed"
    | "cancelled"
    | "available"
    | "unavailable"
    | "confirmed"
    | "failed"
    | string;

interface StatusBadgeProps {
    status: StatusType;
    className?: string;
}

const statusConfig: Record<
    string,
    {
        label: string;
        icon: React.ElementType;
        className: string;
    }
> = {
    approved: {
        label: "Approved",
        icon: CheckCircle2,
        className:
            "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
    },
    pending: {
        label: "Pending",
        icon: Clock3,
        className:
            "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
    },
    rejected: {
        label: "Rejected",
        icon: XCircle,
        className:
            "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400",
    },
    active: {
        label: "Active",
        icon: PlayCircle,
        className:
            "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400",
    },
    completed: {
        label: "Completed",
        icon: CheckCheck,
        className:
            "bg-teal-500/10 text-teal-600 border-teal-500/20 dark:text-teal-400",
    },
    cancelled: {
        label: "Cancelled",
        icon: Ban,
        className:
            "bg-slate-500/10 text-slate-600 border-slate-500/20 dark:text-slate-400",
    },
    available: {
        label: "Available",
        icon: PackageCheck,
        className:
            "bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400",
    },
    unavailable: {
        label: "Unavailable",
        icon: PackageX,
        className:
            "bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400",
    },
    confirmed: {
        label: "Confirmed",
        icon: CheckCircle2,
        className:
            "bg-indigo-500/10 text-indigo-600 border-indigo-500/20 dark:text-indigo-400",
    },
    failed: {
        label: "Failed",
        icon: AlertCircle,
        className:
            "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400",
    },
};

export default function StatusBadge({
    status,
    className,
}: StatusBadgeProps) {
    const normalizedStatus = status?.toLowerCase() || "unknown";

    const config = statusConfig[normalizedStatus] || {
        label: normalizedStatus.replace(/[-_]/g, " "),
        icon: CircleDot,
        className:
            "bg-muted text-muted-foreground border-border",
    };

    const Icon = config.icon;

    return (
        <span
            className={cn(
                "inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5",
                "text-xs font-semibold capitalize tracking-wide",
                "transition-colors duration-200",
                config.className,
                className
            )}
        >
            <Icon className="h-3.5 w-3.5 shrink-0" />
            {config.label}
        </span>
    );
}
