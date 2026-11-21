import { API_BASE_URL } from "../api/apiBaseUrl"
import { UserRole } from "../type/userType";

export const updateRole = async (userId: string, role: UserRole) => {
    const res = await fetch(`${API_BASE_URL}/user/${userId}/role`, {
        method: 'PATCH',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ role })
    });

    return res.json();
}