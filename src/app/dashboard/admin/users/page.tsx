
import PageHeading from "@/components/dashboard/PageHeading";
import Statistics from "../_components/Statistics";
import { Users } from "lucide-react";
import UsersTable from "./_components/UsersTable";


const UsersPage = () => {

    return (
        <main className="bg-background space-y-8">

            {/* Header */}
            <PageHeading
                Icon={Users}
                title="Users Management"
                subTitle="Manage registered users and their account permissions."
            />

            {/* Statistics */}
            <Statistics />

            {/* Main Table */}
            <UsersTable />


        </main>
    );
}


export default UsersPage;