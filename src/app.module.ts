import { Module } from '@nestjs/common';
import { TasksModule } from './modules/tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from './config';
import { AuthModule } from './modules/auth/auth.module';
import databaseConfig from './config/sequelize.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    SequelizeModule.forRoot({
      ...databaseConfig[process.env.NODE_ENV],
      synchronize: true,
      autoLoadModels: true,
    }),
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
