
"use client";

import { useState } from "react";
import {
    CalendarDays,
    Package,
    UserRound,
    Phone,
    MapPin,
    Clock3,
    CheckCircle2,
    XCircle,
    CreditCard,
    Wallet,
    Eye,
    X,
    Boxes,
    ClipboardList,
} from "lucide-react";
import PageHeading from "@/components/dashboard/PageHeading";
import SummaryCard from "@/components/dashboard/SummaryCard";
import Image from "next/image";

type PaymentStatus = "Paid" | "Unpaid" | "Refunded";
type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

type Rental = {
    id: string;
    customer: {
        name: string;
        email: string;
        phone: string;
        avatar: string;
    };
    equipment: {
        name: string;
        category: string;
        image: string;
    };
    startDate: string;
    endDate: string;
    quantity: number;
    amount: number;
    paymentStatus: PaymentStatus;
    bookingStatus: BookingStatus;
    location: string;
};

const initialRentals: Rental[] = [
    {
        id: "RNT-1001",
        customer: {
            name: "Rahim Ahmed",
            email: "rahim@gmail.com",
            phone: "+880 1712-345678",
            avatar: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        },
        equipment: {
            name: "Excavator Machine",
            category: "Construction",
            image:
                "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=800",
        },
        startDate: "2026-11-21",
        endDate: "2026-11-25",
        quantity: 2,
        amount: 36000,
        paymentStatus: "Paid",
        bookingStatus: "Confirmed",
        location: "Dhaka, Bangladesh",
    },
    {
        id: "RNT-1002",
        customer: {
            name: "Sabbir Hossain",
            email: "sabbir@gmail.com",
            phone: "+880 1812-456789",
            avatar: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        },
        equipment: {
            name: "Canon EOS R6",
            category: "Photography",
            image:
                "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800",
        },
        startDate: "2026-11-22",
        endDate: "2026-11-24",
        quantity: 1,
        amount: 5400,
        paymentStatus: "Unpaid",
        bookingStatus: "Pending",
        location: "Chittagong, Bangladesh",
    },
    {
        id: "RNT-1003",
        customer: {
            name: "Tanvir Hasan",
            email: "tanvir@gmail.com",
            phone: "+880 1912-567890",
            avatar: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        },
        equipment: {
            name: "DJI Mavic Drone",
            category: "Electronics",
            image:
                "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800",
        },
        startDate: "2026-11-15",
        endDate: "2026-11-18",
        quantity: 1,
        amount: 8800,
        paymentStatus: "Paid",
        bookingStatus: "Completed",
        location: "Sylhet, Bangladesh",
    },
    {
        id: "RNT-1004",
        customer: {
            name: "Mehedi Hasan",
            email: "mehedi@gmail.com",
            phone: "+880 1612-678901",
            avatar: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        },
        equipment: {
            name: "Portable Generator",
            category: "Power Tools",
            image:
                "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
        },
        startDate: "2026-11-26",
        endDate: "2026-11-28",
        quantity: 2,
        amount: 7200,
        paymentStatus: "Unpaid",
        bookingStatus: "Pending",
        location: "Gazipur, Bangladesh",
    },
    {
        id: "RNT-1005",
        customer: {
            name: "Nayeem Islam",
            email: "nayeem@gmail.com",
            phone: "+880 1512-789012",
            avatar: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        },
        equipment: {
            name: "Commercial Truck",
            category: "Vehicles",
            image:
                "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800",
        },
        startDate: "2026-11-10",
        endDate: "2026-11-12",
        quantity: 1,
        amount: 25500,
        paymentStatus: "Paid",
        bookingStatus: "Completed",
        location: "Narayanganj, Bangladesh",
    },
    {
        id: "RNT-1006",
        customer: {
            name: "Arif Rahman",
            email: "arif@gmail.com",
            phone: "+880 1312-890123",
            avatar: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        },
        equipment: {
            name: "Wheel Loader",
            category: "Construction",
            image:
                "https://images.unsplash.com/photo-1579412690850-bd41cd0af397?w=800",
        },
        startDate: "2026-11-19",
        endDate: "2026-11-21",
        quantity: 1,
        amount: 16500,
        paymentStatus: "Refunded",
        bookingStatus: "Cancelled",
        location: "Dhaka, Bangladesh",
    },
];

const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-BD").format(amount);

