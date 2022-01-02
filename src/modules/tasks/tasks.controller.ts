import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ITask, ITaskStatus } from '../../entity/task.entity';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/createTask.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Promise<ITask[]> {
    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<ITask> {
    return await this.taskService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<ITask> {
    return await this.taskService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.taskService.deleteTask(id);
  }

  // @Patch('/:id/status')
  // @UsePipes(ValidationPipe)
  // updateTask(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: ITaskStatus
  // ): ITask {
  //   return this.taskService.updateTask(id, status);
  // }
}
