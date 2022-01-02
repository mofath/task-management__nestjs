import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ITask, ITaskStatus, Task } from '../../entity/task.entity';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectModel(Task)
    private readonly taskModel: typeof Task
  ) {}
}
