'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { AdminDashboard } from '@/features/dashboard/AdminDashboard';
import { SellerDashboard } from '@/features/dashboard/SellerDashboard';
import { BuyerDashboard } from '@/features/dashboard/BuyerDashboard';

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Wait for auth to be hydrated
    const timeout = setTimeout(() => {
      setLoading(false);
      if (!isAuthenticated) {
        router.push('/login');
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [isAuthenticated, router]);

  if (loading || !user) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (user.role === 'ADMIN') {
    return (
      <Suspense fallback={<div className="p-8">Loading...</div>}>
        <AdminDashboard />
      </Suspense>
    );
  } else if (user.role === 'SELLER') {
    return (
      <Suspense fallback={<div className="p-8">Loading...</div>}>
        <SellerDashboard />
      </Suspense>
    );
  } else {
    return (
      <Suspense fallback={<div className="p-8">Loading...</div>}>
        <BuyerDashboard />
      </Suspense>
    );
  }
}
