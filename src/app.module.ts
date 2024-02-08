import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [
    BoardsModule,
    TodosModule,
    MongooseModule.forRoot('', { dbName: 'ToDo' }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (config: ConfigService) => ({
    //     uri: config.get<string>('env.host'), // Loaded from .ENV
    //   }),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
