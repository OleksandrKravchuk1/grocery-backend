import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertProfileDto } from './dto/upsert-profile.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async getProfile(userId: string) {
    const profile = await this.prisma.profiles.findUnique({
      where: { id: userId },
    });

    if (!profile) {
      throw new NotFoundException('User not found')
    }

    return profile;
  }

  async upsertProfile(userId: string, data: UpsertProfileDto) {
    const profileData = {
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      gender: data.gender,
    };

    return this.prisma.profiles.upsert({
      where: { id: userId },
      update: profileData,
      create: {
        id: userId,
        ...profileData,
      },
    });
  }
}
