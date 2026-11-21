import { requireRole } from "@/lib/core/server";

export default async function AdminAuth({
    children,
}: {
    children: React.ReactNode;
}) {
    await requireRole("admin");

    return <>{children}</>;
}