
import React from 'react';

interface HeaderProps {
    onNavigate?: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate?.('landing')}>
                <div className="w-10 h-10 bg-navy flex items-center justify-center rounded-lg shadow-lg">
                    <span className="material-symbols-outlined text-white">menu_book</span>
                </div>
                <span className="text-2xl font-black tracking-tighter text-navy uppercase">OptoScholar</span>
            </div>
            <div className="hidden md:flex items-center gap-10">
                <a className="text-sm font-semibold hover:text-teal transition-colors cursor-pointer" onClick={() => onNavigate?.('home')}>Literature</a>
                <a className="text-sm font-semibold hover:text-teal transition-colors cursor-pointer" onClick={() => onNavigate?.('browse')}>Journals</a>
                <a className="text-sm font-semibold hover:text-teal transition-colors cursor-pointer">Institutions</a>
                <button 
                    onClick={() => onNavigate?.('login')}
                    className="bg-navy text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-teal transition-all shadow-md"
                >
                    Sign In
                </button>
            </div>
             {/* Mobile Menu Icon */}
             <div className="md:hidden text-navy cursor-pointer">
                <span className="material-symbols-outlined">menu</span>
             </div>
        </div>
    </nav>
  );
};
