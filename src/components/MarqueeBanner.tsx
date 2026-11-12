import React from 'react';
import { Flame, Sparkles } from 'lucide-react';

export const MarqueeBanner: React.FC = () => {
  const items = [
    'JUSTDAN BAKEHOUSE',
    'ARTISAN SOURDOUGH',
    'FRENCH PASTRIES & CROISSANTS',
    'SPECIALTY COLD BREW & BOTANICAL SPRITZ',
    'FLASH STONE HEARTH · 285°C',
    'EXPRESS DOORSTEP DELIVERY',
    '24/7 AUTOMATED KIOSKS',
    '72-HOUR WILD FERMENT',
    'ZERO PRESERVATIVES',
  ];

  return (
    <div className="relative py-4 bg-[#0a0a0c] border-y border-zinc-800 overflow-hidden select-none">
      {/* Top Marquee Ribbon */}
      <div className="flex overflow-hidden py-1">
        <div className="animate-marquee flex items-center whitespace-nowrap">
          {items.concat(items).map((text, idx) => (
            <div key={idx} className="flex items-center gap-4 mx-6">
              <span className="font-display font-extrabold text-sm sm:text-base tracking-widest text-zinc-300 uppercase">
                {text}
              </span>
              <Flame className="w-4 h-4 text-amber-500 fill-current" />
            </div>
          ))}
        </div>
      </div>

      {/* Second Reverse Sub-Marquee Ribbon */}
      <div className="flex overflow-hidden py-1 bg-amber-500/10 border-t border-amber-500/20">
        <div className="animate-marquee-reverse flex items-center whitespace-nowrap">
          {[
            'ORDER ONLINE FOR HOME DELIVERY',
            'ACCRA MALL KIOSK',
            'AIRPORT CITY HUB',
            'EAST LEGON STATION',
            'OSU OXFORD ST',
            'KNUST KUMASI',
            'LABONE WALKWAY',
            'NOW DELIVERING ACROSS ACCRA & KUMASI',
          ]
            .concat([
              'ORDER ONLINE FOR HOME DELIVERY',
              'ACCRA MALL KIOSK',
              'AIRPORT CITY HUB',
              'EAST LEGON STATION',
              'OSU OXFORD ST',
              'KNUST KUMASI',
              'LABONE WALKWAY',
              'NOW DELIVERING ACROSS ACCRA & KUMASI',
            ])
            .map((text, idx) => (
              <div key={idx} className="flex items-center gap-3 mx-6">
                <span className="font-mono text-xs font-bold tracking-widest text-amber-400 uppercase">
                  {text}
                </span>
                <Sparkles className="w-3 h-3 text-amber-500" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
