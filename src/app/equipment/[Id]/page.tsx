
import { Suspense } from "react";

import Breadcrumb from "./_components/Breadcrumb";
import MainDetails from "./_components/MainDetails";
import MainDetailsSkeleton from "./_components/MainDetailsSkeleton";

interface EquipmentDetailsProps {
    params: Promise<{ Id: string }>;
}

async function EquipmentContent({ params }: EquipmentDetailsProps) {
    const { Id } = await params;

    return <MainDetails itemId={Id} />;
}

export default function EquipmentDetails({ params }: EquipmentDetailsProps) {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <div className="section-container my-4">
                <Breadcrumb />

                <Suspense fallback={<MainDetailsSkeleton />}>
                    <EquipmentContent params={params} />
                </Suspense>
            </div>
        </main>
    );
}
