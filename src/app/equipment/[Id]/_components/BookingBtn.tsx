"use client";

import { EquipmentType } from "@/lib/type/equipmentType";
import { CalendarDays } from "lucide-react";
import { useState } from "react";
import BookingModal from "./BookingModal";
import { useSession } from "@/lib/auth-client";

const BookingBtn = ({ equipment }: { equipment: EquipmentType }) => {

    const session = useSession();
    const user = session?.data?.user;

    const isAvailable = equipment.quantity > 0;

    const [bookingOpen, setBookingOpen] = useState(false);



    return (
        <>
            <button disabled={!isAvailable || user?.role !== 'customer'} onClick={() => setBookingOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-brand/30 cursor-pointer disabled:cursor-no-drop disabled:opacity-85 disabled:hover:translate-y-0 disabled:hover:shadow-brand/20">
                <CalendarDays size={17} />
                Book Now
            </button>
            {
                user?.role === 'customer' &&
                <BookingModal
                    open={bookingOpen}
                    onOpenChange={setBookingOpen}
                    equipment={equipment}
                />
            }

        </>
    );
};

export default BookingBtn;




