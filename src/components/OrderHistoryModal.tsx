import React from 'react';
import { X, ReceiptText, Clock, Truck, MapPin, CheckCircle2, ChevronRight, Flame } from 'lucide-react';
import { OrderRecord } from '../types';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderRecord[];
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  isOpen,
  onClose,
  orders,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <ReceiptText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Order Tracking &amp; History
              </h2>
              <p className="text-xs text-zinc-400">
                Live delivery status and receipts for your JustDan orders
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {orders.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <Flame className="w-10 h-10 text-zinc-600 mx-auto" />
              <h3 className="font-display text-base font-bold text-white">No active orders found</h3>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                Place an order for fresh artisan sourdough, warm croissants, or cold brew to track it here.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.orderCode}
                className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4"
              >
                {/* Header of order */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-extrabold text-amber-400">
                        #{order.orderCode}
                      </span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {order.fulfillment === 'delivery' ? 'Express Delivery' : 'Kiosk Pickup'}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-400 mt-0.5 block">
                      Ordered at {order.createdAt}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-zinc-400 block uppercase">Total Paid</span>
                    <span className="font-mono text-base font-bold text-white">
                      GH₵ {order.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Live Status Tracker Bar */}
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400 flex items-center gap-1.5 font-medium">
                      {order.fulfillment === 'delivery' ? (
                        <>
                          <Truck className="w-3.5 h-3.5 text-amber-400" />
                          <span>Status: In Preparation &bull; Courier Assigned</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="w-3.5 h-3.5 text-amber-400" />
                          <span>Status: Hearth Active &bull; Ready at {order.kioskName}</span>
                        </>
                      )}
                    </span>
                    <span className="font-mono text-amber-400 text-[11px] font-bold">
                      {order.fulfillment === 'delivery' ? '~20 mins' : 'Ready'}
                    </span>
                  </div>

                  {/* 3 Step tracker visually */}
                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    <div className="h-1.5 rounded-full bg-emerald-500" />
                    <div className="h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <div className="h-1.5 rounded-full bg-zinc-800" />
                  </div>
                </div>

                {/* Itemized List */}
                <div className="space-y-1.5 text-xs">
                  {order.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-zinc-300">
                      <span>
                        {it.quantity}x {it.product.name}
                      </span>
                      <span className="font-mono text-zinc-400">
                        GH₵ {(it.product.price * it.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer details */}
                <div className="pt-2 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-500 font-mono">
                  <span>Payment: {order.paymentMethod}</span>
                  {order.deliveryAddress && (
                    <span className="text-zinc-400">To: {order.deliveryAddress}</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
