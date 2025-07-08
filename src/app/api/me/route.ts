import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/lib/connection";
import { User } from "@/lib/models/UserModel";
import { verifyToken } from "@/lib/jwt";
import { JwtPayload } from "jsonwebtoken"

export async function GET(req:NextRequest){
    try{
        await connectDB();
    }catch(err:unknown){
        if (err instanceof Error) {
            console.error("Error:", err.message);
        } else {
            console.error("Unknown error", err);
        }
        return NextResponse.json({ 
            status:401,
            message: "Error connecting to database",
            error:err
        });
    }
    const token =  req.cookies.get("token")?.value
    if(!token){
        return NextResponse.json({ 
            status:401,
            message: "Unauthorized access - token missing" 
        });
    }
    
    let decoded: JwtPayload & { userId: string }
    try{
        decoded = verifyToken(token) as {userId:string}
    }catch(err:unknown){
        if (err instanceof Error) {
            console.error(err.message);
        }
        return NextResponse.json({ 
            status:401,
            message: "invalid token",
            error:err
        });
    }
   const user = await User.findById(decoded.userId).select("-password")
   if(!user){
    return NextResponse.json({ 
        status:401,
        message: "User not found" 
    });
   }
   
   return NextResponse.json({
    status:200,
    user,
    success:true
   })
}