import { UserType } from "../type/userType";
import { API_BASE_URL } from "./apiBaseUrl"

export const getUsers = async (query = ''): Promise<UserType[]> => {
    const res = await fetch(`${API_BASE_URL}/users?${query}`);
    return res.json();
}