
"use client";

import { BookingType } from "@/lib/type/booking";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Calendar,
    CreditCard,
    MapPin,
    Package,
    UserRound,
    Crown,
    Phone,
} from "lucide-react";
import { formatAmount } from "@/components/PriceFormatAmount";

type RentalViewDialogProps = {
    rental: BookingType & {
        owner?: {
            name: string;
            email: string;
        };
    };
};

const Detail = ({
    label,
    value,
}: {
    label: string;
    value?: string | number;
}) => (
    <div className="space-y-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="break-words text-sm font-semibold text-foreground">
            {value || "N/A"}
        </p>
    </div>
);


const RentalViewDialog = ({ rental }: RentalViewDialogProps) => {
    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });


    return (
        <Dialog>
            <DialogTrigger
                render={
                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-primary/30 px-2 py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
                    />
                }
            >
                <UserRound size={15} /> View
            </DialogTrigger>

            <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-2xl scrollbar-thin scrollbar-thumb-background">
                <DialogHeader>
                    <DialogTitle>Booking Details</DialogTitle>
                    <DialogDescription>
                        Complete information about this rental booking.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5">
                    {/* Booking Information */}
                    <section className="rounded-xl border border-border p-4">
                        <h3 className="mb-3 flex items-center gap-2 text-sm font-bold">
                            <Calendar size={17} className="text-primary" />
                            Booking Information
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <Detail label="Booking ID" value={rental._id} />
                            <Detail label="Booking Status" value={rental.status} />
                            <Detail label="Start Date" value={formatDate(rental.startDate)} />
                            <Detail label="End Date" value={formatDate(rental.endDate)} />
                            <Detail label="Rental Duration" value={`${rental.rentalDays} Days`} />
                            <Detail label="Quantity" value={rental.quantity} />
                        </div>
                    </section>

                    {/* Customer & Owner */}
                    <section className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl border border-border p-4">
                            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold">
                                <UserRound size={17} className="text-primary" />
                                Customer
                            </h3>
                            <Detail label="Name" value={rental.customer?.name} />
                            <div className="mt-3">
                                <Detail label="Email" value={rental.customer?.email} />
                            </div>
                            <div className="mt-3">
                                <Detail label="Contact" value={rental.contactNumber} />
                            </div>
                        </div>

                        <div className="rounded-xl border border-border p-4">
                            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold">
                                <Crown size={17} className="text-primary" />
                                Equipment Owner
                            </h3>
                            <Detail label="Name" value={rental.owner?.name} />
                            <div className="mt-3">
                                <Detail label="Email" value={rental.owner?.email} />
                            </div>
                        </div>
                    </section>

                    {/* Equipment */}
                    <section className="rounded-xl border border-border p-4">
                        <h3 className="mb-3 flex items-center gap-2 text-sm font-bold">
                            <Package size={17} className="text-primary" />
                            Equipment Information
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <Detail label="Equipment" value={rental.equipmentName} />
                            <Detail label="Category" value={rental.equipment?.categoryName} />
                            <Detail label="Rental Type" value={rental.rentalType} />
                            <Detail label="Rental Price" value={`৳${rental.rentalPrice}`} />
                        </div>
                    </section>

                    {/* Delivery */}
                    <section className="rounded-xl border border-border p-4">
                        <h3 className="mb-3 flex items-center gap-2 text-sm font-bold">
                            <MapPin size={17} className="text-primary" />
                            Delivery Information
                        </h3>

                        <Detail label="Delivery Address" value={rental.deliveryAddress} />
                        <div className="mt-3">
                            <Detail label="Contact Number" value={rental.contactNumber} />
                        </div>
                        {rental.notes && (
                            <div className="mt-3">
                                <Detail label="Additional Notes" value={rental.notes} />
                            </div>
                        )}
                    </section>

                    {/* Payment */}
                    <section className="rounded-xl border border-border p-4">
                        <h3 className="mb-3 flex items-center gap-2 text-sm font-bold">
                            <CreditCard size={17} className="text-primary" />
                            Payment Information
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <Detail label="Total Amount" value={`৳${formatAmount(rental.totalAmount)}`} />
                            <Detail label="Payment Status" value={rental.paymentStatus} />
                            {/* <Detail
                                label="Transaction ID"
                                value={'KJDF89345F'}
                            />
                            <Detail
                                label="Paid At"
                                value={"Not Paid"
                                }
                            /> */}
                        </div>
                    </section>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default RentalViewDialog;
