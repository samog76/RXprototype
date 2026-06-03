import { Navigation } from "@/components/Navigation";
import { AuthGuard } from "@/components/AuthGuard";

export default function SocialLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        
        {/* Main Area with ml-20 to offset the fixed sidebar on desktop, and mb-16 to offset bottom bar on mobile */}
        <main className="mb-16 md:mb-0 md:ml-20 min-h-screen">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
