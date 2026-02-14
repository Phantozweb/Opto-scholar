
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-navy">visibility</span>
                <span className="font-bold tracking-tight text-navy uppercase text-sm">OptoScholar</span>
            </div>
            <p className="text-slate-500 text-sm font-medium text-center">
                Designed for the Eye-Care Discipline. Dedicated to Clinical Precision.
            </p>
            <div className="flex items-center">
                <a 
                    href="https://focuslinks.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-teal-light/50 border border-slate-200 hover:border-teal/30 rounded-lg transition-all shadow-sm"
                >
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-teal transition-colors">Presented by Focuslinks.in</span>
                    <span className="material-symbols-outlined text-slate-400 text-[12px] group-hover:text-teal transition-colors">open_in_new</span>
                </a>
            </div>
        </div>
        <div className="mt-8 text-center">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">© {new Date().getFullYear()} OptoScholar Academic Research Engine. All Rights Reserved.</p>
        </div>
    </footer>
  );
};
