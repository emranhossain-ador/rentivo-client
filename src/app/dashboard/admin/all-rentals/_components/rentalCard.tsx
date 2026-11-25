"use client"
import { BookingType } from "@/lib/type/booking";
import {
    Calendar,
    CreditCard,
    Crown,
    Package,
    UserRound,
} from "lucide-react";
import Image from "next/image";
import RentalViewDialog from "./RentalViewDialog";
import { formatDate } from "@/lib/formatDate";
import { formatAmount } from "@/components/PriceFormatAmount";
import RentalManageDialog from "./RentalManageDialog";
import { toast } from "react-toastify";
import { updateBookingByAdmin } from "@/lib/actions/booking";
import { useState } from "react";

type RentalCardProps = {
    rental: BookingType & {
        owner?: {
            _id: string;
            name: string;
            email: string;
            image?: string;
        };
    };
};



const RentalCard = ({ rental }: RentalCardProps) => {
    const equipmentImage =
        rental.equipment?.images?.[0] ||
        "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=900&q=85";

    const bookingStatus = rental.status;
    const paymentStatus = rental.paymentStatus;

    const statusStyle: Record<string, string> = {
        pending: "bg-amber-500 text-white ",
        confirmed: "bg-emerald-500 text-white ",
        completed: "bg-blue-500 text-white ",
        cancelled: "bg-red-500 text-white ",
        paid: "bg-emerald-500 text-white ",
        failed: "bg-red-500 text-white ",
        refunded: "bg-purple-500 text-white ",
    };


    const handleUpdateBooking = async (
        bookingId: string,
        data: { status: string; paymentStatus: string }
    ) => {
        const response = await updateBookingByAdmin(bookingId, data);

        if (response.success) {
            toast.success("Booking updated successfully");
        } else {
            toast.error(response.message)
        }

    };


    return (
        <article className="group min-w-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
            {/* Equipment Image */}
            <div className="relative h-40 overflow-hidden bg-muted">
                <Image
                    src={equipmentImage}
                    alt={rental.equipmentName}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute right-3 top-3">
                    <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyle[bookingStatus] || "bg-muted text-foreground"
                            }`}
                    >
                        {bookingStatus}
                    </span>
                </div>
            </div>

            <div className="space-y-3 p-4">
                {/* Customer & Owner */}
                <div className="grid grid-cols-2 gap-3 border-b border-border pb-3">
                    <div className="flex min-w-0 items-start gap-2">
                        <span className="rounded-full bg-violet-600/10 size-8 flex items-center justify-center text-violet-600">
                            <UserRound size={15} />
                        </span>

                        <div className="min-w-0">
                            <p className="text-[11px] text-muted-foreground">Customer</p>
                            <p className="truncate text-xs font-semibold text-foreground">
                                {rental.customer?.name || "Unknown"}
                            </p>
                            <p className="truncate text-[10px] text-muted-foreground">
                                {rental.customer?.email}
                            </p>
                        </div>
                    </div>

                    <div className="flex min-w-0 items-start gap-2 border-l border-border pl-3">
                        <span className="rounded-full size-8 bg-orange-600/10 flex items-center justify-center stroke-0 text-orange-600">
                            <Crown size={15} />
                        </span>

                        <div className="min-w-0">
                            <p className="text-[11px] text-muted-foreground">Owner</p>
                            <p className="truncate text-xs font-semibold text-foreground">
                                {rental.owner?.name || "Unknown"}
                            </p>
                            <p className="truncate text-[10px] text-muted-foreground">
                                {rental.owner?.email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Equipment */}
                <div className="flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-2">
                    <Package size={16} className="shrink-0 text-brand" />

                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">
                            {rental.equipmentName}
                        </p>
                        <p className="truncate text-[11px] text-muted-foreground">
                            {rental.equipment?.categoryName || "Equipment"} · Qty:{" "}
                            {rental.quantity}
                        </p>
                    </div>
                </div>

                {/* Rental Details */}
                <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2.5">
                        <Calendar size={16} className="mt-0.5 shrink-0 text-primary" />

                        <div>
                            <p className="text-xs font-medium text-foreground">
                                {formatDate(rental.startDate)} - {formatDate(rental.endDate)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {rental.rentalDays} Days · {rental.rentalType}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <CreditCard size={16} className="shrink-0 text-primary" />

                        <p className="text-sm font-medium text-foreground">
                            Amount:{" "}
                            <span className="font-bold">
                                ৳ {formatAmount(rental.totalAmount)}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap items-center gap-2">
                    <span
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold capitalize ${statusStyle[paymentStatus] || "bg-muted text-foreground"
                            }`}
                    >
                        Payment: {paymentStatus}
                    </span>

                    <span className="rounded-full bg-muted px-3 py-1 text-[11px] font-semibold text-muted-foreground">
                        Booking: {bookingStatus}
                    </span>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 border-t border-border pt-3">
                    <RentalViewDialog rental={rental} />

                    <RentalManageDialog
                        rental={rental}
                        onUpdate={handleUpdateBooking}
                    />
                </div>
            </div>
        </article>
    );
};

export default RentalCard;
