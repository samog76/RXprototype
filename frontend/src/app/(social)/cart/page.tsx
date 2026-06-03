'use client';

import { motion } from "motion/react";
import { useState } from "react";
import { Trash2, Plus, Minus, ShoppingBag, CreditCard } from "lucide-react";

const MOCK_CART_ITEMS = [
  { id: 1, name: "Wireless Headphones Pro", price: 199, quantity: 1, image: true },
  { id: 2, name: "Summer Collection Jacket", price: 89, quantity: 2, image: true },
  { id: 3, name: "Smart Watch Series 5", price: 349, quantity: 1, image: true },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(MOCK_CART_ITEMS);
  const [showCheckout, setShowCheckout] = useState(false);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = 0;
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen">
      <div className="border-b border-border py-6 px-4 md:py-8 md:px-8 bg-card relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-foreground mb-1 text-2xl font-bold">Shopping Cart</h2>
          <p className="text-muted-foreground text-sm md:text-base">Review your items and checkout</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-6 px-4 md:py-8 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <div className="bg-card border border-border rounded-2xl p-12 text-center shadow-sm">
                <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-foreground mb-2 text-xl font-bold">Your cart is empty</h3>
                <p className="text-muted-foreground mb-6">
                  Add some products to get started
                </p>
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                  Continue Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-card border border-border rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="w-full sm:w-24 h-40 sm:h-24 bg-secondary rounded-xl flex-shrink-0 flex items-center justify-center">
                    <div className="text-muted-foreground text-xs">Image</div>
                  </div>

                  <div className="flex-1 w-full text-center sm:text-left">
                    <h4 className="text-foreground mb-1 font-semibold">{item.name}</h4>
                    <div className="text-xl font-bold text-primary">${item.price}</div>
                  </div>

                  <div className="flex items-center gap-3 w-full justify-center sm:w-auto sm:justify-start">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-9 h-9 rounded-lg border border-border hover:bg-secondary flex items-center justify-center transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <div className="w-12 text-center font-semibold text-lg">{item.quantity}</div>

                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-9 h-9 rounded-lg border border-border hover:bg-secondary flex items-center justify-center transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-10 h-10 mt-4 sm:mt-0 rounded-lg border border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all flex items-center justify-center"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-8 shadow-sm">
              <h3 className="text-foreground mb-6 font-bold text-xl">Order Summary</h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (10%)</span>
                  <span className="text-foreground font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-primary font-medium">FREE</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-lg font-semibold text-foreground">Total</span>
                <span className="text-2xl font-bold text-foreground">${total.toFixed(2)}</span>
              </div>

              <button
                onClick={() => setShowCheckout(true)}
                disabled={cartItems.length === 0}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary shadow-md hover:shadow-lg font-medium"
              >
                Proceed to Checkout
              </button>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <CreditCard className="w-4 h-4" />
                  <span>Secure payment processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCheckout && (
        <motion.div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowCheckout(false)}
        >
          <motion.div
            className="bg-card border border-border rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-foreground mb-2 text-xl font-bold">Complete Your Order</h2>
              <p className="text-muted-foreground mb-8">
                Your order is being processed securely. Total amount: <span className="text-foreground font-bold">${total.toFixed(2)}</span>
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCheckout(false)}
                  className="flex-1 px-6 py-3 border border-border text-foreground rounded-lg hover:bg-secondary transition-all font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowCheckout(false);
                    setCartItems([]);
                  }}
                  className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium shadow-md"
                >
                  Confirm
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
