
import Image from "next/image";
import {
    ArrowRight,
    BadgeCheck,
    CalendarDays,
    Heart,
    MapPin,
    Package,
    Star,
    Tag,
    Sparkles,
    ClipboardList,
} from "lucide-react";
import { getEquipmentById } from "@/lib/api/equipments";
import { EquipmentType } from "@/lib/type/equipmentType";
import { formatPrice } from "@/lib/formatPrice";
import ImageGallery from "./ImageGallery";
import { format } from "date-fns";
import AddFavoritesBtn from "./AddFavoritesBtn";



const MainDetails = async ({ itemId }: { itemId: string }) => {

    // const [favorite, setFavorite] = useState(false);
    // const [rentalType, setRentalType] = useState("Daily");
    const equipment: EquipmentType = await getEquipmentById(itemId);



    return (
        <>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.25fr]">

                {/* Image Gallery */}
                <ImageGallery equipment={equipment} />

                {/* Equipment Information */}
                <div className="min-w-0 space-y-4">

                    {/* Title + Rating */}
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            {equipment?.equipmentName}
                        </h1>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                            <div className="flex items-center gap-0.5 text-amber-500">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} size={15} className="fill-amber-400" />
                                ))}
                            </div>

                            <span className="text-xs font-semibold text-foreground">
                                4.8
                            </span>

                            <span className="text-xs text-foreground/80">
                                (120 Reviews)
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="max-w-2xl text-sm leading-6 text-foreground/80">
                        {equipment?.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        <AddFavoritesBtn equipmentId={equipment._id as string} />

                        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-brand/30 cursor-pointer">
                            <CalendarDays size={17} />
                            Book Now
                        </button>
                    </div>

                    {/* Equipment Info */}
                    <div className="divide-y divide-border border-y border-border py-1">
                        <InfoRow icon={<Sparkles size={16} />} label="Category">
                            {equipment?.categoryName}
                        </InfoRow>

                        <InfoRow icon={<Tag size={16} />} label="Rental Price">
                            <span className="font-bold">${formatPrice(equipment?.rentalPrice)}</span>
                            <span className="text-xs text-muted-foreground">/ {equipment?.rentalType}</span>
                        </InfoRow>

                        {/* Rental Type */}
                        <div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center">
                            <div className="flex w-40 shrink-0 items-center gap-2 text-xs font-medium text-muted-foreground">
                                <CalendarDays size={16} className="text-primary" />
                                Rental Type
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                                {["Daily", "Weekly", "Monthly"].map((type) => (
                                    <button
                                        key={type}
                                        className={`rounded-full border px-3 py-1 text-[11px] font-semibold transition-all duration-200 ${'daily' === type
                                            ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                            : "border-border bg-card hover:border-primary/40 hover:bg-primary/5"
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <InfoRow icon={<MapPin size={16} />} label="Location">
                            {equipment?.location}
                        </InfoRow>

                        <InfoRow icon={<Package size={16} />} label="Available Quantity">
                            <span className="font-bold">{equipment?.quantity} Units</span>
                        </InfoRow>
                    </div>

                    {/* Owner Card */}
                    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-3.5 sm:flex-row sm:items-center">
                        <div className="flex min-w-0 flex-1 items-center gap-3">
                            {
                                equipment.owner?.image ?

                                    <Image
                                        src={equipment.owner?.image as string}
                                        alt="Equipment owner"
                                        width={100}
                                        height={100}
                                        className="size-11 shrink-0 rounded-full object-cover ring-2 ring-primary/10"
                                    />

                                    :

                                    <div className="size-11 flex items-center justify-center text-white shrink-0 rounded-full bg-brand shadow-md shadow-brand/30">
                                        <p className="text-sm font-bold text-white">{equipment.owner?.name.charAt(0).toUpperCase()}</p>
                                    </div>

                            }

                            <div className="min-w-0">
                                <p className="text-[10px] text-muted-foreground">
                                    {equipment.owner?.role}
                                </p>

                                <p className="flex flex-wrap items-center gap-1 text-sm font-bold">
                                    {equipment.owner?.name}
                                    <BadgeCheck size={14} className="fill-primary text-primary-foreground" />
                                </p>

                                <p className="text-[10px] text-muted-foreground">
                                    Member Since: {equipment.owner?.createdAt
                                        ? format(new Date(equipment.owner?.createdAt), "yyyy")
                                        : "N/A"}
                                </p>
                            </div>
                        </div>

                        <button className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-primary/40 px-4 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground">
                            View Profile
                            <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Rental Terms */}
            <section className="mt-7 rounded-2xl border border-border bg-card p-4 sm:p-5">
                <div className="mb-4 flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-brand/10 text-brand">
                        <ClipboardList size={17} />
                    </div>

                    <h2 className="text-base font-bold">
                        Rental Terms and Conditions
                    </h2>
                </div>

                <ul className="space-y-2.5">
                    <p className="text-[14px] font-medium leading-5 text-foreground/80">
                        {equipment?.terms}
                    </p>
                </ul>
            </section>
        </>
    )
};

export default MainDetails;

function InfoRow({
    icon,
    label,
    children,
}: {
    icon: React.ReactNode;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1.5 py-3 sm:flex-row sm:items-center">
            <div className="flex w-40 shrink-0 items-center gap-2 text-xs font-medium text-muted-foreground">
                <span className="text-primary">{icon}</span>
                {label}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-sm text-foreground">
                {children}
            </div>
        </div>
    );
}
