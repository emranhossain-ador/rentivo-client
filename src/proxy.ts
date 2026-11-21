import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from './lib/core/server'

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

    const session = await getSession();
    const user = session?.user;

    if (!user) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: ['/equipment/:path', '/dashboard/:path*',],
}