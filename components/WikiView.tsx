import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Book, ChevronRight, Hash, Menu, Search } from 'lucide-react';
import { WIKI_DATA, searchWiki } from '../services/mockData';
import { WikiArticle } from '../types';

interface WikiViewProps {
  query: string;
}

export const WikiView: React.FC<WikiViewProps> = ({ query }) => {
  const [selectedArticle, setSelectedArticle] = useState<WikiArticle | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter articles based on the global query
  const filteredArticles = query 
    ? searchWiki(query) 
    : WIKI_DATA;

  // Group by category (of filtered results)
  const categories = Array.from(new Set(filteredArticles.map(a => a.category)));

  // Auto-select first result if query changes and has results
  useEffect(() => {
    if (filteredArticles.length > 0 && query) {
        setSelectedArticle(filteredArticles[0]);
    } else if (!query && !selectedArticle) {
        setSelectedArticle(WIKI_DATA[0]);
    }
  }, [query, filteredArticles.length]); // Added specific dependencies

  return (
    <div className="flex flex-col md:flex-row h-[600px] md:h-[700px] border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 mt-6">
      {/* Sidebar - Desktop */}
      <aside className={`w-full md:w-72 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50 flex-col ${mobileMenuOpen ? 'flex absolute inset-0 z-20 h-full' : 'hidden md:flex'}`}>
        <div className="p-4 border-b border-slate-200 bg-white/50 backdrop-blur sticky top-0 z-10">
             <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {query ? `Results for "${query}"` : 'Encyclopedia'}
             </div>
        </div>
        
        <div className="flex-grow overflow-y-auto p-3 space-y-6">
            {categories.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-sm">
                    No matching topics found.
                </div>
            )}

            {categories.map(category => (
                <div key={category}>
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">{category}</h3>
                    <div className="space-y-0.5">
                        {filteredArticles.filter(a => a.category === category).map(article => (
                            <button
                                key={article.id}
                                onClick={() => {
                                    setSelectedArticle(article);
                                    setMobileMenuOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between group ${selectedArticle?.id === article.id ? 'bg-white shadow-sm border border-slate-200 text-slate-900' : 'text-slate-500 hover:bg-slate-200/50 hover:text-slate-900'}`}
                            >
                                {article.title}
                                {selectedArticle?.id === article.id && <ChevronRight size={14} className="text-slate-400" />}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-white relative p-6 md:p-8 custom-scrollbar">
            {/* Mobile Menu Toggle */}
            <button 
                className="md:hidden mb-4 flex items-center gap-2 text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-medium"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                <Menu size={14} /> 
                {mobileMenuOpen ? 'Close Menu' : 'Topics'}
            </button>

            {selectedArticle ? (
                <>
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-medium uppercase tracking-wide">
                        <Book size={12} />
                        <span>Wiki</span>
                        <ChevronRight size={12} />
                        <span className="text-slate-600">{selectedArticle.category}</span>
                    </div>

                    {/* Article Content */}
                    <article className="prose prose-slate prose-headings:font-bold prose-h1:text-3xl prose-a:text-blue-600 hover:prose-a:text-blue-500 max-w-none">
                        <ReactMarkdown>{selectedArticle.content}</ReactMarkdown>
                    </article>

                    {/* Meta Data */}
                    <div className="mt-12 pt-6 border-t border-slate-100">
                        <div className="flex flex-wrap gap-4 text-xs">
                            <div className="text-slate-500">
                                <span className="font-bold text-slate-700">Last Updated:</span> {selectedArticle.lastUpdated}
                            </div>
                            {selectedArticle.relatedTerms.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <Hash size={12} className="text-slate-400"/>
                                    <div className="flex gap-2">
                                        {selectedArticle.relatedTerms.map(term => (
                                            <span key={term} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                                                {term}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                    <Book size={48} className="mb-4 text-slate-200" />
                    <p>Select a topic to view details</p>
                </div>
            )}
      </main>
    </div>
  );
};