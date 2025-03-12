import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new NotFoundException('Invalid user ID');
    }
    return this.usersService.getUserById(userId);
  }

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User> {
    return this.usersService.createUser(name, email, password);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User> {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new NotFoundException('Invalid user ID');
    }
    return this.usersService.updateUser(userId, name, email, password);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new NotFoundException('Invalid user ID');
    }
    return this.usersService.deleteUser(userId);
  }
}
