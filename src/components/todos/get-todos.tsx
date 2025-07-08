import {Button} from "@/components/ui/button"
import {Trash2,Pencil,Check} from "lucide-react"
import {Checkbox} from "@/components/ui/checkbox"
import {useState,useEffect} from "react"
import axios from "axios"
import { Input } from "../ui/input"

interface Todo {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface TodosResponse {
  status: number;
  todos: Todo[];
}
export function GetTodos({refreshKey,onRefresh}:{refreshKey:number;onRefresh:()=>void}) {
    const [todos, setTodos] = useState([])
    const [editingId,setEditingId] = useState<string | null>(null)
    const [editedTitle,setEditedTitle] = useState("")
    useEffect(() => {
        const fetchTodos = async () => {
          try{
            const res = await axios.get("/api/todos",{withCredentials:true})
            
            if(res.status === 200){
                setTodos(res.data.todos)
            }
          }catch(err:unknown){
            if (err instanceof Error) {
            console.error(err.message);
        }
          }
        }
        fetchTodos()
    },[refreshKey])
    

    useEffect(() => {
      
    }, [todos])
    
    async function handleToggle(title:string,isCompleted:boolean,id:string) {
      
        try{
            await axios.put("/api/todos",{
                title:title,
                isCompleted:!isCompleted,
                id:id
            },
            {withCredentials:true}
            )
            
            onRefresh()
        }catch(err:unknown){
            if (err instanceof Error) {
            console.error(err.message);
        }
            
        }
    }

    async function handleDelete(id:string){
      
      try{
        await axios.delete('/api/todos',{
          withCredentials:true,
          data:{id}
        })
        onRefresh()
      }catch(err:unknown){
        if (err instanceof Error) {
            console.error(err.message);
        }
      }
    }

    async function handleUpdateTitle(id:string){
      if(!editedTitle.trim()) return
      try{
        await axios.put("/api/todos",{
          id,
          title:editedTitle,
          isCompleted:false
        },
        {withCredentials:true}
        )
        setEditingId(null)
        setEditedTitle("")
        onRefresh()
      }catch(err:unknown){
              if (err instanceof Error) {
            console.error(err.message);
        }
          }
    }
    
      
    return (
   
      <div className="space-y-2 mt-4">
        {todos.map((todo:Todo) => (
          <div
            key={todo._id}
            className = "flex items-center justify-between  bg-muted p-2 rounded-xl sm:w-2/3 m-auto mb-2"
          >
            <div className="flex items-center gap-2 ">
              <Checkbox 
                checked={todo.isCompleted} 
                className="border-2 cursor-pointer"
                onCheckedChange={()=>{handleToggle(todo.title,todo.isCompleted,todo._id)}}
              />
              {editingId === todo._id ? (
                <Input
                  autoFocus 
                  value={editedTitle}
                  onChange={(e)=>setEditedTitle(e.target.value)}
                  onKeyDown={(e)=>{
                    if(e.key === "Enter"){
                      handleUpdateTitle(todo._id)
                    }
                  }}
                />
              ):(
               <span 
                className={`${todo.isCompleted ? "line-through text-muted-foreground" : ""}
                `}
               >{todo.title}</span>
              )}
            </div> 
            
            <div className="flex gap-1">
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={()=>{
                  setEditingId(todo._id)
                  setEditedTitle(todo.title)
                
              }}>
                {editingId === todo._id ? <Check className="w-4 h-4 cursor-pointer" /> : <Pencil className="w-4 h-4 cursor-pointer" />}
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={()=>handleDelete(todo._id)}
                className="cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    )
}