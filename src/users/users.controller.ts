import { Controller, Get, Patch, Body, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { SupabaseAuthGuard } from '../auth/supabase.guard';
import { UpsertProfileDto } from './dto/upsert-profile.dto';

@Controller('users')
@UseGuards(SupabaseAuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Get('me')
  async getMyProfile(@Req() req: any) {
    return this.userService.getProfile(req.user.userId);
  }

  @Patch('me')
  async upsertMyProfile(@Req() req: any, @Body() body: UpsertProfileDto) {
    return this.userService.upsertProfile(req.user.userId, body);
  }
}
