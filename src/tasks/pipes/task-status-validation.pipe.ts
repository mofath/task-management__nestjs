import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ITaskStatus } from '../task.entity';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    ITaskStatus.OPEN,
    ITaskStatus.IN_PROGRESS,
    ITaskStatus.DONE,
  ];

  transform(value: any, metadata: ArgumentMetadata) {
    value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    return this.allowedStatuses.includes(status);
  }
}
