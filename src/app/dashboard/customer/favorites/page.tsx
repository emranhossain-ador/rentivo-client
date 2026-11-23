
import {
    Heart,
} from "lucide-react";
import EquimentTable from "./_components/SavedEquimentTable";
import PageHeading from "@/components/dashboard/PageHeading";
import { Suspense } from "react";
import DashboardLayout from "../../layout";
import DashboardLoader from "@/components/dashboard/DashboardLoader";


const FavoritesPage = () => {

    return (
        <main className="bg-background space-y-8 md:space-y-10">
            {/* Page heading */}
            <PageHeading
                Icon={Heart}
                title="Favorites"
                subTitle="View, manage and book your favorites equipment."
            />

            {/* Main table card */}
            <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">

                {/* Table heading */}
                <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                    <div>
                        <h2 className="text-base font-bold">
                            All favorites equipment
                        </h2>
                        <p className="mt-1 text-xs text-muted-foreground">
                            View and manage your favorites equipment.
                        </p>
                    </div>

                </div>

                <Suspense fallback={<DashboardLoader />}>
                    <EquimentTable />
                </Suspense>

            </section>

            <p className="text-center text-[11px] text-muted-foreground">
                Showing rental history for your account.
            </p>
        </main>
    );
}

export default FavoritesPage;

