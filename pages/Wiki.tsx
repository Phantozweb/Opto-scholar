
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Book, Search, Menu, ChevronRight, Hash } from 'lucide-react';
import { WIKI_DATA, searchWiki } from '../services/mockData';
import { WikiArticle } from '../types';

export const Wiki: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<WikiArticle>(WIKI_DATA[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Group by category
  const categories = Array.from(new Set(WIKI_DATA.map(a => a.category)));

  const filteredArticles = searchTerm 
    ? searchWiki(searchTerm) 
    : WIKI_DATA;

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-white">
      {/* Sidebar - Desktop */}
      <aside className={`w-80 border-r border-slate-200 bg-slate-50 flex-col ${mobileMenuOpen ? 'flex absolute inset-0 z-20' : 'hidden md:flex'}`}>
        <div className="p-4 border-b border-slate-200 bg-white sticky top-0">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Filter topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-transparent focus:bg-white focus:border-blue-500 focus:outline-none rounded-lg text-sm transition-all"
                />
             </div>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4 space-y-6">
            {searchTerm ? (
                <div className="space-y-1">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Search Results</div>
                    {filteredArticles.map(article => (
                        <button
                            key={article.id}
                            onClick={() => {
                                setSelectedArticle(article);
                                setMobileMenuOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedArticle.id === article.id ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-200/50'}`}
                        >
                            {article.title}
                        </button>
                    ))}
                </div>
            ) : (
                categories.map(category => (
                    <div key={category}>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">{category}</h3>
                        <div className="space-y-0.5">
                            {WIKI_DATA.filter(a => a.category === category).map(article => (
                                <button
                                    key={article.id}
                                    onClick={() => {
                                        setSelectedArticle(article);
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between group ${selectedArticle.id === article.id ? 'bg-white shadow-sm border border-slate-200 text-slate-900' : 'text-slate-500 hover:bg-slate-200/50 hover:text-slate-900'}`}
                                >
                                    {article.title}
                                    {selectedArticle.id === article.id && <ChevronRight size={14} className="text-slate-400" />}
                                </button>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-white relative">
         <div className="max-w-3xl mx-auto px-6 py-10 sm:px-10 lg:px-12">
            
            {/* Mobile Menu Toggle */}
            <button 
                className="md:hidden mb-6 flex items-center gap-2 text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg text-sm font-medium"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                <Menu size={16} /> 
                {mobileMenuOpen ? 'Close Menu' : 'Browse Topics'}
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 font-medium">
                <Book size={14} />
                <span>OptoWiki</span>
                <ChevronRight size={14} />
                <span className="text-slate-600">{selectedArticle.category}</span>
            </div>

            {/* Article Content */}
            <article className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h1:tracking-tight prose-a:text-blue-600 hover:prose-a:text-blue-500">
                <ReactMarkdown>{selectedArticle.content}</ReactMarkdown>
            </article>

            {/* Meta Data */}
            <div className="mt-12 pt-8 border-t border-slate-100">
                <div className="flex flex-wrap gap-4 text-sm">
                    <div className="text-slate-500">
                        <span className="font-bold text-slate-700">Last Updated:</span> {selectedArticle.lastUpdated}
                    </div>
                    {selectedArticle.relatedTerms.length > 0 && (
                        <div className="flex items-center gap-2">
                             <Hash size={14} className="text-slate-400"/>
                             <div className="flex gap-2">
                                {selectedArticle.relatedTerms.map(term => (
                                    <span key={term} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-medium">
                                        {term}
                                    </span>
                                ))}
                             </div>
                        </div>
                    )}
                </div>
            </div>
         </div>
      </main>
    </div>
  );
};
