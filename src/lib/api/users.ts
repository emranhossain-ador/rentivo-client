import { UserType } from "../type/userType";
import { API_BASE_URL } from "./apiBaseUrl"
import { authFetch } from "../core/server";

// Admin only — the backend rejects anything but an admin session
export const getUsers = async (query = ''): Promise<UserType[]> => {
    const res = await authFetch(`${API_BASE_URL}/users?${query}`);
    return res.json();
}
