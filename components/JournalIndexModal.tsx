
import React from 'react';
import { X, BookOpen, ArrowUpRight } from 'lucide-react';
import { JOURNAL_OPTIONS } from '../constants';

interface JournalIndexModalProps {
  onClose: () => void;
  onSelectJournal: (journalValue: string) => void;
}

export const JournalIndexModal: React.FC<JournalIndexModalProps> = ({ onClose, onSelectJournal }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-white/80 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-3xl max-h-[85vh] flex flex-col relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Journal Directory</h2>
            <p className="text-sm text-slate-500 mt-1">Select a publication to view its latest articles.</p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-900 p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6 bg-slate-50/50 scroll-smooth">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {JOURNAL_OPTIONS.map((journal) => (
              <button
                key={journal.value}
                onClick={() => {
                  onSelectJournal(journal.value);
                }}
                className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all group text-left"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center text-xs font-bold group-hover:bg-slate-900 group-hover:text-white transition-colors uppercase">
                  {journal.label.charAt(0)}
                </div>
                <div className="flex-grow">
                    <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 line-clamp-2 leading-snug">
                    {journal.label}
                    </span>
                </div>
                <ArrowUpRight size={14} className="text-slate-300 group-hover:text-slate-900 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
