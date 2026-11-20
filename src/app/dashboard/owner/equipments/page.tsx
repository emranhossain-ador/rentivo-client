
"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
    Package,
    MapPin,
    Eye,
    Pencil,
    Trash2,
    Clock3,
    CheckCircle2,
    XCircle,
    X,
    CalendarDays,
    DollarSign,
    Boxes,
    Tag,
    Info,
    Plus,
} from "lucide-react";
import PageHeading from "@/components/dashboard/PageHeading";
import SummaryCard from "@/components/dashboard/SummaryCard";

type EquipmentStatus = "Pending" | "Approved" | "Rejected";

type Equipment = {
    id: number;
    name: string;
    category: string;
    image: string;
    description: string;
    location: string;
    price: number;
    rentalType: "Daily" | "Weekly" | "Monthly";
    quantity: number;
    condition: string;
    brand: string;
    model: string;
    status: EquipmentStatus;
};

const initialEquipment: Equipment[] = [
    {
        id: 1,
        name: "Excavator Machine",
        category: "Construction",
        image:
            "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=800&q=85",
        description:
            "Heavy-duty excavator machine suitable for construction and earthmoving projects.",
        location: "Dhaka, Bangladesh",
        price: 4500,
        rentalType: "Daily",
        quantity: 3,
        condition: "Excellent",
        brand: "Caterpillar",
        model: "CAT 320D",
        status: "Pending",
    },
    {
        id: 2,
        name: "Canon EOS R6",
        category: "Photography",
        image:
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=85",
        description:
            "Professional mirrorless camera for photography and video production.",
        location: "Chittagong, Bangladesh",
        price: 1800,
        rentalType: "Daily",
        quantity: 5,
        condition: "Like New",
        brand: "Canon",
        model: "EOS R6",
        status: "Approved",
    },
    {
        id: 3,
        name: "DJI Mavic Drone",
        category: "Electronics",
        image:
            "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=85",
        description:
            "High-quality aerial drone for professional photography and videography.",
        location: "Sylhet, Bangladesh",
        price: 2200,
        rentalType: "Daily",
        quantity: 2,
        condition: "Excellent",
        brand: "DJI",
        model: "Mavic 3",
        status: "Approved",
    },
    {
        id: 4,
        name: "Portable Generator",
        category: "Power Tools",
        image:
            "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=85",
        description:
            "Reliable portable power generator for outdoor and construction use.",
        location: "Dhaka, Bangladesh",
        price: 1200,
        rentalType: "Daily",
        quantity: 4,
        condition: "Good",
        brand: "Honda",
        model: "EU70is",
        status: "Rejected",
    },
    {
        id: 5,
        name: "Commercial Truck",
        category: "Vehicles",
        image:
            "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=85",
        description:
            "Commercial transport truck suitable for goods and equipment transportation.",
        location: "Gazipur, Bangladesh",
        price: 8500,
        rentalType: "Daily",
        quantity: 2,
        condition: "Good",
        brand: "Volvo",
        model: "FM 440",
        status: "Pending",
    },
    {
        id: 6,
        name: "Wheel Loader",
        category: "Construction",
        image:
            "https://images.unsplash.com/photo-1579412690850-bd41cd0af397?w=800&q=85",
        description:
            "Heavy construction wheel loader for material handling and site preparation.",
        location: "Narayanganj, Bangladesh",
        price: 5500,
        rentalType: "Daily",
        quantity: 1,
        condition: "Excellent",
        brand: "CAT",
        model: "950M",
        status: "Approved",
    },
];

const statusConfig: Record<
    EquipmentStatus,
    { icon: LucideIcon; className: string }
> = {
    Pending: {
        icon: Clock3,
        className: "border-orange-200 bg-orange-50 text-orange-600",
    },
    Approved: {
        icon: CheckCircle2,
        className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    },
    Rejected: {
        icon: XCircle,
        className: "border-rose-200 bg-rose-50 text-rose-600",
    },
};

const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-BD").format(price);

