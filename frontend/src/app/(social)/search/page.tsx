'use client';

import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen">
      <div className="border-b border-border py-8 px-8 bg-card">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-foreground mb-4 text-2xl font-bold">Search</h2>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search users, posts, or products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-input-background border border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground text-lg placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto py-12 px-8 text-center">
        {query ? (
          <p className="text-muted-foreground">Searching for "{query}"...</p>
        ) : (
          <div className="text-muted-foreground flex flex-col items-center">
            <Search className="w-12 h-12 mb-4 opacity-20" />
            <p>Enter a keyword to start searching</p>
          </div>
        )}
      </div>
    </div>
  );
}
