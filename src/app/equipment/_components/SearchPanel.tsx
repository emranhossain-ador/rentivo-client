"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import SortBySelect from "./SortBySelect";

export default function SearchPanel() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchInput, setSearchInput] = useState(
        searchParams.get("search") || ""
    );
    const [locationInput, setLocationInput] = useState(
        searchParams.get("location") || ""
    );

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());

        if (searchInput.trim()) {
            params.set("search", searchInput.trim());
        } else {
            params.delete("search");
        }

        if (locationInput.trim()) {
            params.set("location", locationInput.trim());
        } else {
            params.delete("location");
        }

        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="relative z-20 w-full -mt-8 rounded-2xl border border-border bg-card/90 p-3 shadow-[0_8px_30px_rgba(91,66,180,0.08)] backdrop-blur-xl">
            <div className="flex flex-col lg:flex-row items-center gap-3">
                {/* Search form */}
                <form
                    onSubmit={handleSearch}
                    className="flex flex-col md:flex-row gap-2.5 w-full lg:w-[60%]"
                >
                    {/* Equipment search */}
                    <div className="flex h-12 w-full items-center gap-3 rounded-xl border border-border bg-background px-4 transition focus-within:border-brand/30 focus-within:ring-3 focus-within:ring-brand/10">
                        <Search className="h-5 w-5 shrink-0 text-brand" />
                        <input
                            type="search"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search equipment name..."
                            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/80"
                        />
                    </div>

                    {/* Location */}
                    <div className="flex h-12 w-full items-center gap-3 rounded-xl border border-border bg-background px-4 transition focus-within:border-brand/30 focus-within:ring-3 focus-within:ring-brand/10">
                        <MapPin className="h-5 w-5 shrink-0 text-brand" />
                        <input
                            type="search"
                            value={locationInput}
                            onChange={(e) => setLocationInput(e.target.value)}
                            placeholder="Search location..."
                            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/80"
                        />
                    </div>

                    {/* Search button */}
                    <Button
                        type="submit"
                        className="flex h-12 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-brand to-brand px-7 text-sm font-semibold text-white shadow-md shadow-brand/20 transition border-brand hover:from-brand/90 hover:to-brand/90 active:scale-[0.98] cursor-pointer"
                    >
                        <Search className="h-4 w-4" />
                        Search
                    </Button>
                </form>

                {/* Sort dropdown */}
                <SortBySelect />
            </div>
        </div>
    );
}
