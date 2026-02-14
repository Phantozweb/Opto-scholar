import React from 'react';
import { Eye, BookMarked, Menu } from 'lucide-react';

interface HeaderProps {
  onOpenLibrary: () => void;
  savedCount: number;
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenLibrary, 
  savedCount,
  activePage,
  onNavigate
}) => {
  
  const isAppPage = ['home', 'web', 'assistant'].includes(activePage);

  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-30 transition-all">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between max-w-6xl">
        <div 
          className="flex items-center gap-3 group cursor-pointer" 
          onClick={() => onNavigate('landing')}
        >
          <div className="bg-slate-900 p-2.5 rounded-xl text-white shadow-lg shadow-slate-900/10 group-hover:scale-105 transition-transform duration-300">
            <Eye size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 hidden sm:block">
              Opto<span className="text-slate-500">Atlas</span>
            </h1>
          </div>
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-2 sm:gap-4 text-sm font-medium text-slate-600">
          
          {/* Library Button (Visible on app pages) */}
          {isAppPage ? (
            <button 
              onClick={onOpenLibrary}
              className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-all py-2 px-3 sm:px-4 rounded-full hover:bg-blue-50 relative group"
              title="My Research Library"
            >
              <div className="relative">
                <BookMarked size={20} />
                {savedCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full ring-2 ring-white">
                    {savedCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-semibold">Library</span>
            </button>
          ) : (
             <button 
                onClick={() => onNavigate('login')}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors shadow-sm"
             >
                Login
             </button>
          )}

          <button className="md:hidden p-2 text-slate-600">
             <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};