
import React, { useState, useEffect } from 'react';
import { getArticleAbstract, getArticleKeywords } from '../services/pubmedService';
import { ArticleSummary } from '../types';
import { 
  X, ExternalLink, Tag, Loader2, Bookmark, 
  Link as LinkIcon, GraduationCap, Quote, Copy, Check 
} from 'lucide-react';

interface AbstractModalProps {
  articleId: string;
  article?: ArticleSummary;
  onClose: () => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

type CitationStyle = 'AMA' | 'APA' | 'MLA';

export const AbstractModal: React.FC<AbstractModalProps> = ({ 
  articleId, 
  article, 
  onClose,
  isSaved,
  onToggleSave,
}) => {
  const [abstract, setAbstract] = useState<string>('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [copyingCitation, setCopyingCitation] = useState<boolean>(false);
  const [citationStyle, setCitationStyle] = useState<CitationStyle>('AMA');

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      
      try {
        const [absText, keys] = await Promise.all([
          getArticleAbstract(articleId),
          getArticleKeywords(articleId)
        ]);
        
        if (mounted) {
          setAbstract(absText);
          setKeywords(keys);
          setLoading(false);
        }

      } catch (err) {
        if (mounted) {
            setAbstract('Failed to load abstract.');
            setLoading(false);
        }
      }
    };

    fetchData();

    return () => { mounted = false; };
  }, [articleId]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleCopyCitation = () => {
    if (!article) return;
    setCopyingCitation(true);
    
    let text = "";
    const authors = article.authors || [];
    const firstAuthor = authors[0]?.name || "Unknown";
    const authorText = authors.length > 1 ? `${firstAuthor} et al` : firstAuthor;
    const allAuthors = authors.map(a => a.name).join(", ");

    if (citationStyle === 'AMA') {
      text = `${allAuthors}. ${article.title}. ${article.fulljournalname || article.source}. ${article.pubdate};${article.volume || ''}(${article.issue || ''}):${article.pages || ''}. ${article.doi ? `doi:${article.doi}` : ''}`;
    } else if (citationStyle === 'APA') {
       const year = article.pubdate.split(' ')[0] || 'n.d.';
       text = `${authorText}. (${year}). ${article.title}. *${article.fulljournalname || article.source}*, *${article.volume || ''}*(${article.issue || ''}), ${article.pages || ''}.`;
    } else {
       const year = article.pubdate.split(' ')[0] || 'n.d.';
       text = `${authorText}. "${article.title}." ${article.fulljournalname || article.source} ${article.volume || ''}.${article.issue || ''} (${year}): ${article.pages || ''}.`;
    }
    
    text = text.replace(/\*/g, '');
    
    navigator.clipboard.writeText(text);
    setTimeout(() => setCopyingCitation(false), 2000);
  };

