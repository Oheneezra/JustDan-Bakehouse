import React, { useState } from 'react';
import { Flame, Smartphone, Box, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { HOW_IT_WORKS_STEPS, KIOSK_MACHINE_IMAGE } from '../data/bakeryData';

interface HowItWorksProps {
  onOpenSimulator: () => void;
  onFindKiosk: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({
  onOpenSimulator,
  onFindKiosk,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const stepIcons = [Smartphone, Flame, Box];

  return (
    <section id="how-it-works" className="py-20 bg-[#0d0d0f] border-t border-zinc-800 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HOW SWAGGERS WORKS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Fresh bread from a machine, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              baked hot in 3 minutes.
            </span>
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            No stale plastic bags. No 4:00 AM bakery queues. Our autonomous bakehouse kiosks preserve cold-fermented dough until the exact moment you tap order.
          </p>
        </div>

        {/* Step Selector & Visual Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Interactive Step Cards */}
          <div className="lg:col-span-6 space-y-4">
            {HOW_IT_WORKS_STEPS.map((step, index) => {
              const Icon = stepIcons[index];
              const isSelected = activeStep === index;
              return (
                <div
                  key={step.step}
                  onClick={() => setActiveStep(index)}
                  className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-900/90 border-amber-500/80 shadow-xl shadow-amber-500/10 scale-[1.01]'
                      : 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-display font-extrabold text-lg transition-colors ${
                        isSelected
                          ? 'bg-amber-500 text-zinc-950 shadow-md'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {step.step}
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-zinc-400'}`} />
                          {step.title}
                        </h3>
                        {isSelected && (
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            {step.highlight}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenSimulator}
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                <span>Try Live Baking Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onFindKiosk}
                className="px-4 py-3 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 transition-colors"
              >
                See Kiosk Locations
              </button>
            </div>
          </div>

          {/* Right Column: Automated Machine Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-zinc-700/80 bg-zinc-900 shadow-2xl">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={KIOSK_MACHINE_IMAGE}
                  alt="Swaggers Automated Artisan Bread Kiosk Vending Machine"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />

                {/* Live Machine HUD Overlay */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div className="px-3 py-1.5 rounded-xl bg-zinc-950/85 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>KIOSK STATUS: READY & BAKING</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-zinc-950/85 backdrop-blur-md border border-zinc-800 text-zinc-300 text-xs font-mono">
                    285°C STONE HEARTH
                  </div>
                </div>

                {/* Dynamic Step Callout Banner at bottom */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-zinc-950/95 backdrop-blur-md border border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">
                      Active Demonstration · Step 0{activeStep + 1}
                    </span>
                    <h4 className="text-white font-bold text-sm">
                      {HOW_IT_WORKS_STEPS[activeStep].title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Autonomous</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
