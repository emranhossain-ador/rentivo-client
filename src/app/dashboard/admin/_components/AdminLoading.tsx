
import {
    ShieldCheck,
    LoaderCircle,
    LayoutDashboard,
} from "lucide-react";

export default function AdminLoading() {
    return (
        <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
            <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 text-center shadow-sm">

                {/* Icon */}
                <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
                    <ShieldCheck className="h-10 w-10 text-primary" />

                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                    </span>
                </div>

                {/* Heading */}
                <div className="mb-6 space-y-2">
                    <div className="flex items-center justify-center gap-2">
                        <LayoutDashboard className="h-4 w-4 text-primary" />
                        <p className="text-sm font-semibold tracking-wide text-primary">
                            RENTIVO ADMIN
                        </p>
                    </div>

                    <h2 className="text-xl font-bold text-foreground">
                        Preparing Your Dashboard
                    </h2>

                    <p className="text-sm leading-6 text-muted-foreground">
                        Please wait while we securely load your dashboard and account
                        information.
                    </p>
                </div>

                {/* Loading Bar */}
                <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-1/3 animate-pulse rounded-full bg-primary" />
                </div>

                <p className="text-xs font-medium text-muted-foreground">
                    Loading dashboard...
                </p>
            </div>
        </div>
    );
}
