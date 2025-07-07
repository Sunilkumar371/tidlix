"use client"
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"
import {Input} from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { signinSchema,SigninFormValues } from "@/lib/validation/signin-schema"
import axios from "axios"
import { useRouter } from "next/navigation";

export default function Signin() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    
    const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm<SigninFormValues>({
        resolver:zodResolver(signinSchema)    
    })
    
    async function  onsubmit(data:SigninFormValues){
        const res = await axios.post("/api/signin",data)
        if(res.status === 200){
            router.push("/dashboard")
        }
    }
    
    return (
        <div className="min h-screen flex justify-center items-center mx-3 flex-col">
            <form
                onSubmit={handleSubmit(onsubmit)}
                className="space-y-4 w-full max-w-sm mx-auto p-4 border rounded-xl shadow-sm dark:border-neutral-800"
            >
            <h2 className="text-2xl font-semibold text-center capitalize">Signin</h2>

            <div>
                <Label htmlFor="email" className="mb-2">Email</Label>
                <Input
                    {...register("email")}
                    type="email"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="relative">
                <Label htmlFor="password" className="mb-2">Password</Label>
                    <Input
                        
                        type={showPassword ? "text" : "password"}
                        placeholder="......."
                        {...register("password")}
                        
                    />
                    <button
                        type="button"
                        className="absolute top-8 right-2"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    Sign in
                </Button>
                <p className="text-center">
                    Don't have an account ?
                    <Link href="/signup">
                        <span className="text-blue-400 mx-2">signup</span>
                    </Link>
                </p>
            </form>
        </div>
    )
}