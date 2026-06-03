import { Controller, Get, Put, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { Request } from 'express';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get(':id')
  async getProfile(@Param('id') id: string, @Req() req: Request) {
    // If we want to know if the requesting user follows this profile, 
    // we could extract the user from the JWT if it exists, but since 
    // we don't strictly require authentication to VIEW a profile, 
    // we'll optionally handle it. For now, assuming JwtAuthGuard isn't on GET.
    // A better approach is an optional AuthGuard, but for simplicity we'll just parse manually or skip it if no header.
    let currentUserId: string | undefined;
    // Here we'd normally parse the token to set currentUserId
    
    return this.profilesService.getProfile(id, currentUserId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('me')
  async updateProfile(@Req() req: any, @Body() updateProfileDto: UpdateProfileDto) {
    const userId = req.user.id;
    return this.profilesService.updateProfile(userId, updateProfileDto);
  }
}
