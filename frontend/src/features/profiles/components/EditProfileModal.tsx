'use client';

import { useState } from 'react';
import { useUpdateProfile } from '../hooks/useProfile';

interface EditProfileModalProps {
  profile: any;
  onClose: () => void;
}

export function EditProfileModal({ profile, onClose }: EditProfileModalProps) {
  const [displayName, setDisplayName] = useState(profile?.profile?.displayName || '');
  const [bio, setBio] = useState(profile?.profile?.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.profile?.avatarUrl || '');
  const [coverUrl, setCoverUrl] = useState(profile?.profile?.coverUrl || '');
  
  const updateProfileMutation = useUpdateProfile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate(
      { displayName, bio, avatarUrl, coverUrl },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#15181c] w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold text-white mb-6">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none h-24"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Avatar URL</label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Cover Image URL</label>
            <input
              type="url"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={updateProfileMutation.isPending}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-colors disabled:opacity-50"
            >
              {updateProfileMutation.isPending ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
