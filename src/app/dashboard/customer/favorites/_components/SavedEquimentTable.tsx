
import { FavoritesType, getMyFavoriteItemsByUserId } from "@/lib/api/favorite";
import { getSession } from "@/lib/core/server";
import { formatPrice } from "@/lib/formatPrice";
import { CalendarDays, Eye, Package } from "lucide-react";
import Link from "next/link";
import FavoriteRemoveBtn from "../FavoriteRemoveBtn";
import Image from "next/image";



const EquimentTable = async () => {
    const session = await getSession();
    const user = session?.user;

    const favoritesData = await getMyFavoriteItemsByUserId(user?.id as string);
    const favorites: FavoritesType[] = favoritesData?.data;

    return (
        <>
            {favorites.length !== 0 &&
                <>
                    {/* Desktop table */}
                    <div className="hidden overflow-x-auto md:block">
                        <table className="w-full text-left">

                            <thead className="bg-muted/50">
                                <tr className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                    <th className="px-5 py-4">Equipment</th>
                                    <th className="px-4 py-4">Category</th>
                                    <th className="px-4 py-4">Rental Price</th>
                                    <th className="px-4 py-4">Location</th>
                                    <th className="px-4 py-4">Status</th>
                                    <th className="px-4 py-4">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-border">
                                {favorites.map((rental) => (
                                    <tr
                                        key={rental._id}
                                        className="transition-colors hover:bg-muted/40"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                                                    <Image src={rental.equipment?.images[0]} alt={rental.equipment?.equipmentName} width={100} height={100} className="w-full h-full object-cover rounded-md" />
                                                </div>

                                                <div>
                                                    <p className="text-sm font-semibold">
                                                        {rental.equipment.equipmentName}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 py-4 text-xs text-muted-foreground">
                                            {rental.equipment.categoryName}
                                        </td>

                                        <td className="px-4 py-4 text-xs text-muted-foreground">
                                            ৳ {rental.equipment.rentalPrice}
                                        </td>

                                        <td className="px-4 py-4 text-xs text-muted-foreground">
                                            {rental.equipment.location}
                                        </td>

                                        <td className="px-4 py-4">
                                            {
                                                rental.equipment.quantity === 0 ?
                                                    <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/95 px-2.5 py-1 font-semibold text-white shadow-[0_0_15px_rgba(16,185,129,0.25)] backdrop-blur-md ">
                                                        <span className="text-xs ">Unavailable</span>
                                                    </div>
                                                    :
                                                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/95 px-2.5 py-1 font-semibold text-white shadow-[0_0_15px_rgba(16,185,129,0.25)] backdrop-blur-md ">
                                                        <span className="text-xs ">Available</span>
                                                    </div>
                                            }
                                        </td>

                                        <td className="px-4 py-4">
                                            <div className="flex flex-wrap gap-2">
                                                <Link
                                                    href={`/equipment/${rental.equipment._id}`} target="_blank"
                                                    className="inline-flex items-center gap-0.5 rounded-md bg-brand px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                                                >
                                                    <Eye size={15} />
                                                    View Details
                                                </Link>


                                                <FavoriteRemoveBtn favoriteId={rental._id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile cards */}
                    <div className="space-y-3 p-3 md:hidden">
                        {favorites.map((rental) => (
                            <div
                                key={rental._id}
                                className="rounded-xl border border-border bg-background p-3.5 transition hover:border-brand/30"
                            >
                                <div className="flex flex-col items-start justify-between gap-3">
                                    <div className="flex min-w-0 items-center gap-2.5">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                                            <Image src={rental.equipment?.images[0]} alt={rental.equipment?.equipmentName} width={100} height={100} className="w-full h-full object-cover rounded-md" />
                                        </div>

                                        <div className="min-w-0">
                                            <h3 className="truncate text-sm font-bold">
                                                {rental.equipment.equipmentName}
                                            </h3>
                                        </div>
                                    </div>

                                    <p className="shrink-0 text-sm font-bold text-brand">
                                        {rental.equipment.categoryName}
                                    </p>
                                </div>

                                <div className="my-3 grid grid-cols-2 gap-3 border-y border-border py-3">
                                    {formatPrice(rental.equipment.rentalPrice)}
                                    <DateInfo
                                        label="Rental End"
                                        date={rental.equipment.location}
                                    />
                                    {
                                        rental.equipment.quantity === 0 ?
                                            <div className="inline-flex items-center gap-2 rounded-full w-fit border border-red-500/20 bg-red-500/95 px-2.5 py-1 font-semibold text-white shadow-[0_0_15px_rgba(16,185,129,0.25)] backdrop-blur-md ">
                                                <span className="text-xs ">Unavailable</span>
                                            </div>
                                            :
                                            <div className="inline-flex items-center gap-2 rounded-full w-fit border border-emerald-500/20 bg-emerald-500/95 px-2.5 py-1 font-semibold text-white shadow-[0_0_15px_rgba(16,185,129,0.25)] backdrop-blur-md ">
                                                <span className="text-xs ">Available</span>
                                            </div>
                                    }
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <Link
                                        href={`/equipment/${rental.equipment._id}`}
                                        target="_blank"
                                        className="inline-flex items-center gap-0.5 rounded-md bg-brand px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                                    >
                                        <Eye size={15} />
                                        View Details
                                    </Link>

                                    <FavoriteRemoveBtn favoriteId={rental._id} />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            }

            {/* Empty state */}
            {favorites.length === 0 && (
                <div className="flex flex-col items-center justify-center px-4 py-14 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <Package className="h-7 w-7" />
                    </div>

                    <h3 className="mt-4 text-sm font-bold">
                        No rentals found
                    </h3>

                    <p className="mt-1 max-w-xs text-xs text-muted-foreground">
                        We couldn't find any bookings matching your search or filters.
                    </p>
                </div>
            )}
        </>
    )

};

export default EquimentTable;


function DateInfo({ label, date }: { label: string, date: string }) {
    return (
        <div className="min-w-0">
            <p className="text-[10px] text-muted-foreground">
                {label}
            </p>
            <p className="mt-1 flex items-center gap-1 text-xs font-medium">
                <CalendarDays className="h-3 w-3 shrink-0 text-brand" />
                {date}
            </p>
        </div>
    );
};