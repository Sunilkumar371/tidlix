import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/connection";
import {User} from "@/lib/models/UserModel";
import { signToken } from "@/lib/jwt";


export async function POST(request: NextRequest) {
    try{
        await connectDB();
    }catch(err:unknown){
        if (err instanceof Error) {
            console.error(err.message);
        }
        return NextResponse.json({ 
            status:401,
            message: "Error connecting to database",
            error:err
        });
    }
    const data = await request.json();
    if(!data){
        return NextResponse.json({
            status:401,
            message:"No data found"
        })
    }
    
    const {email,password} = data
    
    const user = await User.findOne({email})
    
    if(!user || user === null){
        return NextResponse.json({ 
            status:401,
            message: "User not found" 
        });
    }
    const isMatch = await user.comparePassword(password)
    
    if(!isMatch){
        return NextResponse.json({ 
            status:401,
            message: "Invalid password" 
        });
    }
    const token = signToken({userId:user._id as string})
    if(token){
        
    }
    
    const response = NextResponse.json({
        status:200,
        message:"Login successful"
    })
    response.cookies.set({
        name:"token",
        value:token,
        httpOnly:true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days    
    })
    return response
}