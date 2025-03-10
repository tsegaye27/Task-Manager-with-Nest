import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  private users: User[] = [];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  createUser(name: string, email: string, password: string): User {
    const user: User = {
      id: Date.now().toString(),
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    };

    this.users.push(user);
    console.log('User created:', user);
    return user;
  }

  updateUser(
    id: string,
    name: string,
    email: string,
    password: string,
  ): User | undefined {
    const user = this.getUserById(id);
    if (user) {
      user.name = name;
      user.email = email;
      user.password = password;
    }
    return user;
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
