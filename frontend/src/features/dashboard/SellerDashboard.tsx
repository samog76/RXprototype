'use client';

import { motion } from "motion/react";
import {
  DollarSign,
  Package,
  TrendingUp,
  ShoppingBag,
  Plus,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const SALES_DATA = [
  { month: "Jan", sales: 4200 },
  { month: "Feb", sales: 5100 },
  { month: "Mar", sales: 4800 },
  { month: "Apr", sales: 6300 },
  { month: "May", sales: 7200 },
  { month: "Jun", sales: 8100 },
];

const STATS = [
  { label: "Total Revenue", value: "$35,680", icon: DollarSign, color: "primary", change: "+12.5%" },
  { label: "Products Sold", value: "342", icon: ShoppingBag, color: "accent", change: "+8.2%" },
  { label: "Active Listings", value: "48", icon: Package, color: "primary", change: "+3" },
  { label: "Avg. Order Value", value: "$104", icon: TrendingUp, color: "accent", change: "+5.3%" },
];

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Wireless Headphones Pro",
    price: 199,
    stock: 45,
    sold: 234,
    status: "Active",
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 349,
    stock: 12,
    sold: 891,
    status: "Active",
  },
  {
    id: 3,
    name: "Running Shoes X",
    price: 129,
    stock: 0,
    sold: 345,
    status: "Out of Stock",
  },
  {
    id: 4,
    name: "Modern Desk Lamp",
    price: 59,
    stock: 78,
    sold: 178,
    status: "Active",
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

function ProductRow({ product }: { product: typeof MOCK_PRODUCTS[0] }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-b-0">
      <div className="flex items-center gap-4 flex-1">
        <div className="w-14 h-14 bg-secondary rounded-lg flex-shrink-0"></div>
        <div>
          <div className="font-medium text-foreground">{product.name}</div>
          <div className="text-sm text-muted-foreground">Stock: {product.stock} units</div>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <div className="text-right">
          <div className="font-semibold text-foreground">${product.price}</div>
          <div className="text-sm text-muted-foreground">{product.sold} sold</div>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            product.status === "Active"
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {product.status}
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors" title="View">
            <Eye className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors" title="Edit">
            <Edit className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors" title="Delete">
            <Trash2 className="w-4 h-4 text-accent" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function SellerDashboard() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-border py-8 px-8 bg-card">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h2 className="text-foreground mb-2 text-2xl font-bold">Seller Dashboard</h2>
            <p className="text-muted-foreground">
              Manage your products, track sales, and grow your business
            </p>
          </div>
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg flex items-center gap-2 font-medium">
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {STATS.map((stat, i) => (
            <StatCard key={i} stat={stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1 lg:col-span-2 space-y-8">
            {/* Sales Chart */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-foreground font-semibold mb-6">Sales Overview</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={SALES_DATA}>
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
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Product List */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-foreground font-semibold">Your Products</h3>
                <button className="text-sm text-primary hover:underline">View All</button>
              </div>
              <div>
                {MOCK_PRODUCTS.map((product) => (
                  <ProductRow key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-2xl p-6 mb-8">
              <h3 className="text-foreground font-semibold mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-left flex items-center gap-3 font-medium">
                  <Plus className="w-5 h-5" />
                  Add New Product
                </button>
                <button className="w-full px-4 py-3 bg-secondary text-foreground rounded-lg hover:bg-muted transition-colors text-left flex items-center gap-3 font-medium">
                  <Package className="w-5 h-5" />
                  Manage Inventory
                </button>
                <button className="w-full px-4 py-3 bg-secondary text-foreground rounded-lg hover:bg-muted transition-colors text-left flex items-center gap-3 font-medium">
                  <TrendingUp className="w-5 h-5" />
                  View Analytics
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-2xl p-6 mb-8">
              <h3 className="text-foreground font-semibold mb-6">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm text-foreground">New order received</div>
                    <div className="text-xs text-muted-foreground">2 hours ago</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm text-foreground">Product stock updated</div>
                    <div className="text-xs text-muted-foreground">5 hours ago</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm text-foreground">Low stock alert</div>
                    <div className="text-xs text-muted-foreground">1 day ago</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm text-foreground">Payment received</div>
                    <div className="text-xs text-muted-foreground">2 days ago</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-border">
              <h3 className="text-foreground font-semibold mb-4">This Month</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Revenue</span>
                  <span className="text-foreground font-semibold">$8,100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Orders</span>
                  <span className="text-foreground font-semibold">78</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Conversion</span>
                  <span className="text-foreground font-semibold">4.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
