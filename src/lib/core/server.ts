

import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import { UserRole } from "../type/userType";

export const getSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return session;
};


export const requireRole = async (role: UserRole) => {
    const session = await getSession();

    // Not logged in
    if (!session) {
        redirect("/sign-in");
    }

    // Logged in but wrong role
    if (session.user.role !== role) {
        redirect("/unauthorized");
    }

    return session;
};