'use client';

import { motion } from "motion/react";
import { Package, Heart, Clock, TrendingUp, MapPin, CreditCard } from "lucide-react";

const MOCK_ORDERS = [
  {
    id: "ORD-2453",
    product: "Wireless Headphones Pro",
    status: "Delivered",
    date: "May 28, 2026",
    amount: 199,
  },
  {
    id: "ORD-2452",
    product: "Smart Watch Series 5",
    status: "In Transit",
    date: "June 1, 2026",
    amount: 349,
  },
  {
    id: "ORD-2451",
    product: "Running Shoes X",
    status: "Processing",
    date: "June 2, 2026",
    amount: 129,
  },
];

const MOCK_FAVORITES = [
  { id: 1, name: "Premium Backpack", price: 79, inStock: true },
  { id: 2, name: "Modern Desk Lamp", price: 59, inStock: true },
  { id: 3, name: "Summer Collection Jacket", price: 89, inStock: false },
];

const STATS = [
  { label: "Total Orders", value: "24", icon: Package, color: "primary" },
  { label: "Favorites", value: "12", icon: Heart, color: "accent" },
  { label: "Pending", value: "3", icon: Clock, color: "primary" },
  { label: "Saved", value: "$340", icon: TrendingUp, color: "accent" },
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
      </div>
      <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
      <div className="text-muted-foreground text-sm">{stat.label}</div>
    </motion.div>
  );
}

function OrderRow({ order }: { order: typeof MOCK_ORDERS[0] }) {
  const statusColors = {
    Delivered: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    "In Transit": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Processing: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  };

  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-b-0">
      <div className="flex-1">
        <div className="font-medium text-foreground">{order.product}</div>
        <div className="text-sm text-muted-foreground">{order.id}</div>
      </div>
      <div className="flex items-center gap-8">
        <div className="text-sm text-muted-foreground">{order.date}</div>
        <div
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            statusColors[order.status as keyof typeof statusColors]
          }`}
        >
          {order.status}
        </div>
        <div className="font-semibold text-foreground w-20 text-right">${order.amount}</div>
      </div>
    </div>
  );
}

export function BuyerDashboard() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-border py-8 px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-foreground mb-2 text-2xl font-bold">Buyer Dashboard</h2>
          <p className="text-muted-foreground">
            Track your orders, manage favorites, and view your shopping activity
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
          {/* Recent Orders */}
          <div className="col-span-1 lg:col-span-2 space-y-8">
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-foreground font-semibold">Recent Orders</h3>
                <button className="text-sm text-primary hover:underline">View All</button>
              </div>
              <div>
                {MOCK_ORDERS.map((order) => (
                  <OrderRow key={order.id} order={order} />
                ))}
              </div>
            </div>

            {/* Shipping Addresses */}
            <div className="bg-card border border-border rounded-2xl p-6 mt-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-foreground font-semibold">Saved Addresses</h3>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                  Add New
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-secondary rounded-xl border border-border">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground mb-1">Home</div>
                      <div className="text-sm text-muted-foreground">
                        123 Main Street, Apt 4B
                        <br />
                        New York, NY 10001
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-secondary rounded-xl border border-border">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground mb-1">Work</div>
                      <div className="text-sm text-muted-foreground">
                        456 Business Ave, Suite 200
                        <br />
                        New York, NY 10002
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Favorites */}
            <div className="bg-card border border-border rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-foreground font-semibold">Favorites</h3>
                <button className="text-sm text-primary hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                {MOCK_FAVORITES.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-secondary rounded-lg flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground text-sm truncate">
                        {item.name}
                      </div>
                      <div className="text-primary font-semibold text-sm">${item.price}</div>
                      {!item.inStock && (
                        <div className="text-xs text-accent">Out of Stock</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-foreground font-semibold">Payment Methods</h3>
                <button className="text-sm text-primary hover:underline">Add</button>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-gradient-to-br from-primary to-accent rounded-xl text-white">
                  <div className="flex items-center gap-2 mb-8">
                    <CreditCard className="w-5 h-5" />
                    <span className="text-sm font-medium">Visa</span>
                  </div>
                  <div className="text-lg tracking-wider mb-4">•••• •••• •••• 4242</div>
                  <div className="flex justify-between text-xs">
                    <span>John Doe</span>
                    <span>12/28</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
