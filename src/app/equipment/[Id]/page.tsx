
"use client";

import {
    Sparkles,
} from "lucide-react";
import Breadcrumb from "./_components/Breadcrumb";
import MainDetails from "./_components/MainDetails";
import EquipmentCard from "@/components/EquipmentCard";
import ViewAll from "@/components/ViewAll";

const relatedEquipment = [
    {
        name: "Tower Crane",
        price: 150,
        rating: 4.7,
        reviews: 90,
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=700&q=80",
    },
    {
        name: "Road Roller",
        price: 100,
        rating: 4.6,
        reviews: 75,
        image: "https://images.unsplash.com/photo-1580901368919-8c7a3f6e7b7?auto=format&fit=crop&w=700&q=80",
    },
    {
        name: "Bulldozer",
        price: 130,
        rating: 4.8,
        reviews: 110,
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=700&q=80",
    },
    {
        name: "Forklift",
        price: 90,
        rating: 4.9,
        reviews: 95,
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=700&q=80",
    },
];



export default function EquipmentDetails() {

    return (
        <main className="min-h-screen bg-background text-foreground">
            <div className="section-container my-4">

                {/* Breadcrumb */}
                <Breadcrumb />

                {/* Main Details */}
                <MainDetails />

                {/* Related Equipment */}
                <section className="mt-7">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="flex items-center gap-2 text-base font-bold sm:text-lg">
                            <Sparkles size={18} className="fill-brand text-brand" />
                            Related Equipment
                        </h2>

                        <ViewAll url={"/equipment"} />
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {relatedEquipment.map((item, i) => <EquipmentCard key={i} />)}
                    </div>
                </section>
            </div>
        </main>
    );
}

