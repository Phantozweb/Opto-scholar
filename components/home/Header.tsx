
import React from 'react';
import { Database, BookOpen, BookMarked, Globe } from 'lucide-react';
import { SearchBar } from '../SearchBar';
import { ArticleSummary } from '../../types';

interface HeaderProps {
  onNavigate: (page: string) => void;
  onSearch: (term: string) => void;
  isLoading: boolean;
  setShowJournalIndex: (show: boolean) => void;
  setShowCollection: (show: boolean) => void;
  savedCount: number;
  activeMode: 'articles' | 'web';
  setActiveMode: (mode: 'articles' | 'web') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  onSearch,
  isLoading,
  setShowJournalIndex,
  setShowCollection,
  savedCount,
  activeMode,
  setActiveMode
}) => {
  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm transition-all duration-300">
      <div className="container mx-auto max-w-6xl px-4 py-4">
        
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            
            {/* Branding & Nav */}
            <div className="flex items-center justify-between md:justify-start gap-6">
                <div 
                    className="flex items-center gap-2.5 cursor-pointer group" 
                    onClick={() => onNavigate('landing')}
                >
                    <div className="bg-slate-900 text-white p-2 rounded-lg shadow-sm group-hover:scale-105 transition-transform">
                        <Database size={18} />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-none">
                            OptoScholar
                        </h1>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                            Research Engine
                        </p>
                    </div>
                </div>

                {/* Desktop Tools */}
                <div className="hidden md:flex gap-2">
                     <button 
                        onClick={() => setShowJournalIndex(true)}
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-all py-1.5 px-3 rounded-lg hover:bg-slate-100 text-xs font-bold uppercase tracking-wide"
                     >
                        <BookOpen size={14} />
                        Journals
                     </button>
                </div>
            </div>

            {/* Search Section */}
            <div className="flex-grow flex gap-3 max-w-2xl">
                <SearchBar onSearch={onSearch} isLoading={isLoading} />
                
                {/* Compact Mode Switcher */}
                <div className="flex bg-slate-100 rounded-xl p-1 flex-shrink-0">
                    <button
                        onClick={() => setActiveMode('articles')}
                        className={`px-3 py-2 rounded-lg transition-all flex items-center gap-2 ${activeMode === 'articles' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                        title="Articles"
                    >
                        <BookOpen size={16} />
                    </button>
                    <button
                        onClick={() => setActiveMode('web')}
                        className={`px-3 py-2 rounded-lg transition-all flex items-center gap-2 ${activeMode === 'web' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                        title="Web Resources"
                    >
                        <Globe size={16} />
                    </button>
                </div>

                {/* Mobile Library Button / Desktop Library */}
                <button 
                    onClick={() => setShowCollection(true)}
                    className="flex items-center justify-center w-12 h-12 md:w-auto md:h-auto md:px-4 md:py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all relative group"
                    title="Library"
                >
                    <BookMarked size={20} className="md:w-4 md:h-4 md:mr-2" />
                    <span className="hidden md:inline text-xs font-bold uppercase tracking-wide">Library</span>
                    {savedCount > 0 && (
                        <span className="absolute -top-1 -right-1 md:top-0.5 md:right-0.5 bg-blue-600 text-white text-[9px] font-bold h-4 w-4 md:h-3.5 md:w-3.5 flex items-center justify-center rounded-full ring-2 ring-white">
                            {savedCount}
                        </span>
                    )}
                </button>
            </div>
        </div>
        
        {/* Mobile Tools Row (Optional, usually visible on small screens) */}
        <div className="flex md:hidden gap-2 mt-4 pt-4 border-t border-slate-100 overflow-x-auto pb-1">
             <button 
                onClick={() => setShowJournalIndex(true)}
                className="flex items-center gap-2 text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap"
             >
                <BookOpen size={14} /> Browse Journals
             </button>
        </div>

      </div>
    </div>
  );
};
