
import React, { useState } from 'react';
import { Search, Globe, ExternalLink, ShieldCheck } from 'lucide-react';
import { searchWeb } from '../services/mockData';
import { WebSearchResult } from '../types';

export const WebSearch: React.FC = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState<WebSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!term.trim()) return;

    setLoading(true);
    setHasSearched(true);
    setResults([]);

    try {
      const data = await searchWeb(term);
      setResults(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl min-h-[80vh] font-sans">
      <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4">
        <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-2xl mb-4">
            <Globe size={32} />
        </div>
        <h2 className="text-3xl font-black text-slate-900">Web Search</h2>
        <p className="text-slate-500 mt-2">Curated eye care resources from the open web.</p>
      </div>

      <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-10 relative">
        <input 
            type="text" 
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search web resources (e.g., 'Macular degeneration guidelines')"
            className="w-full pl-5 pr-14 py-4 rounded-2xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg"
        />
        <button 
            type="submit" 
            className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-xl transition-colors"
        >
            <Search size={20} />
        </button>
      </form>

      {/* Results Area */}
      {loading ? (
        <div className="space-y-6 max-w-3xl mx-auto">
             {[1,2,3].map(i => (
                 <div key={i} className="animate-pulse">
                     <div className="h-4 bg-slate-100 rounded w-1/3 mb-2"></div>
                     <div className="h-6 bg-slate-100 rounded w-2/3 mb-2"></div>
                     <div className="h-16 bg-slate-100 rounded w-full"></div>
                 </div>
             ))}
        </div>
      ) : (
        <div className="max-w-3xl mx-auto space-y-8">
            {results.length > 0 && (
                <div className="mb-4 text-xs text-slate-400 uppercase tracking-widest font-bold">
                    Top Web Results
                </div>
            )}

            {results.map((result) => (
                <div key={result.id} className="group animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                            <Globe size={12} />
                        </div>
                        <span className="font-medium text-slate-700">{result.source}</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span className="truncate max-w-[200px]">{result.displayUrl}</span>
                    </div>
                    <a href={result.url} target="_blank" rel="noopener noreferrer" className="block group-hover:underline decoration-blue-500/30">
                        <h3 className="text-xl text-blue-700 font-medium mb-2 group-hover:text-blue-800">{result.title}</h3>
                    </a>
                    <p className="text-slate-600 leading-relaxed text-sm">
                        {result.date && <span className="text-slate-400 mr-2">{result.date} —</span>}
                        {result.snippet}
                    </p>
                </div>
            ))}

            {!loading && hasSearched && results.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                    <p>No verified eye care resources found for "{term}".</p>
                </div>
            )}
        </div>
      )}
    </div>
  );
};
