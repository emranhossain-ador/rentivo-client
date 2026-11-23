import { Suspense } from "react";
import Herobanner from "./_components/Herobanner";
import SearchPanel from "./_components/SearchPanel";
import EquipmentFilter from "./_components/EquipmentSideFilter";
import EquipmentGrid from "./_components/EquipmentGrid";
import EquipmentCardSkeleton from "@/components/home/EquipmentCardSkeleton";

interface AllEquipmentPageProps {
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
}

const AllEquipmentPage = ({ searchParams }: AllEquipmentPageProps) => {
    return (
        <section className="min-h-screen bg-background">
            {/* Hero banner */}
            <Herobanner />

            {/* Search panel */}
            <div className="section-container space-y-12">
                <SearchPanel />

                {/* Main content */}
                <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
                    <EquipmentFilter />

                    <div className="min-w-0">
                        <Suspense fallback={<EquipmentCardSkeleton />}>
                            <EquipmentGrid searchParams={searchParams} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AllEquipmentPage;
