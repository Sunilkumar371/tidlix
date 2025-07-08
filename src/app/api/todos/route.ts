import { connectDB } from "@/lib/connection";
import { verifyToken } from "@/lib/jwt";
import { Todo } from "@/lib/models/TodoModel";
import { NextResponse,NextRequest } from "next/server";

export async function GET(req:NextRequest){
    try{
        await connectDB();
    }catch(err:unknown){
        if (err instanceof Error) {
            console.error(err.message);
        }
        return NextResponse.json({ 
            status:401,
            message: "Error connecting to database" ,
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
    
    let decoded
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
    
    const todos = await Todo.find({user:decoded.userId}).sort({createdAt:-1})
    return NextResponse.json({
        status:200,
        todos
    })
}

export async function POST(req:NextRequest){
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
    
    
    const data = await req.json()
    if(!data){
        return NextResponse.json({ 
            status:401,
            message: "No data found" 
        });
    }
    
    const {title,description,isCompleted} = data
    const newTodo = await Todo.create({
        title,
        description,
        isCompleted,
        user:decoded.userId
    })
    return NextResponse.json({
        status:200,
        newTodo
    })
}

export async function DELETE(req:NextRequest){
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
    
    const data = await req.json()
    
    
    if(!data.id){
        return NextResponse.json({ 
            status:401,
            message: "No data id found" 
        });
    }
    const todo = await Todo.findOneAndDelete({
        _id:data.id,
        user:decoded.userId
    })

    return NextResponse.json({
        status:200,
        message:"Todo deleted successfully",
    })
    
    
}
export async function PUT(req:NextRequest){
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
    
    const data = await req.json()
    
    
    const {id,title,isCompleted} = data
    
    
    if(!id || !title){
        return NextResponse.json({ 
            status:401,
            message: "No data found" 
        });
    }
    const todo = await Todo.findOneAndUpdate(
        {_id:id,user:decoded.userId},
        {$set:{title,isCompleted}},
        {new:true}
    )
    return NextResponse.json({
        status:200,
        todo
    })
    
}