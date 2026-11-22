
import React from 'react';
import { Text, Language } from '../types';
import { ExternalLinkIcon } from './icons';

interface TextItemProps {
  text: Text;
  language: Language;
  searchTerm: string;
  volumeIndex: number;
  textIndex: number;
}

const HighlightedText: React.FC<{text: string, highlight: string, isTibetan: boolean}> = ({ text, highlight, isTibetan }) => {
    if (!highlight) return <>{text}</>;
    
    const escaped = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('(' + escaped + ')', isTibetan ? 'g' : 'gi');
    const parts = text.split(regex);
    
    return (
        <>
            {parts.map((part, i) =>
                i % 2 === 1 ? (
                    <strong key={i} className="font-bold bg-highlight px-0.5 rounded-sm">{part}</strong>
                ) : (
                    part
                )
            )}
        </>
    );
};


export const TextItem: React.FC<TextItemProps> = ({ text, language, searchTerm, volumeIndex, textIndex }) => {
  const isTibetan = language === 'tib';
  const textToShow = isTibetan ? text.tib : text.eng;
  
  const searchTermTrimmed = searchTerm.trim();
  const isSearching = searchTermTrimmed !== '';
  const normalizedSearchTerm = searchTermTrimmed.toLowerCase();
  
  const isMatch = isSearching && (
      text.eng.toLowerCase().includes(normalizedSearchTerm) ||
      text.tib.includes(searchTermTrimmed)
  );
  
  const id = `volume-${volumeIndex}-text-${textIndex}`;

  return (
    <div id={id} className={`py-4 pl-12 pr-6 border-b border-line last:border-b-0 transition-colors duration-200 group ${isMatch ? 'bg-tint' : ''}`}>
      <p lang={isTibetan ? 'bo' : 'en'} className={`${isTibetan ? 'font-tibetan text-2xl text-ink leading-loose' : 'text-md font-medium'} ${text.link && !isTibetan ? 'text-accent' : 'text-ink'}`}>
        <HighlightedText text={textToShow} highlight={searchTermTrimmed} isTibetan={isTibetan} />
      </p>
      {text.link && !isTibetan && (
        <div className="mt-3">
            <a 
              href={text.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-sm font-semibold px-4 py-2 bg-accent text-on-accent rounded-md hover:brightness-90 transition-colors shadow-sm"
            >
              Purchase the English translation
              <ExternalLinkIcon className="ml-2 h-4 w-4" />
            </a>
        </div>
      )}
    </div>
  );
};
