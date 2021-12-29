import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from './config';

const { DATABASE: databaseConfig } = config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    SequelizeModule.forRoot({
      ...databaseConfig,
      synchronize: true,
      autoLoadModels: true,
    }),
    TasksModule,
  ],
})
export class AppModule {}
