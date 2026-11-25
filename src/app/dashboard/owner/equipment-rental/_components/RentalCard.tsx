import StatusBadge from "@/components/shared/StatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/formatDate";
import { formatPrice } from "@/lib/formatPrice";
import { BookingType } from "@/lib/type/booking";
import { Boxes, CalendarDays, CheckCircle2, Clock, CreditCard, Package, Phone, UserRound } from "lucide-react";
import Image from "next/image";
import RentalDetailsModal from "./RentalDetailsModal";

const RentalCard = ({ rental }: { rental: BookingType }) => {

    const customer = rental.customer;
    const equipment = rental.equipment;

    return (
        <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div>
                    <p className="text-[11px] font-medium text-muted-foreground">
                        Booking Date
                    </p>
                    <h3 className="mt-0.5 text-sm font-bold text-foreground">
                        {formatDate(rental.createdAt)}
                    </h3>
                </div>

                <StatusBadge status={rental.status} />
            </div>

            <div className="space-y-4 p-4">
                {/* Customer Information */}
                <div>
                    <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        <UserRound size={15} className="text-primary" />
                        Customer Information
                    </h4>

                    <div className="flex items-center gap-3">

                        <Avatar className="h-11 w-11">
                            <AvatarImage src={customer?.image || undefined} alt={customer?.name} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                                {customer?.name?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                            <h5 className="truncate text-sm font-bold text-foreground">
                                {customer?.name}
                            </h5>
                            <p className="mt-0.5 truncate text-xs text-muted-foreground">
                                {customer?.email}
                            </p>
                        </div>
                    </div>

                    <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone size={13} />
                        {customer?.phoneNumber || "N/A"}
                    </p>
                </div>

                <div className="border-t border-border" />

                {/* Equipment Information */}
                <div>
                    <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        <Package size={15} className="text-primary" />
                        Equipment Information
                    </h4>

                    <div className="flex items-center gap-3">
                        <Image
                            src={equipment?.images?.[0] || "/images/equipment-placeholder.png"}
                            alt={equipment?.equipmentName || "Equipment"}
                            width={100}
                            height={100}
                            className="size-16 shrink-0 rounded-xl object-cover"
                        />

                        <div className="min-w-0">
                            <h5 className="truncate text-sm font-bold text-foreground">
                                {equipment?.equipmentName as string}
                            </h5>
                            <span className="mt-1 inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">
                                {equipment?.categoryName as string}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border" />

                {/* Rental Duration */}
                <div>
                    <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        <CalendarDays size={15} className="text-primary" />
                        Rental Duration
                    </h4>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-xl bg-muted/70 p-3">
                            <p className="text-[10px] text-muted-foreground">Start Date</p>
                            <p className="mt-1 text-xs font-bold text-foreground">
                                {formatDate(rental.startDate)}
                            </p>
                        </div>

                        <div className="rounded-xl bg-muted/70 p-3">
                            <p className="text-[10px] text-muted-foreground">End Date</p>
                            <p className="mt-1 text-xs font-bold text-foreground">
                                {formatDate(rental.endDate)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quantity & Amount */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-border p-3">
                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Boxes size={14} />
                            Required Quantity
                        </p>
                        <h4 className="mt-1 text-lg font-bold text-foreground">
                            {rental.quantity} Units
                        </h4>
                    </div>

                    <div className="rounded-xl border border-primary/20 bg-primary/4 p-3">
                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <CreditCard size={14} />
                            Booking Amount
                        </p>
                        <h4 className="mt-1 text-lg font-bold text-primary">
                            ৳{formatPrice(rental.totalAmount)}
                        </h4>
                    </div>
                </div>

                {/* Payment Status */}
                <div className="flex items-center justify-between gap-2 rounded-xl bg-muted/60 p-3">
                    <span className="text-xs font-semibold text-muted-foreground">
                        Payment Status
                    </span>
                    <PaymentStatusBadge status={rental.paymentStatus as "pending" | "paid"} />
                </div>

                {/* View Details */}
                <RentalDetailsModal rental={rental} />
            </div>
        </article>
    )
};


const PaymentStatusBadge = ({ status }: { status: "pending" | "paid" }) => {
    const isPaid = status === "paid";

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${isPaid
                ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
                : "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400"
                }`}
        >
            {isPaid ? (
                <CheckCircle2 className="size-3.5" />
            ) : (
                <Clock className="size-3.5" />
            )}

            {status}
        </span>
    );
};


export default RentalCard;