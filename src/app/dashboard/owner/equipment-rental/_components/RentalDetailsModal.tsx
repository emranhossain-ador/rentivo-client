
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import StatusBadge from "@/components/shared/StatusBadge";
import { formatDate } from "@/lib/formatDate";
import { formatPrice } from "@/lib/formatPrice";
import { BookingType } from "@/lib/type/booking";
import { Eye, CheckCircle2, Clock, CalendarDays, UserRound, Package, MapPin } from "lucide-react";
import Image from "next/image";


const RentalDetailsModal = ({ rental }: { rental: BookingType }) => {

    return (
        <>

            <Dialog>
                <DialogTrigger
                    render={
                        <button
                            type="button"
                            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-brand/30 px-4 py-3 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white"
                        />
                    }
                >
                    <Eye size={16} />
                    View Rental Details
                </DialogTrigger>

                <DialogContent className="flex max-h-[90dvh] w-[calc(100%-1rem)] max-w-lg! flex-col gap-0 overflow-hidden rounded-2xl border-border bg-card p-0 sm:w-full">

                    {/* Header */}
                    <DialogHeader className="border-b border-border px-5 py-4 text-left sm:px-6">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <DialogTitle className="text-xl font-bold">
                                    Rental Details
                                </DialogTitle>

                                <DialogDescription className="mt-1 flex items-center gap-1.5 text-xs">
                                    <CalendarDays size={13} />
                                    Booking Date: {formatDate(rental.createdAt)}
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    {/* Scrollable Content */}
                    <div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-6 scrollbar-thin scrollbar-thumb-background">

                        {/* Equipment Image */}
                        <div className="relative h-48 w-full overflow-hidden rounded-xl bg-muted">
                            {rental.equipment?.images?.[0] && (
                                <Image
                                    src={rental.equipment.images[0]}
                                    alt={rental.equipment.equipmentName}
                                    fill
                                    sizes="(max-width: 640px) 100vw, 500px"
                                    className="object-cover"
                                />
                            )}
                        </div>

                        {/* Customer Information */}
                        <section>
                            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
                                <UserRound size={17} className="text-brand" />
                                Customer Information
                            </h3>

                            <div className="rounded-xl border border-border bg-muted/30 p-4">
                                <p className="text-sm font-semibold text-foreground">
                                    {rental.customer?.name || "N/A"}
                                </p>

                                <p className="mt-1 text-xs text-muted-foreground">
                                    {rental.customer?.email || "No email available"}
                                </p>

                                <p className="mt-1 text-xs text-muted-foreground">
                                    Contact: {rental.contactNumber || "N/A"}
                                </p>
                            </div>
                        </section>

                        {/* Equipment Information */}
                        <section>
                            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
                                <Package size={17} className="text-brand" />
                                Equipment Information
                            </h3>

                            <div className="rounded-xl border border-border bg-muted/30 p-4">
                                <p className="text-sm font-semibold text-foreground">
                                    {rental.equipment?.equipmentName || rental.equipmentName}
                                </p>

                                <p className="mt-1 text-xs text-muted-foreground">
                                    {rental.equipment?.categoryName || "N/A"}
                                </p>

                                <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <MapPin size={13} />
                                    {rental.equipment?.location || "N/A"}
                                </p>
                            </div>
                        </section>

                        {/* Rental Information */}
                        <section>
                            <h3 className="mb-3 text-sm font-bold text-foreground">
                                Rental Information
                            </h3>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-xl border border-border p-3">
                                    <p className="text-xs text-muted-foreground">
                                        Start Date
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-foreground">
                                        {formatDate(rental.startDate)}
                                    </p>
                                </div>

                                <div className="rounded-xl border border-border p-3">
                                    <p className="text-xs text-muted-foreground">
                                        End Date
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-foreground">
                                        {formatDate(rental.endDate)}
                                    </p>
                                </div>

                                <div className="rounded-xl border border-border p-3">
                                    <p className="text-xs text-muted-foreground">
                                        Duration
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-foreground">
                                        {rental.rentalDays} Days
                                    </p>
                                </div>

                                <div className="rounded-xl border border-border p-3">
                                    <p className="text-xs text-muted-foreground">
                                        Quantity
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-foreground">
                                        {rental.quantity} Units
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Delivery Address */}
                        <section>
                            <h3 className="mb-2 text-sm font-bold text-foreground">
                                Delivery Address
                            </h3>

                            <p className="rounded-xl border border-border bg-muted/30 p-3 text-sm text-muted-foreground">
                                {rental.deliveryAddress || "N/A"}
                            </p>
                        </section>

                        {/* Notes */}
                        {rental.notes && (
                            <section>
                                <h3 className="mb-2 text-sm font-bold text-foreground">
                                    Additional Notes
                                </h3>

                                <p className="rounded-xl border border-border bg-muted/30 p-3 text-sm text-muted-foreground">
                                    {rental.notes}
                                </p>
                            </section>
                        )}

                        {/* Total Amount */}
                        <div className="flex items-center justify-between rounded-xl border border-brand/20 bg-brand/5 p-4">
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Total Booking Amount
                                </p>
                                <p className="mt-1 text-xl font-bold text-brand">
                                    ৳{formatPrice(rental.totalAmount)}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-xs text-muted-foreground">
                                    Rental Type
                                </p>
                                <p className="mt-1 text-sm font-semibold capitalize text-foreground">
                                    {rental.rentalType}
                                </p>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="grid grid-cols-2 gap-3 border-t border-border pt-4">
                            <div>
                                <p className="mb-2 text-xs text-muted-foreground">
                                    Payment Status
                                </p>
                                <PaymentStatusBadge
                                    status={rental.paymentStatus as "pending" | "paid"}
                                />
                            </div>

                            <div>
                                <p className="mb-2 text-xs text-muted-foreground">
                                    Booking Status
                                </p>
                                <StatusBadge status={rental.status} />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-border p-4 sm:px-6">
                        <DialogClose
                            render={
                                <button
                                    type="button"
                                    className="w-full cursor-pointer rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                                />
                            }
                        >
                            Close Details
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
        </>

    )
}


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

export default RentalDetailsModal;