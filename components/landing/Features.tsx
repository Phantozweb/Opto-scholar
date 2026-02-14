
import React from 'react';
import { BookOpen, Globe, ArrowUpRight, Quote } from 'lucide-react';

interface FeaturesProps {
  onNavigate: (page: string) => void;
}

export const Features: React.FC<FeaturesProps> = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
        {/* Feature 1 */}
        <button 
            onClick={() => onNavigate('browse')}
            className="group relative bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-blue-200 transition-all duration-300 text-left"
        >
            <div className="absolute top-6 right-6 text-slate-300 group-hover:text-blue-600 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all">
                <ArrowUpRight size={18} />
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-700 mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Zero Noise</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
                We exclusively index 50+ high-impact eye care journals. Never sift through unrelated medical literature again.
            </p>
        </button>

        {/* Feature 2 */}
        <button 
            onClick={() => onNavigate('home')}
            className="group relative bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-indigo-200 transition-all duration-300 text-left"
        >
            <div className="absolute top-6 right-6 text-slate-300 group-hover:text-indigo-600 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all">
                <ArrowUpRight size={18} />
            </div>
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-700 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Globe size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Verified Resources</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
                Filter out the noise. Retrieve trusted clinical guidelines from the AAO, AOA, and NEI instantly.
            </p>
        </button>

        {/* Feature 3 */}
        <button 
            onClick={() => onNavigate('login')}
            className="group relative bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-300 text-left"
        >
            <div className="absolute top-6 right-6 text-slate-300 group-hover:text-slate-900 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all">
                <ArrowUpRight size={18} />
            </div>
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-700 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Quote size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Citation Manager</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
                Build your bibliography instantly. Save papers and export references in AMA, APA, or MLA formats.
            </p>
        </button>
    </div>
  );
};
