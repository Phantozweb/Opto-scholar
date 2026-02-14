import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { performWebSearch } from '../services/webSearchService';
import { 
  Sparkles, AlertTriangle, FileSearch, Quote, Bot, 
  Send, Loader2, RefreshCw, CheckCircle2 
} from 'lucide-react';

type ToolMode = 'analyst' | 'mistake-finder' | 'originality' | 'citation-helper';

export const ResearchAssistantView: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolMode>('mistake-finder');
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const tools = [
    {
      id: 'mistake-finder',
      name: 'Mistake Finder',
      icon: <AlertTriangle size={18} />,
      desc: 'Identifies common academic writing errors, passive voice overuse, and logical gaps.',
      placeholder: 'Paste your abstract or paragraph here...'
    },
    {
      id: 'analyst',
      name: 'Topic Analyst',
      icon: <FileSearch size={18} />,
      desc: 'Breaks down complex topics, suggests research gaps, and outlines key themes.',
      placeholder: 'Enter a research topic (e.g. "Myopia control efficacy")...'
    },
    {
      id: 'originality',
      name: 'Originality Check',
      icon: <CheckCircle2 size={18} />,
      desc: 'Checks if similar text or concepts exist online (via Web Search).',
      placeholder: 'Paste a sentence or hypothesis to check uniqueness...'
    },
    {
      id: 'citation-helper',
      name: 'Citation Helper',
      icon: <Quote size={18} />,
      desc: 'Suggests how to cite specific data or clarifies citation rules.',
      placeholder: 'Describe the source or paste a raw link...'
    }
  ];

  const handleRunTool = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse(null);

    let promptPrefix = "";
    switch (activeTool) {
      case 'mistake-finder':
        promptPrefix = "Act as a strict academic editor for an ophthalmology journal. Identify writing mistakes, ambiguity, or weak arguments in this text. Be concise: ";
        break;
      case 'analyst':
        promptPrefix = "Act as a senior research analyst. Provide a structured breakdown, potential research gaps, and key concepts for this topic: ";
        break;
      case 'originality':
        promptPrefix = "Search the web to see if this specific text or hypothesis is already widely published. Assess its originality: ";
        break;
      case 'citation-helper':
        promptPrefix = "Act as a citation expert. Provide AMA and APA formatted citations and advice for this source info: ";
        break;
    }

    try {
      // We prepend the prompt to direct the "Web Search" agent to act as a tool
      const result = await performWebSearch(`${promptPrefix} \n\n "${input}"`);
      setResponse(result);
    } catch (e) {
      console.error(e);
      setResponse("I encountered an error connecting to the Research Agent. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const currentTool = tools.find(t => t.id === activeTool);

  return (
    <div className="w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 mt-6">
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar Tools Menu */}
        <div className="md:col-span-4 lg:col-span-3 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">Research Tools</div>
          {tools.map(tool => (
            <button
              key={tool.id}
              onClick={() => { setActiveTool(tool.id as ToolMode); setResponse(null); setInput(''); }}
              className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3 ${
                activeTool === tool.id 
                  ? 'bg-slate-900 border-slate-900 text-white shadow-md' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className={`${activeTool === tool.id ? 'text-blue-300' : 'text-slate-400'}`}>
                {tool.icon}
              </div>
              <div>
                <div className="font-bold text-sm">{tool.name}</div>
              </div>
            </button>
          ))}
          
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 mt-6">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase mb-2">
              <Bot size={14} /> AI Powered
            </div>
            <p className="text-xs text-indigo-900/70 leading-relaxed">
              These tools utilize our active web agent to analyze text and search the web in real-time.
            </p>
          </div>
        </div>

        {/* Main Work Area */}
        <div className="md:col-span-8 lg:col-span-9">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
            
            {/* Tool Header */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                {currentTool?.icon}
                {currentTool?.name}
              </h2>
              <p className="text-slate-500 text-sm mt-1">{currentTool?.desc}</p>
            </div>

            {/* Input / Output Area */}
            <div className="flex-1 p-6 flex flex-col gap-6">
              
              {!response && (
                <div className="relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={currentTool?.placeholder}
                    className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none text-slate-900 placeholder:text-slate-400"
                  />
                  <div className="absolute bottom-3 right-3">
                    <button 
                      onClick={handleRunTool}
                      disabled={loading || !input.trim()}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                      {loading ? <Loader2 size={16} className="animate-spin"/> : <Send size={16} />}
                      {loading ? 'Analyzing...' : 'Run Analysis'}
                    </button>
                  </div>
                </div>
              )}

              {loading && !response && (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 animate-in fade-in">
                  <Loader2 size={32} className="animate-spin text-blue-500 mb-4" />
                  <p className="text-sm font-medium">The agent is processing your request...</p>
                </div>
              )}

              {response && (
                <div className="flex-1 animate-in fade-in slide-in-from-bottom-2">
                   <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide flex items-center gap-2">
                        <Sparkles size={14} className="text-purple-500"/> Analysis Result
                      </h3>
                      <button 
                        onClick={() => setResponse(null)} 
                        className="text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <RefreshCw size={12} /> New Check
                      </button>
                   </div>
                   
                   <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                      <article className="prose prose-sm prose-slate max-w-none prose-headings:font-bold prose-p:leading-relaxed">
                        <ReactMarkdown>{response}</ReactMarkdown>
                      </article>
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
