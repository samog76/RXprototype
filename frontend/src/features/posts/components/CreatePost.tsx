'use client';

import { useState } from 'react';
import { api } from '@/lib/axios';

export function CreatePost({ onPostCreated }: { onPostCreated: () => void }) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setIsSubmitting(true);
    try {
      await api.post('/posts', { content, mediaUrls: [] });
      setContent('');
      onPostCreated();
    } catch (error) {
      console.error('Failed to create post', error);
      alert('Failed to publish post. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 mb-8 shadow-sm">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="Share something with your friends..."
        className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground mb-4"
        maxLength={500}
      />
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!content.trim() || isSubmitting}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50"
        >
          {isSubmitting ? 'Posting...' : 'Post'}
        </button>
      </div>
    </div>
  );
}
