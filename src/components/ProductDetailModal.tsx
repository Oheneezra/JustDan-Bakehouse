import React, { useState } from 'react';
import { X, Flame, Clock, Sparkles, Check, Plus, Minus, ShoppingBag, Coffee, Heart } from 'lucide-react';
import { BreadProduct } from '../types';
import { PRODUCTS } from '../data/bakeryData';

interface ProductDetailModalProps {
  product: BreadProduct | null;
  onClose: () => void;
  onAddToCart: (
    product: BreadProduct,
    quantity: number,
    warmth: 'piping_hot' | 'room_temp',
    cut: 'whole' | 'thick_sliced' | 'scored_half',
    dipId?: string,
    drinkTemperature?: 'iced' | 'hot'
  ) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [warmth, setWarmth] = useState<'piping_hot' | 'room_temp'>('piping_hot');
  const [cut, setCut] = useState<'whole' | 'thick_sliced' | 'scored_half'>('whole');
  const [drinkTemp, setDrinkTemp] = useState<'iced' | 'hot'>('iced');
  const [selectedDipId, setSelectedDipId] = useState<string | undefined>(undefined);

  if (!product) return null;

  const dips = PRODUCTS.filter((p) => p.category === 'spreads');
  const selectedDip = dips.find((d) => d.id === selectedDipId);
  const totalPrice = (product.price + (selectedDip ? selectedDip.price : 0)) * quantity;

  const handleAdd = () => {
    onAddToCart(
      product,
      quantity,
      warmth,
      cut,
      selectedDipId,
      product.category === 'drinks' ? drinkTemp : undefined
    );
    onClose();
  };

  const isDrink = product.category === 'drinks';
  const isPastry = product.category === 'pastries';
  const isBread = product.category === 'breads';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Top Floating Buttons */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => onToggleFavorite(product.id)}
            className={`p-2.5 rounded-full backdrop-blur-md border transition-colors cursor-pointer ${
              isFavorite
                ? 'bg-red-500/20 border-red-500 text-red-400'
                : 'bg-zinc-900/80 border-zinc-700 text-zinc-300 hover:text-white'
            }`}
            title={isFavorite ? 'Saved in wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-zinc-900/80 backdrop-blur-md text-zinc-300 hover:text-white border border-zinc-700 hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Product Media */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-900">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent pointer-events-none" />

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 block mb-1">
                {product.crustType} · {product.category.toUpperCase()}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {product.name}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-zinc-400 block uppercase">Price</span>
              <span className="font-mono text-xl sm:text-2xl font-bold text-amber-400">
                GH₵ {product.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Flavor Notes & Volume Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-semibold text-zinc-300">Tasting Notes:</span>
              {product.flavorNotes.map((note, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium"
                >
                  {note}
                </span>
              ))}
            </div>
            {product.volumeOrWeight && (
              <span className="font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {product.volumeOrWeight}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            {product.longDescription}
          </p>

          {/* DRINK CUSTOMIZATION */}
          {isDrink && (
            <div className="space-y-3 pt-2 border-t border-zinc-800/80">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                Serving Temperature
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDrinkTemp('iced')}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    drinkTemp === 'iced'
                      ? 'border-amber-500 bg-amber-500/10 text-white'
                      : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold">Chilled Over Ice</span>
                  </div>
                  {drinkTemp === 'iced' && <Check className="w-4 h-4 text-amber-400" />}
                </button>

                <button
                  type="button"
                  onClick={() => setDrinkTemp('hot')}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    drinkTemp === 'hot'
                      ? 'border-amber-500 bg-amber-500/10 text-white'
                      : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold">Steamed / Warm</span>
                  </div>
                  {drinkTemp === 'hot' && <Check className="w-4 h-4 text-amber-400" />}
                </button>
              </div>
            </div>
          )}

          {/* BREAD & PASTRY CUSTOMIZATION */}
          {(isBread || isPastry) && (
            <div className="space-y-4 pt-2 border-t border-zinc-800/80">
              <div>
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
                  {isPastry ? 'Pastry Warmth on Pack' : 'Hearth Temperature on Dispense'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setWarmth('piping_hot')}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      warmth === 'piping_hot'
                        ? 'border-amber-500 bg-amber-500/10 text-white'
                        : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-bold">
                        {isPastry ? 'Warm Crisp (Flash 90s)' : 'Piping Hot (Stone Baked)'}
                      </span>
                    </div>
                    {warmth === 'piping_hot' && <Check className="w-4 h-4 text-amber-400" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setWarmth('room_temp')}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      warmth === 'room_temp'
                        ? 'border-amber-500 bg-amber-500/10 text-white'
                        : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-zinc-400" />
                      <span className="text-xs font-bold">Cooled for Later</span>
                    </div>
                    {warmth === 'room_temp' && <Check className="w-4 h-4 text-amber-400" />}
                  </button>
                </div>
              </div>

              {isBread && (
                <div>
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
                    Preparation &amp; Cut
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'whole', label: 'Whole Boule', sub: 'Keeps steam trapped' },
                      { id: 'thick_sliced', label: 'Thick Sliced', sub: 'Ready for butter' },
                      { id: 'scored_half', label: 'Half-Cut Share', sub: 'Easy tear apart' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setCut(item.id as typeof cut)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          cut === item.id
                            ? 'border-amber-500 bg-amber-500/10 text-white'
                            : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700'
                        }`}
                      >
                        <span className="text-xs font-bold block text-zinc-200">{item.label}</span>
                        <span className="text-[10px] text-zinc-500 block truncate">{item.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pair with Whipped Spread */}
              {isBread && (
                <div>
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
                    Pair with Whipped Butter Cup (Optional)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {dips.map((dip) => {
                      const isSelected = selectedDipId === dip.id;
                      return (
                        <button
                          key={dip.id}
                          type="button"
                          onClick={() => setSelectedDipId(isSelected ? undefined : dip.id)}
                          className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                            isSelected
                              ? 'border-amber-500 bg-amber-500/10 text-white'
                              : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700'
                          }`}
                        >
                          <div>
                            <span className="text-xs font-bold block text-zinc-200">{dip.name}</span>
                            <span className="text-[11px] font-mono text-amber-400">+GH₵ {dip.price}</span>
                          </div>
                          {isSelected ? (
                            <Check className="w-4 h-4 text-amber-400" />
                          ) : (
                            <Plus className="w-4 h-4 text-zinc-500" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Ingredients & Allergens Accordion */}
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="font-semibold text-zinc-300">Ingredients:</span>
              <span className="text-zinc-400 text-right">{product.ingredients.join(', ')}</span>
            </div>
            {product.allergens.length > 0 && (
              <div className="flex justify-between pt-1 border-t border-zinc-800/60">
                <span className="font-semibold text-zinc-300">Allergen Notice:</span>
                <span className="text-amber-300/80 text-right">{product.allergens.join(', ')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Sticky Modal Footer CTA */}
        <div className="p-4 sm:p-6 bg-zinc-900/90 border-t border-zinc-800 flex items-center justify-between gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-xl p-1 shrink-0">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono text-sm font-bold w-6 text-center text-white">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAdd}
            className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 text-zinc-950 font-bold uppercase tracking-wider text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-zinc-950" />
            <span>Add to Cart · GH₵ {totalPrice.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
