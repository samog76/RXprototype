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
    <div className="bg-[#0A0A0A] border-b border-gray-800 pb-4">
      {/* Cover Image */}
      <div 
        className="w-full h-48 sm:h-64 bg-gray-800 object-cover"
        style={{
          backgroundImage: profile.profile?.coverUrl ? `url(${profile.profile.coverUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        <div className="flex justify-between items-end -mt-12 sm:-mt-16 md:-mt-24 mb-4">
          {/* Avatar */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-4 border-[#0A0A0A] bg-gray-900 overflow-hidden shrink-0">
            {profile.profile?.avatarUrl ? (
              <img 
                src={profile.profile.avatarUrl} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl sm:text-4xl text-gray-500 font-bold bg-gray-800">
                {profile.profile?.displayName?.[0]?.toUpperCase() || profile?.email?.[0]?.toUpperCase() || 'U'}
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="mb-1 sm:mb-2 md:mb-4">
            {isOwnProfile ? (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="px-4 py-2 sm:px-6 sm:py-2 rounded-full border border-gray-600 font-bold text-white hover:bg-gray-800 transition-colors"
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={handleFollowToggle}
                disabled={followMutation.isPending}
                className={`px-4 py-2 sm:px-6 sm:py-2 rounded-full font-bold transition-colors ${
                  profile.isFollowing 
                    ? 'border border-gray-600 text-white hover:border-red-500 hover:text-red-500 hover:bg-red-500/10'
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                {profile.isFollowing ? 'Following' : 'Follow'}
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h1 className="text-2xl font-extrabold text-white">
              {profile.profile?.displayName || 'User'}
            </h1>
            <p className="text-gray-500 text-sm">@{profile?.email?.split('@')[0] || 'user'}</p>
          </div>

          {profile.profile?.bio && (
            <p className="text-white text-base leading-relaxed">
              {profile.profile.bio}
            </p>
          )}

          <div className="flex space-x-6 text-sm text-gray-400">
            <div className="hover:underline cursor-pointer">
              <span className="text-white font-bold">{profile._count?.following || 0}</span> Following
            </div>
            <div className="hover:underline cursor-pointer">
              <span className="text-white font-bold">{profile._count?.followers || 0}</span> Followers
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
