'use client';

import { useState } from 'react';
import { api } from '@/lib/axios';
import { motion } from "motion/react";
import { Heart, MessageCircle, Share2, MoreVertical, Repeat } from "lucide-react";

export interface Post {
  id: string;
  content: string;
  createdAt: string;
  author: {
    email: string;
    profile?: {
      displayName: string;
    };
  };
  _count: {
    likes: number;
    comments: number;
    reposts: number;
  };
  repost?: Post;
}

export function PostCard({ post }: { post: Post }) {
  const [likes, setLikes] = useState(post._count.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [reposts, setReposts] = useState(post._count.reposts || 0);

  const isRepost = !!post.repost;
  const displayPost = isRepost ? post.repost! : post;

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    try {
      await api.post(`/posts/${displayPost.id}/like`);
    } catch {
      setIsLiked(!isLiked);
      setLikes(prev => isLiked ? prev + 1 : prev - 1);
    }
  };

  const handleRepost = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await api.post(`/posts/${displayPost.id}/repost`);
      setReposts(prev => prev + 1);
    } catch {
      console.error('Failed to repost');
    }
  };

  const displayName = displayPost.author.profile?.displayName || 'User';
  const handle = `@${displayPost.author.email.split('@')[0]}`;
  const initial = displayPost.author.email[0].toUpperCase();
  const time = new Date(displayPost.createdAt).toLocaleDateString();

  return (
    <motion.div
      className="bg-card border border-border rounded-2xl p-6 mb-4 hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isRepost && (
        <div className="text-muted-foreground text-sm font-medium flex items-center mb-4 pl-2">
          <Repeat className="w-4 h-4 mr-2" />
          {post.author.profile?.displayName || 'User'} reposted
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold">
            {initial}
          </div>
          <div>
            <div className="font-semibold text-foreground">{displayName}</div>
            <div className="text-sm text-muted-foreground">{handle} · {time}</div>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-colors p-1">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <p className="text-foreground mb-4 leading-relaxed whitespace-pre-wrap word-break-words">
        {displayPost.content}
      </p>

      <div className="flex items-center gap-8 pt-4 border-t border-border">
        <motion.button
          onClick={handleLike}
          className={`flex items-center gap-2 transition-colors ${
            isLiked ? "text-accent" : "text-muted-foreground hover:text-accent"
          }`}
          whileTap={{ scale: 0.95 }}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-accent" : ""}`} />
          <span className="font-medium">{likes}</span>
        </motion.button>

        <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium">{displayPost._count.comments || 0}</span>
        </button>

        <button 
          onClick={handleRepost}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <Repeat className="w-5 h-5" />
          <span className="font-medium">{reposts}</span>
        </button>

        <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
