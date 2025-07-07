import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/lib/connection";
import { User } from "@/lib/models/UserModel";
import { verifyToken } from "@/lib/jwt";

export async function GET(req:NextRequest){
    try{
        await connectDB();
    }catch(err){
        return NextResponse.json({ 
            status:401,
            message: "Error connecting to database" 
        });
    }
    const token =  req.cookies.get("token")?.value
    if(!token){
        return NextResponse.json({ 
            status:401,
            message: "Unauthorized access - token missing" 
        });
    }
    
    let decoded
    try{
        decoded = verifyToken(token) as {userId:string}
    }catch(err){
        return NextResponse.json({ 
            status:401,
            message: "invalid token" 
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