
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Language } from './types';
import { lamaGongduData } from './constants';
import { ReadingControls } from './components/ReadingControls';
import { Header } from './components/Header';
import { VolumeItem } from './components/VolumeItem';
import { Introduction } from './components/Introduction';
import { Biography } from './components/Biography';

function App() {
  const [language, setLanguage] = useState<Language>('eng');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearchTerm, setActiveSearchTerm] = useState('');
  const [manuallyOpened, setManuallyOpened] = useState<Set<string>>(new Set());
  const debounceTimer = useRef<number | null>(null);
  
  useEffect(() => () => {
    if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
  }, []);

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
    if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
    }
    if (term.trim() === '') {
        setActiveSearchTerm('');
    } else {
        debounceTimer.current = window.setTimeout(() => {
            setActiveSearchTerm(term);
        }, 2000);
    }
  };

  const handleSearchSubmit = () => {
    if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
    }
    setActiveSearchTerm(searchTerm);
  };

  const searchTermTrimmed = activeSearchTerm.trim();
  const isSearching = searchTermTrimmed !== '';

  const searchResults = useMemo(() => {
    if (!isSearching) {
      return {
        hasAnyMatch: true,
        volumeMatches: new Set<string>(),
        firstMatchId: null
      };
    }
    
    const normalizedSearchTerm = searchTermTrimmed.toLowerCase();
    const matchingVolumeKeys = new Set<string>();
    let hasAnyMatch = false;
    let firstMatchId: string | null = null;

    lamaGongduData.forEach((volume, volIndex) => {
      const volId = `volume-${volIndex}`;
      const volumeTitleEng = volume.volume_eng.toLowerCase();
      const volumeTitleTib = volume.volume_tib;
      
      let volumeHasTextMatch = false;

      // Check for match in volume title
      if (volumeTitleEng.includes(normalizedSearchTerm) || volumeTitleTib.includes(searchTermTrimmed)) {
          matchingVolumeKeys.add(volume.volume_eng);
          hasAnyMatch = true;
          if (!firstMatchId) {
              firstMatchId = volId;
          }
      }

      // Check for match in texts
      volume.texts.forEach((text, textIndex) => {
        const textEng = text.eng.toLowerCase();
        const textTib = text.tib;
        if (textEng.includes(normalizedSearchTerm) || textTib.includes(searchTermTrimmed)) {
          volumeHasTextMatch = true;
          hasAnyMatch = true;
           if (!firstMatchId) {
              firstMatchId = `volume-${volIndex}-text-${textIndex}`;
          }
        }
      });
      
      if (volumeHasTextMatch) {
        matchingVolumeKeys.add(volume.volume_eng);
      }
    });

    return { hasAnyMatch, volumeMatches: matchingVolumeKeys, firstMatchId };
  }, [isSearching, searchTermTrimmed]);
  
  useEffect(() => {
      if (isSearching && searchResults.firstMatchId) {
          const element = document.getElementById(searchResults.firstMatchId);
          if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
      }
  }, [isSearching, searchResults.firstMatchId]);

  const openVolumes = isSearching ? searchResults.volumeMatches : manuallyOpened;

  const handleToggleVolume = (volumeKey: string) => {
      setManuallyOpened(prev => {
          const newSet = new Set(prev);
          if (newSet.has(volumeKey)) {
              newSet.delete(volumeKey);
          } else {
              newSet.add(volumeKey);
          }
          return newSet;
      });
  };
  
  const handleCollapseAll = () => {
    if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
    setManuallyOpened(new Set());
    if (isSearching) {
        setSearchTerm('');
        setActiveSearchTerm('');
    }
  };


  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header
        language={language}
        setLanguage={setLanguage}
        searchTerm={searchTerm}
        setSearchTerm={handleSearchTermChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <main className="catalogue mx-auto px-4 pb-12">
        <Introduction />
        <Biography language={language} />
        
        <div className="mt-12">
            <div className="flex justify-between items-center mb-6 pl-2">
                <h2 className="text-2xl font-bold text-muted">The Fourteen Volumes</h2>
                <button 
                    onClick={handleCollapseAll}
                    className="px-4 py-2 text-sm font-semibold bg-soft text-muted rounded-md hover:bg-line transition-colors"
                >
                    Collapse All
                </button>
            </div>
            {!searchResults.hasAnyMatch && isSearching ? (
              <div className="text-center py-16 text-muted">
                <div className="text-6xl mb-4" role="img" aria-label="shrug">🤷</div>
                <p className="text-xl ">No results found for "{searchTerm}"</p>
                <p className="text-sm mt-2">Try a different search term or clear the search.</p>
              </div>
            ) : (
                lamaGongduData.map((volume, index) => (
                  <VolumeItem
                    key={volume.volume_eng}
                    volume={volume}
                    language={language}
                    searchTerm={activeSearchTerm}
                    isOpen={openVolumes.has(volume.volume_eng)}
                    onToggle={() => handleToggleVolume(volume.volume_eng)}
                    volumeIndex={index}
                  />
                ))
            )}
        </div>
      </main>
      <footer className="text-center py-8 text-muted text-sm border-t border-line">
        <p>An interactive exploration of the Lama Gongdu Cycle.</p>
        <p>May all beings benefit.</p>
        <p className="mt-4">
            <a href="mailto:yeshekhorlo.international@gmail.com" className="hover:text-accent transition-colors">
                yeshekhorlo.international@gmail.com
            </a>
        </p>
      </footer>
      <ReadingControls />
    </div>
  );
}

export default App;
