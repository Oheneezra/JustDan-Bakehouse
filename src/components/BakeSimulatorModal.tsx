import React, { useState, useEffect } from 'react';
import { X, Flame, Sparkles, CheckCircle2, RotateCcw, ShoppingBag, Thermometer, Gauge } from 'lucide-react';
import { BreadProduct } from '../types';
import { PRODUCTS } from '../data/bakeryData';

interface BakeSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: BreadProduct) => void;
}

export const BakeSimulatorModal: React.FC<BakeSimulatorModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<BreadProduct>(PRODUCTS[0]);
  const [bakingState, setBakingState] = useState<'idle' | 'baking' | 'done'>('idle');
  const [progress, setProgress] = useState(0);
  const [temperature, setTemperature] = useState(24);
  const [currentStage, setCurrentStage] = useState('Standby');

  useEffect(() => {
    let interval: ReturnEventTimer;
    type ReturnEventTimer = ReturnType<typeof setInterval>;

    if (bakingState === 'baking') {
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 1.6;
          // Calculate realistic dynamic temperature
          const tempTarget = 285;
          const currentTemp = Math.min(tempTarget, Math.round(24 + (tempTarget - 24) * (next / 60)));
          setTemperature(currentTemp);

          if (next < 25) {
            setCurrentStage('Stone Deck Loader & Robotic Blade Scoring');
          } else if (next < 60) {
            setCurrentStage('Flash Steam Injection & Hearth Heat Expansion (285°C)');
          } else if (next < 85) {
            setCurrentStage('Blistering Crust & Maillard Caramelization');
          } else if (next < 99) {
            setCurrentStage('Cooling Chamber & Insulated Kraft Box Dispense');
          }

          if (next >= 100) {
            clearInterval(interval);
            setBakingState('done');
            return 100;
          }
          return next;
        });
      }, 50);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [bakingState]);

  if (!isOpen) return null;

  const handleStartBake = () => {
    setProgress(0);
    setTemperature(24);
    setBakingState('baking');
  };

  const handleReset = () => {
    setProgress(0);
    setTemperature(24);
    setBakingState('idle');
    setCurrentStage('Standby');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Flame className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                JustDan 3-Minute Hearth Simulator
              </h2>
              <p className="text-xs text-zinc-400">
                Experience the 24/7 automated stone-bake process in real time
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Bread Selector */}
          <div>
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2.5">
              Select Loaf to Bake
            </label>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {PRODUCTS.slice(0, 3).map((prod) => (
                <button
                  key={prod.id}
                  disabled={bakingState === 'baking'}
                  onClick={() => {
                    setSelectedProduct(prod);
                    if (bakingState === 'done') handleReset();
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedProduct.id === prod.id
                      ? 'bg-amber-500/10 border-amber-500 text-white'
                      : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <span className="text-xs font-bold block truncate text-zinc-200">
                    {prod.name}
                  </span>
                  <span className="text-[11px] font-mono text-amber-400">
                    GH₵ {prod.price}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Simulated Chamber Glass View */}
          <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950 p-6 overflow-hidden min-h-[220px] flex flex-col justify-between">
            {/* Glowing Oven Heat Backdrop */}
            <div
              className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
              style={{
                background:
                  bakingState === 'baking' || bakingState === 'done'
                    ? 'radial-gradient(circle at center, rgba(245, 158, 11, 0.25) 0%, rgba(180, 83, 9, 0.1) 60%, transparent 100%)'
                    : 'transparent',
              }}
            />

            {/* Chamber HUD Bar */}
            <div className="relative z-10 flex items-center justify-between text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-amber-400" />
                <span>
                  Hearth: <strong className="text-amber-300 font-bold">{temperature}°C</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-amber-400" />
                <span>
                  Steam Pressure: <strong className="text-white">{bakingState === 'baking' ? '2.4 Bar' : '0.0 Bar'}</strong>
                </span>
              </div>
            </div>

            {/* Center Animation Content */}
            <div className="relative z-10 my-4 text-center">
              <div className="relative inline-block">
                <div
                  className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl mx-auto overflow-hidden border-2 transition-all duration-500 ${
                    bakingState === 'baking'
                      ? 'border-amber-400 shadow-xl shadow-amber-500/30 scale-105'
                      : bakingState === 'done'
                      ? 'border-emerald-500 shadow-xl shadow-emerald-500/20'
                      : 'border-zinc-700'
                  }`}
                >
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {bakingState === 'baking' && (
                  <div className="absolute -top-2 -right-2 bg-amber-500 text-zinc-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase animate-bounce">
                    Baking!
                  </div>
                )}
                {bakingState === 'done' && (
                  <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                    <CheckCircle2 className="w-3 h-3" /> Ready!
                  </div>
                )}
              </div>

              <div className="mt-3">
                <h4 className="text-sm font-bold text-white">
                  {selectedProduct.name}
                </h4>
                <p className="text-xs text-amber-400/90 font-mono mt-0.5">
                  {bakingState === 'idle'
                    ? 'Ready on stone conveyor'
                    : currentStage}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative z-10 space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                <span>Cycle Progress</span>
                <span className="text-amber-400 font-bold">{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-300 transition-all duration-75 ease-linear rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {bakingState === 'idle' && (
              <button
                onClick={handleStartBake}
                className="w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs text-zinc-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Flame className="w-4 h-4 fill-current" />
                <span>Start Flash Stone-Bake</span>
              </button>
            )}

            {bakingState === 'baking' && (
              <div className="w-full py-3.5 rounded-xl bg-zinc-900 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Stone Hearth Active · Blistering Crust in Progress...</span>
              </div>
            )}

            {bakingState === 'done' && (
              <>
                <button
                  onClick={() => {
                    onAddToCart(selectedProduct);
                    onClose();
                  }}
                  className="flex-1 w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs text-zinc-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Claim & Add to Bag (GH₵ {selectedProduct.price})</span>
                </button>
                <button
                  onClick={handleReset}
                  className="p-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
                  title="Bake another loaf"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
