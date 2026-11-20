import { Calendar, CreditCard, Crown, Eye, Package, Settings, UserRound } from "lucide-react";
import Image from "next/image";

const RentalCard = () => {
    return (
        <article className="group min-w-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
            <div className="relative h-40 overflow-hidden bg-muted">
                <Image
                    src={'https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=900&q=85'}
                    alt={'rental.equipment'}
                    width={100}
                    height={100}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute right-3 top-3">
                    Pending
                </div>
            </div>

            <div className="space-y-3 p-4">
                <div className="grid grid-cols-2 gap-3 border-b border-border pb-3">
                    <div className="flex min-w-0 items-start gap-2">
                        <span className="rounded-full bg-violet-100 p-1.5 text-violet-600">
                            <UserRound size={14} />
                        </span>
                        <div className="min-w-0">
                            <p className="text-[11px] text-muted-foreground">Customer</p>
                            <p className="truncate text-xs font-semibold text-foreground">
                                {'Emran'}
                            </p>
                        </div>
                    </div>
                    <div className="flex min-w-0 items-start gap-2 border-l border-border pl-3">
                        <span className="rounded-full bg-orange-100 p-1.5 text-orange-600">
                            <Crown size={14} />
                        </span>
                        <div className="min-w-0">
                            <p className="text-[11px] text-muted-foreground">Owner</p>
                            <p className="truncate text-xs font-semibold text-foreground">
                                {'Sohag'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-2">
                    <Package size={16} className="shrink-0 text-primary" />
                    <p className="truncate text-sm font-semibold text-foreground">
                        {'category'}
                    </p>
                </div>

                <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2.5">
                        <Calendar size={16} className="mt-0.5 shrink-0 text-primary" />
                        <div>
                            <p className="text-xs font-medium text-foreground">
                                10 nov 2026 - 12 nov 2026
                            </p>
                            <p className="text-xs text-muted-foreground">
                                7 Days
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <CreditCard size={16} className="shrink-0 text-primary" />
                        <p className="text-sm font-medium text-foreground">
                            Amount: <span className="font-bold">৳400.00</span>
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    Paid
                    Rending
                </div>

                <div className="grid grid-cols-[1fr_1fr] gap-2 border-t border-border pt-3">
                    <button
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-primary/30 px-2 py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
                    >
                        <Eye size={15} /> View
                    </button>
                    <button
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-primary/30 px-2 py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
                    >
                        <Settings size={15} /> Manage
                    </button>
                </div>
            </div>
        </article>
    )
}

export default RentalCard;
