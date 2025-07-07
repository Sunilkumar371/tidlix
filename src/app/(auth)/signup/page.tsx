"use client"
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"
import {Input} from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { signupSchema,SignupFormValues } from "@/lib/validation/signup-schema"
import axios from "axios"
import { useRouter } from "next/navigation";

export default function Signup() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm<SignupFormValues>({
        resolver:zodResolver(signupSchema)    
    })
    
    async function  onsubmit(data:SignupFormValues){
        
        const res = await axios.post("/api/signup",data)
        if(res.status === 200){
            router.push("/signin")
        }
    }
    
    return (
        <div className="min h-screen flex justify-center items-center mx-3 flex-col">
            <form
                onSubmit={handleSubmit(onsubmit)}
                className="space-y-4 w-full max-w-sm mx-auto p-4 border rounded-xl shadow-sm dark:border-neutral-800"
            >
            <h2 className="text-2xl font-semibold text-center capitalize">Signup</h2>

            <div>
                <Label htmlFor="username" className="mb-2">Username</Label>
                <Input
                    
                    type="text"
                    {...register("username")}
                    
                />{errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>

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
            <div className="relative">
                <Label htmlFor="confirmPassword" className="mb-2">Confirm Password</Label>
                    <Input
                        
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="......."
                        {...register("confirmPassword")}
                    />
                    <button
                        type="button"
                        className="absolute top-8 right-2"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
        >
          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    Create Account
                </Button>
                <p className="text-center">
                    Already have an account ?
                    <Link href="/signin">
                        <span className="text-blue-400 mx-2">signin</span>
                    </Link>
                </p>
            </form>
            
        </div>
    )
}