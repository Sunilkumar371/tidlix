// "use client";
// export default function Dashboard() {
//     return (
//         <>
//             <h1>Hi from dashboard</h1>
//         </>
//     );
// }


"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket, CalendarCheck, NotebookText } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">👋 Welcome back to Tidlix</h1>
      <p className="text-muted-foreground text-sm">
        Your personal space to plan, jot, and achieve — all in one place.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-primary" />
              Todos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Manage your daily tasks and get things done.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <NotebookText className="w-5 h-5 text-purple-500" />
              Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Quickly capture ideas or thoughts in one place.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-green-500" />
              Journal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Reflect on your day and track your journey.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
