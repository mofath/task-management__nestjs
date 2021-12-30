import { Column, Model, Table } from 'sequelize-typescript';

export interface IUser {
  id?: string;
  username: string;
  password: string;
}

@Table({})
export class User extends Model {
  @Column
  title: string;

  @Column
  username: string;

  @Column
  password: string;
}
