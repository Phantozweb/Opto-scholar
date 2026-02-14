
export interface ArticleAuthor {
  name: string;
  authtype?: string;
  clusterid?: string;
}

export interface ArticleSummary {
  uid: string;
  title: string;
  authors: ArticleAuthor[];
  pubdate: string;
  source: string;
  fulljournalname?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  epubdate?: string;
  doctype?: string;
  doi?: string;
}

export interface SearchResult {
  count: number;
  retmax: number;
  retstart: number;
  ids: string[];
}

// Helper types for parsing the weird JSON from NCBI
export interface ESummaryResult {
  uids: string[];
  [key: string]: any; // The keys are dynamic (UIDs), so we use any for specific article objects
}

export interface ESearchResult {
  count: string;
  retmax: string;
  retstart: string;
  idlist: string[];
}

export interface DbInfo {
  dbname: string;
  count: string;
  lastupdate: string;
}

export interface EInfoResult {
  dbinfo: DbInfo;
}

export type SortOption = 'relevance' | 'pub_date';
export type DateFilter = 'all' | '1year' | '5years' | 'custom';

export interface SearchOptions {
  term: string;
  retstart?: number;
  retmax?: number;
  sortBy?: SortOption;
  dateFilter?: DateFilter;
  customStartYear?: string;
  customEndYear?: string;
  journalFilter?: string;
}

export interface WebSearchResult {
  id: string;
  title: string;
  url: string;
  displayUrl: string;
  snippet: string;
  source: string;
  date?: string;
}

export interface WikiArticle {
  id: string;
  category: string;
  title: string;
  content: string;
  lastUpdated: string;
  relatedTerms: string[];
}