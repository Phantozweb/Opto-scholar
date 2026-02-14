
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Globe, Sparkles, AlertCircle, Loader2, ChevronDown, Table as TableIcon, BookOpen, ExternalLink } from 'lucide-react';
import { performWebSearch } from '../services/webSearchService';

interface WebSearchViewProps {
  query: string;
}

// Helper component for the collapsible sources section
const SourceAccordion = ({ children }: { children?: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="not-prose my-8 border border-teal/20 rounded-xl overflow-hidden bg-white shadow-sm transition-all hover:shadow-md">
      <button
         onClick={() => setIsOpen(!isOpen)}
         className="w-full flex items-center justify-between px-6 py-4 bg-teal-light/30 hover:bg-teal-light/50 transition-colors text-navy group cursor-pointer"
      >
         <span className="font-bold font-serif text-lg flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-lg shadow-sm text-teal">
                <BookOpen size={16} />
            </div>
            Sources & References
         </span>
         <div className={`transform transition-transform duration-300 bg-white p-1 rounded-full text-teal shadow-sm ${isOpen ? 'rotate-180' : ''}`}>
             <ChevronDown size={16} />
         </div>
      </button>
      
      {/* Animated Height Container */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
         <div className="p-6 bg-slate-50/80 text-sm text-slate-600 border-t border-teal/10 space-y-2">
            {/* We render the children (the list of links) here */}
            <div className="prose prose-sm prose-slate max-w-none prose-a:text-teal prose-a:font-semibold hover:prose-a:underline prose-ul:my-0 prose-li:my-1">
                {children}
            </div>
         </div>
      </div>
    </div>
  );
};

export const WebSearchView: React.FC<WebSearchViewProps> = ({ query }) => {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResponse(null);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);
      setResponse(null);

      try {
        const agentResponse = await performWebSearch(query);
        setResponse(agentResponse);
      } catch (e: any) {
        console.error(e);
        setError(e.message || "Unable to retrieve web results at this time. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (!query) {
    return (
       <div className="text-center py-24 text-slate-400 animate-in fade-in">
          <div className="inline-flex items-center justify-center p-6 bg-slate-100 rounded-3xl mb-6 shadow-inner">
             <Globe size={48} className="text-teal opacity-80" />
          </div>
          <h3 className="text-xl font-bold text-navy mb-2 font-serif">Smart Web Search</h3>
          <p className="text-sm max-w-sm mx-auto">Enter a clinical topic above to receive a comprehensive, AI-curated summary from verified web sources.</p>
       </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 mt-2 pb-12">
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-6">
             <div className="relative">
                <div className="absolute inset-0 bg-teal-light rounded-full animate-ping opacity-75"></div>
                <div className="bg-white p-4 rounded-full relative shadow-sm border border-slate-100">
                    <Loader2 className="animate-spin text-teal h-8 w-8" />
                </div>
             </div>
             <p className="text-slate-500 font-bold tracking-wide animate-pulse font-serif">Consulting Web Agent...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center text-red-700 mx-auto max-w-lg shadow-sm">
             <AlertCircle className="mx-auto mb-3 h-10 w-10 text-red-500" />
             <p className="font-bold text-lg font-serif">Search Failed</p>
             <p className="text-sm mt-2 opacity-90">{error}</p>
        </div>
      ) : response ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-navy/5 overflow-hidden ring-1 ring-slate-900/5">
            {/* Header */}
            <div className="bg-slate-50/80 backdrop-blur border-b border-slate-100 px-8 py-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-teal p-2.5 rounded-xl text-white shadow-lg shadow-teal/20">
                       <Sparkles size={20} />
                    </div>
                    <div>
                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">AI Research Assistant</span>
                        <h2 className="text-navy font-serif font-bold text-xl leading-none">Research Summary</h2>
                    </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                    <Globe size={12} />
                    <span>Verified Sources</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
                <article className="prose prose-slate prose-lg max-w-none 
                    prose-headings:font-serif prose-headings:font-bold prose-headings:text-navy 
                    prose-h1:text-3xl sm:prose-h1:text-4xl prose-h1:mb-6 prose-h1:leading-tight
                    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-teal prose-h2:font-semibold prose-h2:tracking-tight prose-h2:border-b prose-h2:border-slate-100 prose-h2:pb-2
                    prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-navy prose-h3:font-bold prose-h3:uppercase prose-h3:tracking-wide
                    prose-p:text-slate-600 prose-p:leading-8 prose-p:mb-6
                    prose-a:text-teal prose-a:no-underline hover:prose-a:text-teal-700 hover:prose-a:underline prose-a:font-semibold prose-a:break-all
                    prose-strong:text-navy prose-strong:font-black
                    prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
                    prose-li:text-slate-600 prose-li:marker:text-teal prose-li:leading-relaxed
                    prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-navy prose-code:font-mono prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-['']
                    prose-hr:border-slate-100 prose-hr:my-10
                ">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            // Custom Table Renderers with responsive wrapper
                            table: ({node, ...props}) => (
                                <div className="my-8 rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
                                    <table className="min-w-full text-left text-sm border-collapse" {...props} />
                                </div>
                            ),
                            thead: ({node, ...props}) => (
                                <thead className="bg-slate-50 text-navy font-bold uppercase tracking-wider border-b border-slate-200" {...props} />
                            ),
                            tbody: ({node, ...props}) => (
                                <tbody className="bg-white divide-y divide-slate-100" {...props} />
                            ),
                            tr: ({node, ...props}) => (
                                <tr className="hover:bg-slate-50/60 transition-colors" {...props} />
                            ),
                            th: ({node, ...props}) => (
                                <th className="px-6 py-4 font-bold text-xs whitespace-nowrap bg-slate-50" {...props} />
                            ),
                            td: ({node, ...props}) => (
                                <td className="px-6 py-4 text-slate-600 align-top leading-relaxed border-b border-slate-50 last:border-0" {...props} />
                            ),
                            // Custom Link Renderer for Clickable Sources
                            a: ({node, ...props}) => (
                                <a 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-teal font-bold hover:underline decoration-teal/30 underline-offset-2 break-words inline-flex items-center gap-1"
                                    {...props}
                                >
                                    {props.children}
                                    <ExternalLink size={12} className="opacity-50 flex-shrink-0" />
                                </a>
                            ),
                            // Custom Source/Blockquote Renderer
                            blockquote: ({node, ...props}: any) => (
                                <SourceAccordion>{props.children}</SourceAccordion>
                            )
                        }}
                    >
                        {response}
                    </ReactMarkdown>
                </article>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex items-center justify-between text-slate-400">
                <span className="text-[10px] font-bold uppercase tracking-wide">
                    Generated by OptoScholar Agent
                </span>
                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide">
                    <AlertCircle size={12} />
                    Verify with primary sources
                </span>
            </div>
        </div>
      ) : null}
    </div>
  );
};
