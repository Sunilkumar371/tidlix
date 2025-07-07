import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center space-y-6 max-w-xl">
        <h1 className="text-5xl font-bold tracking-tight">
          Welcome to <span className="text-primary">Tidlix</span> 🚀
        </h1>
        <p className="text-muted-foreground text-lg">
          A focused space for your todos, notes, and journals — all in one place. Built in public, launching soon.
        </p>
        <p className="text-sm text-muted-foreground">
          Follow the journey on <a href="https://github.com/Sunilkumar371/tidlix/">GitHub</a> 
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <Link href="/signin">
            <Button variant="outline" className="px-6 py-2">Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button className="px-6 py-2">Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
