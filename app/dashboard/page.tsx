import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, BarChart3, Users } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your API usage and performance</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total API Calls</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284,943</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUp className="h-3 w-3 mr-1" /> 12%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUp className="h-3 w-3 mr-1" /> 8%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.12%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowDown className="h-3 w-3 mr-1" /> 3%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42ms</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-red-500 flex items-center mr-1">
                <ArrowUp className="h-3 w-3 mr-1" /> 5%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>API Usage Over Time</CardTitle>
            <CardDescription>Daily API calls for the last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-muted-foreground">Chart visualization would go here</div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Endpoints</CardTitle>
            <CardDescription>Most frequently used API endpoints</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "/api/auth", usage: "32%" },
                { name: "/api/users", usage: "28%" },
                { name: "/api/data", usage: "20%" },
                { name: "/api/analytics", usage: "12%" },
                { name: "/api/billing", usage: "8%" },
              ].map((endpoint) => (
                <div key={endpoint.name} className="flex items-center justify-between">
                  <div className="font-medium">{endpoint.name}</div>
                  <div className="text-muted-foreground">{endpoint.usage}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
