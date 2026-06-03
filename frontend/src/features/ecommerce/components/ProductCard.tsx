'use client';

import { useState } from 'react';
import { api } from '@/lib/axios';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: { url: string; isPrimary: boolean }[];
  seller: { profile?: { displayName: string } };
}

export function ProductCard({ product, onAddToCart }: { product: Product, onAddToCart: () => void }) {
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    setAdding(true);
    try {
      await api.post('/cart/items', { productId: product.id, quantity: 1 });
      onAddToCart();
    } catch (err) {
      console.error(err);
      alert('Failed to add to cart');
    } finally {
      setAdding(false);
    }
  };

  const imageUrl = product.images.find(i => i.isPrimary)?.url || product.images[0]?.url || 'https://via.placeholder.com/300';

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors group flex flex-col">
      <div className="aspect-square w-full overflow-hidden relative bg-black/20">
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="text-xs text-gray-400 mb-1">{product.seller.profile?.displayName || 'Unknown Seller'}</div>
        <h3 className="font-bold text-lg leading-tight mb-2 flex-1">{product.name}</h3>
        <div className="flex items-center justify-between mt-auto">
          <div className="font-bold text-xl">${Number(product.price).toFixed(2)}</div>
          <button 
            onClick={handleAdd}
            disabled={adding}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-1.5 px-4 rounded-full transition-all active:scale-95 disabled:opacity-50"
          >
            {adding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
