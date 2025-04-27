"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Download, MoreHorizontal, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const apis = [
  {
    id: "1",
    name: "Authentication API",
    version: "v2.1",
    status: "Active",
    users: 1243,
    lastUpdated: "2 days ago",
  },
  {
    id: "2",
    name: "Database API",
    version: "v1.5",
    status: "Active",
    users: 987,
    lastUpdated: "1 week ago",
  },
  {
    id: "3",
    name: "Analytics API",
    version: "v3.0",
    status: "Beta",
    users: 456,
    lastUpdated: "3 days ago",
  },
  {
    id: "4",
    name: "Storage API",
    version: "v2.0",
    status: "Active",
    users: 1567,
    lastUpdated: "5 days ago",
  },
  {
    id: "5",
    name: "Messaging API",
    version: "v1.2",
    status: "Deprecated",
    users: 234,
    lastUpdated: "3 months ago",
  },
]

export default function ApisPage() {
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedApis = [...apis].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a]
    const bValue = b[sortField as keyof typeof b]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    if (sortDirection === "asc") {
      return String(aValue).localeCompare(String(bValue))
    } else {
      return String(bValue).localeCompare(String(aValue))
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">APIs</h2>
          <p className="text-muted-foreground">Manage API endpoints and configurations</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add API
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search APIs..." className="pl-8 w-full md:max-w-sm" />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                <div className="flex items-center">
                  Name
                  {sortField === "name" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("version")}>
                <div className="flex items-center">
                  Version
                  {sortField === "version" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                <div className="flex items-center">
                  Status
                  {sortField === "status" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("users")}>
                <div className="flex items-center">
                  Users
                  {sortField === "users" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("lastUpdated")}>
                <div className="flex items-center">
                  Last Updated
                  {sortField === "lastUpdated" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedApis.map((api) => (
              <TableRow key={api.id}>
                <TableCell className="font-medium">{api.name}</TableCell>
                <TableCell>{api.version}</TableCell>
                <TableCell>
                  <Badge
                    variant={api.status === "Active" ? "success" : api.status === "Beta" ? "default" : "secondary"}
                  >
                    {api.status}
                  </Badge>
                </TableCell>
                <TableCell>{api.users}</TableCell>
                <TableCell>{api.lastUpdated}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit API</DropdownMenuItem>
                      <DropdownMenuItem>View documentation</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Deprecate API</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
