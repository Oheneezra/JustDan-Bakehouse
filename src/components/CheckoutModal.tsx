import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Flame, Smartphone, CreditCard, Banknote, QrCode, Truck, MapPin, Clock } from 'lucide-react';
import { CartItem, KioskLocation, FulfillmentMethod, OrderRecord } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  fulfillment: FulfillmentMethod;
  selectedKiosk: KioskLocation;
  onOrderSuccess: (order: OrderRecord) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  deliveryFee,
  total,
  fulfillment,
  selectedKiosk,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    landmark: '',
    deliveryNotes: '',
    paymentMethod: 'momo' as 'momo' | 'card' | 'cod',
  });
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);

  if (!isOpen) return null;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleConfirmPayment = () => {
    const code = `JD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: OrderRecord = {
      orderCode: code,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fulfillment,
      customerName: customer.name,
      phone: customer.phone,
      email: customer.email,
      deliveryAddress: fulfillment === 'delivery' ? customer.address : undefined,
      deliveryLandmark: fulfillment === 'delivery' ? customer.landmark : undefined,
      kioskId: fulfillment === 'pickup' ? selectedKiosk.id : undefined,
      kioskName: fulfillment === 'pickup' ? selectedKiosk.name : undefined,
      items: [...items],
      subtotal,
      discount,
      deliveryFee,
      total,
      status: fulfillment === 'delivery' ? 'preparing' : 'ready_at_kiosk',
      paymentMethod:
        customer.paymentMethod === 'momo'
          ? 'MTN Mobile Money / MoMo'
          : customer.paymentMethod === 'card'
          ? 'Credit / Debit Card'
          : fulfillment === 'delivery'
          ? 'Cash on Delivery'
          : 'Pay at Kiosk Screen',
    };

    setConfirmedOrder(newOrder);
    setStep('confirmed');
    onOrderSuccess(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div>
            <h3 className="font-display text-lg font-bold text-white">
              {step === 'confirmed' ? 'Order Confirmed!' : 'JustDan Express Checkout'}
            </h3>
            <p className="text-xs text-zinc-400">
              {fulfillment === 'delivery' ? (
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Truck className="w-3.5 h-3.5" /> Doorstep Delivery
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-amber-400">
                  <MapPin className="w-3.5 h-3.5" /> Kiosk Pickup: {selectedKiosk.name}
                </span>
              )}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {/* STEP 1: Details */}
          {step === 'details' && (
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300 flex items-center justify-between">
                <span>Total Items ({items.reduce((a, b) => a + b.quantity, 0)})</span>
                <span className="font-mono font-bold text-amber-400 text-sm">
                  GH₵ {total.toFixed(2)}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samuel Annan"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">
                    Phone (for Delivery / Pickup SMS) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="024 123 4567"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-400 block mb-1">
                  Email Address (Receipt &amp; Baker Card)
                </label>
                <input
                  type="email"
                  placeholder="samuel@gmail.com"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Delivery specific fields */}
              {fulfillment === 'delivery' && (
                <div className="space-y-3 pt-2 border-t border-zinc-800">
                  <div>
                    <label className="text-xs font-semibold text-zinc-400 block mb-1">
                      Delivery Street Address &amp; House Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Plot 42, Lagos Avenue, East Legon, Accra"
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-zinc-400 block mb-1">
                        Nearest Landmark / GPS Code
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Near Starbites / GA-183-4921"
                        value={customer.landmark}
                        onChange={(e) => setCustomer({ ...customer, landmark: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-zinc-400 block mb-1">
                        Delivery Rider Note
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Call upon arrival at gate"
                        value={customer.deliveryNotes}
                        onChange={(e) => setCustomer({ ...customer, deliveryNotes: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs text-zinc-950 bg-amber-500 hover:bg-amber-400 shadow-xl shadow-amber-500/20 transition-all cursor-pointer"
                >
                  Continue to Payment (GH₵ {total.toFixed(2)})
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment */}
          {step === 'payment' && (
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                  Select Payment Pathway
                </label>

                {/* MoMo */}
                <button
                  type="button"
                  onClick={() => setCustomer({ ...customer, paymentMethod: 'momo' })}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    customer.paymentMethod === 'momo'
                      ? 'border-amber-500 bg-amber-500/10 text-white'
                      : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">
                        Mobile Money (MoMo)
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        MTN MoMo, Telecel Cash, AirtelTigo
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400">Instant Prompt</span>
                </button>

                {/* Card */}
                <button
                  type="button"
                  onClick={() => setCustomer({ ...customer, paymentMethod: 'card' })}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    customer.paymentMethod === 'card'
                      ? 'border-amber-500 bg-amber-500/10 text-white'
                      : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 text-zinc-300 flex items-center justify-center">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">
                        Credit / Debit Card
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        Visa, Mastercard, GH-Link
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-500">Secure</span>
                </button>

                {/* Cash on delivery or kiosk */}
                <button
                  type="button"
                  onClick={() => setCustomer({ ...customer, paymentMethod: 'cod' })}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    customer.paymentMethod === 'cod'
                      ? 'border-amber-500 bg-amber-500/10 text-white'
                      : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 text-zinc-300 flex items-center justify-center">
                      <Banknote className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">
                        {fulfillment === 'delivery' ? 'Cash on Delivery' : 'Pay at Kiosk Machine'}
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        {fulfillment === 'delivery' ? 'Pay rider upon handoff' : 'Cash or tap on dispenser'}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-500">Verified</span>
                </button>
              </div>

              {customer.paymentMethod === 'momo' && (
                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400">MoMo Phone Number:</span>
                    <strong className="text-white font-mono">{customer.phone || '024 123 4567'}</strong>
                  </div>
                  <p className="text-[11px] text-amber-300/80">
                    A secure authentication prompt will be sent directly to your phone to authorize GH₵ {total.toFixed(2)}.
                  </p>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="py-3.5 px-5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 text-xs font-semibold cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  className="flex-1 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs text-zinc-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 fill-current" />
                  <span>Place Order · GH₵ {total.toFixed(2)}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Confirmed & Voucher / Delivery tracker */}
          {step === 'confirmed' && confirmedOrder && (
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-zinc-950 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/30">
                <Flame className="w-8 h-8 fill-current" />
              </div>

              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-400 block mb-1">
                  ORDER SUCCESSFULLY PLACED
                </span>
                <h3 className="font-display text-2xl font-extrabold text-white">
                  {fulfillment === 'delivery'
                    ? 'Dispatched for Express Delivery'
                    : `Ready at ${selectedKiosk.name}`}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 flex items-center justify-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    Estimated Time:{' '}
                    <strong className="text-amber-300">
                      {fulfillment === 'delivery' ? '~25–35 Minutes' : '~180 Seconds'}
                    </strong>
                  </span>
                </p>
              </div>

              {/* QR Code and Pickup/Delivery Voucher */}
              <div className="p-6 rounded-3xl bg-zinc-900 border border-amber-500/40 text-center space-y-4">
                <div className="w-32 h-32 bg-white rounded-2xl p-2 mx-auto flex items-center justify-center shadow-lg">
                  <QrCode className="w-28 h-28 text-zinc-950" />
                </div>

                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                    Order Tracking Code
                  </span>
                  <div className="font-mono text-3xl font-black text-amber-400 tracking-widest mt-1">
                    {confirmedOrder.orderCode}
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    {fulfillment === 'delivery'
                      ? 'Show this code or quote to your delivery rider upon doorstep arrival.'
                      : `Scan this QR at ${selectedKiosk.name} or enter ${confirmedOrder.orderCode} on the kiosk screen.`}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Customer:</span>
                  <span className="text-white font-medium">{customer.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Updates SMS sent to:</span>
                  <span className="text-white font-mono">{customer.phone}</span>
                </div>
                {fulfillment === 'delivery' && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Destination:</span>
                    <span className="text-amber-300 font-medium truncate max-w-[200px]">
                      {customer.address}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-zinc-500">Payment:</span>
                  <span className="text-amber-300 font-medium">{confirmedOrder.paymentMethod}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Done / Back to Store
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
