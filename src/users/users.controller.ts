import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  getUserById(@Param('id') id: string): User | undefined {
    return this.usersService.getUserById(id);
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
  updateUser(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ): User | undefined {
    return this.usersService.updateUser(id, name, email, password);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): void {
    this.usersService.deleteUser(id);
  }
}
