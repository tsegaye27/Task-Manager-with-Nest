import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    const hashedPassword = bcrypt.hashSync(password, 10);
    return this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }

  async updateUser(
    id: number,
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    const hashedPassword = bcrypt.hashSync(password, 10);
    return this.prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }

  async deleteUser(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
