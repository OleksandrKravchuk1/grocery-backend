import { Controller, Get, Patch, Body, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { SupabaseAuthGuard } from '../auth/supabase.guard';

@Controller('users')
@UseGuards(SupabaseAuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Get('me')
  async getMyProfile(@Req() req: any) {
    return this.userService.getProfile(req.user.userId);
  }

  @Patch('me')
  async updateMyProfile(@Req() req: any, @Body() body: any) {
    return this.userService.updateProfile(req.user.userId, body);
  }
}
