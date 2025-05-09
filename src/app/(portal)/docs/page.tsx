"use client";

import { useState } from "react";
import Head from "next/head";

import { useApiData } from "@/src/hooks/use-api-data";
import { RequestApiModal } from "@/src/components/request-api-modal";
import DocSkeleton from "@/src/components/Docs/DocSkeleton";
import Sidebar from "@/src/components/Docs/Sidebar";
import Main from "@/src/components/Docs/Main";
import { Api } from "@/src/components/Docs/types";

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [selectedApiId, setSelectedApiId] = useState<string | undefined>(
    undefined
  );
  const [activeTab, setActiveTab] = useState("all");

  const { data, isLoading, error } = useApiData<Api[]>({
    endpoint: "/api/apis",
    fallbackData: [],
  });

  const apis = data?.apis || [];
  const categories = Array.from(
    new Set(apis.map((api) => api.category).filter(Boolean))
  );

  const filteredApis = apis.filter((api) => {
    const matchesSearch =
      api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      api.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !selectedCategory || api.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const tabFilteredApis =
    activeTab === "all"
      ? filteredApis
      : filteredApis.filter((api) => {
          if (activeTab === "new" && api.updated) {
            const updatedDate = new Date(api.updated);
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            return updatedDate > oneMonthAgo;
          }
          if (activeTab === "popular") {
            return api.name.includes("Auth") || api.name.includes("Data");
          }
          return false;
        });

  const handleRequestClick = (api: Api) => {
    setSelectedApiId(api.id);
    setRequestModalOpen(true);
  };

  if (isLoading) {
    return <DocSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="bg-destructive/10 p-4 rounded-lg text-destructive max-w-md text-center">
          <h2 className="text-lg font-semibold mb-2">
            Error Loading Documentation
          </h2>
          <p>
            We're having trouble fetching the API documentation. Please try
            again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>API Documentation - API Developer Portal</title>
        <meta name="description" content="Browse and integrate with our collection of APIs." />
        <meta property="og:title" content="API Documentation - API Developer Portal" />
        <meta property="og:description" content="Browse and integrate with our collection of APIs." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://portal.devchihub.com/docs" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">API Documentation</h1>
          <p className="text-muted-foreground max-w-2xl">
            Browse our collection of APIs to integrate with your applications.
            Each API includes detailed documentation, code samples, and endpoints.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />
          <Main
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabFilteredApis={tabFilteredApis}
            apis={apis}
            handleRequestClick={handleRequestClick}
            setSearchQuery={setSearchQuery}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        <RequestApiModal
          isOpen={requestModalOpen}
          onClose={() => setRequestModalOpen(false)}
          selectedApiId={selectedApiId}
          availableApis={apis}
        />
      </div>
    </>
  );
}
