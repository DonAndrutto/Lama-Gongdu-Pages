
import React from 'react';

import SANGYE_LINGPA_SMALL_URL from '../assets/sangye-lingpa.jpg';
const TBRC_LINK = "https://library.bdrc.io/show/bdr:MW01CT0060?s=%2Fshow%2Fbdr%3AP5340";

export const Introduction: React.FC = () => {
    return (
        <div className="intro mb-8 bg-surface p-5 sm:p-8 rounded-2xl shadow-sm border border-line">
            <div className="flow-root"> {/* This will contain the floated image */}
                <img 
                    src={SANGYE_LINGPA_SMALL_URL} 
                    alt="Sangye Lingpa"
                    className="portrait mx-auto sm:float-left sm:mr-8 mb-4 rounded-lg shadow-md border-2 border-line"
                />
                <div className="space-y-4 text-ink">
                    <h2 className="text-3xl font-bold text-ink mb-4">The Lama Gongdü Cycle</h2>
                    <p className="text-base leading-relaxed">
                        The Lama Gongdu cycle, also known as "The Synthesis of the Wisdom Mind of the Guru," is a significant terma (treasure) cycle in the Nyingma school of Tibetan Buddhism, revealed by Sangye Lingpa in the 14th century. It's a vast collection of teachings, encompassing the three inner tantras (Mahayoga, Anuyoga, and Atiyoga) and considered a cornerstone of the Dzogchen tradition.
                    </p>
                    <p className="text-base leading-relaxed">
                        The Lama Gongdu cycle was revealed by the terton (treasure revealer) Sangye Lingpa (1340-1396), who found these treasure texts at Puri Pugmoche in 1364. He transmitted these teachings to the 5th Karmapa Deshin Shegpa (1384-1415), who presented a manuscript of the Lama Gongdu to the Ming Emperor. This ruler rewarded both the Karmapa and the revealer of the texts. It's a comprehensive body of teachings, including practices related to the three inner tantras and Guruyoga. The cycle is considered one of the most important terma cycles in the Nyingma school and is foundational to the entire nine-yana system. The teachings were hidden by Padmasambhava and rediscovered by Sangye Lingpa.
                    </p>
                    <p className="text-sm text-muted italic">
                        Certain aspects of the Lama Gongdu cycle, particularly sadhanas (practice texts), may be restricted and require specific empowerments and instructions from qualified teachers.
                    </p>
                     <div className="pt-4">
                        <a 
                            href={TBRC_LINK} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-3 bg-accent text-on-accent font-semibold rounded-lg hover:brightness-90 transition-colors duration-300 shadow-sm"
                        >
                            View Full Collection on TBRC
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