  // Helper to format abstract text for better readability
  const renderFormattedAbstract = (text: string) => {
      return text.split('\n\n').map((paragraph, index) => {
          const colonIndex = paragraph.indexOf(':');
          if (colonIndex > -1 && colonIndex < 30) {
              const label = paragraph.substring(0, colonIndex + 1);
              const content = paragraph.substring(colonIndex + 1);
              return (
                  <p key={index} className="mb-6">
                      <span className="font-bold text-navy block sm:inline mr-2">{label}</span>
                      {content}
                  </p>
              );
          }
          return <p key={index} className="mb-6">{paragraph}</p>;
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-slate-100 bg-white z-20">
          <div className="pr-8">
             <h2 className="font-bold text-slate-900 text-xl sm:text-3xl leading-snug font-serif">
               {article?.title || 'Article Details'}
             </h2>
             <div className="flex flex-wrap gap-3 mt-3 text-sm text-slate-500 items-center">
               <span className="font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-md">{article?.authors?.[0]?.name} et al.</span>
               <span className="italic font-medium text-lg">{article?.fulljournalname || article?.source}</span>
               <span className="text-slate-300">•</span>
               <span>{article?.pubdate}</span>
             </div>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
             {onToggleSave && (
               <button
                 onClick={onToggleSave}
                 className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all mr-2 ${
                   isSaved 
                   ? 'bg-teal text-white shadow-md shadow-teal/20' 
                   : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                 }`}
               >
                 <Bookmark size={18} className={isSaved ? "fill-current" : ""} />
                 <span className="hidden sm:inline">{isSaved ? "Saved" : "Save"}</span>
               </button>
             )}

             <button 
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-full transition-colors"
             >
                <X size={24} />
             </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-grow overflow-hidden flex flex-col lg:flex-row h-full relative bg-white">
          
          {/* LEFT COLUMN: Main Content */}
          <div className="flex-1 p-8 lg:p-10 lg:border-r border-slate-100 overflow-y-auto custom-scrollbar">
            
               {loading ? (
                 <div className="flex flex-col items-center justify-center h-64 space-y-4">
                   <Loader2 className="animate-spin text-teal h-10 w-10" />
                   <p className="text-slate-500 font-medium">Retrieving abstract...</p>
                 </div>
               ) : (
                 <div className="animate-in fade-in slide-in-from-left-4 duration-300 max-w-3xl mx-auto">
                   <div className="prose prose-slate prose-lg max-w-none text-slate-700 leading-loose">
                     {renderFormattedAbstract(abstract)}
                   </div>

                   {keywords.length > 0 && (
                     <div className="mt-10 pt-8 border-t border-slate-100">
                       <div className="flex items-center gap-2 mb-4">
                         <Tag className="text-teal" size={18} />
                         <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Keywords</h4>
                       </div>
                       <div className="flex flex-wrap gap-2">
                         {keywords.map((k, i) => (
                           <span key={i} className="px-3 py-1.5 bg-slate-50 text-slate-700 text-sm font-medium rounded-full border border-slate-200">
                             {k}
                           </span>
                         ))}
                       </div>
                     </div>
                   )}
                 </div>
               )}
          </div>

          {/* RIGHT COLUMN: Sidebar */}
          <div className="w-full lg:w-80 bg-slate-50/50 flex flex-col border-t lg:border-t-0 z-10 h-auto lg:h-full overflow-y-auto">
             
             {/* External Links */}
             <div className="p-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <LinkIcon size={14} /> Full Text & Data
                </h4>
                
                <div className="space-y-3">
                  {article?.doi ? (
                    <a 
                      href={`https://doi.org/${article.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-xl bg-navy hover:bg-slate-800 text-white shadow-lg shadow-navy/20 transition-all group"
                    >
                      <span className="font-bold">Read Full Paper</span>
                      <ExternalLink size={18} className="text-white/70 group-hover:text-white" />
                    </a>
                  ) : (
                     <div className="p-3 bg-white text-slate-400 text-sm rounded-lg text-center italic border border-slate-200">
                        DOI not available
                     </div>
                  )}

                  <a 
                    href={`https://scholar.google.com/scholar?q=${encodeURIComponent(article?.title || '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-teal/30 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 text-slate-600 p-2 rounded-lg group-hover:bg-teal-light group-hover:text-teal transition-colors">
                        <GraduationCap size={18} />
                      </div>
                      <span className="font-bold text-slate-700 text-sm">Google Scholar</span>
                    </div>
                    <ExternalLink size={14} className="text-slate-300 group-hover:text-teal" />
                  </a>

                   <a 
                    href={`https://pubmed.ncbi.nlm.nih.gov/${articleId}/`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-teal/30 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 text-slate-600 p-2 rounded-lg group-hover:bg-teal-light group-hover:text-teal transition-colors">
                         <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20M2 12l5-5m-5 5l5 5"/></svg>
                      </div>
                      <span className="font-bold text-slate-700 text-sm">View at NLM</span>
                    </div>
                    <ExternalLink size={14} className="text-slate-300 group-hover:text-teal" />
                  </a>
                </div>
             </div>

             {/* Citation Tools */}
             <div className="p-6 border-t border-slate-200 flex-grow">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                   <Quote size={14} /> Citation Manager
                </h4>

                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                   <div className="flex gap-2 mb-3">
                      {(['AMA', 'APA', 'MLA'] as CitationStyle[]).map(style => (
                        <button 
                           key={style}
                           onClick={() => setCitationStyle(style)}
                           className={`flex-1 text-xs font-bold px-2 py-1.5 rounded-md transition-all ${citationStyle === style ? 'bg-navy text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                        >
                           {style}
                        </button>
                      ))}
                   </div>

                   <button 
                      onClick={handleCopyCitation}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-teal-light text-teal hover:bg-teal hover:text-white border border-teal/10 hover:border-teal transition-all text-sm font-bold"
                   >
                      {copyingCitation ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy Citation</>}
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
