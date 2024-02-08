import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from './schema/todos.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'ToDo', schema: TodoSchema }])],
  controllers: [TodosController],
  providers: [TodosService],
  exports: [TodosService],
})
export class TodosModule {}

// todos.module.ts

// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { TodosController } from './todos.controller';
// import { TodosService } from './todos.service';
// import { TodoSchema } from './schema/todo.schema'; // Assuming you have a 'todo' schema

// @Module({
//   imports: [MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }])],
//   controllers: [TodosController],
//   providers: [TodosService],
//   exports: [TodosService],
// })
// export class TodosModule {}
