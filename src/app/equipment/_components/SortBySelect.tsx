"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronDown, ArrowDownWideNarrow } from "lucide-react";

interface SortOption {
    label: string;
    value: string;
}

const sortOptions: SortOption[] = [
    { label: "Recent", value: "recent" },
    { label: "Price: Low to High", value: "price-low-high" },
    { label: "Price: High to Low", value: "price-high-low" },
];

export default function SortBySelect() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentSort = searchParams.get("sortBy") || "recent";

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption =
        sortOptions.find((option) => option.value === currentSort) ??
        sortOptions[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option: SortOption) => {
        const params = new URLSearchParams(searchParams.toString());
        if (option.value === "recent") {
            params.delete("sortBy");
        } else {
            params.set("sortBy", option.value);
        }
        router.push(`?${params.toString()}`, { scroll: false });
        setOpen(false);
    };

    return (
        <div ref={dropdownRef} className="relative w-full sm:w-60 mr-auto ml-0 lg:mr-0 lg:ml-auto">
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                className={`flex w-full items-center justify-between gap-3 rounded-xl border bg-background px-3 py-2 text-sm shadow-sm transition-all duration-300 cursor-pointer ${
                    open
                        ? "border-brand ring-4 ring-brand/10"
                        : "border-border hover:border-brand/50"
                }`}
            >
                <span className="flex items-center gap-3">
                    <ArrowDownWideNarrow size={18} className="text-brand" />

                    <span className="text-left">
                        <span className="block text-xs text-muted-foreground">
                            Sort by
                        </span>
                        <span className="font-semibold text-foreground">
                            {selectedOption.label}
                        </span>
                    </span>
                </span>

                <ChevronDown
                    size={18}
                    className={`text-foreground/80 transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>

            {/* Dropdown */}
            <div
                className={`absolute right-0 top-full z-50 mt-2 w-full origin-top rounded-xl border border-border bg-card p-2 shadow-xl transition-all duration-200 ${
                    open
                        ? "visible translate-y-0 scale-100 opacity-100"
                        : "invisible -translate-y-2 scale-95 opacity-0"
                }`}
            >
                <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Sort options
                </p>

                <div className="space-y-1">
                    {sortOptions.map((option) => {
                        const isSelected = selectedOption.value === option.value;

                        return (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelect(option)}
                                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-all duration-200 cursor-pointer ${
                                    isSelected
                                        ? "bg-brand/10 font-semibold text-brand"
                                        : "text-foreground hover:bg-muted"
                                }`}
                            >
                                {option.label}

                                {isSelected && (
                                    <Check size={16} className="text-brand" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
