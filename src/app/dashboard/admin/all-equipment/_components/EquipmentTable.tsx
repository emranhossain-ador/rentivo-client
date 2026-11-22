import { CalendarDays, MapPin, Package } from "lucide-react";
import Image from "next/image";
import ActionsBtn from "./ActionsBtn";
import { EquipmentType } from "@/lib/type/equipmentType";
import { formatPrice } from "@/lib/formatPrice";
import { formatDate } from "@/lib/formatDate";
import StatusBadge from "@/components/shared/StatusBadge";
import MobileActionBtn from "./MobileActionBtn";

const EquipmentTable = ({ equipments }: { equipments: EquipmentType[] }) => {

    return (
        <>
            {
                equipments.length !== 0 &&
                <>
                    {/* Desktop Table */}
                    <div className="hidden overflow-x-auto lg:block">
                        <table className="w-full text-left">
                            <thead className="bg-muted/50">
                                <tr className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                    <th className="px-5 py-4">Equipment</th>
                                    <th className="px-4 py-4">Owner</th>
                                    <th className="px-4 py-4">Price / Day</th>
                                    <th className="px-4 py-4">Submitted</th>
                                    <th className="px-4 py-4">Status</th>
                                    <th className="px-5 py-4 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-border">
                                {
                                    equipments.map(equipment =>

                                        <tr key={equipment._id} className="transition hover:bg-muted/40">

                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    {equipment.images?.[0] ? (
                                                        <Image
                                                            src={equipment.images[0]}
                                                            alt={equipment.equipmentName || "Equipment"}
                                                            width={100}
                                                            height={100}
                                                            className="h-14 w-16 rounded-lg border border-border object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-14 w-16 items-center justify-center rounded-lg border border-border bg-muted">
                                                            <Package className="h-6 w-6 text-muted-foreground" />
                                                        </div>
                                                    )}
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-bold">{equipment.equipmentName}</p>
                                                        <p className="mt-1 text-xs text-muted-foreground">
                                                            {equipment.categoryName}
                                                        </p>
                                                        <p className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                                                            <MapPin className="h-3 w-3" />
                                                            {equipment.location}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-4 py-4">
                                                <span className="text-sm font-medium">{equipment.owner?.name}</span>
                                            </td>

                                            <td className="px-4 py-4">
                                                <span className="text-sm font-bold text-brand">
                                                    ৳{formatPrice(equipment.rentalPrice)}
                                                </span>
                                                <span className="text-xs text-muted-foreground"> / {equipment.rentalType}</span>
                                            </td>

                                            <td className="px-4 py-4">
                                                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                    <CalendarDays className="h-3.5 w-3.5" />
                                                    {formatDate(equipment.createdAt as string)}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4">
                                                <StatusBadge status={equipment.status as string} />
                                            </td>

                                            <td className="px-5 py-4">
                                                <ActionsBtn equipment={equipment} />
                                            </td>
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div>

                    {/* Mobile and Tablet Cards */}
                    <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 lg:hidden">
                        {
                            equipments.map(equipment =>

                                <div key={equipment._id}
                                    className="overflow-hidden rounded-xl border border-border bg-background"
                                >
                                    <div className="relative h-40">
                                        {equipment.images?.[0] ? (
                                            <Image
                                                src={equipment.images[0]}
                                                alt={equipment.equipmentName || "Equipment"}
                                                width={100}
                                                height={100}
                                                className="h-14 w-16 rounded-lg border border-border object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-14 w-16 items-center justify-center rounded-lg border border-border bg-muted">
                                                <Package className="h-6 w-6 text-muted-foreground" />
                                            </div>
                                        )}
                                        <div className="absolute right-3 top-3">
                                            <StatusBadge status={equipment.status as string} />
                                        </div>
                                    </div>

                                    <div className="space-y-3 p-3.5">
                                        <div>
                                            <h3 className="text-sm font-bold">{equipment.equipmentName}</h3>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {equipment.categoryName} · {equipment.owner?.name}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
                                            <span className="text-sm font-bold text-brand">
                                                ৳{formatPrice(equipment.rentalPrice)}
                                                <span className="text-xs font-normal text-muted-foreground"> / {equipment.rentalType}</span>
                                            </span>

                                            <span className="text-[11px] text-muted-foreground">
                                                {formatDate(equipment.createdAt as string)}
                                            </span>
                                        </div>

                                        <MobileActionBtn equipment={equipment} />
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </>
            }


            {/* Empty State */}
            {equipments.length === 0 && (
                <div className="flex flex-col items-center px-4 py-14 text-center">
                    <Package className="h-12 w-12 text-muted-foreground/40" />
                    <h3 className="mt-3 text-sm font-bold">No equipment found</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Try changing your search or filters.
                    </p>
                </div>
            )}

        </>
    )
};
export default EquipmentTable;