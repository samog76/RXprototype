'use client';

import { Home, User, Search, LayoutDashboard, Store, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

import { ThemeToggle } from "./ThemeToggle";

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const navItems = [
    { icon: Home, label: "Home", path: "/feed" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: Store, label: "Marketplace", path: "/marketplace" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  const isDashboardActive = pathname?.startsWith("/dashboard");

  return (
    <nav className="fixed bottom-0 left-0 w-full h-16 bg-card border-t border-border flex flex-row items-center px-4 gap-2 overflow-x-auto z-50 md:overflow-visible md:top-0 md:border-t-0 md:border-r md:w-20 md:h-screen md:flex-col md:py-6 md:px-0 md:gap-2 md:justify-start [&::-webkit-scrollbar]:hidden">
      <Link href="/feed" className="hidden md:flex mb-6 shrink-0">
        <img src="/logo.png" alt="Riba-X" className="w-10 h-10 object-contain" />
      </Link>

      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.path}
            href={item.path}
            className={`min-w-12 w-12 h-12 md:min-w-14 md:w-14 md:h-14 rounded-xl flex items-center justify-center transition-all shrink-0 ${
              isActive
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
            title={item.label}
          >
            <Icon className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
        );
      })}

      <div className="md:mt-auto md:mb-2 md:w-full md:px-2 flex shrink-0">
        <Link
          href="/dashboard"
          className={`min-w-12 w-12 h-12 md:w-full md:h-14 rounded-xl flex items-center justify-center transition-all shrink-0 ${
            isDashboardActive
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`}
          title="Dashboard"
        >
          <LayoutDashboard className="w-5 h-5 md:w-6 md:h-6" />
        </Link>
      </div>
      
      <div className="md:w-full md:px-2 md:mb-4 flex shrink-0">
        <button
          onClick={() => {
            useAuthStore.getState().clearAuth();
            router.push('/login');
          }}
          className="min-w-12 w-12 h-12 md:w-full md:h-14 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-all shadow-sm shrink-0"
          title="Logout"
        >
          <LogOut className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      <div className="shrink-0 flex items-center justify-center min-w-12 w-12 h-12 md:w-auto md:h-auto">
        <ThemeToggle />
      </div>
    </nav>
  );
}
