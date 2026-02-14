
import React, { useState } from 'react';
import { X, Trash2, Download, Copy, CheckCircle2 } from 'lucide-react';
import { ArticleSummary } from '../types';

interface CollectionModalProps {
  savedArticles: ArticleSummary[];
  onRemove: (id: string) => void;
  onClose: () => void;
  onArticleClick: (id: string) => void;
}

export const CollectionModal: React.FC<CollectionModalProps> = ({ 
  savedArticles, 
  onRemove, 
  onClose,
  onArticleClick
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCitation = (article: ArticleSummary) => {
    // Basic AMA/APA style citation generation
    const authorText = article.authors && article.authors.length > 0 
      ? article.authors[0].name + (article.authors.length > 1 ? " et al." : "") 
      : "Unknown Author";
      
    const text = `${authorText}. ${article.title}. ${article.fulljournalname || article.source}. ${article.pubdate};${article.volume || ''}(${article.issue || ''}):${article.pages || ''}. ${article.doi ? `doi:${article.doi}` : ''}`;
    
    navigator.clipboard.writeText(text);
    setCopiedId(article.uid);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportCSV = () => {
    if (savedArticles.length === 0) return;

    // CSV Header
    const headers = ["Title", "Authors", "Journal", "Publication Date", "DOI", "Article ID"];
    
    // CSV Rows
    const rows = savedArticles.map(article => {
        const authors = article.authors.map(a => a.name).join("; ");
        return [
            `"${article.title.replace(/"/g, '""')}"`, // Escape quotes
            `"${authors}"`,
            `"${article.fulljournalname || article.source}"`,
            `"${article.pubdate}"`,
            `"${article.doi || ''}"`,
            `"${article.uid}"`
        ].join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "optoatlas_library_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/80 backdrop-blur">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span className="material-symbols-outlined text-teal">bookmarks</span>
              My Library
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {savedArticles.length} saved article{savedArticles.length !== 1 && 's'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-0 bg-slate-50/50">
          {savedArticles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center p-8">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                <span className="material-symbols-outlined text-3xl">bookmark_border</span>
              </div>
              <h3 className="text-lg font-bold text-slate-700 mb-2">Your library is empty</h3>
              <p className="text-slate-500 max-w-xs">Save articles from search results to build your collection for citation and review.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {savedArticles.map((article) => (
                <div key={article.uid} className="p-5 bg-white hover:bg-slate-50 transition-colors group flex gap-4">
                  <div className="flex-grow cursor-pointer" onClick={() => onArticleClick(article.uid)}>
                    <h3 className="font-bold text-slate-800 mb-2 group-hover:text-teal transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-xs text-slate-500 mb-2">
                      <span className="font-medium text-slate-700">{article.authors?.[0]?.name} et al.</span>
                      <span>•</span>
                      <span className="italic">{article.fulljournalname || article.source}</span>
                      <span>•</span>
                      <span>{article.pubdate}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 items-end justify-start pl-2">
                    <button 
                      onClick={() => onRemove(article.uid)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove from library"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleCopyCitation(article)}
                      className={`p-2 rounded-lg transition-colors ${copiedId === article.uid ? 'text-green-600 bg-green-50' : 'text-slate-400 hover:text-teal hover:bg-teal-light'}`}
                      title="Copy Citation"
                    >
                      {copiedId === article.uid ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {savedArticles.length > 0 && (
          <div className="p-4 bg-white border-t border-slate-100 flex justify-end gap-3 z-20">
             <button 
                onClick={handleExportCSV}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-sm transition-colors"
             >
                <Download size={16} />
                Export CSV
             </button>
          </div>
        )}
      </div>
    </div>
  );
};
