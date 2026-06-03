'use client';

import { useEffect, useState, useCallback } from 'react';
import { api } from '@/lib/axios';
import { CreatePost } from '@/features/posts/components/CreatePost';
import { PostCard, Post } from '@/features/posts/components/PostCard';
import { Loader2 } from "lucide-react";

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    try {
      const { data } = await api.get('/posts');
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Failed to fetch posts', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="max-w-2xl mx-auto py-8 px-6">
      <div className="mb-8">
        <h2 className="text-foreground mb-1 text-2xl font-bold">Your Feed</h2>
        <p className="text-muted-foreground">See what your friends are sharing</p>
      </div>

      <CreatePost onPostCreated={fetchPosts} />

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center p-8 text-primary">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center p-8 text-muted-foreground bg-card rounded-2xl border border-border">
            No posts yet. Be the first to say something!
          </div>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}
