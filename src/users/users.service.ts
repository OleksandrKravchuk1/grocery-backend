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

  async createProfile(userId: string, data: any) {
    return this.prisma.profiles.create({
      data: {
        id: userId,
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
        gender: data.gender,
      }
    })
  }

  async updateProfile(userId: string, data: any) {
    return this.prisma.profiles.update({
      where: { id: userId },
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
        gender: data.gender,
      },
    });
  }
}