const formatDate = (date: string) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

function PaymentBadge({ status }: { status: PaymentStatus }) {
    const styles: Record<PaymentStatus, string> = {
        Paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
        Unpaid: "bg-orange-50 text-orange-700 border-orange-200",
        Refunded: "bg-slate-100 text-slate-600 border-slate-200",
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${styles[status]}`}
        >
            {status === "Paid" ? (
                <CheckCircle2 size={13} />
            ) : status === "Unpaid" ? (
                <Clock3 size={13} />
            ) : (
                <Wallet size={13} />
            )}
            {status}
        </span>
    );
}

function BookingBadge({ status }: { status: BookingStatus }) {
    const styles: Record<BookingStatus, string> = {
        Pending: "bg-orange-50 text-orange-700 border-orange-200",
        Confirmed: "bg-blue-50 text-blue-700 border-blue-200",
        Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
        Cancelled: "bg-rose-50 text-rose-700 border-rose-200",
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${styles[status]}`}
        >
            {status === "Completed" ? (
                <CheckCircle2 size={13} />
            ) : status === "Cancelled" ? (
                <XCircle size={13} />
            ) : (
                <Clock3 size={13} />
            )}
            {status}
        </span>
    );
}

function RentalCard({
    rental,
    onView,
}: {
    rental: Rental;
    onView: (rental: Rental) => void;
}) {
    return (
        <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div>
                    <p className="text-[11px] font-medium text-muted-foreground">
                        Booking ID
                    </p>
                    <h3 className="mt-0.5 text-sm font-bold text-foreground">
                        #{rental.id}
                    </h3>
                </div>

                <BookingBadge status={rental.bookingStatus} />
            </div>

            <div className="space-y-4 p-4">
                {/* Customer Information */}
                <div>
                    <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        <UserRound size={15} className="text-primary" />
                        Customer Information
                    </h4>

                    <div className="flex items-center gap-3">
                        <Image
                            src={rental.customer.avatar}
                            alt={rental.customer.name}
                            width={100}
                            height={100}
                            className="size-11 rounded-full border border-border object-cover"
                        />

                        <div className="min-w-0">
                            <h5 className="truncate text-sm font-bold text-foreground">
                                {rental.customer.name}
                            </h5>
                            <p className="mt-0.5 truncate text-xs text-muted-foreground">
                                {rental.customer.email}
                            </p>
                        </div>
                    </div>

                    <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone size={13} />
                        {rental.customer.phone}
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
                            src={rental.equipment.image}
                            alt={rental.equipment.name}
                            width={100}
                            height={100}
                            className="size-16 shrink-0 rounded-xl object-cover"
                        />

                        <div className="min-w-0">
                            <h5 className="truncate text-sm font-bold text-foreground">
                                {rental.equipment.name}
                            </h5>
                            <span className="mt-1 inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">
                                {rental.equipment.category}
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

                    <div className="rounded-xl border border-primary/20 bg-primary/[0.04] p-3">
                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <CreditCard size={14} />
                            Booking Amount
                        </p>
                        <h4 className="mt-1 text-lg font-bold text-primary">
                            ৳{formatPrice(rental.amount)}
                        </h4>
                    </div>
                </div>

                {/* Payment Status */}
                <div className="flex items-center justify-between gap-2 rounded-xl bg-muted/60 p-3">
                    <span className="text-xs font-semibold text-muted-foreground">
                        Payment Status
                    </span>
                    <PaymentBadge status={rental.paymentStatus} />
                </div>

                {/* View Details */}
                <button
                    type="button"
                    onClick={() => onView(rental)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary/30 px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
                >
                    <Eye size={16} />
                    View Rental Details
                </button>
            </div>
        </article>
    );
}

function RentalDetailsModal({
    rental,
    onClose,
}: {
    rental: Rental | null;
    onClose: () => void;
}) {
    if (!rental) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            onClick={onClose}
        >
            <div
                className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-border bg-card p-5 shadow-2xl sm:rounded-2xl sm:p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-foreground">
                            Rental Details
                        </h2>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Booking #{rental.id}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
                    >
                        <X size={20} />
                    </button>
                </div>

                <img
                    src={rental.equipment.image}
                    alt={rental.equipment.name}
                    className="mb-5 h-48 w-full rounded-xl object-cover"
                />

                <div className="space-y-4">
                    <div>
                        <h3 className="mb-2 text-sm font-bold text-foreground">
                            Customer Information
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {rental.customer.name}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            {rental.customer.email}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            {rental.customer.phone}
                        </p>
                    </div>

                    <div className="border-t border-border" />

                    <div>
                        <h3 className="mb-2 text-sm font-bold text-foreground">
                            Equipment Information
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {rental.equipment.name} · {rental.equipment.category}
                        </p>
                    </div>

                    <div className="border-t border-border" />

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <p className="text-xs text-muted-foreground">Start Date</p>
                            <p className="mt-1 text-sm font-semibold text-foreground">
                                {formatDate(rental.startDate)}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">End Date</p>
                            <p className="mt-1 text-sm font-semibold text-foreground">
                                {formatDate(rental.endDate)}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Quantity</p>
                            <p className="mt-1 text-sm font-semibold text-foreground">
                                {rental.quantity} Units
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Booking Amount</p>
                            <p className="mt-1 text-sm font-bold text-primary">
                                ৳{formatPrice(rental.amount)}
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-border" />

                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <p className="mb-2 text-xs text-muted-foreground">
                                Payment Status
                            </p>
                            <PaymentBadge status={rental.paymentStatus} />
                        </div>
                        <div>
                            <p className="mb-2 text-xs text-muted-foreground">
                                Booking Status
                            </p>
                            <BookingBadge status={rental.bookingStatus} />
                        </div>
                    </div>

                    <p className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin size={14} />
                        {rental.location}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
                >
                    Close Details
                </button>
            </div>
        </div>
    );
}

