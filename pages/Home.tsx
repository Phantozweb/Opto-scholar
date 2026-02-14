
import React, { useState, useEffect, useCallback } from 'react';
import { ArticleCard } from '../components/ArticleCard';
import { Pagination } from '../components/Pagination';
import { AbstractModal } from '../components/AbstractModal';
import { CollectionModal } from '../components/CollectionModal';
import { WebSearchView } from '../components/WebSearchView';
import { NetworkGraph } from '../components/NetworkGraph'; 
import { searchArticles, getArticleSummaries, getSpellingSuggestion } from '../services/pubmedService';
import { ArticleSummary, SearchResult, SortOption, DateFilter } from '../types';
import { Loader2, ArrowUpDown, Clock, Calendar, ChevronDown, BookOpen, Globe } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

interface HomeProps {
  savedArticles: ArticleSummary[];
  onToggleSave: (article: ArticleSummary) => void;
  showCollection: boolean;
  setShowCollection: (show: boolean) => void;
  setSavedArticles: React.Dispatch<React.SetStateAction<ArticleSummary[]>>;
  onNavigate: (page: string) => void;
  initialOpenJournalIndex?: boolean;
  initialQuery?: string;
}

export const Home: React.FC<HomeProps> = ({ 
  savedArticles, 
  onToggleSave, 
  showCollection, 
  setShowCollection,
  setSavedArticles,
  onNavigate,
  initialOpenJournalIndex = false,
  initialQuery = 'Myopia Management in Children'
}) => {
  // --- Search State ---
  // If initialQuery is empty (user clicked nav link), use default. Otherwise use passed query.
  const [searchInput, setSearchInput] = useState<string>(initialQuery || 'Myopia Management in Children');
  const [activeTab, setActiveTab] = useState<'articles' | 'web'>('articles');
  
  // --- Data State ---
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [spellingSuggestion, setSpellingSuggestion] = useState<string | null>(null);

  // --- Filter State ---
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');

  const isArticleSaved = (id: string) => savedArticles.some(a => a.uid === id);

  // --- Search Logic ---
  const performSearch = useCallback(async (
    term: string, 
    pageNum: number,
    sort: SortOption,
    date: DateFilter
  ) => {
    if (!term.trim()) return;

    setLoading(true);
    setError(null);
    setArticles([]);

    try {
      const offset = (pageNum - 1) * ITEMS_PER_PAGE;
      
      const searchResult: SearchResult = await searchArticles({
        term: term, 
        retstart: offset, 
        retmax: ITEMS_PER_PAGE,
        sortBy: sort,
        dateFilter: date,
        customStartYear: '',
        customEndYear: '',
      });
      
      setTotalResults(searchResult.count);
      
      if (searchResult.ids.length > 0) {
        const summaries = await getArticleSummaries(searchResult.ids);
        setArticles(summaries);
      } else {
        setArticles([]);
      }

      if (pageNum === 1) {
        getSpellingSuggestion(term).then(s => {
             if (s && s.toLowerCase() !== term.toLowerCase()) setSpellingSuggestion(s);
        });
      }

    } catch (err) {
      setError("Unable to connect to clinical index.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial Load
  useEffect(() => {
    performSearch(searchInput, 1, sortBy, dateFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  // Handlers
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setPage(1);
    performSearch(searchInput, 1, sortBy, dateFilter);
  };

  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort);
    setPage(1);
    performSearch(searchInput, 1, newSort, dateFilter);
  };

  const handleDateChange = (newDate: DateFilter) => {
    setDateFilter(newDate);
    setPage(1);
    performSearch(searchInput, 1, sortBy, newDate);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    performSearch(searchInput, newPage, sortBy, dateFilter);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
        
        {/* --- FIXED NAV BAR --- */}
        <nav className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 h-20 transition-all">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-6">
                
                {/* Logo */}
                <div 
                    className="flex items-center gap-3 shrink-0 cursor-pointer group"
                    onClick={() => onNavigate('landing')}
                >
                    <div className="w-10 h-10 bg-navy flex items-center justify-center rounded-xl shadow-lg shadow-navy/20 group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-white text-xl">menu_book</span>
                    </div>
                    <div className="hidden sm:block">
                        <span className="text-xl font-black tracking-tighter text-navy uppercase block leading-none">OptoScholar</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Research Engine</span>
                    </div>
                </div>
                
                {/* Search Bar */}
                <div className="flex-1 max-w-2xl relative">
                    <form onSubmit={handleSearchSubmit}>
                        <div className="bg-slate-100 border border-transparent hover:border-slate-300 focus-within:bg-white focus-within:border-teal rounded-full px-5 py-2.5 flex items-center gap-3 transition-all shadow-inner focus-within:shadow-lg focus-within:shadow-teal/5">
                            <span className="material-symbols-outlined text-slate-400">search</span>
                            <input 
                                className="bg-transparent border-none focus:ring-0 p-0 w-full text-navy font-medium placeholder-slate-400 text-sm sm:text-base" 
                                type="text" 
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <button type="submit" className="text-teal font-bold text-sm hidden sm:block hover:text-teal-700">Search</button>
                        </div>
                    </form>
                </div>
                
                {/* Profile/Library */}
                <div className="flex items-center gap-3 shrink-0">
                    <button 
                        onClick={() => setShowCollection(true)}
                        className="p-2.5 text-slate-400 hover:text-navy hover:bg-slate-100 rounded-full transition-colors relative group"
                        title="My Library"
                    >
                        <span className="material-symbols-outlined">bookmarks</span>
                        {savedArticles.length > 0 && (
                             <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-teal rounded-full border-2 border-white"></span>
                        )}
                    </button>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-light to-white flex items-center justify-center border border-teal/20 text-teal font-extrabold text-sm shadow-sm cursor-pointer hover:shadow-md transition-all">
                        DR
                    </div>
                </div>
            </div>
        </nav>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-12">
            
            {/* --- TOP TOOLBAR --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-slate-200 pb-6">
                
                {/* Source Switcher */}
                <div className="flex bg-slate-100 p-1 rounded-xl shadow-inner">
                    <button 
                        onClick={() => setActiveTab('articles')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'articles' ? 'bg-white text-navy shadow-sm ring-1 ring-black/5' : 'text-slate-500 hover:text-navy'}`}
                    >
                        <BookOpen size={16} /> Journal Articles
                    </button>
                    <button 
                        onClick={() => setActiveTab('web')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'web' ? 'bg-white text-navy shadow-sm ring-1 ring-black/5' : 'text-slate-500 hover:text-navy'}`}
                    >
                        <Globe size={16} /> Web Resources
                    </button>
                </div>

                {/* Filters (Sort & Date) */}
                {activeTab === 'articles' && (
                    <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                        
                        {/* Sort Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:border-slate-300 hover:text-navy transition-all shadow-sm">
                                {sortBy === 'relevance' ? <ArrowUpDown size={14}/> : <Clock size={14}/>}
                                <span>{sortBy === 'relevance' ? 'Best Match' : 'Newest First'}</span>
                                <ChevronDown size={14} className="text-slate-400" />
                            </button>
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible transition-all z-20 overflow-hidden ring-1 ring-black/5">
                                <button onClick={() => handleSortChange('relevance')} className={`w-full text-left px-4 py-3 text-sm hover:bg-slate-50 font-medium ${sortBy === 'relevance' ? 'text-teal bg-teal-light/50' : 'text-slate-700'}`}>Best Match</button>
                                <button onClick={() => handleSortChange('pub_date')} className={`w-full text-left px-4 py-3 text-sm hover:bg-slate-50 font-medium ${sortBy === 'pub_date' ? 'text-teal bg-teal-light/50' : 'text-slate-700'}`}>Newest First</button>
                            </div>
                        </div>

                        {/* Date Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:border-slate-300 hover:text-navy transition-all whitespace-nowrap shadow-sm">
                                <Calendar size={14} />
                                <span>
                                    {dateFilter === 'all' ? 'Any Time' : 
                                     dateFilter === '1year' ? 'Past Year' : 'Past 5 Years'}
                                </span>
                                <ChevronDown size={14} className="text-slate-400" />
                            </button>
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible transition-all z-20 overflow-hidden ring-1 ring-black/5">
                                <button onClick={() => handleDateChange('all')} className={`w-full text-left px-4 py-3 text-sm hover:bg-slate-50 font-medium ${dateFilter === 'all' ? 'text-teal bg-teal-light/50' : 'text-slate-700'}`}>Any Time</button>
                                <button onClick={() => handleDateChange('5years')} className={`w-full text-left px-4 py-3 text-sm hover:bg-slate-50 font-medium ${dateFilter === '5years' ? 'text-teal bg-teal-light/50' : 'text-slate-700'}`}>Past 5 Years</button>
                                <button onClick={() => handleDateChange('1year')} className={`w-full text-left px-4 py-3 text-sm hover:bg-slate-50 font-medium ${dateFilter === '1year' ? 'text-teal bg-teal-light/50' : 'text-slate-700'}`}>Past Year</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {activeTab === 'articles' ? (
                <>
                    {/* Visual Galaxy Graph */}
                    {articles.length > 0 && !loading && (
                        <div className="mb-10 w-full h-[320px] bg-[#0B1120] rounded-2xl overflow-hidden shadow-2xl shadow-navy/20 relative group border border-navy/10">
                            <NetworkGraph articles={articles} totalResults={totalResults} query={searchInput} />
                            <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
                                <div className="w-2 h-2 rounded-full bg-teal shadow-[0_0_8px_rgba(20,184,166,0.8)] animate-pulse"></div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">
                                    Knowledge Graph • {totalResults.toLocaleString()} Nodes
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Results Count & Spelling */}
                    <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end px-1 gap-2">
                        <p className="text-slate-500 text-sm font-medium">
                            Found <span className="font-bold text-navy">{totalResults > 0 ? totalResults.toLocaleString() : 0} results</span>
                        </p>
                        {spellingSuggestion && (
                            <button 
                                onClick={() => { setSearchInput(spellingSuggestion); performSearch(spellingSuggestion, 1, sortBy, dateFilter); }}
                                className="text-sm text-teal font-bold hover:underline bg-teal-light/50 px-3 py-1 rounded-lg"
                            >
                                Did you mean: <span className="italic">{spellingSuggestion}</span>?
                            </button>
                        )}
                    </div>

                    {/* Articles List */}
                    <div className="space-y-6">
                        {loading && (
                            <div className="py-32 flex flex-col items-center justify-center opacity-60">
                                <Loader2 className="animate-spin text-teal mb-4" size={48} />
                                <p className="font-serif text-xl text-navy">Querying Index...</p>
                            </div>
                        )}

                        {!loading && articles.length === 0 && (
                            <div className="py-24 text-center bg-white rounded-2xl border border-slate-100 shadow-sm">
                                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="material-symbols-outlined text-4xl text-slate-300">search_off</span>
                                </div>
                                <h3 className="text-xl font-bold text-navy mb-2 font-serif">No results found</h3>
                                <p className="text-slate-500 max-w-xs mx-auto">We couldn't find any articles matching "{searchInput}". Try adjusting your filters.</p>
                            </div>
                        )}

                        {articles.map((article) => (
                            <ArticleCard 
                                key={article.uid} 
                                article={article}
                                onClick={() => setSelectedArticleId(article.uid)}
                                isSaved={isArticleSaved(article.uid)}
                                onToggleSave={() => onToggleSave(article)}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalResults > 0 && (
                        <Pagination 
                            currentPage={page} 
                            totalResults={totalResults} 
                            itemsPerPage={ITEMS_PER_PAGE} 
                            onPageChange={handlePageChange} 
                        />
                    )}
                </>
            ) : (
                <WebSearchView query={searchInput} />
            )}

        </main>

        {/* --- FOOTER (Sticky Bottom) --- */}
        <footer className="mt-auto bg-white border-t border-slate-100 py-10">
            <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => onNavigate('landing')}>
                    <span className="material-symbols-outlined text-navy">visibility</span>
                    <span className="font-bold tracking-tight text-navy uppercase text-sm">OptoScholar</span>
                </div>
                
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest text-center">
                    © {new Date().getFullYear()} Clinical Research Engine
                </p>
                
                <div className="flex items-center">
                    <a 
                        href="https://focuslinks.in" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-teal-light/50 border border-slate-200 hover:border-teal/30 rounded-lg transition-all"
                    >
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-teal transition-colors">Presented by Focuslinks.in</span>
                        <span className="material-symbols-outlined text-slate-400 text-[12px] group-hover:text-teal transition-colors">open_in_new</span>
                    </a>
                </div>
            </div>
        </footer>

        {/* --- MODALS --- */}
        {selectedArticleId && (
            <AbstractModal 
                articleId={selectedArticleId} 
                article={articles.find(a => a.uid === selectedArticleId)}
                onClose={() => setSelectedArticleId(null)} 
                isSaved={isArticleSaved(selectedArticleId)}
                onToggleSave={() => {
                    const art = articles.find(a => a.uid === selectedArticleId);
                    if (art) onToggleSave(art);
                }}
            />
        )}
      
        {showCollection && (
            <CollectionModal
                savedArticles={savedArticles}
                onClose={() => setShowCollection(false)}
                onRemove={(id) => setSavedArticles(prev => prev.filter(a => a.uid !== id))}
                onArticleClick={(id) => {
                    if (!articles.find(a => a.uid === id)) {
                        const target = savedArticles.find(a => a.uid === id);
                        if (target) setArticles(prev => [...prev, target]);
                    }
                    setSelectedArticleId(id);
                }}
            />
        )}
    </div>
  );
};
