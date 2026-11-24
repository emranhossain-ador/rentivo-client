"use client";

import { EquipmentType } from "@/lib/type/equipmentType";
import { CalendarDays } from "lucide-react";
import { useState } from "react";
import BookingModal from "./BookingModal";

const BookingBtn = ({ equipment }: { equipment: EquipmentType }) => {

    const isAvailable = equipment.quantity > 0;

    const [bookingOpen, setBookingOpen] = useState(false);



    return (
        <>
            <button disabled={!isAvailable} onClick={() => setBookingOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-brand/30 cursor-pointer disabled:cursor-no-drop disabled:opacity-85 disabled:hover:translate-y-0 disabled:hover:shadow-brand/20">
                <CalendarDays size={17} />
                Book Now
            </button>

            <BookingModal
                open={bookingOpen}
                onOpenChange={setBookingOpen}
                equipment={equipment}
            />
        </>
    );
};

export default BookingBtn;




