
import React from 'react';
import { SortOption, DateFilter } from '../types';
import { ArrowUpDown, Calendar, Clock } from 'lucide-react';

interface SearchFiltersProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  dateFilter: DateFilter;
  onDateFilterChange: (filter: DateFilter) => void;
  customStartYear: string;
  customEndYear: string;
  onCustomDateChange: (start: string, end: string) => void;
  disabled: boolean;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  sortBy,
  onSortChange,
  dateFilter,
  onDateFilterChange,
  customStartYear,
  customEndYear,
  onCustomDateChange,
  disabled
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
      
      {/* Sort Toggle */}
      <div className="flex bg-slate-100 rounded-lg p-1">
        <button
          onClick={() => onSortChange('relevance')}
          className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 text-xs font-bold ${sortBy === 'relevance' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
        >
          <ArrowUpDown size={12} /> Best Match
        </button>
        <button
          onClick={() => onSortChange('pub_date')}
          className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 text-xs font-bold ${sortBy === 'pub_date' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
        >
          <Clock size={12} /> Newest
        </button>
      </div>

      <div className="w-px h-4 bg-slate-300 mx-1 hidden sm:block"></div>

      {/* Date Filter */}
      <div className="flex items-center gap-2">
        <div className="relative">
            <Calendar size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
                value={dateFilter}
                onChange={(e) => onDateFilterChange(e.target.value as DateFilter)}
                disabled={disabled}
                className="pl-8 pr-8 py-1.5 bg-slate-100 border border-transparent rounded-lg text-slate-700 text-xs font-bold focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900/10 hover:bg-slate-200 transition-colors cursor-pointer"
            >
                <option value="all">Any Date</option>
                <option value="1year">Past Year</option>
                <option value="5years">Past 5 Years</option>
                <option value="custom">Custom Range</option>
            </select>
        </div>

        {dateFilter === 'custom' && (
          <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-sm animate-in fade-in slide-in-from-left-2">
             <input
              type="number"
              placeholder="YYYY"
              value={customStartYear}
              onChange={(e) => onCustomDateChange(e.target.value, customEndYear)}
              className="w-12 text-center bg-transparent focus:outline-none text-slate-900 font-bold text-xs"
              min="1900"
              max={new Date().getFullYear()}
            />
            <span className="text-slate-300 text-xs">-</span>
            <input
              type="number"
              placeholder="YYYY"
              value={customEndYear}
              onChange={(e) => onCustomDateChange(customStartYear, e.target.value)}
              className="w-12 text-center bg-transparent focus:outline-none text-slate-900 font-bold text-xs"
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>
        )}
      </div>

    </div>
  );
};
