import {z} from "zod"
export const  signinSchema = z.object({
    email:z.string().email("Invalid email address"),
    password:z.string().min(8,"password must be at least 8 characters long"),
    
})

export type SigninFormValues = z.infer<typeof signinSchema>