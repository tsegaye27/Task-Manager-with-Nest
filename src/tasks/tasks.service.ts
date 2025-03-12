import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getAllTasks(userId: number): Promise<Task[]> {
    return this.prisma.task.findMany({ where: { userId } });
  }

  async getTaskById(id: number): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async createTask(
    title: string,
    description: string,
    userId: number,
  ): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title,
        description,
        status: 'OPEN',
        userId,
      },
    });
  }

  async updateTaskStatus(
    id: number,
    status: 'OPEN' | 'IN_PROGRESS' | 'DONE',
  ): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: { status },
    });
  }

  async deleteTask(id: number): Promise<void> {
    await this.prisma.task.delete({ where: { id } });
  }
}
