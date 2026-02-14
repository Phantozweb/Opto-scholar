import React, { useState } from 'react';

interface HeroProps {
  onSearch: (term: string) => void;
  onNavigate: (page: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <div className="@container">
        <div className="@[480px]:p-4">
            <div 
                className="flex min-h-[560px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4 relative overflow-hidden" 
                style={{
                    backgroundImage: 'linear-gradient(rgba(16, 25, 34, 0.85) 0%, rgba(16, 25, 34, 0.95) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuA_SVQI673aOE8or6-djXG8jI6S0uMBCMZLZfd5tZQwMvUxq5QchiEms4KGbcwZUnbGSVqbtkxd7l9UblS-FgFl49ZT3uniHRJrxDoVxXjbQzvu7OGfBweWhnK0gw9-Obg2VztH1JS1Lgw_rpJiiJzDwSy-CLuXKQdID65RLLhRKY7K7Rb_Nm0sO8jab--X8kPFcKaxvdsoOzEI9xo_KYCIc4DCrd3mAtBi9L8TNd31qECNkbNqiETbzEqlDthxW5fVsf19tNxdby69")'
                }}
            >
                <div className="flex flex-col gap-4 text-center max-w-[800px] z-10 animate-fade-in-up">
                    <span className="uppercase tracking-widest text-primary font-bold text-xs mb-2">Specialized Search Engine</span>
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl lg:text-6xl">
                        Precision Search for Optometry and Ophthalmology
                    </h1>
                    <h2 className="text-slate-300 text-base font-normal leading-relaxed @[480px]:text-lg max-w-2xl mx-auto">
                        Cut through the noise of general academic engines with a specialized tool built for eye-care research.
                    </h2>
                </div>
                <div className="w-full max-w-[640px] z-10 mt-4">
                    <form onSubmit={handleSubmit} className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                            <span className="material-symbols-outlined">search</span>
                        </div>
                        <input 
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                            className="block w-full rounded-lg border-0 bg-white/10 backdrop-blur-md py-4 pl-12 pr-40 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary sm:text-lg sm:leading-6 shadow-xl" 
                            placeholder="Search clinical trials, myopia management, or glaucoma..." 
                            type="text"
                        />
                        <div className="absolute inset-y-0 right-2 flex items-center">
                            <button 
                                type="submit"
                                className="flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary h-10"
                            >
                                Search Eye Research
                            </button>
                        </div>
                    </form>
                    <div className="mt-3 flex justify-center gap-4 text-xs text-slate-400">
                        <span>Popular:</span>
                        <a className="hover:text-white underline decoration-slate-600 underline-offset-4 cursor-pointer" onClick={() => onSearch('Dry Eye')}>Dry Eye</a>
                        <a className="hover:text-white underline decoration-slate-600 underline-offset-4 cursor-pointer" onClick={() => onSearch('Retina')}>Retina</a>
                        <a className="hover:text-white underline decoration-slate-600 underline-offset-4 cursor-pointer" onClick={() => onSearch('Cornea')}>Cornea</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};