import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string, currentUserId?: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        _count: {
          select: { followers: true, following: true, posts: true },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    let isFollowing = false;
    if (currentUserId && currentUserId !== userId) {
      const follow = await this.prisma.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId: currentUserId,
            followingId: userId,
          },
        },
      });
      isFollowing = !!follow;
    }

    // Omit sensitive data
    const { passwordHash, ...safeUser } = user;
    
    return {
      ...safeUser,
      isFollowing,
    };
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    // Upsert the profile since it might not exist if data was migrated poorly, 
    // although our register flow creates it.
    const updatedProfile = await this.prisma.profile.upsert({
      where: { userId },
      update: {
        displayName: dto.displayName,
        bio: dto.bio,
        avatarUrl: dto.avatarUrl,
        coverUrl: dto.coverUrl,
      },
      create: {
        userId,
        displayName: dto.displayName || 'Unknown',
        bio: dto.bio,
        avatarUrl: dto.avatarUrl,
        coverUrl: dto.coverUrl,
      },
    });

    return updatedProfile;
  }
}
