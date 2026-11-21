import { Suspense } from "react";
import AdminAuth from "./_components/AdminAuth";
import AdminLoading from "./_components/AdminLoading";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Suspense fallback={<AdminLoading />}>
            <AdminAuth>
                {children}
            </AdminAuth>
        </Suspense>
    );
}