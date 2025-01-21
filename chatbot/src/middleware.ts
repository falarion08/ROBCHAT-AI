import { cookies } from "next/headers";
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";

const protectedRoutes = ['/chat'];


export default async function middleware(request:NextRequest) {
    const cookie = cookies().get('session')?.value; 
    const session = await decrypt(cookie); 
    
    const path = request.nextUrl.pathname; 
    const isProtectedRoutes = protectedRoutes.includes(path);

    if (!isProtectedRoutes && session?.userID){

        return NextResponse.redirect(new URL("/chat", request.nextUrl));
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
