import { Controller, Post, Delete, Param, UseGuards, Req, ConflictException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaService } from '../../common/prisma.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id/follow')
  async followUser(@Param('id') targetUserId: string, @Req() req: any) {
    const followerId = req.user.id;
    
    if (followerId === targetUserId) {
      throw new ConflictException('You cannot follow yourself');
    }

    const targetUser = await this.usersService.findById(targetUserId);
    if (!targetUser) {
      throw new NotFoundException('User not found');
    }

    try {
      await this.prisma.follow.create({
        data: {
          followerId,
          followingId: targetUserId,
        },
      });
      return { message: 'Successfully followed user' };
    } catch (e) {
      throw new ConflictException('Already following this user');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/follow')
  async unfollowUser(@Param('id') targetUserId: string, @Req() req: any) {
    const followerId = req.user.id;

    try {
      await this.prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId,
            followingId: targetUserId,
          },
        },
      });
      return { message: 'Successfully unfollowed user' };
    } catch (e) {
      throw new ConflictException('You are not following this user');
    }
  }
}
