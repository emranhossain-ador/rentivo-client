
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "./lib/core/server";

export async function proxy(request: NextRequest) {
    const session = await getSession();
    const user = session?.user;

    if (!user) {
        const signInUrl = new URL("/sign-in", request.url);
        signInUrl.searchParams.set(
            "callbackUrl",
            request.nextUrl.pathname
        );

        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/equipment/:path*",
        "/dashboard/:path*",
    ],
};
