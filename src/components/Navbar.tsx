import React, { useState } from 'react';
import { ShoppingBag, Flame, Menu, X, MapPin, Sparkles, ReceiptText } from 'lucide-react';
import { BRAND_NAME, BRAND_SHORT } from '../data/bakeryData';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenSimulator: () => void;
  onOpenHostModal: () => void;
  onOpenOrderHistory: () => void;
  orderCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenSimulator,
  onOpenHostModal,
  onOpenOrderHistory,
  orderCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#111113]/90 border-b border-zinc-800/80 transition-all">
      {/* Top Ticker / Notification */}
      {!announcementDismissed && (
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 text-zinc-950 px-4 py-1.5 text-xs font-semibold tracking-wide flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden mx-auto">
            <span className="flex items-center gap-1.5 shrink-0">
              <Flame className="w-3.5 h-3.5 fill-current animate-bounce" />
              <span className="font-bold uppercase tracking-wider">Online Bakery Now Open:</span>
            </span>
            <span className="truncate">
              Artisan Wild Sourdough, Flaky French Pastries & Cold Brews · Doorstep Delivery & 24/7 Kiosks across Accra & Kumasi
            </span>
          </div>
          <button
            onClick={() => setAnnouncementDismissed(true)}
            aria-label="Dismiss banner"
            className="p-1 hover:opacity-75 transition-opacity shrink-0 ml-2 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-white group whitespace-nowrap shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-zinc-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
            <Flame className="w-5 h-5 fill-current text-zinc-950" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-2xl tracking-tighter text-white">
                JUSTDAN
              </span>
              <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-widest border border-amber-500/30 uppercase">
                BAKEHOUSE
              </span>
            </div>
            <span className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase">
              Breads · Pastries · Drinks
            </span>
          </div>
        </a>

        {/* Zone 2: 4-5 Clean Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-zinc-300">
          <a
            href="#menu"
            className="hover:text-amber-400 transition-colors whitespace-nowrap"
          >
            Store & Menu
          </a>
          <a
            href="#how-it-works"
            className="hover:text-amber-400 transition-colors whitespace-nowrap"
          >
            How It Works
          </a>
          <button
            onClick={onOpenSimulator}
            className="flex items-center gap-1.5 text-zinc-300 hover:text-amber-400 transition-colors whitespace-nowrap font-medium cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>3-Min Flash Bake</span>
          </button>
          <a
            href="#box-builder"
            className="hover:text-amber-400 transition-colors whitespace-nowrap"
          >
            Bundle Boxes
          </a>
          <a
            href="#kiosks"
            className="flex items-center gap-1 hover:text-amber-400 transition-colors whitespace-nowrap"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span>Kiosks & Delivery</span>
          </a>
          {orderCount > 0 && (
            <button
              onClick={onOpenOrderHistory}
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap font-medium text-xs bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 cursor-pointer"
            >
              <ReceiptText className="w-3.5 h-3.5" />
              <span>Orders ({orderCount})</span>
            </button>
          )}
        </nav>

        {/* Zone 3: Primary Action (Cart & Simulator Button) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 hover:border-amber-500/80 text-white transition-all shadow-sm group hover:bg-zinc-800/80 cursor-pointer"
            aria-label="Open Cart"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider leading-none">
                Cart
              </span>
              <span className="text-xs font-bold font-mono tabular-nums text-amber-300 leading-tight">
                GH₵ {cartTotal.toFixed(2)}
              </span>
            </div>
          </button>

          <a
            href="#menu"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold tracking-wide uppercase text-zinc-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer"
          >
            Order Online
          </a>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-zinc-800 bg-[#141417] px-6 py-5 space-y-4">
          <nav className="flex flex-col space-y-3 text-base font-medium text-zinc-200">
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400 transition-colors"
            >
              🥖 Breads, Pastries & Drinks Store
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400 transition-colors"
            >
              ⚡ How It Works (3 Min)
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSimulator();
              }}
              className="text-left py-1 text-amber-400 font-semibold flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" /> Live 3-Minute Hearth Simulator
            </button>
            <a
              href="#box-builder"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400 transition-colors"
            >
              📦 Bread & Pastry Box Customizer
            </a>
            <a
              href="#kiosks"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400 transition-colors"
            >
              📍 24/7 Kiosks & Doorstep Delivery
            </a>
            {orderCount > 0 && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrderHistory();
                }}
                className="text-left py-1 text-amber-300 flex items-center gap-2 cursor-pointer"
              >
                <ReceiptText className="w-4 h-4" /> Your Past Orders ({orderCount})
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHostModal();
              }}
              className="text-left py-1 text-zinc-300 hover:text-amber-400 cursor-pointer"
            >
              🤝 Host a Machine (B2B Licensing)
            </button>
          </nav>

          <div className="pt-2 border-t border-zinc-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCart();
              }}
              className="w-full py-3 rounded-xl bg-amber-500 text-zinc-950 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" /> View Cart ({cartCount} items · GH₵ {cartTotal.toFixed(2)})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
