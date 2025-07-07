import { NextResponse,NextRequest} from "next/server";
import { verifyToken } from "./lib/jwt";

export function middleware(req:NextRequest){
    const token =  req.cookies.get("token")?.value
    const isProtected = req.nextUrl.pathname.startsWith("/api") || req.nextUrl.pathname.startsWith("/dashboard")

    

    if(isProtected && !token){
        return NextResponse.redirect(new URL("/signin",req.url))
    }
    if(isProtected && token){
        return
    }
    try{
        if(token) verifyToken(token)
    }catch(err){
        return NextResponse.redirect(new URL("/signin",req.url))
    }
    return
}
// This goes below the middleware function in the same file (not inside it)
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/todos/:path*",
  ],
}
