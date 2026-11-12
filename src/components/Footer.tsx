import React from 'react';
import { Flame, MapPin, Mail, Phone, Heart, Shield } from 'lucide-react';

interface FooterProps {
  onOpenHostModal: () => void;
  onOpenSimulator: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenHostModal,
  onOpenSimulator,
}) => {
  return (
    <footer className="bg-[#0a0a0c] border-t border-zinc-800 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-zinc-950 flex items-center justify-center font-bold shadow-md">
                <Flame className="w-5 h-5 fill-current" />
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tighter text-white">
                JUSTDAN BAKEHOUSE
              </span>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Ghana&apos;s premier 24/7 online artisan bakery &amp; automated stone-hearth kiosks. Hot wild sourdough, French pastries &amp; specialty drinks delivered fresh or collected in 3 minutes.
            </p>

            <div className="pt-2 flex items-center gap-3 text-zinc-500">
              <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                24/7/365 Non-Stop Operations
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                Accra &bull; Kumasi &bull; Tema
              </span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Artisan Menu
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#menu" className="hover:text-amber-400 transition-colors">
                  Heritage Wild Sourdough
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-amber-400 transition-colors">
                  Garlic & Rosemary Focaccia
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-amber-400 transition-colors">
                  Braided Honey Brioche
                </a>
              </li>
              <li>
                <a href="#box-builder" className="hover:text-amber-400 transition-colors">
                  Build Custom Bread Box
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenSimulator}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  3-Min Bake Simulator
                </button>
              </li>
            </ul>
          </div>

          {/* Network & Venues */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Kiosk Network
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#kiosks" className="hover:text-amber-400 transition-colors">
                  Accra Mall Plaza (24/7)
                </a>
              </li>
              <li>
                <a href="#kiosks" className="hover:text-amber-400 transition-colors">
                  Airport City Express (24/7)
                </a>
              </li>
              <li>
                <a href="#kiosks" className="hover:text-amber-400 transition-colors">
                  East Legon Lagos Ave (24/7)
                </a>
              </li>
              <li>
                <a href="#kiosks" className="hover:text-amber-400 transition-colors">
                  KNUST Kumasi Hub (24/7)
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenHostModal}
                  className="text-amber-400 hover:text-amber-300 font-semibold text-left"
                >
                  Host a Machine at Your Venue &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Contact & Support
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>info@justdanbake.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>+233 24 555 1928</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Airport Commercial Area &amp; East Legon, Accra</span>
              </li>
              <li className="pt-2 text-zinc-500 font-mono text-[11px]">
                Socials: @justdanbake_
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Payment Trust */}
        <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} JustDan Bakehouse Co. All rights reserved.
          </div>

          <div className="flex items-center gap-3 text-zinc-400 font-mono">
            <span>Accepted Payments:</span>
            <span className="text-amber-400">MTN MoMo</span>
            <span>&bull;</span>
            <span className="text-red-400">Telecel Cash</span>
            <span>&bull;</span>
            <span>Visa / Mastercard</span>
            <span>&bull;</span>
            <span>Cash</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
