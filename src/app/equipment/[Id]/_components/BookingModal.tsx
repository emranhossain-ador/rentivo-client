
"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
    CalendarDays,
    MapPin,
    Phone,
    Package,
    FileText,
    Loader2,
    ArrowRight,
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import Label from "@/components/ui/Label";
import Image from "next/image";
import { EquipmentType } from "@/lib/type/equipmentType";
import { formatPrice } from "@/lib/formatPrice";
import { useSession } from "@/lib/auth-client";
import { checkAvailableDate, createBooking } from "@/lib/actions/booking";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

type BookingModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    equipment: EquipmentType
};

/** A confirmed & paid booking returned by `checkAvailableDate`. */
type BookedRange = {
    startDate?: string;
    endDate?: string;
    quantity?: number | string;
};

/** Local day key (`YYYY-MM-DD`) so dates never shift because of timezones. */
const toDayKey = (date: Date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const parseDayKey = (dayKey: string) => new Date(`${dayKey}T00:00:00`);

/** Units of this equipment already booked on the given day. */

const bookedQuantityOn = (
    ranges: BookedRange[],
    dayKey: string
  ) =>
    ranges.reduce((total, range) => {
      if (!range.startDate || !range.endDate) return total;
  
      const isBooked =
        dayKey >= range.startDate &&
        dayKey < range.endDate;
  
      return isBooked
        ? total + (Number(range.quantity) || 0)
        : total;
    }, 0);
  

/** Units still free on the given day. */
const availableQuantityOn = (ranges: BookedRange[], dayKey: string, totalUnits: number) =>
    Math.max(0, totalUnits - bookedQuantityOn(ranges, dayKey));

/**
 * Walks the selected range and returns the first day that cannot cover
 * `quantity` units, or `null` when the whole range is bookable.
 */

const findUnavailableDay = (
    ranges: BookedRange[],
    startKey: string,
    endKey: string,
    quantity: number,
    totalUnits: number
  ) => {
    if (!startKey || !endKey || startKey >= endKey) {
      return null;
    }
  
    const cursor = parseDayKey(startKey);
    const last = parseDayKey(endKey);
  
    while (cursor < last) {
      const dayKey = toDayKey(cursor);
  
      const available = availableQuantityOn(
        ranges,
        dayKey,
        totalUnits
      );
  
      if (available < quantity) {
        return dayKey;
      }
  
      cursor.setDate(cursor.getDate() + 1);
    }
  
    return null;
  };
  


const calculateRentalAmount = (
    rentalDays: number,
    quantity: number,
    rentalPrice: number,
    rentalType: string
) => {
    let rentalCost = 0;

    switch (rentalType.toLowerCase()) {
        case "daily":
            rentalCost = rentalDays * rentalPrice;
            break;

        case "weekly":
            rentalCost = Math.ceil(rentalDays / 7) * rentalPrice;
            break;

        case "monthly":
            rentalCost = Math.ceil(rentalDays / 30) * rentalPrice;
            break;

        default:
            rentalCost = rentalDays * rentalPrice;
    }

    return rentalCost * quantity;
};



export default function BookingModal({ equipment, onOpenChange, open }: BookingModalProps) {

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [contactNumber, setContactNumber] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const session = useSession();
    const user = session?.data?.user;

    // Availability of this equipment, loaded from `checkAvailableDate`
    const [bookedRanges, setBookedRanges] = useState<BookedRange[]>([]);
    const [availabilityError, setAvailabilityError] = useState("");
    const [loadedFor, setLoadedFor] = useState("");
    const [startPickerOpen, setStartPickerOpen] = useState(false);
    const [endPickerOpen, setEndPickerOpen] = useState(false);

    const equipmentId = equipment._id;
    const checkingAvailability = !!open && !!equipmentId && loadedFor !== equipmentId;


const isEndDateDisabled = (date: Date) => {
    const dayKey = toDayKey(date);
  
    if (dayKey < todayKey || dayKey <= startDate) {
      return true;
    }
  
    if (!startDate) return false;
  
    return (
      findUnavailableDay(
        bookedRanges,
        startDate,
        dayKey,
        requestedQuantity,
        equipment.quantity
      ) !== null
    );
  };
  

    // Fetch the already booked dates (with quantities) every time the modal opens
    useEffect(() => {
        if (!open || !equipmentId || loadedFor === equipmentId) return;

        let cancelled = false;

        checkAvailableDate(equipmentId)
            .then((result) => {
                if (cancelled) return;

                if (result?.success && Array.isArray(result.data)) {
                    setBookedRanges(result.data);
                } else {
                    setBookedRanges([]);
                    setAvailabilityError(result?.message || "Unable to check availability.");
                }

                setLoadedFor(equipmentId);
            })
            .catch(() => {
                if (cancelled) return;

                setBookedRanges([]);
                setAvailabilityError("Unable to check availability.");
                setLoadedFor(equipmentId);
            });

        return () => {
            cancelled = true;
        };
    }, [open, equipmentId, loadedFor]);

    // Start the next open with a fresh availability check
    const handleOpenChange = (nextOpen: boolean) => {
        if (!nextOpen) {
            setBookedRanges([]);
            setAvailabilityError("");
            setLoadedFor("");
            setStartPickerOpen(false);
            setEndPickerOpen(false);
        }

        onOpenChange(nextOpen);
    };

    // Retry button: forget the last result so the effect fetches again
    const retryAvailabilityCheck = () => {
        setAvailabilityError("");
        setLoadedFor("");
    };

    const todayKey = toDayKey(new Date());
    const requestedQuantity = Number(quantity) || 1;

    /** A day is hidden when it is in the past or not enough units are left. */
    const isDayDisabled = (date: Date) => {
        const dayKey = toDayKey(date);

        return (
            dayKey < todayKey ||
            availableQuantityOn(bookedRanges, dayKey, equipment.quantity) < requestedQuantity
        );
    };

    // First day of the selected range that cannot cover the requested quantity
    const conflictDay = useMemo(
        () =>
            findUnavailableDay(
                bookedRanges,
                startDate,
                endDate,
                requestedQuantity,
                equipment.quantity
            ),
        [bookedRanges, startDate, endDate, requestedQuantity, equipment.quantity]
    );

    const conflictAvailable =
        conflictDay !== null
            ? availableQuantityOn(bookedRanges, conflictDay, equipment.quantity)
            : 0;

    const rentalDays = useMemo(() => {
        if (!startDate || !endDate) return 0;

        const start = new Date(`${startDate}T00:00:00`);
        const end = new Date(`${endDate}T00:00:00`);

        const difference = end.getTime() - start.getTime();

        return difference > 0
            ? Math.ceil(difference / (1000 * 60 * 60 * 24))
            : 0;
    }, [startDate, endDate]);


    const totalAmount = calculateRentalAmount(rentalDays, quantity, equipment.rentalPrice, equipment.rentalType);



    const handleBooking = async () => {
        // Required field validation
        if (!startDate || !endDate) {
            toast.error("Please select rental start and end dates.");
            return;
        }

        // Date validation
        const start = new Date(startDate);
        const end = new Date(endDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (start < today) {
            toast.error("Rental start date cannot be in the past.");
            return;
        }

        if (end <= start) {
            toast.error("End date must be after the start date.");
            return;
        }

        // Rental duration validation
        if (rentalDays <= 0) {
            toast.error("Please select a valid rental duration.");
            return;
        }

        // Quantity validation
        if (!Number.isInteger(Number(quantity)) || Number(quantity) <= 0) {
            toast.error("Please enter a valid quantity.");
            return;
        }

        if (Number(quantity) > equipment.quantity) {
            toast.error(`Only ${equipment.quantity} units are available.`);
            return;
        }

        // Contact number validation
        const phoneRegex = /^(?:\+8801|01)[3-9]\d{8}$/;

        if (!contactNumber.trim()) {
            toast.error("Contact number is required.");
            return;
        }

        if (!phoneRegex.test(contactNumber.trim())) {
            toast.error("Please enter a valid Bangladeshi phone number.");
            return;
        }

        // Delivery address validation
        if (!deliveryAddress.trim()) {
            toast.error("Delivery address is required.");
            return;
        }

        if (deliveryAddress.trim().length < 10) {
            toast.error("Delivery address must be at least 10 characters.");
            return;
        }

        // Price validation
        if (totalAmount <= 0 || !Number.isFinite(totalAmount)) {
            toast.error("Invalid rental amount.");
            return;
        }

        setLoading(true);

        // Re-check the booked dates right before booking so nobody can
        // reserve equipment that was taken while the modal was open.
        if (equipmentId) {
            try {
                const availability = await checkAvailableDate(equipmentId);

                if (!availability?.success || !Array.isArray(availability.data)) {
                    setLoading(false);
                    toast.error("Unable to verify availability. Please try again.");
                    return;
                }

                const freshRanges: BookedRange[] = availability.data;
                setBookedRanges(freshRanges);

                const unavailableDay = findUnavailableDay(
                    freshRanges,
                    startDate,
                    endDate,
                    Number(quantity),
                    equipment.quantity
                );

                if (unavailableDay) {
                    setLoading(false);
                    toast.error(
                        `Selected dates are no longer available for ${quantity} unit(s). Please choose different dates.`
                    );
                    return;
                }
            } catch {
                setLoading(false);
                toast.error("Unable to verify availability. Please try again.");
                return;
            }
        }

        const data = {
            equipmentId: equipment._id,
            userId: user?.id,
            startDate,
            endDate,
            quantity: Number(quantity),
            contactNumber: contactNumber.trim(),
            deliveryAddress: deliveryAddress.trim(),
            notes: notes.trim(),
            rentalDays,
            totalAmount,
        };

       
        try {
            const result = await createBooking(data);
        
            if (result.success) {
            toast.success(result.message);
            handleOpenChange(false);
            } else {
            toast.error(result.message);
            }
        } catch (error) {
            console.error("Booking error:", error);
            toast.error("Booking failed. Please try again.");
        } finally {
            setLoading(false);
        }
  
    };



    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="max-h-[92dvh] w-[95vw] max-w-2xl! overflow-y-auto rounded-2xl border-border bg-background p-0 scrollbar-thin scrollbar-thumb-card">

                {/* Header */}
                <div className="border-b border-border px-5 py-5 sm:px-7">
                    <DialogHeader>
                        <div className="mb-2 flex items-center gap-2">
                            <span className="rounded-lg bg-primary/10 p-2 text-primary">
                                <CalendarDays className="h-5 w-5" />
                            </span>
                            <span className="text-sm font-medium text-primary">
                                Rental Booking
                            </span>
                        </div>

                        <DialogTitle className="text-xl font-bold sm:text-2xl">
                            Book Your Equipment
                        </DialogTitle>

                        <DialogDescription className="text-muted-foreground">
                            Complete the details below to continue with your booking.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Equipment Info */}
                    <div className="mt-5 flex items-center gap-4 rounded-xl border border-border bg-muted/40 p-3">
                        {equipment.images[0] ? (
                            <Image
                                src={equipment.images[0]}
                                alt={equipment.equipmentName}
                                width={100}
                                height={100}
                                className="h-16 w-16 rounded-lg object-cover"
                            />
                        ) : (
                            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Package className="h-7 w-7" />
                            </div>
                        )}

                        <div className="min-w-0 flex-1">
                            <h3 className="truncate font-semibold">{equipment.equipmentName}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                ৳{formatPrice(equipment.rentalPrice)} / {equipment.rentalType}
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-xs text-muted-foreground">Available</p>
                            <p className="font-semibold text-foreground">
                                {equipment.quantity} units
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="space-y-6 px-5 py-6 sm:px-7">

                    {/* Rental Dates */}
                    <section>
                        <div className="mb-4 flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-primary" />
                            <h3 className="font-semibold">Rental Duration</h3>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="startDate" title="Rental Start Date" isRequired />
                                <Popover open={startPickerOpen} onOpenChange={setStartPickerOpen}>
                                    <PopoverTrigger
                                        id="startDate"
                                        className="input flex cursor-pointer items-center justify-between gap-2 text-left"
                                    >
                                        <span className={startDate ? "truncate" : "text-muted-foreground/80"}>
                                            {startDate
                                                ? format(parseDayKey(startDate), "dd MMM yyyy")
                                                : "Select a date"}
                                        </span>
                                        <CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground" />
                                    </PopoverTrigger>
                                    <PopoverContent align="start" className="w-auto p-2">
                                        <Calendar
                                            mode="single"
                                            selected={startDate ? parseDayKey(startDate) : undefined}
                                            onSelect={(day) => {
                                                if (!day) return;

                                                const dayKey = toDayKey(day);
                                                setStartDate(dayKey);

                                                if (endDate && dayKey >= endDate) {
                                                    setEndDate("");
                                                }

                                                setStartPickerOpen(false);
                                            }}
                                            disabled={isDayDisabled}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="endDate" title="Rental End Date" isRequired />
                                <Popover open={endPickerOpen} onOpenChange={setEndPickerOpen}>
                                    <PopoverTrigger
                                        id="endDate"
                                        className="input flex cursor-pointer items-center justify-between gap-2 text-left"
                                    >
                                        <span className={endDate ? "truncate" : "text-muted-foreground/80"}>
                                            {endDate
                                                ? format(parseDayKey(endDate), "dd MMM yyyy")
                                                : "Select a date"}
                                        </span>
                                        <CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground" />
                                    </PopoverTrigger>
                                    <PopoverContent align="end" className="w-auto p-2">
                                        <Calendar
                                            mode="single"
                                            selected={endDate ? parseDayKey(endDate) : undefined}
                                            onSelect={(day) => {
                                                if (!day) return;

                                                const dayKey = toDayKey(day);

                                                if (startDate && dayKey <= startDate) {
                                                    toast.error("End date must be after the start date.");
                                                    return;
                                                }

                                                setEndDate(dayKey);
                                                setEndPickerOpen(false);
                                            }}
                                            disabled={isEndDateDisabled}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        {checkingAvailability && (
                            <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Checking availability...
                            </p>
                        )}

                        {availabilityError && (
                            <p role="alert" className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-500">
                                {availabilityError}{" "}
                                <button
                                    type="button"
                                    onClick={retryAvailabilityCheck}
                                    className="font-semibold underline underline-offset-2"
                                >
                                    Retry
                                </button>
                            </p>
                        )}

                        {conflictDay && (
                            <p role="alert" className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-500">
                                Only {conflictAvailable} unit(s) available on{" "}
                                {format(parseDayKey(conflictDay), "dd MMM yyyy")} for your selected
                                quantity. Please change the dates or reduce the quantity.
                            </p>
                        )}

                        {!checkingAvailability && !availabilityError && (
                            <p className="mt-3 text-xs text-muted-foreground">
                                Dates that are already booked for your selected quantity are hidden
                                and cannot be selected.
                            </p>
                        )}

                        {rentalDays > 0 && (
                            <p className="mt-3 text-sm text-primary">
                                <CalendarDays className="mr-1 inline h-4 w-4" />
                                {rentalDays} rental {rentalDays === 1 ? "day" : "days"}
                            </p>
                        )}
                    </section>

                    <div className="border-t border-border" />

                    {/* Quantity */}
                    <section className="space-y-2">
                        <Label htmlFor="quantity" title="Required Quantity" isRequired />

                        <div className="relative">
                            <Package className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                id="quantity"
                                type="number"
                                min={1}
                                max={equipment.quantity}
                                value={quantity}
                                
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                
                                    if (!Number.isInteger(value) || value < 1) {
                                    setQuantity(1);
                                    return;
                                    }
                                
                                    if (value > equipment.quantity) {
                                    toast.error("Requested quantity exceeds total stock.");
                                    return;
                                    }
                                
                                    setQuantity(value);
                                }}
                                
                                className="pl-10! input"
                            />
                        </div>

                        <p className="text-xs text-muted-foreground">
                            Maximum available quantity: {equipment.quantity}
                        </p>
                    </section>

                    <div className="border-t border-border" />

                    {/* Contact Details */}
                    <section className="space-y-4">
                        <h3 className="font-semibold">Contact & Delivery Details</h3>

                        <div className="space-y-2">
                            <Label htmlFor="contactNumber" title="Contact Number" isRequired />
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    id="contactNumber"
                                    type="tel"
                                    name="contactNumber"
                                    value={contactNumber}
                                    onChange={(e) => setContactNumber(e.target.value)}
                                    onInput={(e) => {
                                        e.currentTarget.value = e.currentTarget.value.replace(/^09/, "0172");
                                        setContactNumber(e.currentTarget.value);
                                    }}
                                    minLength={11}
                                    placeholder="+880 1XXXXXXXXX"
                                    className="pl-10! input"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="deliveryAddress" title="Delivery Address" isRequired />
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Textarea
                                    id="deliveryAddress"
                                    name="deliveryAddress"
                                    value={deliveryAddress}
                                    onChange={(e) => setDeliveryAddress(e.target.value)}
                                    placeholder="Enter your complete delivery address..."
                                    className="min-h-20 resize-none pl-10 hover:border-brand/50! focus:border-brand! focus:ring-4! focus:ring-brand/10!"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes" title="Additional Notes" />
                            <div className="relative">
                                <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Textarea
                                    id="notes"
                                    placeholder="Any special instructions..."
                                    name="notes"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="min-h-20 resize-none pl-10 hover:border-brand/50! focus:border-brand! focus:ring-4! focus:ring-brand/10!"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Price Summary */}
                    <section className="space-y-3 rounded-xl border border-border bg-muted/40 p-4">
                        <h3 className="font-semibold">Booking Summary</h3>

                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Price per day</span>
                            <span>৳{formatPrice(equipment.rentalPrice)}</span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Rental duration</span>
                            <span>{rentalDays} days</span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Quantity</span>
                            <span>{quantity} units</span>
                        </div>

                        <div className="border-t border-dashed border-border pt-3">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold">Total Rental Amount</span>
                                <span className="text-xl font-bold text-primary">
                                    ৳{totalAmount.toLocaleString("en-BD")}
                                </span>
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                                {rentalDays > 0
                                    ? `${rentalDays} days × ${quantity} units × ৳${equipment.rentalPrice}`
                                    : "Select rental dates to calculate your total"}
                            </p>
                        </div>
                    </section>

                    {/* Actions */}
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleOpenChange(false)}
                            disabled={loading}
                            className={'min-h-11! px-4! text-sm! font-medium! cursor-pointer'}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="button"
                            onClick={handleBooking}
                            disabled={
                                loading ||
                                checkingAvailability ||
                                !!availabilityError ||
                                !!conflictDay ||
                                !startDate ||
                                !endDate ||
                                rentalDays <= 0 ||
                                quantity > equipment.quantity
                            }
                            className="gap-2 min-h-11! px-4! bg-emerald-500! hover:bg-emerald-600! text-white! text-sm! font-medium! cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Confirm & Pay
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
