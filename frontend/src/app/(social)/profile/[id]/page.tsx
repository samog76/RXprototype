'use client';

import { useParams } from 'next/navigation';
import { useProfile } from '@/features/profiles/hooks/useProfile';
import { ProfileHeader } from '@/features/profiles/components/ProfileHeader';

export default function ProfilePage() {
  const params = useParams();
  const id = params.id as string;
  
  const { data: profile, isLoading, error } = useProfile(id);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-background flex flex-col items-center justify-center text-foreground">
        <h1 className="text-2xl font-bold mb-2">User not found</h1>
        <p className="text-muted-foreground">This account doesn't exist or may have been deleted.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background text-foreground pb-20">
      <ProfileHeader profile={profile} />
      
      {/* Feed Tabs - To be implemented in Phase 5 */}
      <div className="max-w-4xl mx-auto border-b border-border">
        <div className="flex">
          <div className="px-6 py-4 font-bold text-foreground border-b-4 border-primary cursor-pointer">
            Posts
          </div>
          <div className="px-6 py-4 font-medium text-muted-foreground hover:bg-muted transition-colors cursor-pointer">
            Replies
          </div>
          <div className="px-6 py-4 font-medium text-muted-foreground hover:bg-muted transition-colors cursor-pointer">
            Media
          </div>
          <div className="px-6 py-4 font-medium text-muted-foreground hover:bg-muted transition-colors cursor-pointer">
            Likes
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8 text-center text-muted-foreground">
        <p>User posts will appear here (Coming in Phase 5).</p>
      </div>
    </div>
  );
}
