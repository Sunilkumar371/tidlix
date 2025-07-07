import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/lib/connection";
import { User} from "@/lib/models/UserModel";


export  async function POST(request:NextRequest){
    const data = await request.json();
    if(!data){
        return NextResponse.json({ 
            status:401,
            message: "Error connecting to database" 
        });
    }
    const {username,email,password} = data
    try{
        await connectDB();
    }catch(err:any){
        return NextResponse.json({
            status:401,
            message: "Error connecting to database"
        })
    }
    const user = await User.findOne({email})
    if(user){
        return NextResponse.json({ 
            status:401,
            message: "User already exists" 
        });
    }
    const newUser= await User.create({username,email,password})
    if(!newUser){
        return NextResponse.json({ 
            status:401,
            message: "Error creating user" 
        });
    }
    
    return NextResponse.json({
        status:200, 
        message: "User created successfully",
     });
}