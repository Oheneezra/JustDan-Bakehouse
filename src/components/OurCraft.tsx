import React from 'react';
import { Flame, Clock, ShieldCheck, Sparkles, Award, Wheat } from 'lucide-react';
import { FOCACCIA_IMAGE } from '../data/bakeryData';

export const OurCraft: React.FC = () => {
  return (
    <section className="py-20 bg-[#111113] border-t border-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Craft Story & Visual Grid */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={FOCACCIA_IMAGE}
                  alt="Craft baking process - blistered golden garlic focaccia"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Inset Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-5 rounded-2xl bg-zinc-950/90 backdrop-blur-md border border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Wheat className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Zero Commercial Yeast Boosters
                    </h4>
                    <p className="text-xs text-zinc-400">
                      100% naturally leavened with wild lactic bacteria and ancient grains.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pillars of Swagger Bread */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
              <Award className="w-3.5 h-3.5" />
              <span>THE JUSTDAN REVOLUTION</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Why settle for stale bread <br />
              <span className="text-zinc-400 font-normal">when you can eat stone-baked?</span>
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Traditional bakeries bake at 4:00 AM. By afternoon, crusts are rubbery and aroma is lost. JustDan flipped the model: dough is cold-matured for 72 hours, then flash-baked in 180 seconds inside automated stone hearths or delivered fresh to your door.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">72-Hour Ferment</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Breaks down gluten bonds and phytic acid naturally, creating a featherweight digestible crumb.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400">
                  <Flame className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">285°C Stone Deck</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Volcanic heat expansion locks in steam moisture inside while blistering the exterior mahogany crust.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Zero Chemical Preservatives</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Only heritage flour, spring water, sea salt, and wild yeast culture. Nothing artificial ever.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Zero Food Waste</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Loaves are kept in chilled dormant suspension until you order. Zero unsold loaves discarded.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
