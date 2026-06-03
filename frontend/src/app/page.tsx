'use client';

import { motion } from "motion/react";
import { ArrowRight, Users, ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Riba-X" className="w-10 h-10 object-contain" />
            <span className="text-xl font-semibold text-foreground">Riba-X</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-20">
        <section className="max-w-7xl mx-auto px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-block mb-4 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                Welcome to the future of social commerce
              </motion.div>

              <h1 className="mb-6 text-foreground text-5xl font-extrabold leading-tight">
                Connect, Share, and Shop in One Place
              </h1>

              <p className="text-xl text-muted-foreground mb-10">
                Riba-X brings together social networking and online shopping. Discover products from friends, share your finds, and shop seamlessly.
              </p>

              <div className="flex gap-4">
                <Link href="/login">
                  <button className="px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 font-medium">
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <button className="px-8 py-4 border-2 border-border bg-card rounded-xl hover:bg-secondary transition-all font-medium">
                  Learn More
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden md:block"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-[2.5rem] transform translate-x-4 translate-y-4"></div>
              <img 
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80" 
                alt="People shopping online" 
                className="relative rounded-[2.5rem] shadow-2xl object-cover w-full h-[600px]"
              />
            </motion.div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Social Feed",
                description: "Stay connected with friends and discover what they're loving",
                color: "primary",
              },
              {
                icon: ShoppingCart,
                title: "Easy Shopping",
                description: "Browse and buy products directly from your feed",
                color: "accent",
              },
              {
                icon: Heart,
                title: "Personalized",
                description: "Get recommendations based on what you and your friends like",
                color: "primary",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.6 }}
                className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-14 h-14 rounded-xl ${
                    feature.color === "primary" ? "bg-primary/10" : "bg-accent/10"
                  } flex items-center justify-center mb-4`}
                >
                  <feature.icon
                    className={`w-7 h-7 ${
                      feature.color === "primary" ? "text-primary" : "text-accent"
                    }`}
                  />
                </div>
                <h3 className="text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-20">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
            >
              {[
                { value: "1M+", label: "Active Users" },
                { value: "50K+", label: "Products" },
                { value: "4.9★", label: "User Rating" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-5xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-8 text-center text-muted-foreground">
          © 2026 Riba-X. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
