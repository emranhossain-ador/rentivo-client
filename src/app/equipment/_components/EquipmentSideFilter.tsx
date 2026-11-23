"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, MapPin, RotateCcw, X } from "lucide-react";
import { getCategories } from "@/lib/api/categoris";
import { CategoryType } from "@/lib/type/categoryType";

const rentalTypes = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
];

export default function EquipmentFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [categoriesList, setCategoriesList] = useState<CategoryType[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Read current state from URL search params
    const selectedCategory = searchParams.get("category") || "";
    const selectedRentalType = searchParams.get("rentalType") || "";
    const selectedLocation = searchParams.get("location") || "";
    const selectedMinPrice = searchParams.get("minPrice") || "";
    const selectedMaxPrice = searchParams.get("maxPrice") || "";
    const selectedAvailability = searchParams.get("availability") || "";

    // Local inputs for debounce/typing
    const [locationInput, setLocationInput] = useState(selectedLocation);
    const [minPriceInput, setMinPriceInput] = useState(selectedMinPrice);
    const [maxPriceInput, setMaxPriceInput] = useState(selectedMaxPrice);

    useEffect(() => {
        setLocationInput(selectedLocation);
    }, [selectedLocation]);

    useEffect(() => {
        setMinPriceInput(selectedMinPrice);
    }, [selectedMinPrice]);

    useEffect(() => {
        setMaxPriceInput(selectedMaxPrice);
    }, [selectedMaxPrice]);

    useEffect(() => {
        const fetchCats = async () => {
            const data = await getCategories();
            setCategoriesList(data || []);
        };
        fetchCats();
    }, []);

    const updateQuery = (updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(updates).forEach(([key, val]) => {
            if (!val || val === "all") {
                params.delete(key);
            } else {
                params.set(key, val);
            }
        });
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const handleCategoryToggle = (slugOrName: string) => {
        if (selectedCategory === slugOrName) {
            updateQuery({ category: null });
        } else {
            updateQuery({ category: slugOrName });
        }
    };

    const handleRentalTypeToggle = (type: string) => {
        if (selectedRentalType === type) {
            updateQuery({ rentalType: null });
        } else {
            updateQuery({ rentalType: type });
        }
    };

    const handleAvailabilityToggle = () => {
        if (selectedAvailability === "available") {
            updateQuery({ availability: null });
        } else {
            updateQuery({ availability: "available" });
        }
    };

    const clearFilters = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("category");
        params.delete("rentalType");
        params.delete("location");
        params.delete("minPrice");
        params.delete("maxPrice");
        params.delete("availability");
        setLocationInput("");
        setMinPriceInput("");
        setMaxPriceInput("");
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const activeFilterCount =
        (selectedCategory ? 1 : 0) +
        (selectedRentalType ? 1 : 0) +
        (selectedLocation ? 1 : 0) +
        (selectedMinPrice ? 1 : 0) +
        (selectedMaxPrice ? 1 : 0) +
        (selectedAvailability ? 1 : 0);

    return (
        <div className="w-full lg:w-70">
            {/* Mobile Filter Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:border-brand hover:text-brand lg:hidden cursor-pointer"
            >
                <span className="flex items-center gap-2">
                    <Filter size={17} className="text-brand" />
                    Filters
                </span>

                <span className="flex items-center gap-2">
                    {activeFilterCount > 0 && (
                        <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs text-brand font-bold">
                            {activeFilterCount}
                        </span>
                    )}
                    <span className="text-lg">{isOpen ? "−" : "+"}</span>
                </span>
            </button>

            {/* Filter Card */}
            <aside
                className={`
                    ${isOpen ? "block" : "hidden"}
                    lg:sticky lg:top-5 lg:block lg:self-start
                    mt-3 md:mt-0
                    w-full rounded-2xl border border-border
                    bg-card p-5 shadow-sm
                `}
            >
                {/* Header */}
                <div className="mb-5 flex items-center justify-between gap-2 border-b border-border pb-4">
                    <div className="flex items-center gap-2">
                        <Filter size={18} className="text-brand" />
                        <h2 className="text-lg font-bold text-foreground/90">
                            Filters
                        </h2>
                    </div>

                    {/* Mobile Close Button */}
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close filters"
                        className="rounded-lg p-1.5 text-foreground transition hover:bg-brand/10 hover:text-brand md:hidden cursor-pointer"
                    >
                        <X size={19} />
                    </button>
                </div>

                {/* Category */}
                <section className="mb-5 border-b border-border pb-5">
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-foreground">
                        Category
                    </h3>

                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                        {categoriesList.map((cat) => {
                            const catValue = cat.slug || cat.name;
                            const isChecked = selectedCategory === catValue || selectedCategory === cat.name;

                            return (
                                <label
                                    key={cat._id}
                                    className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground hover:text-brand"
                                >
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => handleCategoryToggle(catValue)}
                                        className="size-4 cursor-pointer accent-brand"
                                    />
                                    <span className="truncate">{cat.name}</span>
                                </label>
                            );
                        })}
                    </div>
                </section>

                {/* Location */}
                <section className="mb-5 border-b border-border pb-5">
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-foreground">
                        Location
                    </h3>

                    <div className="flex items-center gap-2 rounded-lg border border-border px-3 focus-within:border-brand">
                        <MapPin size={15} className="shrink-0 text-brand" />

                        <input
                            type="text"
                            placeholder="e.g. Dhaka, Chittagong..."
                            value={locationInput}
                            onChange={(e) => setLocationInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    updateQuery({ location: locationInput.trim() });
                                }
                            }}
                            onBlur={() => {
                                updateQuery({ location: locationInput.trim() });
                            }}
                            className="w-full min-w-0 bg-transparent py-2 text-sm text-foreground outline-none placeholder:text-foreground/70"
                        />
                    </div>
                </section>

                {/* Rental Type */}
                <section className="mb-5 border-b border-border pb-5">
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-foreground">
                        Rental Type
                    </h3>

                    <div className="space-y-2">
                        {rentalTypes.map((type) => (
                            <label
                                key={type.value}
                                className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground hover:text-brand"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedRentalType === type.value}
                                    onChange={() => handleRentalTypeToggle(type.value)}
                                    className="size-4 cursor-pointer accent-brand"
                                />
                                {type.label}
                            </label>
                        ))}
                    </div>
                </section>

                {/* Price Range */}
                <section className="mb-5 border-b border-border pb-5">
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-foreground">
                        Price Range
                    </h3>

                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            min="0"
                            placeholder="৳ Min"
                            value={minPriceInput}
                            onChange={(e) => setMinPriceInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    updateQuery({ minPrice: minPriceInput });
                                }
                            }}
                            onBlur={() => {
                                updateQuery({ minPrice: minPriceInput });
                            }}
                            className="w-full min-w-0 rounded-lg border border-border px-3 py-2 text-sm outline-none transition focus:border-brand"
                        />

                        <span className="text-foreground">-</span>

                        <input
                            type="number"
                            min="0"
                            placeholder="৳ Max"
                            value={maxPriceInput}
                            onChange={(e) => setMaxPriceInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    updateQuery({ maxPrice: maxPriceInput });
                                }
                            }}
                            onBlur={() => {
                                updateQuery({ maxPrice: maxPriceInput });
                            }}
                            className="w-full min-w-0 rounded-lg border border-border px-3 py-2 text-sm outline-none transition focus:border-brand"
                        />
                    </div>
                </section>

                {/* Availability */}
                <section className="mb-5">
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-foreground">
                        Availability
                    </h3>

                    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground hover:text-brand">
                        <input
                            type="checkbox"
                            checked={selectedAvailability === "available"}
                            onChange={handleAvailabilityToggle}
                            className="size-4 cursor-pointer accent-brand"
                        />
                        Available Only
                    </label>
                </section>

                {/* Clear Filters */}
                <button
                    type="button"
                    onClick={clearFilters}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-brand hover:bg-brand/5 hover:text-brand active:scale-[0.98] cursor-pointer"
                >
                    <RotateCcw size={14} />
                    Clear All Filters
                </button>

                {/* Mobile Apply Button */}
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="mt-3 w-full rounded-lg bg-brand py-2.5 text-sm font-semibold text-white transition hover:bg-brand/90 lg:hidden cursor-pointer"
                >
                    Apply Filters
                </button>
            </aside>
        </div>
    );
}
