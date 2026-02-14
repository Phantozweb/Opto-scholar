
import React, { useState } from 'react';
import { X, Trash2, Download, Copy, FileText, CheckCircle2 } from 'lucide-react';
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
            <h2 className="text-xl font-bold text-slate-800 flex