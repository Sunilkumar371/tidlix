"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useState } from "react"
import { GetTodos } from "@/components/todos/get-todos"
export default function todos(){
    const [title,setTitle] = useState("")
    const [refreshKey,setRefreshKey] = useState(0)
    
    async function AddTodo(){
        try{
            if(!title.trim()) return
            const res = await axios.post("/api/todos",{
                title:title,
                description:"",
                isCompleted:false,
                },
                {withCredentials:true}
            )
            
        }catch(err:any){
            
        }finally{
            setTitle("")
            setRefreshKey(refreshKey + 1)
        }

    }

    return(
        <>
            <div className="flex justify-center flex-row gap-3">
                <div className="sm:w-2/3 sm:text-5xl ">
                    <Input 
                    type="text"
                    placeholder="Add a todo"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="p-3 sm:p-6 "

                />
                </div>
                <div className="">
                    <Button className="p-3 sm:p-6" onClick={AddTodo}>Add Todo</Button>
                </div>
                
            </div>
            
            <GetTodos refreshKey={refreshKey}  onRefresh={() => setRefreshKey((prev) => prev + 1)}  />
        </>
    )
}