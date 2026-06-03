'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useFollowUser } from '../hooks/useProfile';
import { EditProfileModal } from './EditProfileModal';

interface ProfileHeaderProps {
  profile: any;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const currentUser = useAuthStore((state) => state.user);
  const isOwnProfile = currentUser?.id === profile.id;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const followMutation = useFollowUser(profile.id);

  const handleFollowToggle = () => {
    if (!currentUser) {
      alert("Please login to follow users.");
      return;
    }
    followMutation.mutate(profile.isFollowing);
  };

  return (
    <div className="bg-background border-b border-border pb-4">
      {/* Cover Image */}
      <div 
        className="w-full h-48 sm:h-64 bg-muted object-cover"
        style={{
          backgroundImage: profile.profile?.coverUrl ? `url(${profile.profile.coverUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        <div className="flex justify-between items-end -mt-12 sm:-mt-16 md:-mt-24 mb-4">
          {/* Avatar */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-4 border-background bg-card overflow-hidden shrink-0">
            {profile.profile?.avatarUrl ? (
              <img 
                src={profile.profile.avatarUrl} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl sm:text-4xl text-muted-foreground font-bold bg-muted">
                {profile.profile?.displayName?.[0]?.toUpperCase() || profile?.email?.[0]?.toUpperCase() || 'U'}
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="mb-1 sm:mb-2 md:mb-4">
            {isOwnProfile ? (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="px-4 py-2 sm:px-6 sm:py-2 rounded-full border border-border font-bold text-foreground hover:bg-muted transition-colors"
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={handleFollowToggle}
                disabled={followMutation.isPending}
                className={`px-4 py-2 sm:px-6 sm:py-2 rounded-full font-bold transition-colors ${
                  profile.isFollowing 
                    ? 'border border-border text-foreground hover:border-destructive hover:text-destructive hover:bg-destructive/10'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                {profile.isFollowing ? 'Following' : 'Follow'}
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">
              {profile.profile?.displayName || 'User'}
            </h1>
            <p className="text-muted-foreground text-sm">@{profile?.email?.split('@')[0] || 'user'}</p>
          </div>

          {profile.profile?.bio && (
            <p className="text-foreground text-base leading-relaxed">
              {profile.profile.bio}
            </p>
          )}

          <div className="flex space-x-6 text-sm text-muted-foreground">
            <div className="hover:underline cursor-pointer">
              <span className="text-foreground font-bold">{profile._count?.following || 0}</span> Following
            </div>
            <div className="hover:underline cursor-pointer">
              <span className="text-foreground font-bold">{profile._count?.followers || 0}</span> Followers
            </div>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <EditProfileModal 
          profile={profile} 
          onClose={() => setIsEditModalOpen(false)} 
        />
      )}
    </div>
  );
}
