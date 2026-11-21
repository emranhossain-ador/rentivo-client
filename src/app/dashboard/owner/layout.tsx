
import { Suspense } from "react";
import OwnerAuth from "./_components/OwnerAuth";

export default async function OwnerLayout({ children }: { children: React.ReactNode }) {

    return (
        <Suspense fallback={<p>Loading..</p>}>
            <OwnerAuth>{children}</OwnerAuth>
        </Suspense>
    )
}