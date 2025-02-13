import { cookies } from "next/headers";
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";
import { doc, getDoc } from "@firebase/firestore";
import { firestore } from "../dbconfig";

const protectedRoutes = ['/chat','/test'];

interface ParamsType {
  params: { sessionID: string }
}

export default async function middleware(request:NextRequest, {params}:ParamsType) {
    const cookie = cookies().get('session')?.value; 
    const session = await decrypt(cookie); 
    
    const path = request.nextUrl.pathname; 

    if (session?.userID && !isValidPath(path,params, String(session?.userID))){
        
        return NextResponse.redirect(new URL("/chat", request.nextUrl));
    }
    
    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

function isValidPath(pathname:string,params:{sessionID:string}, userID:string): boolean{
  /*
    This function test
  */
 if(protectedRoutes.includes(pathname) || pathname.startsWith('/chat/'))
    return true

  return false;
}
