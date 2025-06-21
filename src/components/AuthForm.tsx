"use - client"
import { useState } from "react";
import {Input} from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";


interface AuthFormProps{
    type: "login" | "signup"
}

export function AuthForm({type}:AuthFormProps) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault()
        // console.log(username, email, password)
        // fileter username, email, password
        // call api
    }
    return(
        <form
            onSubmit={handleSubmit}
            className="space-y-4 w-full max-w-sm mx-auto p-4 border rounded-xl shadow-sm dark:border-neutral-800"
        >
            <h2 className="text-2xl font-semibold text-center capitalize">{type}</h2>

            <div>
                <Label htmlFor="username">Username</Label>
                <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>

            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    placeholder="you@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div>
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="......."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <Button type="submit" className="w-full">
                {type === 'login' ? 'Log In' : 'Sign Up'}
            </Button>
            
        </form>
    )

    
}