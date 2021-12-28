import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from './config';

const { username, password, database, ...dbConfig } = config().DATABASE;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    SequelizeModule.forRoot({
      username,
      password,
      database,
      ...dbConfig,
      autoLoadModels: true,
      synchronize: true,
    }),
    TasksModule,
  ],
})
export class AppModule {}
