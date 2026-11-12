import React, { useState } from 'react';
import { Package, Check, ShoppingBag, Sparkles, Flame, CheckCircle2 } from 'lucide-react';
import { BreadProduct } from '../types';
import { PRODUCTS } from '../data/bakeryData';

interface BoxBuilderProps {
  onAddCustomBox: (
    boxTitle: string,
    loaves: BreadProduct[],
    spreads: BreadProduct[],
    price: number
  ) => void;
}

export const BoxBuilder: React.FC<BoxBuilderProps> = ({ onAddCustomBox }) => {
  const loavesAndPastries = PRODUCTS.filter((p) => p.category === 'breads' || p.category === 'pastries');
  const spreadsAndDrinks = PRODUCTS.filter((p) => p.category === 'spreads' || p.category === 'drinks');

  const [selectedLoafIds, setSelectedLoafIds] = useState<string[]>([
    loavesAndPastries[0].id,
    loavesAndPastries[5]?.id || loavesAndPastries[1].id,
  ]);
  const [selectedSpreadIds, setSelectedSpreadIds] = useState<string[]>([
    spreadsAndDrinks[0]?.id || '',
  ]);
  const [boxName, setBoxName] = useState('My Signature JustDan Box');
  const [addedNotice, setAddedNotice] = useState(false);

  const toggleLoaf = (id: string) => {
    if (selectedLoafIds.includes(id)) {
      if (selectedLoafIds.length > 1) {
        setSelectedLoafIds(selectedLoafIds.filter((item) => item !== id));
      }
    } else {
      if (selectedLoafIds.length < 3) {
        setSelectedLoafIds([...selectedLoafIds, id]);
      } else {
        setSelectedLoafIds([selectedLoafIds[1], selectedLoafIds[2], id]);
      }
    }
  };

  const toggleSpread = (id: string) => {
    if (selectedSpreadIds.includes(id)) {
      if (selectedSpreadIds.length > 1) {
        setSelectedSpreadIds(selectedSpreadIds.filter((item) => item !== id));
      }
    } else {
      if (selectedSpreadIds.length < 2) {
        setSelectedSpreadIds([...selectedSpreadIds, id]);
      } else {
        setSelectedSpreadIds([selectedSpreadIds[1], id]);
      }
    }
  };

  const chosenLoaves = loavesAndPastries.filter((l) => selectedLoafIds.includes(l.id));
  const chosenSpreads = spreadsAndDrinks.filter((s) => selectedSpreadIds.includes(s.id));

  // Bundle pricing with 15% discount for combo box
  const rawTotal =
    chosenLoaves.reduce((acc, curr) => acc + curr.price, 0) +
    chosenSpreads.reduce((acc, curr) => acc + curr.price, 0);
  const bundlePrice = Math.round(rawTotal * 0.85);

  const handleAddBox = () => {
    onAddCustomBox(boxName, chosenLoaves, chosenSpreads, bundlePrice);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  return (
    <section id="box-builder" className="py-20 bg-[#111113] border-t border-zinc-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-amber-400 uppercase mb-2">
              <Package className="w-3.5 h-3.5" />
              <span>CUSTOM BUNDLE CREATOR</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Build your custom <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Warm Bread &amp; Pastry Box.
              </span>
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            Mix up to 3 stone-baked loaves or flaky French croissants, plus 2 artisanal spreads or cold brews packed in an insulated thermal kraft box. Save 15% automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Builder Controls */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Pick Loaves & Pastries */}
            <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-zinc-950 text-xs flex items-center justify-center font-bold">
                      1
                    </span>
                    <span>Choose 2 or 3 Breads / Pastries</span>
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Selected: {selectedLoafIds.length}/3 items
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {loavesAndPastries.map((loaf) => {
                  const isSelected = selectedLoafIds.includes(loaf.id);
                  return (
                    <button
                      key={loaf.id}
                      type="button"
                      onClick={() => toggleLoaf(loaf.id)}
                      className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500 shadow-md text-white'
                          : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img
                          src={loaf.image}
                          alt={loaf.name}
                          className="w-12 h-12 rounded-xl object-cover shrink-0"
                        />
                        <div className="truncate">
                          <span className="text-xs font-bold text-zinc-200 block truncate">
                            {loaf.name}
                          </span>
                          <span className="text-[11px] font-mono text-amber-400">
                            GH₵ {loaf.price}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ml-2 ${
                          isSelected ? 'bg-amber-500 text-zinc-950' : 'border border-zinc-700 text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Pick Spreads & Drinks */}
            <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-zinc-950 text-xs flex items-center justify-center font-bold">
                      2
                    </span>
                    <span>Pair 1 or 2 Spreads or Drinks</span>
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Selected: {selectedSpreadIds.length}/2 items
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {spreadsAndDrinks.map((item) => {
                  const isSelected = selectedSpreadIds.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleSpread(item.id)}
                      className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500 shadow-md text-white'
                          : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="truncate">
                        <span className="text-xs font-bold text-zinc-200 block truncate">
                          {item.name}
                        </span>
                        <span className="text-[11px] font-mono text-amber-400">
                          GH₵ {item.price}
                        </span>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ml-2 ${
                          isSelected ? 'bg-amber-500 text-zinc-950' : 'border border-zinc-700 text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Box Receipt & Preview */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-amber-400" />
                  <span className="font-display font-bold text-white text-base">
                    Box Summary
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  15% Bundle Savings
                </span>
              </div>

              {/* Loaves & Pastries List */}
              <div className="space-y-3">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-400 block">
                  Breads &amp; Pastries ({chosenLoaves.length})
                </span>
                {chosenLoaves.map((l) => (
                  <div key={l.id} className="flex items-center justify-between text-xs">
                    <span className="text-zinc-200 font-medium truncate pr-2">
                      🥖 {l.name}
                    </span>
                    <span className="font-mono text-zinc-400 shrink-0">
                      GH₵ {l.price}
                    </span>
                  </div>
                ))}

                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-400 block pt-2">
                  Spreads &amp; Drinks ({chosenSpreads.length})
                </span>
                {chosenSpreads.map((s) => (
                  <div key={s.id} className="flex items-center justify-between text-xs">
                    <span className="text-zinc-200 font-medium truncate pr-2">
                      ☕ {s.name}
                    </span>
                    <span className="font-mono text-zinc-400 shrink-0">
                      GH₵ {s.price}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="pt-4 border-t border-zinc-800 space-y-2">
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Standard Price</span>
                  <span className="line-through font-mono">GH₵ {rawTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-emerald-400">
                  <span>Bundle Discount (15%)</span>
                  <span className="font-mono">-GH₵ {(rawTotal - bundlePrice).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-zinc-800">
                  <span className="text-sm font-bold text-white">Box Total</span>
                  <span className="font-mono text-2xl font-black text-amber-400">
                    GH₵ {bundlePrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={handleAddBox}
                className="w-full py-4 rounded-xl font-bold uppercase tracking-wider text-xs text-zinc-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 fill-current" />
                <span>Add Custom Box to Cart</span>
              </button>

              {addedNotice && (
                <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Custom Box added to your cart!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
