import React, { useState } from 'react';
import { Flame, Play, Clock, Sparkles, MapPin, ShieldCheck, Volume2, VolumeX, Truck, Coffee } from 'lucide-react';
import { HERO_IMAGE, BRAND_SHORT } from '../data/bakeryData';

interface HeroProps {
  onOpenSimulator: () => void;
  onExploreMenu: () => void;
  onFindKiosk: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenSimulator,
  onExploreMenu,
  onFindKiosk,
}) => {
  const [soundActive, setSoundActive] = useState(false);

  // Play crisp crust crackle sound effect using Web Audio API synthesis
  const toggleSound = () => {
    if (!soundActive) {
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const bufferSize = audioCtx.sampleRate * 0.4;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          const decay = Math.exp(-i / (audioCtx.sampleRate * 0.08));
          data[i] = (Math.random() * 2 - 1) * decay * (Math.random() > 0.85 ? 1 : 0.2);
        }
        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 2400;
        filter.Q.value = 3.0;
        noise.connect(filter);
        filter.connect(audioCtx.destination);
        noise.start();
        setSoundActive(true);
        setTimeout(() => setSoundActive(false), 800);
      } catch {
        setSoundActive(!soundActive);
      }
    } else {
      setSoundActive(false);
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-zinc-800/80 bg-gradient-to-b from-[#111113] via-[#141418] to-[#111113]">
      {/* Subtle ambient warm lighting blur */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bold Copy & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Kicker Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
              <span>GHANA&apos;S PREMIER 24/7 ARTISAN BAKERY &amp; E-COMMERCE STORE</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.05] text-balance">
              Hot bread, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-orange-400">
                pastries &amp; drinks.
              </span>
            </h1>

            {/* Body Description */}
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl font-normal">
              Order wild sourdough loaves, flaky French butter croissants, and specialty botanical drinks online for express doorstep delivery, or pick up piping hot in 3 minutes from our 24/7 smart stone-hearth kiosks.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreMenu}
                className="px-6 py-3.5 text-sm font-bold tracking-wider uppercase text-zinc-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-xl shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 cursor-pointer"
              >
                <Flame className="w-4 h-4 fill-current text-zinc-950" />
                <span>Shop Fresh Catalog</span>
              </button>

              <button
                onClick={onOpenSimulator}
                className="px-5 py-3.5 text-sm font-semibold text-white bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-700/80 hover:border-amber-500/60 rounded-xl transition-all flex items-center gap-2.5 shadow-sm group cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch 3-Min Flash Bake</span>
              </button>

              <button
                onClick={onFindKiosk}
                className="px-4 py-3.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>Kiosks &amp; Delivery</span>
              </button>
            </div>

            {/* Quick Badges / Trust points */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-zinc-400 border-t border-zinc-800/80">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400" />
                <span>Express Doorstep Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>180s Stone Flash-Bake</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-amber-400" />
                <span>Fresh Pastries &amp; Cold Brews</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card with Steaming Loaf & Interactive HUD */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-zinc-700/70 bg-zinc-900/80 shadow-2xl shadow-black/80 group">
              {/* Image Container with Ambient Overlay */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden">
                <img
                  src={HERO_IMAGE}
                  alt="Freshly baked artisan wild sourdough bread sliced open steaming with blistered crust"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />

                {/* Floating Status Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-950/85 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-semibold shadow-lg">
                    <Flame className="w-3.5 h-3.5 fill-current text-amber-400 animate-pulse" />
                    <span>Stone Hearth: 285°C</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-zinc-300 text-[11px] font-mono">
                    <span>JustDan Mother Culture · 72h Ferment</span>
                  </div>
                </div>

                {/* Interactive Audio Crunch button */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={toggleSound}
                    title="Click to hear the crust crackle"
                    className="p-2.5 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-700/80 text-zinc-300 hover:text-amber-400 hover:border-amber-400 transition-colors shadow-md flex items-center gap-1.5 text-xs font-medium cursor-pointer"
                  >
                    {soundActive ? (
                      <>
                        <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                        <span className="text-[10px] text-amber-400 font-bold uppercase">Crackling!</span>
                      </>
                    ) : (
                      <>
                        <VolumeX className="w-4 h-4" />
                        <span className="text-[10px] text-zinc-400">Hear Crust</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Bottom Card Ribbon */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-zinc-950/90 backdrop-blur-md border border-zinc-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-bold text-sm tracking-tight">
                      Heritage Wild Sourdough Boule
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Slow fermented 72 hours · Stone-baked in 3 mins
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-zinc-400 block uppercase tracking-wider">Online Price</span>
                    <span className="text-base font-bold font-mono text-amber-400">
                      GH₵ 48.00
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative back glow */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
          </div>
        </div>

        {/* 4-Item KPI Metrics Strip */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-zinc-800/80">
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/70 hover:border-amber-500/40 transition-colors">
            <span className="text-xs text-zinc-400 uppercase tracking-widest font-semibold block mb-1">
              Store Availability
            </span>
            <div className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              24/7 Ordering
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Order anytime online. Fast delivery &amp; automated kiosks.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/70 hover:border-amber-500/40 transition-colors">
            <span className="text-xs text-zinc-400 uppercase tracking-widest font-semibold block mb-1">
              Bake Speed
            </span>
            <div className="font-display text-2xl sm:text-3xl font-bold text-amber-400 tracking-tight">
              180 Secs
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Flash stone-baked right when your order is placed.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/70 hover:border-amber-500/40 transition-colors">
            <span className="text-xs text-zinc-400 uppercase tracking-widest font-semibold block mb-1">
              Product Categories
            </span>
            <div className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Bread &bull; Pastry &bull; Brew
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              From sourdoughs to cold brew and French croissants.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/70 hover:border-amber-500/40 transition-colors">
            <span className="text-xs text-zinc-400 uppercase tracking-widest font-semibold block mb-1">
              Payment &amp; Trust
            </span>
            <div className="font-display text-2xl sm:text-3xl font-bold text-amber-400 tracking-tight">
              100% MoMo &amp; Card
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Instant prompt checkout via MTN, Telecel, Card, or Cash.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
