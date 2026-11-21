import { getEquipmentByOwnerId } from "@/lib/api/equipments";
import { getSession } from "@/lib/core/server";
import { CheckCircle2, Clock3, Package, Plus, XCircle } from "lucide-react";
import EquipmentCard from "./_components/EquipmentCard";
import SummaryCard from "@/components/dashboard/SummaryCard";

const MyEquipmentContent = async () => {

    const session = await getSession();
    const user = session?.user;

    // quipment Get 
    const equipment = await getEquipmentByOwnerId(user?.id as string);

    // Summary 
    const totalPending = equipment.filter(item => item.status === 'pending');
    const totalApproved = equipment.filter(item => item.status === 'approved');
    const totalRejected = equipment.filter(item => item.status === 'rejected');

    return (
        <>
            {/* Summary */}
            <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard
                    icon={Package}
                    title="Total Equipment"
                    value={equipment.length}
                    color="bg-violet-600/10 text-violet-600"
                />

                <SummaryCard
                    icon={Clock3}
                    title="Pending"
                    value={totalPending.length}
                    color="bg-orange-600/10 text-orange-600"
                />

                <SummaryCard
                    icon={CheckCircle2}
                    title="Approved"
                    value={totalApproved.length}
                    color="bg-emerald-600/10 text-emerald-600"
                />

                <SummaryCard
                    icon={XCircle}
                    title="Rejected"
                    value={totalRejected.length}
                    color="bg-rose-600/10 text-rose-600"
                />
            </section>

            {/* Equipment Heading */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-lg font-bold text-foreground">
                        All Equipment
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {equipment.length} equipment listings
                    </p>
                </div>

                <span className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
                    My Listings
                </span>
            </div>

            {/* Equipment Cards */}
            {equipment.length > 0 ? (
                <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {equipment.map((item) => (
                        <EquipmentCard
                            key={item._id}
                            equipment={item}
                        />
                    ))}
                </section>
            ) : (
                <section className="rounded-2xl border border-dashed border-border bg-card px-5 py-16 text-center">
                    <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                        <Package size={30} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">
                        No Equipment Found
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        You have not added any equipment yet.
                    </p>
                    <button
                        type="button"
                        onClick={() => {
                            window.location.href = "/dashboard/add-equipment";
                        }}
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
                    >
                        <Plus size={17} />
                        Add Your First Equipment
                    </button>
                </section>
            )}
        </>
    )
};

export default MyEquipmentContent;