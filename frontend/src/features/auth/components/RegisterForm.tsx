'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from "motion/react";
import { Lock, Mail, User } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function RegisterForm() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('buyer'); // Actually we might not have exposed this in API yet, but we'll include it
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await api.post('/auth/register', { 
        email, 
        password, 
        displayName,
        role: accountType 
      });
      setAuth(data.user, data.accessToken);
      if (data.user.role === 'ADMIN' || data.user.role === 'SELLER') {
        router.push('/dashboard');
      } else {
        router.push('/feed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-8">
      <div className="absolute top-8 right-8">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
          <div className="text-center mb-8">
            <Link href="/">
              <img
                src="/logo.png"
                alt="Riba-X"
                className="w-16 h-16 mx-auto mb-4 object-contain cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
            <h2 className="text-foreground mb-2 text-2xl font-bold">Create Your Account</h2>
            <p className="text-muted-foreground">
              Join Riba-X and start your journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg border border-destructive/20">
                {error}
              </div>
            )}
            <div>
              <label className="block mb-2 text-foreground font-medium">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-foreground font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-foreground font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="Create a password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Must be at least 8 characters
              </p>
            </div>

            <div>
              <label className="block mb-2 text-foreground font-medium">Account Type</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="relative flex items-center justify-center p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-all bg-secondary">
                  <input
                    type="radio"
                    name="accountType"
                    value="buyer"
                    checked={accountType === 'buyer'}
                    onChange={() => setAccountType('buyer')}
                    className="sr-only peer"
                  />
                  <div className="text-center peer-checked:text-primary">
                    <div className="font-medium">Buyer</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Shop products
                    </div>
                  </div>
                  <div className="absolute inset-0 border-2 border-primary rounded-lg opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"></div>
                </label>
                <label className="relative flex items-center justify-center p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-all bg-secondary">
                  <input
                    type="radio"
                    name="accountType"
                    value="seller"
                    checked={accountType === 'seller'}
                    onChange={() => setAccountType('seller')}
                    className="sr-only peer"
                  />
                  <div className="text-center peer-checked:text-primary">
                    <div className="font-medium">Seller</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Sell products
                    </div>
                  </div>
                  <div className="absolute inset-0 border-2 border-primary rounded-lg opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"></div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg font-medium mt-6 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-muted-foreground">Already have an account?</span>
            <Link href="/login" className="ml-2 text-primary hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
