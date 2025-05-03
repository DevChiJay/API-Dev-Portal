import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { ApiCard } from "@/src/components/Docs/ApiCard";
import { MainProps } from "./types";

function Main({
  activeTab,
  setActiveTab,
  tabFilteredApis,
  apis,
  handleRequestClick,
  setSearchQuery,
  setSelectedCategory,
}: MainProps) {
  return (
    <div className="flex-1 space-y-6">
      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All APIs</TabsTrigger>
            <TabsTrigger value="new">
              New
              <Badge variant="outline" className="ml-2 py-0 text-[10px]">
                4
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
          </TabsList>
          <p className="text-sm text-muted-foreground">
            Showing {tabFilteredApis.length} of {apis.length} APIs
          </p>
        </div>

        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {tabFilteredApis.map((api) => (
              <ApiCard
                key={api.id}
                api={api}
                onRequestClick={handleRequestClick}
              />
            ))}
          </div>
          {tabFilteredApis.length === 0 && (
            <div className="text-center py-12 border rounded-md">
              <p className="text-muted-foreground">
                No APIs found matching your criteria
              </p>
              <Button
                variant="link"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Main;