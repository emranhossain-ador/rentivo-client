
"use client";

import { useEffect, useState } from "react";
import { Filter, MapPin, RotateCcw, X } from "lucide-react";

const categories = [
    "Agriculture Equipment",
    "Cleaning Equipment",
    "Construction Equipment",
    "Electronics",
    "Event Equipment",
    "Photography Equipment",
    "Vehicles & Transportation",
];

const rentalTypes = ["Daily", "Weekly", "Monthly"];

export interface EquipmentFilters {
    categories: string[];
    location: string;
    rentalTypes: string[];
    minPrice: string;
    maxPrice: string;
    availableOnly: boolean;
}

interface EquipmentFilterProps {
    onFilterChange?: (filters: EquipmentFilters) => void;
}

const initialFilters: EquipmentFilters = {
    categories: [],
    location: "",
    rentalTypes: [],
    minPrice: "",
    maxPrice: "",
    availableOnly: false,
};

export default function EquipmentFilter({
    onFilterChange,
}: EquipmentFilterProps) {
    const [filters, setFilters] = useState<EquipmentFilters>(initialFilters);
    const [isOpen, setIsOpen] = useState(false);

    // Notify parent when filters change
    useEffect(() => {
        onFilterChange?.(filters);
    }, [filters, onFilterChange]);

    // Update filters
    const updateFilter = (updated: Partial<EquipmentFilters>) => {
        setFilters((prev) => ({ ...prev, ...updated }));
    };

    // Toggle checkbox values
    const toggleArrayValue = (
        key: "categories" | "rentalTypes",
        value: string
    ) => {
        const current = filters[key];

        updateFilter({
            [key]: current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value],
        });
    };

    // Clear all filters
    const clearFilters = () => {
        setFilters(initialFilters);
    };

    return (
        <div className="w-full lg:w-70">

            {/* Mobile Filter Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:border-brand hover:text-brand lg:hidden"
            >
                <span className="flex items-center gap-2">
                    <Filter size={17} className="text-brand" />
                    Filters
                </span>

                <span className="flex items-center gap-2">
                    <span className="rounded-full bg-brand/5 px-2 py-0.5 text-xs text-brand">
                        {filters.categories.length +
                            filters.rentalTypes.length +
                            (filters.location ? 1 : 0) +
                            (filters.minPrice ? 1 : 0) +
                            (filters.maxPrice ? 1 : 0) +
                            (filters.availableOnly ? 1 : 0)}
                    </span>

                    <span className="text-lg">
                        {isOpen ? "−" : "+"}
                    </span>
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
                        className="rounded-lg p-1.5 text-foreground transition hover:bg-brand/10 hover:text-brand md:hidden"
                    >
                        <X size={19} />
                    </button>
                </div>

                {/* Category */}
                <section className="mb-5 border-b border-border pb-5">
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-foreground">
                        Category
                    </h3>

                    <div className="space-y-2">
                        {categories.map((category) => (
                            <label
                                key={category}
                                className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground hover:text-brand/90"
                            >
                                <input
                                    type="checkbox"
                                    checked={filters.categories.includes(category)}
                                    onChange={() =>
                                        toggleArrayValue("categories", category)
                                    }
                                    className="size-4 cursor-pointer accent-brand"
                                />
                                {category}
                            </label>
                        ))}
                    </div>
                </section>

                {/* Location */}
                <section className="mb-5 border-b border-border pb-5">
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-foreground">
                        Location
                    </h3>

                    <div className="flex items-center gap-2 rounded-lg border border-border px-3 focus-within:border-brand">
                        <MapPin
                            size={15}
                            className="shrink-0 text-brand"
                        />

                        <input
                            type="text"
                            placeholder="e.g. Dhaka, Sylhet..."
                            value={filters.location}
                            onChange={(e) =>
                                updateFilter({ location: e.target.value })
                            }
                            className="w-full min-w-0 bg-transparent py-2 text-sm text-foreground outline-none placeholder:text-foreground/90"
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
                                key={type}
                                className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground hover:text-brand"
                            >
                                <input
                                    type="checkbox"
                                    checked={filters.rentalTypes.includes(type)}
                                    onChange={() =>
                                        toggleArrayValue("rentalTypes", type)
                                    }
                                    className="size-4 cursor-pointer accent-brand"
                                />
                                {type}
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
                            placeholder="$ Min"
                            value={filters.minPrice}
                            onChange={(e) =>
                                updateFilter({ minPrice: e.target.value })
                            }
                            className="w-full min-w-0 rounded-lg border border-border px-3 py-2 text-sm outline-none transition focus:border-brand"
                        />

                        <span className="text-foreground">-</span>

                        <input
                            type="number"
                            min="0"
                            placeholder="$ Max"
                            value={filters.maxPrice}
                            onChange={(e) =>
                                updateFilter({ maxPrice: e.target.value })
                            }
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
                            checked={filters.availableOnly}
                            onChange={(e) =>
                                updateFilter({
                                    availableOnly: e.target.checked,
                                })
                            }
                            className="size-4 cursor-pointer accent-brand"
                        />
                        Available Only
                    </label>
                </section>

                {/* Clear Filters */}
                <button
                    type="button"
                    onClick={clearFilters}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-brand hover:bg-orange-50 hover:text-brand active:scale-[0.98]"
                >
                    <RotateCcw size={14} />
                    Clear All Filters
                </button>

                {/* Mobile Apply Button */}
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="mt-3 w-full rounded-lg bg-brand py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700 lg:hidden"
                >
                    Apply Filters
                </button>

            </aside>
        </div>
    );
}
