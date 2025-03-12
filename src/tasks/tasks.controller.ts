import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
  Req,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Task } from '@prisma/client';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAllTasks(@Req() req: Request): Promise<Task[]> {
    const userId = req.user?.['sub'];
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.tasksService.getAllTasks(userId);
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    const taskId = parseInt(id, 10);
    const task = await this.tasksService.getTaskById(taskId);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  @Post()
  async createTask(
    @Body('title') title: string,
    @Body('description') description: string,
    @Req() req: Request,
  ): Promise<Task> {
    const userId = req.user?.['sub'];
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.tasksService.createTask(title, description, userId);
  }

  @Patch(':id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: 'OPEN' | 'IN_PROGRESS' | 'DONE',
  ): Promise<Task> {
    const taskId = parseInt(id, 10);
    return this.tasksService.updateTaskStatus(taskId, status);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    const taskId = parseInt(id, 10);
    return this.tasksService.deleteTask(taskId);
  }
}