export default function MyEquipmentRentalPage() {
    const [rentals] = useState<Rental[]>(initialRentals);
    const [selectedRental, setSelectedRental] = useState<Rental | null>(null);

    const totalAmount = rentals.reduce(
        (total, rental) =>
            rental.paymentStatus === "Paid" ? total + rental.amount : total,
        0
    );

    const pendingCount = rentals.filter(
        (rental) => rental.bookingStatus === "Pending"
    ).length;

    const confirmedCount = rentals.filter(
        (rental) => rental.bookingStatus === "Confirmed"
    ).length;

    const completedCount = rentals.filter(
        (rental) => rental.bookingStatus === "Completed"
    ).length;

    return (
        <main className=" bg-background space-y-6">

            {/* Header */}
            <PageHeading
                Icon={ClipboardList}
                title="My Equipment Rental"
                subTitle="Manage rental bookings for your equipment."
            />

            {/* Summary Cards */}
            <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">

                <SummaryCard
                    icon={Package}
                    title="Total Rentals"
                    value={10}
                    color="bg-violet-600/5 text-violet-600"
                />

                <SummaryCard
                    icon={Clock3}
                    title="Pending"
                    value={10}
                    color="bg-orange-600/5 text-orange-600"
                />

                <SummaryCard
                    icon={CheckCircle2}
                    title="Confirmed"
                    value={10}
                    color="bg-blue-600/5 text-blue-600"
                />

                <SummaryCard
                    icon={Wallet}
                    title="Paid Amount"
                    value={10}
                    color="bg-emerald-600/5 text-emerald-600"
                />
            </section>

            {/* Rental List Heading */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-lg font-bold text-foreground">
                        All Rental Bookings
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        All customers renting your equipment
                    </p>
                </div>

                <span className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
                    {rentals.length} Bookings
                </span>
            </div>

            {/* Rental Cards */}
            {rentals.length > 0 ? (
                <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {rentals.map((rental) => (
                        <RentalCard
                            key={rental.id}
                            rental={rental}
                            onView={setSelectedRental}
                        />
                    ))}
                </section>
            ) : (
                <section className="rounded-2xl border border-dashed border-border bg-card px-5 py-16 text-center">
                    <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                        <Package size={30} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">
                        No Rental Bookings Yet
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Rental requests for your equipment will appear here.
                    </p>
                </section>
            )}

            <div className="border-t border-border pt-4 text-center text-xs text-muted-foreground sm:text-left">
                Showing {rentals.length} rental bookings · {completedCount} completed
            </div>

            {/* Rental Details Modal */}
            <RentalDetailsModal
                rental={selectedRental}
                onClose={() => setSelectedRental(null)}
            />
        </main>
    );
}
