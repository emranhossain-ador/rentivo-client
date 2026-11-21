"use client";

import EquipmentDeleteDialog from "@/components/dashboard/EquipmentDeleteDialog";
import { EquipmentType } from "@/lib/type/equipmentType";
import { Boxes, CheckCircle2, Clock3, DollarSign, Eye, LucideIcon, MapPin, Package, Pencil, Tag, Trash2, XCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-BD").format(price);

type EquipmentStatus = "pending" | "approved" | "rejected";

const statusConfig: Record<
    EquipmentStatus,
    { icon: LucideIcon; className: string }
> = {
    pending: {
        icon: Clock3,
        className: "border-orange-200 bg-orange-500 text-white",
    },
    approved: {
        icon: CheckCircle2,
        className: "border-emerald-200 bg-emerald-500 text-white",
    },
    rejected: {
        icon: XCircle,
        className: "border-rose-200 bg-rose-500 text-white",
    },
};

function StatusBadge({ status }: { status: EquipmentStatus }) {
    const config = statusConfig[status];
    const Icon = config.icon;

    return (
        <span
            className={`inline-flex items-center gap-1.5 capitalize rounded-full border px-3 py-1.5 text-xs font-semibold ${config.className}`}
        >
            <Icon size={14} />
            {status}
        </span>
    );
}


const EquipmentCard = ({ equipment }: { equipment: EquipmentType }) => {

    const router = useRouter();

    return (
        <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            {/* Equipment Image */}
            <div className="relative h-48 overflow-hidden bg-muted sm:h-52">
                <Image
                    src={equipment.images[0]}
                    alt={equipment.equipmentName}
                    width={50}
                    height={50}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute left-3 top-3">
                    <StatusBadge status={equipment.status as EquipmentStatus} />
                    {/* {equipment.status} */}
                </div>

                <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                    {equipment.categoryName}
                </div>
            </div>

            {/* Card Content */}
            <div className="space-y-4 p-4 sm:p-5">
                <div>
                    <h3 className="truncate text-lg font-bold text-foreground">
                        {equipment.equipmentName}
                    </h3>

                    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin size={13} />
                        {equipment.location}
                    </p>
                </div>

                {/* Price and Quantity */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-brand/6 p-3">
                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <DollarSign size={14} />
                            Rental Price
                        </p>

                        <h4 className="mt-1 text-lg font-bold text-foreground">
                            ৳{formatPrice(equipment.rentalPrice)}
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
                            {equipment.quantity}
                            {/* {equipment.quantity === 1 ? "Unit" : "Units"} */}
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
                        className="flex items-center justify-center gap-1.5 rounded-xl border border-sky-600/30 px-2 py-2.5 text-xs font-semibold text-sky-500 transition hover:bg-sky-500 hover:text-white"
                    >
                        <Eye size={15} />
                        View
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            router.push(
                                `/dashboard/owner/equipments/edit/${equipment._id}`
                            )
                        }

                        className="flex items-center justify-center gap-1.5 rounded-xl border border-blue-500/30 px-2 py-2.5 text-xs font-semibold text-blue-500 transition hover:bg-blue-500 hover:text-white cursor-pointer"
                    >
                        <Pencil size={15} />
                        Update
                    </button>

                    <EquipmentDeleteDialog itemId={equipment._id as string} />
                </div>
            </div>
        </article>
    )
};

export default EquipmentCard;