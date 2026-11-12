/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BreadProduct, CartItem, KioskLocation, FulfillmentMethod, OrderRecord } from './types';
import { PRODUCTS, KIOSK_LOCATIONS } from './data/bakeryData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeBanner } from './components/MarqueeBanner';
import { MenuSection } from './components/MenuSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { HowItWorks } from './components/HowItWorks';
import { BoxBuilder } from './components/BoxBuilder';
import { KioskLocator } from './components/KioskLocator';
import { OurCraft } from './components/OurCraft';
import { CommunityReviews } from './components/CommunityReviews';
import { BakeSimulatorModal } from './components/BakeSimulatorModal';
import { HostKioskModal } from './components/HostKioskModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { Footer } from './components/Footer';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('justdan_bakery_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem('justdan_bakery_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('justdan_bakery_favs');
      return saved ? JSON.parse(saved) : ['french-butter-croissant', 'country-wild-sourdough'];
    } catch {
      return ['french-butter-croissant', 'country-wild-sourdough'];
    }
  });

  const [fulfillment, setFulfillment] = useState<FulfillmentMethod>('delivery');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [selectedKiosk, setSelectedKiosk] = useState<KioskLocation>(KIOSK_LOCATIONS[0]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [inspectProduct, setInspectProduct] = useState<BreadProduct | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('justdan_bakery_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('justdan_bakery_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('justdan_bakery_favs', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        showToast('Removed from favorites');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved to your favorites wishlist ❤️');
        return [...prev, id];
      }
    });
  };

  const handleApplyPromo = (code: string) => {
    const validCodes = ['JUSTDAN10', 'BAKEHOUSE', 'FRESH', 'SWAGGER10'];
    if (validCodes.includes(code.toUpperCase())) {
      setAppliedPromo(code.toUpperCase());
      showToast(`Promo ${code.toUpperCase()} applied! 10% off your order`);
      return true;
    }
    return false;
  };

  const handleQuickAdd = (product: BreadProduct) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && !item.selectedAddonDipId
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [
        ...prev,
        {
          product,
          quantity: 1,
          selectedWarmth: product.category === 'drinks' ? undefined : 'piping_hot',
          selectedCut: product.category === 'breads' ? 'whole' : undefined,
          drinkTemperature: product.category === 'drinks' ? 'iced' : undefined,
        },
      ];
    });
    showToast(`Added ${product.name} to cart`);
  };

  const handleDetailAdd = (
    product: BreadProduct,
    quantity: number,
    warmth: 'piping_hot' | 'room_temp',
    cut: 'whole' | 'thick_sliced' | 'scored_half',
    dipId?: string,
    drinkTemperature?: 'iced' | 'hot'
  ) => {
    setCart((prev) => [
      ...prev,
      {
        product,
        quantity,
        selectedWarmth: warmth,
        selectedCut: cut,
        selectedAddonDipId: dipId,
        drinkTemperature,
      },
    ]);
    showToast(`Added ${quantity}x ${product.name} to cart`);
  };

  const handleAddCustomBox = (
    boxTitle: string,
    loaves: BreadProduct[],
    spreads: BreadProduct[],
    bundlePrice: number
  ) => {
    const boxProduct: BreadProduct = {
      id: `box-${Date.now()}`,
      name: boxTitle,
      category: 'breads',
      description: `${loaves.map((l) => l.name).join(', ')} + ${spreads.map((s) => s.name).join(', ')}`,
      longDescription: 'Curated warm combo bread, pastry & drink box packed in an eco-insulated thermal kraft box.',
      price: bundlePrice,
      bakeTimeMinutes: 3,
      crustType: 'Custom Variety Pack',
      ingredients: ['Heritage Flour', 'Butter', 'Wild Starter', 'Sea Salt'],
      allergens: ['Gluten (Wheat)', 'Dairy (Butter)'],
      image: loaves[0]?.image || PRODUCTS[0].image,
      calories: 680,
      flavorNotes: ['Variety pack', 'Freshly baked', 'Special combo'],
      volumeOrWeight: 'Combo Gift Box',
    };

    setCart((prev) => [
      ...prev,
      {
        product: boxProduct,
        quantity: 1,
        selectedWarmth: 'piping_hot',
        selectedCut: 'whole',
      },
    ]);
    showToast('Custom Bundle Box added to your cart!');
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleOrderSuccess = (newOrder: OrderRecord) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setAppliedPromo(null);
    showToast(`Order #${newOrder.orderCode} placed successfully!`);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const freeDeliveryThreshold = 100;
  const deliveryFee = fulfillment === 'delivery' ? (cartSubtotal >= freeDeliveryThreshold ? 0 : 15) : 0;
  const discountAmount = appliedPromo ? cartSubtotal * 0.1 : 0;
  const cartFinalTotal = Math.max(0, cartSubtotal - discountAmount + deliveryFee);

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToKiosks = () => {
    const el = document.getElementById('kiosks');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#111113] text-[#FAF7F2] font-sans flex flex-col selection:bg-amber-500 selection:text-zinc-950">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-zinc-900 border border-amber-500/60 text-white shadow-2xl flex items-center gap-3 animate-bounce">
          <div className="w-6 h-6 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navbar */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartFinalTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        onOpenHostModal={() => setIsHostModalOpen(true)}
        onOpenOrderHistory={() => setIsOrderHistoryOpen(true)}
        orderCount={orders.length}
      />

      {/* Hero Section with Audio Crackle & Flash Oven HUD */}
      <Hero
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        onExploreMenu={scrollToMenu}
        onFindKiosk={scrollToKiosks}
      />

      {/* Dynamic Animated Marquee Banner */}
      <MarqueeBanner />

      {/* E-Commerce Product Catalog with Category Filters (Breads, Pastries, Drinks, Spreads) */}
      <MenuSection
        onSelectProduct={(p) => setInspectProduct(p)}
        onQuickAdd={handleQuickAdd}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* How it Works 3-Step Animated Section */}
      <HowItWorks
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        onFindKiosk={scrollToKiosks}
      />

      {/* Interactive Bread, Pastry & Drink Box Customizer */}
      <BoxBuilder onAddCustomBox={handleAddCustomBox} />

      {/* Live Kiosk Network Locator */}
      <KioskLocator
        onSelectKiosk={(kiosk) => {
          setSelectedKiosk(kiosk);
          setFulfillment('pickup');
          showToast(`Selected ${kiosk.name} for kiosk pickup`);
        }}
        onOpenHostModal={() => setIsHostModalOpen(true)}
      />

      {/* Sourdough Fermentation & Craft Story */}
      <OurCraft />

      {/* Social Proof & Customer Reviews Feed */}
      <CommunityReviews />

      {/* Footer */}
      <Footer
        onOpenHostModal={() => setIsHostModalOpen(true)}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
      />

      {/* E-Commerce Slide-over Cart Drawer with Delivery vs Pickup */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        subtotal={cartSubtotal}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        selectedKiosk={selectedKiosk}
        onSelectKiosk={setSelectedKiosk}
        fulfillment={fulfillment}
        onSetFulfillment={setFulfillment}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
        onProceedCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Product Detail & Customization Modal */}
      <ProductDetailModal
        product={inspectProduct}
        onClose={() => setInspectProduct(null)}
        onAddToCart={handleDetailAdd}
        isFavorite={inspectProduct ? favorites.includes(inspectProduct.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* 3-Minute Hearth Bake Simulator */}
      <BakeSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        onAddToCart={handleQuickAdd}
      />

      {/* Host a Kiosk / Venue Licensing Modal */}
      <HostKioskModal
        isOpen={isHostModalOpen}
        onClose={() => setIsHostModalOpen(false)}
      />

      {/* Complete Checkout & QR Voucher Modal with Delivery Address */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        subtotal={cartSubtotal}
        discount={discountAmount}
        deliveryFee={deliveryFee}
        total={cartFinalTotal}
        fulfillment={fulfillment}
        selectedKiosk={selectedKiosk}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Tracking & History Modal */}
      <OrderHistoryModal
        isOpen={isOrderHistoryOpen}
        onClose={() => setIsOrderHistoryOpen(false)}
        orders={orders}
      />
    </div>
  );
}
