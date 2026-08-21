import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async getProfile(userId: string) {
    return this.prisma.profiles.findUnique({
      where: { id: userId },
    });
  }

  async upsertProfile(userId: string, data: any) {
    return this.prisma.profiles.upsert({
      where: { id: userId },
      update: {
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
        gender: data.gender,
      },
      create: {
        id: userId,
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
        gender: data.gender,
      },
    });
  }
}
