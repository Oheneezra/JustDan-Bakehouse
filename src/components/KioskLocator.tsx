import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Thermometer, Flame, CheckCircle2, Search, Sparkles } from 'lucide-react';
import { KIOSK_LOCATIONS } from '../data/bakeryData';
import { KioskLocation } from '../types';

interface KioskLocatorProps {
  onSelectKiosk: (kiosk: KioskLocation) => void;
  onOpenHostModal: () => void;
}

export const KioskLocator: React.FC<KioskLocatorProps> = ({
  onSelectKiosk,
  onOpenHostModal,
}) => {
  const [selectedCity, setSelectedCity] = useState<'All' | 'Accra' | 'Kumasi'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeKiosk, setActiveKiosk] = useState<KioskLocation>(KIOSK_LOCATIONS[0]);

  const filteredKiosks = KIOSK_LOCATIONS.filter((kiosk) => {
    const matchesCity = selectedCity === 'All' || kiosk.city === selectedCity;
    const matchesQuery =
      kiosk.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kiosk.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kiosk.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesQuery;
  });

  return (
    <section id="kiosks" className="py-20 bg-[#0d0d0f] border-t border-zinc-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-amber-400 uppercase mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>LIVE KIOSK NETWORK</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Find a JustDan Station <br />
              <span className="text-zinc-400 font-normal">near you, open 24/7.</span>
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            Located in high-traffic commercial plazas, fuel stations, and university hubs. Walk up, scan, and collect hot bread in 3 minutes.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            {(['All', 'Accra', 'Kumasi'] as const).map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCity === city
                    ? 'bg-amber-500 text-zinc-950 shadow-md'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {city === 'All' ? 'All Locations' : city}
              </button>
            ))}
          </div>

          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search area (e.g. Airport, Osu, East Legon)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Locations Grid & Interactive Map Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* List of Kiosks */}
          <div className="lg:col-span-7 space-y-4">
            {filteredKiosks.map((kiosk) => {
              const isSelected = activeKiosk.id === kiosk.id;
              return (
                <div
                  key={kiosk.id}
                  onClick={() => setActiveKiosk(kiosk)}
                  className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-900/95 border-amber-500 shadow-xl shadow-amber-500/10'
                      : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                          {kiosk.status === 'online' ? 'Online & Baking' : 'Baking Rush Hour'}
                        </span>
                        <span className="text-zinc-600">·</span>
                        <span className="text-[11px] font-semibold text-zinc-400">
                          {kiosk.city}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-white mt-1">
                        {kiosk.name}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {kiosk.address}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-right">
                        <span className="text-[10px] text-zinc-500 uppercase block">Oven Temp</span>
                        <span className="font-mono text-xs font-bold text-amber-400 flex items-center justify-end gap-1">
                          <Thermometer className="w-3 h-3" />
                          {kiosk.ovenTempC}°C
                        </span>
                      </div>
                      <div className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-right">
                        <span className="text-[10px] text-zinc-500 uppercase block">Wait</span>
                        <span className="font-mono text-xs font-bold text-white">
                          ~{kiosk.approxWaitMins}m
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Feature badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800/80">
                    {kiosk.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-300"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Actions inside card */}
                  <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between">
                    <span className="text-xs text-zinc-400 font-mono">
                      🕒 {kiosk.hours}
                    </span>
                    <div className="flex items-center gap-3">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          kiosk.name + ' ' + kiosk.address
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Get Directions</span>
                      </a>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectKiosk(kiosk);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold"
                      >
                        Select Kiosk
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Stylized Live Network Map Card */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-white">
                    {activeKiosk.name}
                  </h3>
                  <p className="text-xs text-zinc-400">{activeKiosk.area}, {activeKiosk.city}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold">
                  24/7 ACTIVE
                </span>
              </div>

              {/* Graphic Map Canvas View */}
              <div className="relative aspect-[4/3] rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                {/* SVG Map Grid Background */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 1px 1px, #f59e0b 1px, transparent 0)',
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Central Beacon Pin */}
                <div className="relative z-10 space-y-3">
                  <div className="relative inline-block">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-zinc-950 shadow-2xl shadow-amber-500/30 mx-auto animate-pulse">
                      <Flame className="w-8 h-8 fill-current text-zinc-950" />
                    </div>
                    <div className="absolute -inset-2 bg-amber-500/20 rounded-2xl -z-10 animate-ping" />
                  </div>

                  <div>
                    <span className="font-display text-sm font-bold text-white block">
                      {activeKiosk.name}
                    </span>
                    <span className="text-xs text-zinc-400 block font-mono mt-0.5">
                      GPS: {activeKiosk.coordinates.lat.toFixed(4)}° N, {Math.abs(activeKiosk.coordinates.lng).toFixed(4)}° W
                    </span>
                  </div>

                  <div className="pt-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-amber-300">
                      ⚡ Ready to bake: {activeKiosk.loavesReady} loaves in queue
                    </span>
                  </div>
                </div>
              </div>

              {/* Want a machine at your venue card */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    Want a Swaggers Machine at your venue?
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  We install and maintain autonomous bread kiosks at campuses, malls, residential towers, and corporate forecourts with zero upfront capital.
                </p>
                <button
                  onClick={onOpenHostModal}
                  className="w-full mt-2 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Request a Machine at My Location
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
