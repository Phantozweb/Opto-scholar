
import React from 'react';
import { ArticleSummary } from '../types';
import { ArticleCard } from './ArticleCard';

interface ArticleListProps {
  articles: ArticleSummary[];
  onArticleClick: (id: string) => void;
  onToggleSave: (article: ArticleSummary) => void;
  savedArticleIds: Set<string>;
}

export const ArticleList: React.FC<ArticleListProps> = ({ 
  articles, 
  onArticleClick, 
  onToggleSave,
  savedArticleIds 
}) => {
  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <ArticleCard 
          key={article.uid} 
          article={article} 
          onClick={() => onArticleClick(article.uid)} 
          isSaved={savedArticleIds.has(article.uid)}
          onToggleSave={() => onToggleSave(article)}
        />
      ))}
    </div>
  );
};
