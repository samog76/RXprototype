import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';

export function useProfile(id: string) {
  return useQuery({
    queryKey: ['profile', id],
    queryFn: async () => {
      const { data } = await api.get(`/profiles/${id}`);
      return data;
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (profileData: any) => {
      const { data } = await api.put('/profiles/me', profileData);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile', data.userId] });
    },
  });
}

export function useFollowUser(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (isFollowing: boolean) => {
      if (isFollowing) {
        await api.delete(`/users/${id}/follow`);
      } else {
        await api.post(`/users/${id}/follow`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', id] });
    },
  });
}
