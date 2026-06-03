'use client';

import { motion } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import { ShoppingCart, Star, Filter, Loader2 } from "lucide-react";
import { api } from '@/lib/axios';
import Link from 'next/link';

const CATEGORIES = ["All", "Electronics", "Fashion", "Home", "Sports", "Books"];

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  seller: {
    profile: {
      displayName: string;
    };
  };
  categories: {
    category: {
      name: string;
    }
  }[];
  images?: { url: string }[];
}

function ProductCard({ product }: { product: Product }) {
  // Using some mock rating for now until backend supports it
  const rating = 4.8;
  const reviews = 120;
  const categoryName = product.categories?.[0]?.category?.name || 'Uncategorized';
  const imageUrl = product.images?.[0]?.url;

  return (
    <motion.div
      className="bg-card border border-border rounded-2xl overflow-hidden group cursor-pointer hover:shadow-lg transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-56 bg-secondary relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
        {imageUrl ? (
          <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <img src={`https://picsum.photos/seed/${product.id}/600/400`} alt={product.name} className="w-full h-full object-cover" />
        )}
        <div className="absolute top-3 right-3 px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full shadow-md z-10">
          NEW
        </div>
      </div>

      <div className="p-5">
        <div className="text-xs text-muted-foreground mb-1">{categoryName}</div>
        <h4 className="text-foreground mb-2 truncate">{product.name}</h4>

        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground ml-1">({reviews})</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="text-2xl font-bold text-foreground">${product.price}</div>
          <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 font-medium">
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const url = selectedCategory === 'All' 
        ? '/products' 
        : `/products?category=${selectedCategory}`;
      const { data } = await api.get(url);
      setProducts(data.products || []);
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="min-h-screen">
      <div className="border-b border-border py-6 px-4 md:py-8 md:px-8 bg-card relative">
        <div className="max-w-7xl mx-auto flex flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-foreground mb-1 md:mb-2 text-xl md:text-2xl font-bold">Explore Marketplace</h2>
            <p className="text-muted-foreground text-sm md:text-base hidden sm:block">Discover amazing products curated just for you</p>
          </div>
          <Link href="/cart" className="p-3 bg-secondary text-foreground rounded-full hover:bg-secondary/80 relative transition-colors shadow-sm shrink-0">
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
              3
            </span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-4 md:py-8 md:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex gap-2 overflow-x-auto w-full pb-2 sm:pb-0 sm:flex-wrap [&::-webkit-scrollbar]:hidden">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 md:px-5 md:py-2.5 rounded-lg transition-all font-medium shrink-0 text-sm md:text-base ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-foreground hover:bg-muted"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <button className="flex items-center gap-2 px-5 py-2.5 border border-border bg-card rounded-lg hover:bg-secondary transition-all font-medium">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20 text-primary">
             <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No products found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
