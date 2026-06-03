'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/axios';

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/cart');
      setCart(data);
    } catch (err) {
      console.error('Failed to fetch cart', err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const { data } = await api.delete(`/cart/items/${itemId}`);
      setCart(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  const items = cart?.items || [];
  const total = items.reduce((acc: number, item: any) => acc + (Number(item.product.price) * item.quantity), 0);

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-[#111] border-l border-white/10 z-50 flex flex-col shadow-2xl animate-in slide-in-from-right">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#1a1a1a]">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="text-center text-gray-500 py-8">Loading cart...</div>
          ) : items.length === 0 ? (
            <div className="text-center text-gray-500 py-8">Your cart is empty</div>
          ) : (
            items.map((item: any) => (
              <div key={item.id} className="flex gap-4 bg-white/5 p-3 rounded-xl border border-white/5">
                <img 
                  src={item.product.images?.[0]?.url || 'https://via.placeholder.com/100'} 
                  className="w-20 h-20 object-cover rounded-lg bg-black/20" 
                  alt={item.product.name}
                />
                <div className="flex-1">
                  <h4 className="font-bold text-sm leading-tight">{item.product.name}</h4>
                  <div className="text-gray-400 text-xs mt-1">Qty: {item.quantity}</div>
                  <div className="font-bold text-blue-400 mt-2">${Number(item.product.price).toFixed(2)}</div>
                </div>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="text-gray-500 hover:text-red-500 p-2 h-fit"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-white/10 bg-[#1a1a1a]">
          <div className="flex justify-between items-center mb-4 text-lg">
            <span className="text-gray-400">Total</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
          <button 
            onClick={async () => {
              try {
                const { data } = await api.post('/orders/checkout');
                if (data.url) {
                  window.location.href = data.url;
                }
              } catch (err) {
                console.error(err);
                alert('Checkout failed');
              }
            }}
            disabled={items.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-colors"
          >
            Checkout with Stripe
          </button>
        </div>
      </div>
    </>
  );
}
