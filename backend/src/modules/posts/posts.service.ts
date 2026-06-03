import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createPostDto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        authorId: userId,
        content: createPostDto.content,
        mediaUrls: createPostDto.mediaUrls || [],
      },
      include: {
        author: {
          include: { profile: true }
        },
        _count: {
          select: { likes: true, comments: true, reposts: true }
        }
      }
    });
  }

  async getFeed(page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const posts = await this.prisma.post.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: {
        author: {
          include: { profile: true }
        },
        _count: {
          select: { likes: true, comments: true, reposts: true }
        },
        repost: {
          include: {
            author: { include: { profile: true } }
          }
        }
      }
    });

    return {
      posts,
      page,
      limit,
    };
  }

  async toggleLike(userId: string, postId: string) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw new NotFoundException('Post not found');

    const existingLike = await this.prisma.like.findUnique({
      where: {
        postId_userId: { postId, userId }
      }
    });

    if (existingLike) {
      await this.prisma.like.delete({ where: { id: existingLike.id } });
      return { liked: false };
    } else {
      await this.prisma.like.create({
        data: { postId, userId }
      });
      return { liked: true };
    }
  }

  async createRepost(userId: string, postId: string) {
    const originalPost = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!originalPost) throw new NotFoundException('Post not found');

    return this.prisma.post.create({
      data: {
        authorId: userId,
        content: '',
        repostId: postId,
      },
      include: {
        author: { include: { profile: true } },
        repost: {
          include: {
            author: { include: { profile: true } }
          }
        }
      }
    });
  }

  async addComment(userId: string, postId: string, dto: CreateCommentDto) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw new NotFoundException('Post not found');

    return this.prisma.comment.create({
      data: {
        postId,
        authorId: userId,
        content: dto.content,
      },
      include: {
        author: { include: { profile: true } }
      }
    });
  }

  async getComments(postId: string) {
    return this.prisma.comment.findMany({
      where: { postId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: {
        author: { include: { profile: true } }
      }
    });
  }
}
