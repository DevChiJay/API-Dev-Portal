import React from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Separator } from "@/src/components/ui/separator";
import { SidebarProps } from "./types";

function Sidebar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
}: SidebarProps) {
  return (
    <div className="w-full lg:w-64 flex-shrink-0 space-y-6">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search APIs..."
          className="pl-8 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div>
        <h3 className="font-medium mb-2 flex items-center gap-2">
          <Filter className="h-4 w-4" /> Categories
        </h3>
        <ScrollArea className="h-auto max-h-[220px]">
          <div className="space-y-1 pr-4">
            <Button
              variant={selectedCategory === null ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start font-normal"
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-start font-normal"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <Separator />

      <div className="bg-primary/5 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Need help?</h4>
        <p className="text-sm text-muted-foreground mb-3">
          Our developer support team is ready to assist you with integration
          questions.
        </p>
        <Button variant="outline" size="sm" className="w-full">
          Contact Support
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;