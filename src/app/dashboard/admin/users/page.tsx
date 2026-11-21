
import PageHeading from "@/components/dashboard/PageHeading";
import { Users } from "lucide-react";
import UsersTable from "./_components/UsersTable";
import { Suspense } from "react";
import UserSkeleton from "./_components/UserSkeleton";

interface UsersPageProps {
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
}

const UsersPage = ({ searchParams }: UsersPageProps) => {


    return (
        <main className="bg-background space-y-8">

            {/* Header */}
            <PageHeading
                Icon={Users}
                title="Users Management"
                subTitle="Manage registered users and their account permissions."
            />

            {/* Main Table */}
            <Suspense fallback={<UserSkeleton />}>
                <UsersTable searchParams={searchParams} />
            </Suspense>

        </main>
    );
}


export default UsersPage;