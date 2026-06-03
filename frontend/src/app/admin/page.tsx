'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axios';

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalPosts: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Role is not fully exposed in our JWT or User object yet on frontend, 
    // but the backend will protect the route. Let's fetch the stats.
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/stats');
        setStats(data);
      } catch (err: any) {
        if (err.response?.status === 403) {
          setError('Access Denied. You do not have administrator privileges.');
        } else {
          setError('Failed to load dashboard statistics.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-2xl max-w-md text-center">
          <h2 className="text-xl font-bold mb-2">Unauthorized</h2>
          <p>{error}</p>
          <button 
            onClick={() => router.push('/')}
            className="mt-6 px-6 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-white/10 pb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-400 mt-1">Platform overview and statistics</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/20">
              System Admin
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Users" value={stats?.totalUsers || 0} icon="👥" color="text-blue-500" bg="bg-blue-500/10" />
          <StatCard title="Active Posts" value={stats?.totalPosts || 0} icon="📝" color="text-green-500" bg="bg-green-500/10" />
          <StatCard title="Products" value={stats?.totalProducts || 0} icon="🛍️" color="text-purple-500" bg="bg-purple-500/10" />
          <StatCard title="Orders" value={stats?.totalOrders || 0} icon="📦" color="text-yellow-500" bg="bg-yellow-500/10" />
        </div>

        <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <button 
              onClick={async () => {
                try {
                  const res = await api.post('/admin/seed', { secret: 'default_secret' });
                  alert(res.data.message);
                } catch (e: any) {
                  alert(e.response?.data?.message || 'Error seeding database');
                }
              }}
              className="p-4 bg-black/40 hover:bg-black/60 border border-white/5 rounded-xl transition-colors text-left flex flex-col"
            >
              <span className="font-bold mb-1">Seed Database</span>
              <span className="text-gray-500">Run mock data generator</span>
            </button>
            <button className="p-4 bg-black/40 hover:bg-black/60 border border-white/5 rounded-xl transition-colors text-left flex flex-col">
              <span className="font-bold mb-1">Manage Users</span>
              <span className="text-gray-500">Suspend or elevate roles</span>
            </button>
            <button className="p-4 bg-black/40 hover:bg-black/60 border border-white/5 rounded-xl transition-colors text-left flex flex-col">
              <span className="font-bold mb-1">System Logs</span>
              <span className="text-gray-500">View recent activity errors</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({ title, value, icon, color, bg }: { title: string, value: number, icon: string, color: string, bg: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start space-x-4">
      <div className={`p-4 rounded-xl ${bg} ${color} text-2xl`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold mt-1">{value.toLocaleString()}</p>
      </div>
    </div>
  );
}
