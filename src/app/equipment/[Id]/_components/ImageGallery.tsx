"use client";

import { useState } from "react";
import { EquipmentType } from "@/lib/type/equipmentType";
import { Heart } from "lucide-react";
import Image from "next/image";

interface ImageGalleryProps {
    equipment: EquipmentType;
}

const ImageGallery = ({ equipment }: ImageGalleryProps) => {
    const images = equipment?.images ?? [];
    const [selectedImage, setSelectedImage] = useState<string>(images[0] || "");
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    const isAvailable = equipment?.quantity > 0;

    return (
        <div className="space-y-3">
            {/* Main Big Image */}
            <div className="group relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-border bg-card">
                {selectedImage ? (
                    <Image
                        src={selectedImage}
                        alt={equipment?.equipmentName || "Equipment Image"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                        priority
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                ) : (
                    <div className="flex size-full items-center justify-center text-muted-foreground text-sm">
                        No image available
                    </div>
                )}

                {/* Availability Badge */}
                <div
                    className={`absolute left-3 top-3 sm:left-4 sm:top-4 inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/20 px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-semibold text-white shadow-lg ${isAvailable ? "bg-emerald-500" : "bg-rose-500"
                        }`}
                >
                    <span className="size-2 animate-pulse rounded-full bg-white" />
                    {isAvailable ? "Available" : "Unavailable"}
                </div>
            </div>

            {/* Thumbnail Grid */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                    {images.map((img, index) => {
                        const isSelected = selectedImage === img;
                        return (
                            <button
                                key={`${img}-${index}`}
                                type="button"
                                onClick={() => setSelectedImage(img)}
                                className={`group relative aspect-square w-full overflow-hidden rounded-xl border-2 transition-all duration-200 cursor-pointer focus:outline-none ${isSelected
                                    ? "border-brand ring-2 ring-brand/20 shadow-sm"
                                    : "border-border hover:border-brand/50 opacity-70 hover:opacity-100"
                                    }`}
                            >
                                <Image
                                    src={img}
                                    alt={`${equipment?.equipmentName || "Thumbnail"} ${index + 1}`}
                                    fill
                                    sizes="(max-width: 640px) 25vw, (max-width: 1024px) 20vw, 15vw"
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ImageGallery;
