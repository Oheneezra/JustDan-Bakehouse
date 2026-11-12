import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Flame, MapPin, ArrowRight, Truck, Tag, Check, Sparkles } from 'lucide-react';
import { CartItem, KioskLocation, FulfillmentMethod } from '../types';
import { KIOSK_LOCATIONS } from '../data/bakeryData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  selectedKiosk: KioskLocation;
  onSelectKiosk: (kiosk: KioskLocation) => void;
  fulfillment: FulfillmentMethod;
  onSetFulfillment: (method: FulfillmentMethod) => void;
  appliedPromo: string | null;
  onApplyPromo: (code: string) => boolean;
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  onUpdateQuantity,
  onRemoveItem,
  selectedKiosk,
  onSelectKiosk,
  fulfillment,
  onSetFulfillment,
  appliedPromo,
  onApplyPromo,
  onProceedCheckout,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState(false);

  if (!isOpen) return null;

  const freeDeliveryThreshold = 100;
  const deliveryFee = fulfillment === 'delivery' ? (subtotal >= freeDeliveryThreshold ? 0 : 15) : 0;
  const discountRate = appliedPromo ? 0.1 : 0; // 10% off with promo code
  const discountAmount = subtotal * discountRate;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = onApplyPromo(promoInput.trim().toUpperCase());
    if (!success) {
      setPromoError(true);
      setTimeout(() => setPromoError(false), 2000);
    } else {
      setPromoInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">
                  Your Order Cart
                </h2>
                <span className="text-[11px] text-zinc-400">
                  {items.reduce((acc, curr) => acc + curr.quantity, 0)} items selected
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Fulfillment Method Selector: Delivery vs Pickup */}
          <div className="px-6 pt-4 pb-2 bg-zinc-950">
            <div className="grid grid-cols-2 p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold">
              <button
                type="button"
                onClick={() => onSetFulfillment('delivery')}
                className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  fulfillment === 'delivery'
                    ? 'bg-amber-500 text-zinc-950 font-bold shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Doorstep Delivery</span>
              </button>
              <button
                type="button"
                onClick={() => onSetFulfillment('pickup')}
                className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  fulfillment === 'pickup'
                    ? 'bg-amber-500 text-zinc-950 font-bold shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>24/7 Kiosk Pickup</span>
              </button>
            </div>

            {/* Delivery threshold bar */}
            {fulfillment === 'delivery' && (
              <div className="mt-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300">
                {subtotal >= freeDeliveryThreshold ? (
                  <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                    <Check className="w-3.5 h-3.5" /> You qualify for FREE doorstep delivery!
                  </span>
                ) : (
                  <span>
                    Add <strong className="font-mono font-bold text-white">GH₵ {(freeDeliveryThreshold - subtotal).toFixed(2)}</strong> more for <strong>FREE delivery</strong> (Orders over GH₵ {freeDeliveryThreshold})
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Body Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* If Pickup is chosen, show Kiosk Selection Bar */}
            {fulfillment === 'pickup' && (
              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400 flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Pickup Station:</span>
                  </span>
                  <span className="font-mono text-emerald-400 text-[11px] font-bold">
                    285°C Hearth Online
                  </span>
                </div>
                <select
                  value={selectedKiosk.id}
                  onChange={(e) => {
                    const found = KIOSK_LOCATIONS.find((k) => k.id === e.target.value);
                    if (found) onSelectKiosk(found);
                  }}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  {KIOSK_LOCATIONS.map((k) => (
                    <option key={k.id} value={k.id}>
                      {k.name} ({k.city})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
                  <Flame className="w-8 h-8 text-zinc-600" />
                </div>
                <h3 className="font-display text-lg font-bold text-zinc-300">
                  Your cart is empty
                </h3>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  Add artisan sourdough breads, golden croissants, and chilled cold brew to your cart.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Shop Bakery Menu
                </button>
              </div>
            ) : (
              items.map((item, index) => (
                <div
                  key={`${item.product.id}-${index}`}
                  className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div className="truncate">
                        <h4 className="text-xs font-bold text-white truncate">
                          {item.product.name}
                        </h4>
                        <span className="font-mono text-xs font-bold text-amber-400">
                          GH₵ {item.product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(index)}
                      className="text-zinc-500 hover:text-red-400 transition-colors p-1 cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Badges for custom warmth, cut, or drink temp */}
                  <div className="flex flex-wrap gap-1 text-[10px] font-mono text-zinc-400">
                    {item.selectedWarmth === 'piping_hot' && (
                      <span className="bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded border border-amber-500/20">
                        🔥 Warm Flash
                      </span>
                    )}
                    {item.drinkTemperature && (
                      <span className="bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/20">
                        ❄️ {item.drinkTemperature === 'iced' ? 'Iced' : 'Steamed'}
                      </span>
                    )}
                    {item.selectedCut && (
                      <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                        {item.selectedCut === 'whole'
                          ? 'Whole'
                          : item.selectedCut === 'thick_sliced'
                          ? 'Thick Sliced'
                          : 'Half Share'}
                      </span>
                    )}
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80">
                    <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-lg p-1">
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs font-bold w-5 text-center text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-mono text-xs font-bold text-white">
                      GH₵ {(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            )}

            {/* Promo Code Input */}
            {items.length > 0 && (
              <form onSubmit={handleApply} className="pt-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. JUSTDAN10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 uppercase font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 text-xs font-bold rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-400 transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <span className="text-[10px] text-red-400 font-mono mt-1 block">
                    Invalid code. Try &apos;JUSTDAN10&apos; for 10% off.
                  </span>
                )}
                {appliedPromo && (
                  <span className="text-[10px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Coupon &apos;{appliedPromo}&apos; applied (10% off)!
                  </span>
                )}
              </form>
            )}
          </div>

          {/* Footer Receipt & Checkout */}
          {items.length > 0 && (
            <div className="p-6 bg-zinc-900/90 border-t border-zinc-800 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-mono">GH₵ {subtotal.toFixed(2)}</span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Promo Discount (10%)</span>
                    <span className="font-mono">-GH₵ {discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-400">
                  <span>{fulfillment === 'delivery' ? 'Doorstep Delivery' : 'Kiosk Dispense'}</span>
                  <span className="font-mono">
                    {deliveryFee === 0 ? (
                      <strong className="text-emerald-400 font-medium">Free</strong>
                    ) : (
                      `GH₵ ${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-baseline pt-2 border-t border-zinc-800">
                  <span className="text-sm font-bold text-white">Order Total</span>
                  <span className="font-mono text-xl font-bold text-amber-400">
                    GH₵ {finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedCheckout();
                }}
                className="w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs text-zinc-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-zinc-950" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
