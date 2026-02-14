
import React, { useState, useEffect } from 'react';
import { Landing } from './pages/Landing';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { ArticleSummary } from './types';

const STORAGE_KEY = 'optoscholar_library_v1';

export default function App() {
  // Routing State
  const [currentPage, setCurrentPage] = useState<string>('landing');
  
  // Search State
  const [initialSearchQuery, setInitialSearchQuery] = useState<string>('');
  
  // Global State (Persisted Library)
  const [savedArticles, setSavedArticles] = useState<ArticleSummary[]>([]);
  
  // Shared UI State (Modals)
  const [showCollection, setShowCollection] = useState<boolean>(false);

  // Load Saved Articles from Local Storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedArticles(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load library", e);
    }
  }, []);

  // Save to Local Storage when library changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedArticles));
  }, [savedArticles]);

  const toggleSaveArticle = (article: ArticleSummary) => {
    setSavedArticles(prev => {
      const exists = prev.find(a => a.uid === article.uid);
      if (exists) {
        return prev.filter(a => a.uid !== article.uid);
      } else {
        return [...prev, article];
      }
    });
  };

  const handleLandingSearch = (term: string) => {
    setInitialSearchQuery(term);
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      {/* Page Routing */}
      {currentPage === 'landing' && (
        <Landing 
          onNavigate={setCurrentPage} 
          onSearch={handleLandingSearch}
        />
      )}
      
      {currentPage === 'login' && <Login onNavigate={setCurrentPage} />}
      
      {(currentPage === 'home' || currentPage === 'browse') && (
        <Home 
          savedArticles={savedArticles}
          setSavedArticles={setSavedArticles}
          onToggleSave={toggleSaveArticle}
          showCollection={showCollection}
          setShowCollection={setShowCollection}
          onNavigate={setCurrentPage}
          initialOpenJournalIndex={currentPage === 'browse'}
          initialQuery={initialSearchQuery}
        />
      )}
    </div>
  );
}
