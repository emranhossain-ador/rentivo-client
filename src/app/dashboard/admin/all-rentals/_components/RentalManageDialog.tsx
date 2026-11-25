
"use client";

import { useState } from "react";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Settings, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type RentalManageDialogProps = {
    rental: BookingType;
    onUpdate: (
        bookingId: string,
        data: {
            status: string;
            paymentStatus: string;
        }
    ) => Promise<void>;
};

const RentalManageDialog = ({
    rental,
    onUpdate,
}: RentalManageDialogProps) => {
    const [status, setStatus] = useState(rental.status);
    const [paymentStatus, setPaymentStatus] = useState(rental.paymentStatus);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleUpdate = async () => {
        try {
            setLoading(true);

            await onUpdate(rental._id, {
                status,
                paymentStatus,
            });
            setOpen(false);
            router.refresh();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-primary/30 px-2 py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
                    />
                }
            >
                <Settings size={15} /> Manage
            </DialogTrigger>

            <DialogContent className="sm:max-w-md" >
                <DialogHeader>
                    <DialogTitle>Manage Booking</DialogTitle>
                    <DialogDescription>
                        Update booking and payment status.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5">
                    <div className="rounded-xl bg-muted/50 p-4">
                        <p className="text-sm font-semibold">{rental.equipmentName}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Booking ID: {rental._id}
                        </p>
                        <p className="mt-2 text-sm font-bold">
                            Total: ৳{rental.totalAmount}
                        </p>
                    </div>

                    {/* Booking Status */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Booking Status</label>

                        <Select
                            value={status}
                            onValueChange={(value) => {
                                if (value) setStatus(value as typeof status);
                            }}

                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select booking status" />
                            </SelectTrigger>

                            <SelectContent className={'px-2.5! py-2! cursor-pointer'}>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Payment Status */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Payment Status</label>

                        <Select
                            value={paymentStatus}
                            onValueChange={(value) => {
                                if (value) {
                                    setPaymentStatus(value as typeof paymentStatus);
                                }
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select payment status" />
                            </SelectTrigger>

                            <SelectContent className={'px-2.5! py-2! cursor-pointer'}>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="failed">Failed</SelectItem>
                                <SelectItem value="refunded">Refunded</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        className="w-full h-11 cursor-pointer bg-brand! text-white!"
                        onClick={handleUpdate}
                        disabled={
                            loading ||
                            (status === rental.status &&
                                paymentStatus === rental.paymentStatus)
                        }
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 size-4 animate-spin" />
                                Updating...
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default RentalManageDialog;
