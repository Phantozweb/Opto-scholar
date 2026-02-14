
import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (term: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term);
    }
  };

  return (
    <div className="w-full relative group">
      <form onSubmit={handleSubmit} className="relative w-full">
        {/* Input Field */}
        <div className="relative flex items-center w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
            </div>
            <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search clinical index..."
            className="block w-full pl-11 pr-4 py-3 bg-slate-100 border border-transparent rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-sm shadow-inner focus:shadow-lg"
            disabled={isLoading}
            />
        </div>
      </form>
    </div>
  );
};
