
import {z} from "zod"
export const  signupSchema = z.object({
    username:z.string().min(3,"username must be at least 3 characters long"),
    email:z.string().email("Invalid email address"),
    password:z.string().min(8,"password must be at least 8 characters long"),
    confirmPassword:z.string(),
}).refine((data)=>data.password === data.confirmPassword,{
    path:["confirmPassword"],
    message:"passwords do not match"

})
export type SignupFormValues = z.infer<typeof signupSchema>