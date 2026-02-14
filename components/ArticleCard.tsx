
import React from 'react';
import { ArticleSummary } from '../types';

interface ArticleCardProps {
  article: ArticleSummary;
  onClick: () => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  onClick, 
  isSaved = false, 
  onToggleSave 
}) => {
  const formatAuthors = () => {
    if (!article.authors || article.authors.length === 0) return 'Unknown Authors';
    const names = article.authors.map(a => a.name);
    if (names.length <= 2) return names.join(' & ');
    return `${names[0]} et al.`;
  };

  return (
    <article className="bg-white rounded-2xl p-8 card-shadow border border-slate-100 transition-all hover:-translate-y-1 hover:shadow-lg group">
      <div className="flex justify-between items-start gap-4 mb-3">
        <h2 
          onClick={onClick}
          className="text-2xl font-bold text-navy leading-snug cursor-pointer hover:text-teal transition-colors font-serif"
        >
          {article.title}
        </h2>
        {onToggleSave && (
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleSave(); }}
            className={`p-2 rounded-full hover:bg-slate-50 transition-colors ${isSaved ? 'text-teal' : 'text-slate-400'}`}
          >
            <span className="material-symbols-outlined">{isSaved ? 'bookmark' : 'bookmark_add'}</span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-4 flex-wrap">
        <span className="text-teal">{formatAuthors()}</span>
        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
        <span className="italic">{article.fulljournalname || article.source}</span>
        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
        <span>{article.pubdate?.split(' ')[0]}</span>
      </div>

      <p 
        onClick={onClick}
        className="academic-serif text-lg text-slate-700 leading-relaxed mb-6 line-clamp-3 cursor-pointer"
      >
        Click to view the full abstract, keywords, and citation analysis. This article was published in {article.source || 'a peer-reviewed journal'} and has been indexed for clinical relevance in eye care.
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        <span className="px-3 py-1 bg-teal-light text-teal text-[10px] font-bold uppercase tracking-wider rounded-full border border-teal/10">
            Peer-Reviewed
        </span>
        <span className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider rounded-full border border-slate-100">
            {article.doctype || "Clinical Study"}
        </span>
      </div>

      <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex gap-8 w-full sm:w-auto justify-between sm:justify-start">
          <button 
            onClick={onClick}
            className="flex items-center gap-1.5 text-xs font-bold text-navy hover:text-teal transition-colors"
          >
            View Abstract
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
          
          <button className="flex items-center gap-1.5 text-xs font-bold text-navy hover:text-teal transition-colors">
            Cite
          </button>
          
          {article.doi && (
            <a 
              href={`https://doi.org/${article.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs font-bold text-navy hover:text-teal transition-colors"
            >
              External Full Text
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </a>
          )}
        </div>
        
        <div className="flex items-center gap-4 text-slate-400">
          <span className="text-[10px] font-bold uppercase tracking-widest">Indexed</span>
        </div>
      </div>
    </article>
  );
};
