
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import { categories } from "@/data/categoryData";

const SearchFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const status = searchParams.get("status") || "all";
    const category = searchParams.get("category") || "all";
    const sortBy = searchParams.get("sortBy") || "newest";

    const handleFilterChange = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === "all" || (name === "sortBy" && value === "newest")) {
            params.delete(name);
        } else {
            params.set(name, value);
        }

        router.push(`?${params.toString()}`, { scroll: false });
    };

    const handleReset = () => {
        router.push("?", { scroll: false });
    };

    return (
        <div className="border-b border-border p-4">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold">Search & Filters</h3>
                </div>

                <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-brand cursor-pointer"
                >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset Filters
                </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {/* Status */}
                <select
                    value={status}
                    onChange={(e) => handleFilterChange("status", e.target.value)}
                    className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-brand"
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>

                {/* Category */}
                <select
                    value={category}
                    onChange={(e) => handleFilterChange("category", e.target.value)}
                    className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-brand"
                >
                    <option value="all">All Categories</option>
                    {
                        categories.map((category, i) => <option key={i} value={category.name}>{category.name}</option>)
                    }
                </select>

                {/* Sorting */}
                <select
                    value={sortBy}
                    onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                    className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-brand"
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price:high-low">Price: High-Low</option>
                    <option value="price:low-high">Price: Low-High</option>
                    <option value="name">Name A-Z</option>
                </select>
            </div>
        </div>
    );
};

export default SearchFilter;
