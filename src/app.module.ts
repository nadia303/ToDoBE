import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardsModule } from './boards/boards.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BoardsModule,
    TodosModule,
    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DATABASE_URI'),
        dbName: config.get<string>('DATABASE_NAME'),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
