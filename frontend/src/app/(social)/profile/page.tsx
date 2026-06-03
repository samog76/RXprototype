'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Loader2 } from 'lucide-react';

export default function ProfileRedirect() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isAuthenticated || !user) {
        router.push('/login');
      } else {
        router.push(`/profile/${user.id}`);
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [isAuthenticated, user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
}
