'use client';

import { motion } from "motion/react";
import {
  Users,
  ShoppingBag,
  DollarSign,
  Activity,
  UserCheck,
  UserX,
  AlertCircle,
  TrendingUp,
  Search,
  MoreVertical,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const USER_GROWTH_DATA = [
  { month: "Jan", users: 12000, revenue: 45000 },
  { month: "Feb", users: 15000, revenue: 52000 },
  { month: "Mar", users: 18000, revenue: 61000 },
  { month: "Apr", users: 22000, revenue: 73000 },
  { month: "May", users: 28000, revenue: 89000 },
  { month: "Jun", users: 35000, revenue: 108000 },
];

const CATEGORY_DATA = [
  { category: "Electronics", sales: 45000 },
  { category: "Fashion", sales: 38000 },
  { category: "Home", sales: 29000 },
  { category: "Sports", sales: 21000 },
  { category: "Books", sales: 15000 },
];

const STATS = [
  {
    label: "Total Users",
    value: "1.2M",
    icon: Users,
    color: "primary",
    change: "+15.3%",
  },
  {
    label: "Platform Revenue",
    value: "$2.4M",
    icon: DollarSign,
    color: "accent",
    change: "+22.1%",
  },
  {
    label: "Active Sellers",
    value: "8,429",
    icon: ShoppingBag,
    color: "primary",
    change: "+8.7%",
  },
  {
    label: "Transaction Rate",
    value: "94.2%",
    icon: Activity,
    color: "accent",
    change: "+2.4%",
  },
];

const RECENT_USERS = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    role: "Buyer",
    status: "Active",
    joined: "June 1, 2026",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@email.com",
    role: "Seller",
    status: "Active",
    joined: "May 30, 2026",
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma.d@email.com",
    role: "Buyer",
    status: "Pending",
    joined: "May 29, 2026",
  },
  {
    id: 4,
    name: "James Wilson",
    email: "j.wilson@email.com",
    role: "Seller",
    status: "Active",
    joined: "May 28, 2026",
  },
];

const ALERTS = [
  {
    type: "warning",
    message: "3 products pending approval",
    time: "2 hours ago",
  },
  {
    type: "info",
    message: "System maintenance scheduled",
    time: "5 hours ago",
  },
  {
    type: "error",
    message: "Payment gateway issue resolved",
    time: "1 day ago",
  },
];

function StatCard({ stat }: { stat: typeof STATS[0] }) {
  const Icon = stat.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl ${
            stat.color === "primary" ? "bg-primary/10" : "bg-accent/10"
          } flex items-center justify-center`}
        >
          <Icon
            className={`w-6 h-6 ${
              stat.color === "primary" ? "text-primary" : "text-accent"
            }`}
          />
        </div>
        <div className="text-green-600 dark:text-green-400 text-sm font-medium">
          {stat.change}
        </div>
      </div>
      <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
      <div className="text-muted-foreground text-sm">{stat.label}</div>
    </motion.div>
  );
}

function UserRow({ user }: { user: typeof RECENT_USERS[0] }) {
  const statusColors = {
    Active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    Suspended: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-b-0">
      <div className="flex items-center gap-4 flex-1">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold">
          {user.name.charAt(0)}
        </div>
        <div>
          <div className="font-medium text-foreground">{user.name}</div>
          <div className="text-sm text-muted-foreground">{user.email}</div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-sm text-muted-foreground w-24">{user.role}</div>
        <div className="text-sm text-muted-foreground w-32">{user.joined}</div>
        <div
          className={`px-3 py-1 rounded-full text-xs font-medium w-20 text-center ${
            statusColors[user.status as keyof typeof statusColors]
          }`}
        >
          {user.status}
        </div>
        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
          <MoreVertical className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}

export function AdminDashboard() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-border py-8 px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-foreground mb-2 text-2xl font-bold">Admin Dashboard</h2>
          <p className="text-muted-foreground">
            Monitor platform performance, manage users, and oversee operations
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {STATS.map((stat, i) => (
            <StatCard key={i} stat={stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts */}
          <div className="col-span-1 lg:col-span-2">
            {/* User Growth & Revenue Chart */}
            <div className="bg-card border border-border rounded-2xl p-6 mb-8">
              <h3 className="text-foreground font-semibold mb-6">
                Platform Growth Overview
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={USER_GROWTH_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="month"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      name="Users"
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      name="Revenue ($)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Performance */}
            <div className="bg-card border border-border rounded-2xl p-6 mb-8">
              <h3 className="text-foreground font-semibold mb-6">
                Sales by Category
              </h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CATEGORY_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="category"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Users */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-foreground font-semibold">Recent Users</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
                  />
                </div>
              </div>
              <div>
                {RECENT_USERS.map((user) => (
                  <UserRow key={user.id} user={user} />
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm text-primary hover:underline">
                View All Users
              </button>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div>
            {/* System Status */}
            <div className="bg-card border border-border rounded-2xl p-6 mb-8">
              <h3 className="text-foreground font-semibold mb-6">System Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-foreground">API Server</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-foreground">Database</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Healthy</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-foreground">Payment Gateway</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-foreground">CDN</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Degraded</span>
                </div>
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-card border border-border rounded-2xl p-6 mb-8">
              <h3 className="text-foreground font-semibold mb-6">Recent Alerts</h3>
              <div className="space-y-4">
                {ALERTS.map((alert, i) => {
                  const iconColors = {
                    warning:
                      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
                    info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                    error: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                  };

                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className={`p-1.5 rounded-lg ${
                          iconColors[alert.type as keyof typeof iconColors]
                        }`}
                      >
                        <AlertCircle className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-foreground">{alert.message}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {alert.time}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-border mb-8">
              <h3 className="text-foreground font-semibold mb-4">Today's Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">New Signups</span>
                  </div>
                  <span className="font-semibold text-foreground">247</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-accent" />
                    <span className="text-sm text-foreground">Transactions</span>
                  </div>
                  <span className="font-semibold text-foreground">1,834</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">Revenue</span>
                  </div>
                  <span className="font-semibold text-foreground">$42,680</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserX className="w-4 h-4 text-accent" />
                    <span className="text-sm text-foreground">Refunds</span>
                  </div>
                  <span className="font-semibold text-foreground">12</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-foreground font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium text-left">
                  Manage Users
                </button>
                <button className="w-full px-4 py-2.5 bg-secondary text-foreground rounded-lg hover:bg-muted transition-colors text-sm font-medium text-left">
                  Review Products
                </button>
                <button className="w-full px-4 py-2.5 bg-secondary text-foreground rounded-lg hover:bg-muted transition-colors text-sm font-medium text-left">
                  Platform Settings
                </button>
                <button className="w-full px-4 py-2.5 bg-secondary text-foreground rounded-lg hover:bg-muted transition-colors text-sm font-medium text-left">
                  Export Reports
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