function StatusBadge({ status }: { status: EquipmentStatus }) {
    const config = statusConfig[status];
    const Icon = config.icon;

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${config.className}`}
        >
            <Icon size={14} />
            {status}
        </span>
    );
}

type EquipmentCardProps = {
    equipment: Equipment;
    onView: (equipment: Equipment) => void;
    onEdit: (equipment: Equipment) => void;
    onDelete: (id: number) => void;
};

function EquipmentCard({
    equipment,
    onView,
    onEdit,
    onDelete,
}: EquipmentCardProps) {
    return (
        <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            {/* Equipment Image */}
            <div className="relative h-48 overflow-hidden bg-muted sm:h-52">
                <img
                    src={equipment.image}
                    alt={equipment.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute left-3 top-3">
                    <StatusBadge status={equipment.status} />
                </div>

                <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                    {equipment.category}
                </div>
            </div>

            {/* Card Content */}
            <div className="space-y-4 p-4 sm:p-5">
                <div>
                    <h3 className="truncate text-lg font-bold text-foreground">
                        {equipment.name}
                    </h3>

                    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin size={13} />
                        {equipment.location}
                    </p>
                </div>

                {/* Price and Quantity */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-primary/[0.06] p-3">
                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <DollarSign size={14} />
                            Rental Price
                        </p>

                        <h4 className="mt-1 text-lg font-bold text-foreground">
                            ৳{formatPrice(equipment.price)}
                        </h4>

                        <p className="text-xs text-muted-foreground">
                            Per {equipment.rentalType.toLowerCase()}
                        </p>
                    </div>

                    <div className="rounded-xl bg-muted/70 p-3">
                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Boxes size={14} />
                            Available
                        </p>

                        <h4 className="mt-1 text-lg font-bold text-foreground">
                            {equipment.quantity}
                        </h4>

                        <p className="text-xs text-muted-foreground">
                            {equipment.quantity === 1 ? "Unit" : "Units"}
                        </p>
                    </div>
                </div>

                {/* Equipment Details */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                        <Tag size={14} className="text-primary" />
                        {equipment.brand}
                    </span>

                    <span className="flex items-center gap-1.5">
                        <Package size={14} className="text-primary" />
                        {equipment.condition}
                    </span>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-3 gap-2 border-t border-border pt-3">
                    <button
                        type="button"
                        onClick={() => onView(equipment)}
                        className="flex items-center justify-center gap-1.5 rounded-xl border border-primary/30 px-2 py-2.5 text-xs font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
                    >
                        <Eye size={15} />
                        View
                    </button>

                    <button
                        type="button"
                        onClick={() => onEdit(equipment)}
                        className="flex items-center justify-center gap-1.5 rounded-xl border border-primary/30 px-2 py-2.5 text-xs font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
                    >
                        <Pencil size={15} />
                        Update
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(equipment.id)}
                        className="flex items-center justify-center gap-1.5 rounded-xl border border-rose-200 px-2 py-2.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
                    >
                        <Trash2 size={15} />
                        Delete
                    </button>
                </div>
            </div>
        </article>
    );
}

type EquipmentModalProps = {
    equipment: Equipment | null;
    mode: "view" | "edit" | null;
    onClose: () => void;
    onSave: (equipment: Equipment) => void;
};

function EquipmentModal({
    equipment,
    mode,
    onClose,
    onSave,
}: EquipmentModalProps) {
    const [form, setForm] = useState<Equipment | null>(equipment);

    if (!equipment || !mode || !form) return null;

    const updateField = <K extends keyof Equipment>(
        key: K,
        value: Equipment[K]
    ) => {
        setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
    };

    const isEdit = mode === "edit";

    return (
        <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            onClick={onClose}
        >
            <div
                className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-3xl border border-border bg-card p-5 shadow-2xl sm:rounded-2xl sm:p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-foreground">
                            {isEdit ? "Update Equipment" : "Equipment Details"}
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {isEdit
                                ? "Update your equipment information."
                                : "Complete information about your equipment."}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted"
                    >
                        <X size={20} />
                    </button>
                </div>

                <img
                    src={form.image}
                    alt={form.name}
                    className="mb-5 h-48 w-full rounded-xl object-cover"
                />

                <div className="space-y-4">
                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-foreground">
                            Equipment Name
                        </label>
                        {isEdit ? (
                            <input
                                value={form.name}
                                onChange={(e) => updateField("name", e.target.value)}
                                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                            />
                        ) : (
                            <p className="text-sm text-muted-foreground">{form.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-foreground">
                            Description
                        </label>
                        {isEdit ? (
                            <textarea
                                rows={3}
                                value={form.description}
                                onChange={(e) => updateField("description", e.target.value)}
                                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                            />
                        ) : (
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                {form.description}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-foreground">
                                Rental Price (৳)
                            </label>
                            {isEdit ? (
                                <input
                                    type="number"
                                    min="1"
                                    value={form.price}
                                    onChange={(e) =>
                                        updateField("price", Number(e.target.value))
                                    }
                                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                                />
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    ৳{formatPrice(form.price)} / {form.rentalType}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-foreground">
                                Available Quantity
                            </label>
                            {isEdit ? (
                                <input
                                    type="number"
                                    min="0"
                                    value={form.quantity}
                                    onChange={(e) =>
                                        updateField("quantity", Number(e.target.value))
                                    }
                                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                                />
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    {form.quantity} Units
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-foreground">
                                Category
                            </label>
                            {isEdit ? (
                                <input
                                    value={form.category}
                                    onChange={(e) => updateField("category", e.target.value)}
                                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                                />
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    {form.category}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-foreground">
                                Status
                            </label>
                            <StatusBadge status={form.status} />
                        </div>
                    </div>

                    {isEdit && (
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-foreground">
                                Location
                            </label>
                            <input
                                value={form.location}
                                onChange={(e) => updateField("location", e.target.value)}
                                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                            />
                        </div>
                    )}
                </div>

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
                    >
                        Close
                    </button>

                    {isEdit && (
                        <button
                            type="button"
                            onClick={() => onSave(form)}
                            className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                        >
                            Save Changes
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function MyEquipmentPage() {
    const [equipment, setEquipment] =
        useState<Equipment[]>(initialEquipment);

    const [selectedEquipment, setSelectedEquipment] =
        useState<Equipment | null>(null);

    const [modalMode, setModalMode] =
        useState<"view" | "edit" | null>(null);

    const [deleteId, setDeleteId] = useState<number | null>(null);

    const pendingCount = equipment.filter(
        (item) => item.status === "Pending"
    ).length;

    const approvedCount = equipment.filter(
        (item) => item.status === "Approved"
    ).length;

    const rejectedCount = equipment.filter(
        (item) => item.status === "Rejected"
    ).length;

    const openModal = (
        item: Equipment,
        mode: "view" | "edit"
    ) => {
        setSelectedEquipment(item);
        setModalMode(mode);
    };

    const closeModal = () => {
        setSelectedEquipment(null);
        setModalMode(null);
    };

    const saveEquipment = (updatedEquipment: Equipment) => {
        setEquipment((prev) =>
            prev.map((item) =>
                item.id === updatedEquipment.id ? updatedEquipment : item
            )
        );

        closeModal();
    };

    const deleteEquipment = () => {
        if (deleteId === null) return;

        setEquipment((prev) =>
            prev.filter((item) => item.id !== deleteId)
        );

        setDeleteId(null);
    };

    return (
        <main className=" bg-background space-y-6">

            {/* Header */}
            <PageHeading
                Icon={Package}
                title="My Equipment"
                subTitle="Manage all equipment listed by you on Rentivo."
            />


            {/* Summary */}

            <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard
                    icon={Package}
                    title="Total Equipment"
                    value={5}
                    color="bg-violet-600/10 text-violet-600"
                />

                <SummaryCard
                    icon={Clock3}
                    title="Pending"
                    value={5}
                    color="bg-orange-600/10 text-orange-600"
                />

                <SummaryCard
                    icon={CheckCircle2}
                    title="Approved"
                    value={5}
                    color="bg-emerald-600/10 text-emerald-600"
                />

                <SummaryCard
                    icon={XCircle}
                    title="Rejected"
                    value={5}
                    color="bg-rose-600/10 text-rose-600"
                />
            </section>

            {/* Equipment Heading */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-lg font-bold text-foreground">
                        All Equipment
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {equipment.length} equipment listings
                    </p>
                </div>

                <span className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
                    My Listings
                </span>
            </div>

            {/* Equipment Cards */}
            {equipment.length > 0 ? (
                <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {equipment.map((item) => (
                        <EquipmentCard
                            key={item.id}
                            equipment={item}
                            onView={(item) => openModal(item, "view")}
                            onEdit={(item) => openModal(item, "edit")}
                            onDelete={setDeleteId}
                        />
                    ))}
                </section>
            ) : (
                <section className="rounded-2xl border border-dashed border-border bg-card px-5 py-16 text-center">
                    <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                        <Package size={30} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">
                        No Equipment Found
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        You have not added any equipment yet.
                    </p>
                    <button
                        type="button"
                        onClick={() => {
                            window.location.href = "/dashboard/add-equipment";
                        }}
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
                    >
                        <Plus size={17} />
                        Add Your First Equipment
                    </button>
                </section>
            )}

            {/* Footer */}
            <div className="border-t border-border pt-4 text-center text-xs text-muted-foreground sm:text-left">
                Showing {equipment.length} equipment listings
            </div>

            {/* View / Update Modal */}
            <EquipmentModal
                key={`${selectedEquipment?.id ?? "none"}-${modalMode ?? "none"}`}
                equipment={selectedEquipment}
                mode={modalMode}
                onClose={closeModal}
                onSave={saveEquipment}
            />

            {/* Delete Confirmation */}
            {deleteId !== null && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
                    onClick={() => setDeleteId(null)}
                >
                    <div
                        className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                            <Trash2 size={26} />
                        </div>

                        <h3 className="text-center text-lg font-bold text-foreground">
                            Delete Equipment?
                        </h3>

                        <p className="mt-2 text-center text-sm leading-relaxed text-muted-foreground">
                            Are you sure you want to delete this equipment? This action
                            cannot be undone.
                        </p>

                        <div className="mt-6 flex gap-3">
                            <button
                                type="button"
                                onClick={() => setDeleteId(null)}
                                className="flex-1 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={deleteEquipment}
                                className="flex-1 rounded-xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
