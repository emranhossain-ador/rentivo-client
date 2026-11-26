import { authClient } from "../auth-client";

/**
 * Reads the better-auth session token in the browser so private API calls
 * can be sent with:
 *    Authorization: Bearer <session.token>
 *
 * (server-side code should use authFetch / protectedMutation from ./server)
 */
export const getAuthToken = async (): Promise<string> => {
    const { data } = await authClient.getSession();

    const token = data?.session?.token;

    if (!token) {
        throw new Error("You must be signed in to do this.");
    }

    return token;
};

export const authHeaders = async (): Promise<Record<string, string>> => ({
    authorization: `Bearer ${await getAuthToken()}`,
});
