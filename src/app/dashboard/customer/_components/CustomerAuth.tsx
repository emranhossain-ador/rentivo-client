import { requireRole } from "@/lib/core/server";

export default async function CustomerAuth({
    children,
}: {
    children: React.ReactNode;
}) {
    await requireRole("customer");

    return <>{children}</>;
}