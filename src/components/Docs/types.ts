export type Api = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category?: string;
  version?: string;
  updated?: string;
};

export type SidebarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  categories: string[];
};

export type MainProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabFilteredApis: Api[];
  apis: Api[];
  handleRequestClick: (api: Api) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
};

export interface ApiDocumentation {
  _id: string;
  name: string;
  slug: string;
  description: string;
  baseUrl: string;
  documentation: string;
  authType: string;
  isActive: boolean;
  version?: string;
  specData?: any;
}
