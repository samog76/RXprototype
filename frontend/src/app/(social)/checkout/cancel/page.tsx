import Link from 'next/link';

export default function CheckoutCancelPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#0A0A0A] text-center">
      <div className="w-24 h-24 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center text-5xl mb-6">
        ✕
      </div>
      <h1 className="text-4xl font-bold mb-4">Payment Cancelled</h1>
      <p className="text-gray-400 max-w-md mb-8">
        Your payment process was cancelled or interrupted. No charges were made to your account.
      </p>
      <Link 
        href="/marketplace"
        className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full transition-colors"
      >
        Return to Marketplace
      </Link>
    </div>
  );
}
