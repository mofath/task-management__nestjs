import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { ITask, ITaskStatus } from '../../entity/task.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/createTask.dto';
import { TaskRepository } from './task.repository';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from '../../entity/task.entity';
@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  constructor(
    @InjectModel(Task)
    private readonly taskModel: typeof Task
  ) {}

  async getAllTasks(): Promise<ITask[]> {
    return this.taskModel.findAll();
  }

  async getTaskById(id: string): Promise<ITask> {
    const found = await this.taskModel.findByPk(id, { raw: true });

    if (!found) {
      throw new NotFoundException(`Task with ${id} not found`);
    }

    return found;
  }

  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<ITask> {
    const { title, description } = createTaskDto;

    const task = new Task({
      title,
      description,
      status: ITaskStatus.OPEN,
    });

    await task.save();

    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  // updateTask(id: string, status: ITaskStatus): ITask {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
