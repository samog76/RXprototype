import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-background text-foreground text-center">
      <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center text-5xl mb-6">
        ✓
      </div>
      <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        Thank you for your purchase. Your order has been securely processed and your items are being prepared.
      </p>
      <Link 
        href="/marketplace"
        className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-8 rounded-full transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
