"use server";

import { API_BASE_URL } from "../api/apiBaseUrl"
import { protectedMutation } from "../core/server";
import { UserRole } from "../type/userType";

export const updateRole = async (userId: string, role: UserRole) => {

    const api = `${API_BASE_URL}/user/${userId}/role`;

    const res = await protectedMutation(api, "PATCH", { role });

    return res.json();
}