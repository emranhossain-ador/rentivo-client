import { getOwnerBookings } from "@/lib/api/booking";
import { getSession } from "@/lib/core/server"
import RentalCard from "./_components/RentalCard";
import { BookingType } from "@/lib/type/booking";
import { Package } from "lucide-react";

const EquipmentRentalContent = async () => {

    const session = await getSession();
    const user = session?.user;

    const rentals: BookingType[] = await getOwnerBookings(user?.id as string);

    return (
        <>
            {rentals.length > 0 ? (
                <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {rentals.map((rental) => (
                        <RentalCard
                            key={rental._id}
                            rental={rental}
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
        </>
    )
}

export default EquipmentRentalContent