import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface ITask {
  id?: string;
  title: string;
  description: string;
  status: ITaskStatus;
}

export enum ITaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Table({})
export class Task extends Model {
  @Column
  title: string;

  @Column
  description!: string;

  @Column({ type: DataType.ENUM({ values: Object.keys(ITaskStatus) }) })
  status: ITaskStatus;
}
