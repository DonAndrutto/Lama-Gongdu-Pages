
import React from 'react';
import { Volume, Language } from '../types';
import { TextItem } from './TextItem';
import { ChevronDownIcon } from './icons';

interface VolumeItemProps {
  volume: Volume;
  language: Language;
  searchTerm: string;
  isOpen: boolean;
  onToggle: () => void;
  volumeIndex: number;
}

export const VolumeItem: React.FC<VolumeItemProps> = ({ volume, language, searchTerm, isOpen, onToggle, volumeIndex }) => {
  const isTibetan = language === 'tib';
  const volumeTitle = isTibetan ? volume.volume_tib : volume.volume_eng;

  const searchTermTrimmed = searchTerm.trim();
  const normalizedSearchTerm = searchTermTrimmed.toLowerCase();

  const isVolumeTitleMatch = isOpen && searchTermTrimmed && (
      volume.volume_eng.toLowerCase().includes(normalizedSearchTerm) ||
      volume.volume_tib.includes(searchTermTrimmed)
  );

  return (
    <div id={`volume-${volumeIndex}`} className="border border-line rounded-2xl mb-4 bg-surface shadow-sm transition-all duration-300 overflow-hidden">
      <button
        onClick={onToggle}
        className={`w-full flex justify-between items-start p-5 text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent ${isVolumeTitleMatch ? 'bg-tint' : 'hover:bg-soft'}`}
        aria-expanded={isOpen}
        aria-controls={`volume-content-${volumeIndex}`}
      >
        <div className="flex-grow pr-4">
          <h3 lang={isTibetan ? 'bo' : 'en'} className={isTibetan ? 'font-tibetan text-3xl font-semibold text-accent' : 'text-xl font-semibold text-accent'}>
            {volumeTitle}
          </h3>
          <div className={`mt-2 text-muted text-left transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'}`}>
            <p className={`${isTibetan ? 'font-normal' : 'text-base'}`}>
              {volume.short_desc}
            </p>
          </div>
        </div>
        <ChevronDownIcon className={`text-muted transition-transform duration-300 flex-shrink-0 mt-1 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div
        id={`volume-content-${volumeIndex}`}
        className="fold"
        role="region" inert={!isOpen}
      >
        <div className="fold-body bg-surface">
            <div className="px-6 py-5 bg-soft border-y border-line">
                 <p className="text-base text-ink leading-relaxed italic">{volume.long_desc}</p>
            </div>
          {volume.texts.map((text, index) => (
            <TextItem 
                key={index} 
                text={text} 
                language={language} 
                searchTerm={searchTerm} 
                volumeIndex={volumeIndex}
                textIndex={index}
             />
          ))}
        </div>
      </div>
    </div>
  );
};
