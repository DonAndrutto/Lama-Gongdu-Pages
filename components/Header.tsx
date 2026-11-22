
import React from 'react';
import { Language } from '../types';
import { SearchIcon } from './icons';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearchSubmit: () => void;
}

export const Header: React.FC<HeaderProps> = ({ language, setLanguage, searchTerm, setSearchTerm, onSearchSubmit }) => {
  const isTibetan = language === 'tib';
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchSubmit();
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-header backdrop-blur-md py-3 mb-7 border-b border-line">
      <div className="catalogue mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-baseline gap-4">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-accent">
              Lama Gongdu Cycle
            </h1>
            <h2 className="font-tibetan text-2xl text-accent -mb-1">བླ་མ་དགོངས་འདུས་</h2>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto min-w-0">
          {/* Language Toggle */}
          <div className="flex items-center space-x-2.5 text-muted">
            <span className={`text-sm font-semibold transition-colors ${!isTibetan ? 'text-ink' : ''}`}>ENG</span>
            <button
              onClick={() => setLanguage(isTibetan ? 'eng' : 'tib')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-paper ${isTibetan ? 'bg-accent' : 'bg-line'}`}
              aria-pressed={isTibetan}
              aria-label="Toggle language"
            >
              <span className="sr-only">Toggle Language</span>
              <span
                aria-hidden="true"
                className={`inline-block h-5 w-5 transform rounded-full bg-surface shadow ring-0 transition duration-200 ease-in-out ${isTibetan ? 'translate-x-5' : 'translate-x-0'}`}
              />
            </button>
            <span className={`text-lg font-tibetan transition-colors ${isTibetan ? 'text-ink' : ''}`}>བོད་ཡིག</span>
          </div>
          {/* Search Bar */}
          <div className="relative w-full max-w-xs min-w-0">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search texts..."
              className="w-full pl-10 pr-4 py-2 bg-soft border border-line rounded-full text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition"
              aria-label="Search texts"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="text-muted" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
