import { Controller, Get, Post, Body, Param, UseGuards, Query, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: any, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(req.user.id, createPostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getFeed(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.postsService.getFeed(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 20
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  async toggleLike(@Req() req: any, @Param('id') id: string) {
    return this.postsService.toggleLike(req.user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/repost')
  async createRepost(@Req() req: any, @Param('id') id: string) {
    return this.postsService.createRepost(req.user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/comments')
  async addComment(@Req() req: any, @Param('id') id: string, @Body() dto: CreateCommentDto) {
    return this.postsService.addComment(req.user.id, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/comments')
  async getComments(@Param('id') id: string) {
    return this.postsService.getComments(id);
  }
}
